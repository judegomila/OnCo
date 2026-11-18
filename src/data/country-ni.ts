import type { CountryDive } from "@/data/country-dive";

/**
 * Nicaragua deep dive: the hand-written cards for /countries/ni/ (wave 15). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet, WHO's Cancer Country
 * Profile 2020 and Cervical Cancer Profile 2021 (PDF text), WHO's Global Health Expenditure rows and immunisation data
 * API, the public data feed of the IAEA's Directory of Radiotherapy Centres, the Ministry of Health's own pages
 * (minsa.gob.ni, Spanish), the General Health Law (Ley 423, on the National Assembly's legislation site, Spanish),
 * PAHO's 2013 cancer profile, its Health in the Americas country profile and its November 2023 notice on HPV
 * vaccination (Spanish), an IAEA country fact sheet and Bulletin article, the ICCP portal, ClinicalTrials.gov and
 * Europe PMC abstracts (and the open full text of Holme 2020). The page describes what each source states and does not fill gaps from memory.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/558-nicaragua-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/nic-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-nic-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'NIC'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'NIC'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'NIC'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'NIC'";
const WHO_GGHE_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'NIC'";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'NIC'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const DIRAC_FEED = "https://dirac.iaea.org/api/DataGridWebApi/EquipmentReport";
const MINSA = "https://www.minsa.gob.ni/";
const MINSA_HOSPITALS = "https://www.minsa.gob.ni/index.php/red-de-salud/hospitales?field_silais_target_id=All&title=&field_departamento_target_id=All&field_municipio_target_id=All&items_per_page=300";
const MINSA_CENTROS = "https://www.minsa.gob.ni/index.php/red-de-salud/centros-especializados";
const MINSA_ANRS = "https://www.minsa.gob.ni/entidades/regulaci%C3%B3n-sanitaria";
const LEY_423 = "http://legislacion.asamblea.gob.ni/normaweb.nsf/9e314815a08d4a6206257265005d21f9/ff82ea58ec7c712e062570a1005810e1";
const PAHO_PROFILE_2013 = "https://www.paho.org/sites/default/files/NICARAGUA-PERFIL-CANCER-2013.pdf";
const PAHO_HIA = "https://hia.paho.org/en/country-profiles/nicaragua";
const PAHO_HPV_2023 = "https://www.paho.org/es/noticias/6-11-2023-nicaragua-inicia-vacunacion-contra-virus-papiloma-humano-para-garantizar-futuro";
const IAEA_TC = "https://www.iaea.org/sites/default/files/21/03/tc-nicaragua.pdf";
const IAEA_BULLETIN_2019 = "https://www.iaea.org/sites/default/files/publications/magazines/bulletin/bull60-3/6032223_corr.pdf";
const ICCP_SEARCH = "https://www.iccp-portal.org/resources?search_api_fulltext=Nicaragua";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Nicaragua&cond=cancer";
const DOI = (id: string) => `https://doi.org/${id}`;

export const NI_DIVE: CountryDive = {
  iso2: "NI",
  iso3: "NIC",
  name: "Nicaragua",
  flag: "🇳🇮",
  asOf: "2026-11-16",
  title: "Cancer in Nicaragua",
  description:
    "Cancer in Nicaragua from its own and international sources: IARC's estimate of 8,919 new cancers and 4,734 deaths in 2024, modelled from national deaths and not counted by a registry; breast cancer the commonest and liver cancer the commonest cause of cancer death; a public radiotherapy hospital in Managua with its first linear accelerator since 2019; households paying 37.6% of health spending out of pocket in 2023; HPV vaccination since 2023 with 73% first-dose coverage in girls in 2025; a national cancer plan recorded as under development; and one registered cancer study with a Nicaraguan site.",
  lede:
    "Nicaragua has a public radiotherapy hospital in Managua that the Ministry of Health lists as a national referral hospital, a children's hospital whose leukaemia programme has been described in medical journals since 1998, and HPV vaccination since 2023. IARC's figure of 8,919 new cancers in 2024 is modelled from deaths, not counted by a registry.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Nicaragua is 8,919 new cancers and 4,734 deaths, an age-standardised incidence of 145.7 per 100,000 (152.9 in men, 147.4 in women) and an age-standardised mortality of 80.2. These are modelled figures, not a registry count. The fact sheet gives the country-specific data source for incidence as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (registry survival data)\": IARC estimates deaths first and then works back to new cases with mortality-to-incidence ratios. For mortality the source is \"WHO (national)\" and the method \"Trends in national rates projected to 2024\". WHO's 2020 profile rated the quality of Nicaragua's mortality registration for 2007 to 2016 as medium, and its cervical cancer profile recorded no population-based cancer registry in 2021.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in Nicaragua",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Nicaragua (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 8,900 new cancers a year by IARC's estimate, modelled from deaths",
          plain:
            "IARC estimates 8,919 new cancers in Nicaragua in 2024 (5,017 in women and 3,902 in men) and 4,734 cancer deaths. Breast cancer is estimated to be the commonest cancer, followed by prostate, colorectal, cervical and liver cancer. Liver cancer is the commonest cause of cancer death. The incidence figure is not a registry count.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,534 breast cancers (415 deaths), 823 prostate cancers (378 deaths), 652 colorectal cancers (362 deaths), 621 cervical cancers (364 deaths) and 614 liver cancers (568 deaths); stomach cancer, sixth by cases with 585, is second by deaths with 460. The risk of developing a cancer before age 75 is 13.2%, and an estimated 20,303 people are living within five years of a diagnosis. IARC's stated incidence method is \"National mortality estimates applied to model-based M:I ratios (registry survival data)\", with \"No data\" as the country-specific source, so every case number here is derived from estimated deaths. WHO's 2020 profile estimated 285 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Nicaragua (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Nicaragua (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "Deaths are registered nationally; WHO recorded no population-based cancer registry in 2021",
          plain:
            "WHO's cervical cancer profile recorded no population-based cancer registry in Nicaragua in 2021. PAHO's 2013 profile recorded a national hospital-based cancer registry, with 2012 as its latest year of data. A 2024 study of stomach cancer deaths used the Ministry of Health's death registry.",
          detail:
            "WHO's 2020 profile listed the availability of a population-based registry for 2019 as \"registration activity\", rated mortality registration for 2007 to 2016 as medium, and noted that the incidence estimates carry a high degree of uncertainty because they are not based on a population-based registry. A 2024 paper on stomach cancer says reliable cancer data and population-based registries are lacking in Nicaragua, El Salvador, Honduras and Guatemala, and used the Ministry of Health death registry, which the authors call highly rated: it recorded 3,886 stomach cancer deaths between 1997 and 2012, an age-standardised rate of 13.1 per 100,000 in men and 8.7 in women. OnCo found no published report of the hospital-based registry PAHO recorded in 2013, and no source on whether it still runs.",
          links: [
            { label: "WHO: Cervical Cancer Country Profile 2021, Nicaragua (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Nicaragua (PDF)", url: WHO_PROFILE },
            { label: "PAHO: Nicaragua, perfil de cáncer 2013 (Spanish, PDF)", url: PAHO_PROFILE_2013 },
            { label: "Peña-Galo EM et al., gastric cancer mortality in Nicaragua 1997 to 2012. Cancer Epidemiol Biomarkers Prev 2024", url: DOI("10.1158/1055-9965.epi-23-1392") },
          ],
        },
      ],
      tables: [
        {
          id: "ni-globocan-sites",
          title: "The five commonest cancers in Nicaragua, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024. Modelled from national mortality estimates, not counted by a registry.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1534, deaths: 415 },
            { site: "Prostate", cases: 823, deaths: 378 },
            { site: "Colorectum", cases: 652, deaths: 362 },
            { site: "Cervix uteri", cases: 621, deaths: 364 },
            { site: "Liver", cases: 614, deaths: 568 },
          ],
          note: "Stomach cancer is sixth by cases (585) and second by deaths (460). OnCo found no Nicaraguan registry figures for new cases to set beside these; IARC derives the case numbers from estimated deaths.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Nicaragua (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care",
      cards: [
        {
          id: "spending",
          title: "Households paid 37.6% of health spending out of pocket in 2023, in WHO's figures",
          plain:
            "WHO's health expenditure database puts out-of-pocket payments at 37.6% of Nicaragua's current health spending in 2023, up from 30.8% in 2021, with total health spending of about 217 US dollars a person. Government spending made up 57.4% of the total. These rows cover all health care, not cancer care.",
          detail:
            "The out-of-pocket share in WHO's rows was 33.2% in 2019, 32.3% in 2020, 30.8% in 2021, 35.7% in 2022 and 37.6% in 2023. Current health expenditure per person was USD 204 in 2021, 209 in 2022 and 217 in 2023; domestic general government health expenditure was 63.4% of current health spending in 2021 and 57.4% in 2023, and external funding was 3.4% in 2023. PAHO's country profile gives the same 30.8% for 2021. The sources do not explain the rise since 2021 and OnCo does not guess at the reason. OnCo found no source giving what a cancer patient pays for medicines, tests or travel.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket expenditure as % of current health expenditure, Nicaragua (data API)", url: WHO_OOP_API },
            { label: "WHO Global Health Observatory: current health expenditure per capita in US$, Nicaragua (data API)", url: WHO_CHE_API },
            { label: "WHO Global Health Observatory: government health expenditure as % of current health expenditure, Nicaragua (data API)", url: WHO_GGHE_API },
            { label: "WHO Global Health Observatory: external health expenditure as % of current health expenditure, Nicaragua (data API)", url: WHO_EXT_API },
            { label: "PAHO: Health in the Americas, Nicaragua country profile", url: PAHO_HIA },
          ],
        },
        {
          id: "regimes",
          title: "The health law sets three regimes: social security, free public care for vulnerable groups, and paying directly",
          plain:
            "Nicaragua's General Health Law of 2002 divides the health sector into a contributory regime reached through the social security institute or an insurance company, a non-contributory regime that is free and funded from the national budget and from others who give resources to the system, and a voluntary regime paid for by the user. OnCo found no current source on what each covers for cancer.",
          detail:
            "Law 423, approved on 14 March 2002 and marked in force on the National Assembly's legislation site, says the contributory regime is financed by contributions to the Instituto Nicaragüense de Seguridad Social from affiliated workers, employers and the state, and also through public and private insurance companies; the non-contributory regime \"es gratuito\", serves vulnerable sectors together with public health actions for the whole population, and is financed from the national budget and from others who give resources to the system; and the voluntary regime is what the user finances directly. Among its principles the law guarantees free care for vulnerable sectors of the population, and it includes the early detection of cervical and breast cancer in the ministry's programme of care for women, children and adolescents. OnCo read the 2002 text and not later amendments. The social security institute's site could not be read on 16 November 2026 or when tried again on 17 November 2026 (inss.gob.ni did not resolve and www.inss.gob.ni refused the request), so its cancer benefits are not described here.",
          links: [
            { label: "Asamblea Nacional de Nicaragua: Ley No. 423, Ley General de Salud (Spanish)", url: LEY_423 },
            { label: "Ministerio de Salud de Nicaragua (MINSA)", url: MINSA },
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
          id: "anrs",
          title: "Medicines are registered by the health ministry's Autoridad Nacional de Regulación Sanitaria",
          plain:
            "The Ministry of Health's Autoridad Nacional de Regulación Sanitaria (national health regulation authority) evaluates, registers and controls the import, sale, distribution, prescribing and dispensing of medicines in Nicaragua. Its pharmacy directorate handles the registration, quality and safety of medicines and biological products, and the monitoring of side effects.",
          detail:
            "The ministry's page for the authority, read in Spanish on 16 November 2026, says it is made up of five directorates: health regulation, food and drink, pharmacy, medical devices, and a quality control laboratory that verifies the quality of medicines before they are sold and takes part in the release of vaccine batches. The pharmacy directorate works under Law 292 on medicines and pharmacies and the General Health Law, and the authority also regulates the use of radioisotopes and ionising radiation. The ministry offers the health registration of pharmaceutical products as an online service. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include Nicaragua. OnCo found no public list of the cancer medicines registered or supplied in the public system; the ministry's national medicines formulary is listed on its site as a 2014 edition and was not read.",
          links: [
            { label: "MINSA Nicaragua: Autoridad Nacional de Regulación Sanitaria (Spanish)", url: MINSA_ANRS },
            { label: "WHO: list of regulatory authorities operating at maturity level 3 and 4 (PDF, August 2026)", url: WHO_ML3 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Cervical Cancer Country Profile 2021, Nicaragua (PDF)", url: WHO_CERVICAL },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination began in November 2023; first-dose coverage in girls was 73% in 2025",
          plain:
            "Nicaragua added the HPV vaccine to its national schedule in 2023, for girls aged 10 to 14, with a goal of vaccinating about 300,000 girls. WHO's rows give first-dose programme coverage in girls of 79% in 2023 and 73% in 2025, and last-dose coverage of 66% in 2025.",
          detail:
            "PAHO's notice of 6 November 2023 says the Ministry of Health was introducing a two-dose vaccine against HPV types 16 and 18, offered at health fairs, in house-to-house visits, in schools and in health centres. WHO's immunisation rows mark the vaccine as introduced in 2023 and give: first dose in girls, 79% in 2023 (260,000 doses against a target of 329,155); last dose in girls, 78% in 2024; and for 2025, first dose in girls 73% (95,852 of 131,595), last dose in girls 66%, and a first-dose figure for boys of 76%. OnCo did not read a source describing the extension to boys and reports the row as WHO holds it. WHO's rows mark hepatitis B vaccine as in the schedule from 1999 and a birth dose as not introduced.",
          links: [
            { label: "PAHO: Nicaragua inicia vacunación contra el Virus de Papiloma Humano (6 November 2023, Spanish)", url: PAHO_HPV_2023 },
            { label: "WHO immunisation data: HPV programme coverage rows for Nicaragua (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: vaccine introduction rows for Nicaragua (data API)", url: WHO_INTRO_API },
          ],
        },
        {
          id: "cervical-screening",
          title: "A national cervical screening programme by Pap smear, with HPV testing tried in three provinces",
          plain:
            "WHO's profiles record a national cervical screening programme in Nicaragua that uses cytology (the Pap smear), and a breast screening programme starting at age 40. Between 2014 and 2018 HPV testing was introduced in three provinces, and 44,635 women were screened there in 2017, nearly all with a sample they collected themselves.",
          detail:
            "WHO's sources disagree on how many women are reached. The 2021 cervical cancer profile estimates that 80% of women aged 30 to 49 had been screened in the previous five years (2019), while the 2020 profile recorded an organised programme with participation between 10% and 50%, and PAHO's 2013 profile gave Pap coverage as 10%. In the provincial HPV programme (Carazo, Chinandega and Chontales, 2017), 15.2% of women tested positive and 54.0% of them received a follow-up test; 53.1% of the women whose follow-up test was positive were treated, mostly with cryotherapy. Assuming the women lost before the follow-up test would have had positive results at the same rate, the authors put the overall treatment percentage at 27.8%, against WHO's goal of 90%, and found the management of women who tested positive, not the testing, to be the hard step. A 2017 modelling study in the public system estimated that HPV testing every five years with cryotherapy would cut lifetime cervical cancer risk by 29.5%, against 10.8% for Pap testing every three years. OnCo found no source on whether HPV testing has since spread beyond those provinces.",
          links: [
            { label: "WHO: Cervical Cancer Country Profile 2021, Nicaragua (PDF)", url: WHO_CERVICAL },
            { label: "WHO: Cancer Country Profile 2020, Nicaragua (PDF)", url: WHO_PROFILE },
            { label: "PAHO: Nicaragua, perfil de cáncer 2013 (Spanish, PDF)", url: PAHO_PROFILE_2013 },
            { label: "Holme F et al., HPV-based cervical cancer screening in Nicaragua. BMC Public Health 2020", url: DOI("10.1186/s12889-020-08601-z") },
            { label: "Campos NG et al., cost-effectiveness of HPV-based screening in Nicaragua. BMJ Open 2017", url: DOI("10.1136/bmjopen-2016-015048") },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in Nicaragua",
      cards: [
        {
          id: "radiotherapy",
          title: "A national radiotherapy hospital in Managua, with its first linear accelerator since 2019",
          plain:
            "The Ministry of Health lists the Hospital Nacional de Radioterapia \"Nora Astorga\" in Managua as a hospital with national referral services. The IAEA reports that the country's first linear accelerator was inaugurated in May 2019 at the National Radiotherapy Centre, its name for the centre, with funding from Japan and IAEA support for staff training. The IAEA's directory lists 2 radiotherapy centres in Nicaragua, both in Managua: this hospital and the Hospital Escuela Dr. Alejandro Dávila Bolaños.",
          detail:
            "The public data feed of the IAEA's Directory of Radiotherapy Centres, read on 17 November 2026, lists two centres in Nicaragua, both in Managua and both in entries last updated in 2026: the Centro Nacional de Radioterapia Nora Astorga, with 3 linear accelerators, 1 cobalt-60 unit and 1 brachytherapy unit, and the Hospital Escuela Dr. Alejandro Dávila Bolaños, with 1 linear accelerator and 1 brachytherapy unit. That is 5 high-energy photon and electron beam units and 2 brachytherapy units in all. An IAEA country fact sheet, whose latest listed achievement is dated 2023, says the National Radiotherapy Centre moved from 2D to 3D conformal radiotherapy with IAEA support, which also helped procure a new cobalt-60 source, a treatment planning system and high dose rate brachytherapy equipment and contributed to a double bunker built to host two linear accelerators. WHO's 2020 profile recorded 3.8 external beam units per 10,000 cancer patients for 2019 and no PET scanner for 2020. The ministry's list of specialised centres also names a Centro Oncológico de Quimioterapias y Cuidados Paliativos in Managua.",
          links: [
            { label: "MINSA Nicaragua: hospitals (full list, Spanish)", url: MINSA_HOSPITALS },
            { label: "MINSA Nicaragua: specialised centres (Spanish)", url: MINSA_CENTROS },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries table", url: DIRAC },
            { label: "IAEA DIRAC: the public data feed behind the directory's table (JSON, all countries)", url: DIRAC_FEED },
            { label: "IAEA: technical cooperation country fact sheet, Nicaragua (PDF)", url: IAEA_TC },
            { label: "IAEA Bulletin, September 2019: managing the ever-increasing demand for cancer services (PDF)", url: IAEA_BULLETIN_2019 },
            { label: "WHO: Cancer Country Profile 2020, Nicaragua (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "childhood",
          title: "Childhood cancer is treated at La Mascota children's hospital, whose leukaemia programme was twinned with hospitals in Italy and Switzerland",
          plain:
            "The Hospital Infantil Manuel de Jesús Rivera \"La Mascota\" in Managua is a national referral hospital, and a 1998 paper described the twinning of its leukaemia programme with hospitals in Monza, Milan and Bellinzona. Of 540 children treated for acute lymphoblastic leukaemia in Nicaragua from 1995 to 2005, overall survival at five years was 48.0%, counting children who left treatment as events, in the series published in Pediatric Blood & Cancer in 2014 (Pacheco and colleagues).",
          detail:
            "A 1998 paper in The Lancet described the twinning and said such programmes need a long-term commitment to a strategy that takes in the supply of drugs, the training and supervision of staff and the care of children and their parents. The 2014 report of the leukaemia results, whose first author worked in the hospital's paediatric oncology department, gave event-free survival of 38.1% at five years and 36.6% at ten and overall survival of 39.6% at ten years, with 7% of children dying during the first phase of treatment and 9% leaving treatment; the authors named abandonment and relapse as the limits on a better result. A review of 282 children treated at the hospital from 2004 to 2007 found 67% malnourished at diagnosis, and malnourished children left treatment more often and had shorter event-free survival. WHO's 2020 profile recorded a defined referral system and early detection guidelines for childhood cancer, and bone marrow transplantation as generally not available. These series end in 2007 and do not describe results today; OnCo found no published results for children treated since.",
          links: [
            { label: "MINSA Nicaragua: hospitals (full list, Spanish)", url: MINSA_HOSPITALS },
            { label: "Masera G et al., the La Mascota programme, Nicaragua. Lancet 1998", url: DOI("10.1016/s0140-6736(98)07077-9") },
            { label: "Pacheco C et al., childhood acute lymphoblastic leukaemia in Nicaragua. Pediatr Blood Cancer 2014", url: DOI("10.1002/pbc.24871") },
            { label: "Pribnow AK et al., malnutrition and outcomes of children with cancer in Nicaragua. Pediatr Blood Cancer 2017", url: DOI("10.1002/pbc.26590") },
            { label: "WHO: Cancer Country Profile 2020, Nicaragua (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "plan",
          title: "A national cancer plan recorded as under development; none found in print",
          plain:
            "WHO's 2020 profile recorded Nicaragua's national cancer control plan as under development in 2019, as PAHO's profile had in 2013. The IAEA says it supported the country in developing a national cancer control plan between 2017 and 2018. OnCo found no published plan.",
          detail:
            "The ICCP portal's search for Nicaragua on 16 November 2026 returned WHO's profiles of 2014, 2020 and 2021 and a 2016 regional leadership forum document, and no Nicaraguan cancer or non-communicable disease plan. WHO's 2020 profile recorded, for 2019, cancer management guidelines in place, early detection guidelines for 2 of the 4 cancers it asks about, pathology services generally available, community or home-based palliative care generally not available, 7.5 radiation oncologists and 11.3 medical physicists per 10,000 cancer patients, and an integrated non-communicable disease plan as \"n/a\". The IAEA's fact sheet lists one earlier review of the country's cancer services, in 2006. OnCo did not find a plan on the Ministry of Health's site; a future pass should search its publications pages.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Nicaragua (PDF)", url: WHO_PROFILE },
            { label: "PAHO: Nicaragua, perfil de cáncer 2013 (Spanish, PDF)", url: PAHO_PROFILE_2013 },
            { label: "IAEA: technical cooperation country fact sheet, Nicaragua (PDF)", url: IAEA_TC },
            { label: "ICCP portal: resources search for Nicaragua", url: ICCP_SEARCH },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Nicaragua", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Nicaragua; the registry holds one completed cancer study",
          plain:
            "None of the trials in OnCo's records lists Nicaragua among its countries. A query of ClinicalTrials.gov for cancer studies with a site there returned one on 16 November 2026: a completed observational study of a nutritional programme for children with cancer at La Mascota hospital. It was not a treatment trial.",
          detail:
            "The study, NCT04031586, was sponsored by Columbia University, enrolled 50 children between November 2018 and October 2021, and looked at the delivery of nutritional care in institutions of the Asociación de Hemato-Oncología Pediátrica de Centro América, the Central American paediatric haematology and oncology association. OnCo holds a selection of trials, not the whole registry, so the registry itself is the place to search. Published research from Nicaragua that OnCo read is in childhood leukaemia, cervical screening, stomach cancer mortality and, in a 2025 paper, a breast cancer programme in which patients helped design services and early-stage diagnoses rose from 67% to 76%.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Nicaragua", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT04031586", url: "https://clinicaltrials.gov/study/NCT04031586" },
            { label: "Suárez ME et al., patient-centred leadership in a breast cancer programme in Nicaragua. Int J Environ Res Public Health 2025", url: DOI("10.3390/ijerph22101482") },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found or not readable for this page",
      plain:
        "OnCo did not find a published national cancer plan, a report from a cancer registry, a list of cancer medicines supplied in the public system, the social security institute's cancer benefits, or current results for adults treated in Nicaragua. It describes none of these from memory.",
      detail:
        "The social security institute's site could not be read on 16 November 2026 or when tried again on 17 November 2026: inss.gob.ni did not resolve and www.inss.gob.ni answered with a refusal (HTTP 403), which OnCo did not try to get round. The Ministry of Health's national medicines formulary (seventh edition, 2014) and its publications pages were not read, and OnCo did not read Law 292 on medicines or any amendment to the General Health Law after 2002. The published childhood cancer series end in 2007 and the national death analysis for stomach cancer in 2012. A future pass should read the ministry's publications, PAHO's country reports and the Central American paediatric association's own papers. Until then, patients and families can ask the treating hospital or the Ministry of Health what is provided and what it costs.",
      links: [
        { label: "Ministerio de Salud de Nicaragua (MINSA)", url: MINSA },
        { label: "ICCP portal: resources search for Nicaragua", url: ICCP_SEARCH },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
    {
      id: "gap-conflicts",
      title: "Where the sources disagree",
      plain:
        "WHO's own profiles give very different figures for cervical screening: 80% of women aged 30 to 49 screened in five years in the 2021 profile, and participation of 10% to 50% in the 2020 profile. OnCo could not tell which is closer and shows both.",
      detail:
        "The two profiles also differ on palliative care in the community: generally not available for 2019 in the 2020 profile, and available in the public system for 2021 in the cervical cancer profile. On registries, PAHO's 2013 profile recorded a national hospital-based registry, WHO's 2020 profile recorded \"registration activity\", and WHO's 2021 profile recorded no population-based registry; these can all be true at once, since a hospital registry is not a population-based one. A future pass should look for a national survey of screening and ask the Ministry of Health which registry operates today.",
      links: [
        { label: "WHO: Cervical Cancer Country Profile 2021, Nicaragua (PDF)", url: WHO_CERVICAL },
        { label: "WHO: Cancer Country Profile 2020, Nicaragua (PDF)", url: WHO_PROFILE },
        { label: "PAHO: Nicaragua, perfil de cáncer 2013 (Spanish, PDF)", url: PAHO_PROFILE_2013 },
      ],
    },
  ],
  institutions: [
    "minsa-nicaragua",
    "nora-astorga-radiotherapy-nicaragua",
    "hospital-escuela-davila-bolanos",
    "hospital-infantil-manuel-de-jesus-rivera-la-mascota",
    "who",
    "iarc",
    "iaea",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-pacheco-childhood-all-nicaragua-pbc-2014",
    "paper-pribnow-malnutrition-childhood-cancer-nicaragua-pbc-2017",
    "paper-holme-hpv-screening-nicaragua-bmcph-2020",
    "paper-pena-galo-gastric-cancer-mortality-nicaragua-cebp-2024",
  ],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles, WHO's health expenditure and immunisation data, the IAEA's public radiotherapy directory and country fact sheet, the Ministry of Health's pages and the General Health Law in Spanish, PAHO's profiles and notices, and the abstracts of the papers cited, each resolved by its DOI through Europe PMC, with the open full text read for the HPV screening paper. Trials were recounted from OnCo's graph on 18 November 2026, after its trial statuses were refreshed from the registry on 17 November, and the count on this page is unchanged.",
  verify:
    "The case and death numbers are modelled estimates, the survey answers date from 2019 to 2021, and the published treatment results are for children diagnosed up to 2007. Anyone seeking care should ask the treating hospital, the Hospital Nacional de Radioterapia Nora Astorga or the Ministry of Health what is available now.",
  verifyLinks: [
    { label: "Ministerio de Salud de Nicaragua (MINSA)", url: MINSA },
    { label: "MINSA Nicaragua: hospitals (full list, Spanish)", url: MINSA_HOSPITALS },
    { label: "WHO: Cancer Country Profile 2020, Nicaragua (PDF)", url: WHO_PROFILE },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Nicaragua (PDF)", url: IARC_FACTSHEET },
  ],
};

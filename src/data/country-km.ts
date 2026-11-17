import type { CountryDive } from "@/data/country-dive";

/**
 * Comoros deep dive: the hand-written cards for /countries/km/ (wave 15). The Comoros publishes very little on cancer,
 * so this page is short on purpose: IARC's modelled estimate, WHO's spending, vaccination and profile rows, the two
 * national documents on non-communicable diseases that the ICCP portal holds, and a plain list of what was not found.
 * Every figure was read from the raw text of its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN
 * 2024 fact sheet (PDF text), WHO's Cancer Country Profile 2020 and cervical cancer profile 2021 (PDF text), WHO's
 * Global Health Expenditure rows and immunisation rows (data APIs), the Ministry of Health's Politique nationale de
 * lutte contre les maladies non transmissibles 2020-2029 and its March 2013 draft strategy (PDF text, in French, on the
 * ICCP portal), WHO Comoros's annual reports for 2024 and 2025 (PDF text, in French), UNICEF Comoros's account of the
 * HPV campaign (in French), and a 2021 article from the paediatric oncology service in La Réunion (PDF text, in French).
 * The Ministry of Health's own site failed its certificate check and was not read; that and the other missing
 * sources are named under `gaps`. No institution, trial or person in the corpus belongs to the Comoros.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/174-comoros-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-com-2020.pdf";
const WHO_CERVICAL = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-com-2021-country-profile-en.pdf";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'COM'";
const GHO_CHE = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'COM'";
const GHO_GOV = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'COM'";
const GHO_EXT = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'COM'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'COM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'COM'";
const NCD_POLICY = "https://www.iccp-portal.org/sites/default/files/plans/COM_B3_FULL%20Brochure%20SD%20politique%20MNT%20Comores.pdf";
const NCD_STRATEGY_2013 = "https://www.iccp-portal.org/sites/default/files/plans/COM_B3_STRATEGIE%20MNT%20draft%20MARS%2013%20%281%29%20%281%29.pdf";
const ICCP_LIST = "https://www.iccp-portal.org/resources?field_n_country=KM";
const WHO_REPORT_2025 = "https://www.afro.who.int/sites/default/files/2026-05/OMS%20Comores%20_%20Rapport%20annuel%20des%20r%C3%A9sultats%202025%20%20PUBLICATION.pdf";
const WHO_REPORT_2024 = "https://www.afro.who.int/sites/default/files/2025-07/Rapport%20annuel%20_%20OMS%20Comores%20_%20PUBLICATION%2010%2007%202025.pdf";
const UNICEF_HPV = "https://www.unicef.org/comoros/recits/les-comores-sengagent-pour-prot%C3%A9ger-les-filles-contre-le-cancer-du-col-de-lut%C3%A9rus";
const REUNION_2021 = "https://www.cancercontrol.info/wp-content/uploads/2021/11/18-21-Reguerre.pdf";
const WHO_ML3 = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const DIRAC = "https://dirac.iaea.org/";
const CTGOV = "https://clinicaltrials.gov/search?country=Comoros&cond=cancer";
const CTGOV_API = "https://clinicaltrials.gov/api/v2/studies?query.locn=Comoros&query.cond=cancer&pageSize=20&countTotal=true";
const EPMC_SEARCH = "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE%3A%28Comoros%20OR%20Comores%20OR%20Comoro%29%20AND%20%28cancer%20OR%20oncology%20OR%20carcinoma%20OR%20tumour%29&resultType=lite&pageSize=40&format=json";
const MOH = "https://sante.gouv.km/";

const L = {
  iarc: { label: "IARC: GLOBOCAN 2024 fact sheet, Comoros (PDF)", url: IARC_FACTSHEET },
  profile: { label: "WHO: Cancer Country Profile 2020, Comoros (PDF)", url: WHO_PROFILE },
  cervical: { label: "WHO: cervical cancer country profile 2021, Comoros (PDF)", url: WHO_CERVICAL },
  policy: { label: "Ministry of Health: Politique nationale de lutte contre les maladies non transmissibles 2020-2029 (PDF, in French, ICCP portal)", url: NCD_POLICY },
  strategy: { label: "Ministry of Health: draft national strategy against non-communicable diseases, March 2013 (PDF, in French, ICCP portal)", url: NCD_STRATEGY_2013 },
  report2025: { label: "WHO Comoros: annual results report 2025 (PDF, in French)", url: WHO_REPORT_2025 },
  report2024: { label: "WHO Comoros: annual report 2024 (PDF, in French)", url: WHO_REPORT_2024 },
  unicef: { label: "UNICEF Comoros: the HPV vaccination campaign (10 December 2025, in French)", url: UNICEF_HPV },
  iccp: { label: "ICCP portal: documents listed for Comoros", url: ICCP_LIST },
};

export const KM_DIVE: CountryDive = {
  iso2: "KM",
  iso3: "COM",
  name: "Comoros",
  flag: "🇰🇲",
  asOf: "2026-11-16",
  title: "Cancer in Comoros",
  description:
    "Cancer in the Comoros from the few sources that exist: IARC's modelled estimate of 576 new cancers and 349 deaths in 2024, built from neighbouring countries' rates, with cervical cancer first; no population-based cancer registry in WHO's 2021 profile; HPV vaccination introduced in November 2025 with about 26% of the target reached; health spending of about USD 102 a person in 2023 with 56.6% paid out of pocket; chemotherapy and radiotherapy recorded by WHO in 2021 as not generally available; and no trial in OnCo's records with a site in the country.",
  lede:
    "The Comoros introduced HPV vaccination for girls aged 9 to 14 in November 2025 and has a national policy on non-communicable diseases for 2020 to 2029, which counts cancers among them. WHO's 2021 profile recorded no population-based cancer registry. IARC's figures for the country, 576 new cancers and 349 deaths in 2024, are modelled from neighbouring countries' rates and are not counts, and the same WHO profile recorded chemotherapy and radiotherapy as not generally available.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for the Comoros is 576 new cancers and 349 deaths, an age-standardised incidence of 87.3 per 100,000 (81.6 in men, 94.7 in women). These are modelled figures, not counts. The fact sheet's data source and methods box names no country-specific source for incidence and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\" (IARC's method code 5); for mortality it gives \"National incidence estimates applied to model-based M:I ratios (registry survival data)\" (code 3c). WHO's 2020 profile said of the earlier estimates it printed, for 2018, that the incidence estimates have a high degree of uncertainty because they are not based on a population-based cancer registry, and the mortality estimates because they are not based on any national NCD mortality data. Read these numbers as a rough scale.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer is estimated to look like in the Comoros",
      aside: L.iarc,
      cards: [
        {
          id: "shape",
          title: "576 new cancers a year by IARC's estimate, cervical cancer first",
          plain:
            "IARC estimates 576 new cancers in the Comoros in 2024, 321 in women and 255 in men, and 349 cancer deaths. Cervical cancer is estimated to be the commonest cancer and the commonest cause of cancer death. By new cases it is followed by Kaposi sarcoma, cancer of the oesophagus, prostate cancer and breast cancer. These are modelled figures built from neighbouring countries' rates, not counts.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 121 cervical cancers (70 deaths), 73 cases of Kaposi sarcoma (24 deaths), 60 oesophageal cancers (56 deaths), 58 prostate cancers (35 deaths), 50 breast cancers (23 deaths) and 35 liver cancers (35 deaths). The age-standardised incidence is 87.3 per 100,000 and the age-standardised mortality 55.7. The risk of developing a cancer before age 75 is 9.3%, and an estimated 1,003 people are living within five years of a diagnosis. WHO's 2020 profile estimated 47 cancers a year in children aged 0 to 14. With numbers this small and a model behind them, the order of the cancers is more reliable than any single count.",
          links: [L.iarc, L.profile],
        },
        {
          id: "no-registry",
          title: "No population-based cancer registry in WHO's 2021 profile; one retrospective series from 1995 to 2008",
          plain:
            "WHO's 2021 cervical cancer profile answers \"No\" to whether a population-based cancer registry exists in the Comoros, and the African Cancer Registry Network's member list names none. The country's own published count that OnCo found is a retrospective series in a 2013 ministry draft: 495 cancers seen from 1995 to 2008, nearly half of them gynaecological.",
          detail:
            "WHO's 2020 profile recorded \"No information\" on a population-based registry for 2019 and \"No coverage\" for mortality registration in 2007 to 2016. The Ministry of Health's draft strategy against non-communicable diseases, dated March 2013, describes a retrospective study covering 1995 to 2008: of 495 cases, 208 (42%) were confirmed by pathology carried out abroad and the rest rested on strong clinical or imaging suspicion; 228 were gynaecological, 75 digestive and 64 urological; and among the gynaecological cancers cervical cancer came first (46.5%), then breast (28%) and uterus (17.5%). The draft does not say where the cases were seen or who carried out the study. The 2020 to 2029 policy says registers for specific non-communicable diseases are to be set up; OnCo found no report that a cancer register has started.",
          links: [L.cervical, L.profile, L.strategy, L.policy, { label: "African Cancer Registry Network: member registries", url: AFCRN_LIST }],
        },
      ],
      tables: [
        {
          id: "km-globocan-sites",
          title: "The five commonest cancers in the Comoros, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024, modelled from neighbouring countries' rates.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Cervix uteri", cases: 121, deaths: 70 },
            { site: "Kaposi sarcoma", cases: 73, deaths: 24 },
            { site: "Oesophagus", cases: 60, deaths: 56 },
            { site: "Prostate", cases: 58, deaths: 35 },
            { site: "Breast", cases: 50, deaths: 23 },
          ],
          note: "These are estimates, not registry counts: the fact sheet names no Comorian source for incidence and gives the method as rates from neighbouring countries. Liver cancer, sixth by cases with 35, is level with prostate cancer as the third commonest cause of cancer death with 35.",
          sources: [L.iarc],
        },
        {
          id: "km-series-1995-2008",
          title: "Cancers in the ministry's retrospective series, 1995 to 2008",
          caption: "Cases by site over fourteen years, as tabulated in the Ministry of Health's draft strategy of March 2013. Confirmed means confirmed by pathology, which was done abroad.",
          columns: [
            { key: "site", label: "Site" },
            { key: "cases", label: "Cases", numeric: true },
            { key: "confirmed", label: "Confirmed", numeric: true },
          ],
          rows: [
            { site: "Gynaecological", cases: 228, confirmed: 82 },
            { site: "Digestive", cases: 75, confirmed: 49 },
            { site: "Urological", cases: 64, confirmed: 35 },
            { site: "Haematological", cases: 36, confirmed: 8 },
            { site: "Lung and pleura", cases: 20, confirmed: 10 },
            { site: "All sites", cases: 495, confirmed: 208 },
          ],
          note: "A count of patients seen, not a population registry, and it ends in 2008. The draft groups breast cancer with the gynaecological cancers. Six smaller groups in the draft's table (ear, nose and throat 18, brain 15, mouth and teeth 14, skin 11, bone 10, other 4) are left out of the rows here and included in the total.",
          sources: [L.strategy],
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
          title: "About USD 102 a person on health in 2023, more than half of it out of pocket",
          plain:
            "The Comoros spent about 102 US dollars a person on health in 2023, according to WHO's health expenditure database, and households paid 56.6% of it out of pocket. A general health insurance scheme, the Assurance Maladie Généralisée, began a pilot phase in 2025. OnCo found no source on what it covers for cancer.",
          detail:
            "WHO's Global Health Expenditure rows give current health spending of USD 100.50 per person in 2021, 124.14 in 2022 and 102.23 in 2023, and out-of-pocket spending of 55.6%, 43.5% and 56.6% of current health spending in those years. In 2023 domestic government spending was 12.9% of the total and external funding 26.8%; in 2022 external funding was 43.3%, the year the out-of-pocket share dipped. WHO Comoros's report for 2025 says the pilot phase of the insurance scheme was launched in 7 of the 17 health districts and that 33,467 households had been pre-enrolled by the end of 2025; it adds that the scheme was first supported by external financing, which raises questions about how it will last. None of these sources says whether cancer treatment, or treatment abroad, is covered, so a family should ask the scheme or the treating hospital directly.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Comoros (data API)", url: GHO_OOP },
            { label: "WHO Global Health Expenditure Database: current health expenditure per person in US$, Comoros (data API)", url: GHO_CHE },
            { label: "WHO Global Health Expenditure Database: domestic government share, Comoros (data API)", url: GHO_GOV },
            { label: "WHO Global Health Expenditure Database: external share, Comoros (data API)", url: GHO_EXT },
            L.report2025,
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
          id: "anamev",
          title: "A national medicines agency, known to OnCo from WHO's reports and not from its own pages",
          plain:
            "WHO's Comoros office names the Agence Nationale du Médicament et des Evacuations Sanitaires (ANAMEV) as part of the Ministry of Health, and a separate public body, OCOPHARMA, buys and distributes medicines. OnCo found no site for the agency and no text of its rules, so this page says nothing about how a cancer medicine is authorised.",
          detail:
            "WHO Comoros's 2024 report says 95 pharmacovigilance focal points were trained across the three islands, with two Ministry of Health experts from ANAMEV among the trainers; its 2025 report says seven staff of ANAMEV and OCOPHARMA were trained on the essential medicines list, that a national list of essential medicines for 2025 was drawn up, validated and published, and that a national pharmacovigilance system is being set up with WHO's collaborating centre in Rabat. The 2020 to 2029 policy says OCOPHARMA was created in 2017 to supply, store and distribute health products. WHO's August 2026 list of regulators at maturity level 3 or 4 does not include the Comoros. The African Union's list dated 19 September 2023 shows the Comoros signed the African Medicines Agency treaty on 2 February 2022, with no ratification recorded by then. The agency's name also covers medical evacuations; OnCo found no text on how an evacuation for cancer is decided or paid for, and a future pass should look for the agency's founding decree and the 2025 medicines list.",
          links: [
            L.report2024,
            L.report2025,
            L.policy,
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
      aside: L.cervical,
      cards: [
        {
          id: "hpv-2025",
          title: "HPV vaccination began in November 2025 and reached about a quarter of its target",
          plain:
            "The Comoros introduced the HPV vaccine in November 2025 with a campaign for girls aged 9 to 14 on Ngazidja, Mwali and Ndzuani. WHO's immunisation database records first-dose programme coverage among girls of 26% for 2025.",
          detail:
            "WHO Comoros's 2025 report says 15,763 girls aged 9 to 14 were vaccinated out of a target of 61,665, an initial coverage of 25.6%. UNICEF, writing on 10 December 2025, puts the campaign on 26 to 28 November in schools and communities and gives 15,727 girls; WHO's immunisation rows for 2025 give 15,803 doses against a target of 60,103, which is 26%, and mark the programme as nationwide with a one-dose schedule. The three counts differ by a few dozen and OnCo reports each with its source. UNICEF says the vaccine will be brought into routine vaccination step by step, and that before the campaign religious leaders were trained to promote the vaccination and clear up misunderstandings, and members of the Association comorienne contre le cancer chez les femmes were trained to pass on reliable information in their communities. The same WHO rows show hepatitis B vaccine in the schedule since 2003 and no birth dose through 2025.",
          links: [
            L.report2025,
            L.unicef,
            { label: "WHO immunisation data: HPV programme coverage rows, Comoros (data API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: vaccine introduction rows, Comoros (data API)", url: WHO_INTRO_API },
          ],
        },
        {
          id: "screening-2021",
          title: "No national cervical screening programme in WHO's 2021 profile",
          plain:
            "WHO's 2021 cervical cancer profile recorded no national screening programme for cervical cancer in the Comoros and estimated that 1 in 10 women aged 30 to 49 had been screened in the previous five years. WHO's country office reports an Octobre Rose breast cancer awareness campaign in 2025.",
          detail:
            "The 2021 profile also answers \"No\" on a programme or guidelines for early detection of first symptoms in primary care, on a defined referral system from primary to secondary and tertiary care, and on national guidelines for managing cervical cancer; its screening estimate is for 2019. WHO's 2020 profile recorded early detection programmes or guidelines for 0 of the 4 cancers it asks about (breast, cervix, colon, childhood) and answered \"don't know\" on cervical and breast screening. WHO Comoros's 2025 report says the Octobre Rose breast cancer campaign and World Diabetes Day raised awareness and encouraged early detection, without giving numbers screened. OnCo found no source on where a woman can be screened today; the health district or the national hospital, El-Maarouf, is the place to ask.",
          links: [L.cervical, L.profile, L.report2025],
        },
      ],
    },
    {
      id: "doing",
      nav: "What stands out",
      title: "What stands out in the Comoros",
      cards: [
        {
          id: "ncd-policy",
          title: "A policy on non-communicable diseases for 2020 to 2029, and no cancer plan on the ICCP portal",
          plain:
            "The Ministry of Health's national policy on non-communicable diseases for 2020 to 2029 lists cancers among the diseases it covers. It sets directions, not cancer services, and WHO's Comoros office wrote in its 2025 report that the country does not yet have a strategy to carry it out.",
          detail:
            "The minister's preface calls it the country's first national policy document on these diseases; it was written with WHO support and the French organisation Santé Diabète. It promises screening for early disease, palliative care, registers for specific diseases, and medicines through OCOPHARMA; OnCo found no cancer-specific target or budget in it. An earlier draft strategy, dated March 2013, which gives its own period as 2013 to 2015 and is listed by the ICCP portal as 2012 to 2015, aimed to reduce cervical and liver cancer and to make preventive and curative care for them available. The ICCP portal's listing for the Comoros, read on 16 November 2026, held five documents: these two and WHO's profiles of 2014, 2020 and 2021. It held no national cancer control plan. WHO's 2020 profile answered \"don't know\" for 2019 on a cancer plan and on cancer management guidelines. A survey of risk factors was carried out in 2025 with WHO support and its results had not been published when the 2025 report was written.",
          links: [L.policy, L.report2025, L.strategy, L.iccp, L.profile],
        },
        {
          id: "care-abroad",
          title: "Treatment recorded as not generally available in 2021, and a history of care abroad",
          plain:
            "WHO's 2021 cervical cancer profile recorded a cancer centre or cancer department at tertiary level in the Comoros, and recorded pathology, cancer surgery, chemotherapy and radiotherapy as not generally available. The ministry's 2013 draft strategy said patients had to resort to costly medical evacuations abroad.",
          detail:
            "WHO's 2020 profile gives 0.0 external beam radiotherapy machines per 10,000 cancer patients for 2019, records pathology services as generally not available that year and gives 1 as the number of treatment services among surgery, radiotherapy and chemotherapy, without saying which; and the IAEA's public directory of radiotherapy centres has no entry for the Comoros in its country table, read on 16 November 2026; that is what the directory lists, not proof of what exists. The 2021 profile recorded palliative care as generally available in primary care and not in community or home-based care. The 2013 draft says the country had few material and human means for cancer and that pathology for the 1995 to 2008 series was done abroad. A 2021 article by the head of paediatric oncology at the university hospital in Saint-Denis, La Réunion, says the service receives many foreign children, in particular from the Comoros archipelago, often diagnosed late, and that a Comorian doctor on each island is identified to follow children who return; the author adds that local conditions make it probable that most children returning to the Comoros are not followed. OnCo found no current source on where adults are referred, so the national hospital, El-Maarouf, or WHO's country office is the place to ask.",
          links: [
            L.cervical,
            L.profile,
            L.strategy,
            { label: "Réguerre Y: paediatric oncology in the Indian Ocean, Cancer Control Francophone 2021 (PDF, in French)", url: REUNION_2021 },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Comoros", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in the Comoros",
          plain:
            "None of the trials in OnCo's records lists the Comoros among its countries, and OnCo holds no hospital, company or person there. OnCo holds a selection of trials, not the whole registry, so ClinicalTrials.gov itself is the place to search.",
          detail:
            "Counted from OnCo's own graph on 16 November 2026: no trial record lists the Comoros. A query of ClinicalTrials.gov's data interface the same day for cancer studies with a location in the Comoros returned a total of 0. A Europe PMC search for papers with Comoros, Comores or Comoro in the title and a cancer term returned six, none of which, by its title, describes cancer patients or cancer services in the Union of the Comoros. The policy for 2020 to 2029 says health research is little developed and that a national ethics committee for life and health sciences was set up in 2014. A future pass should search French-language journals and theses for the 1995 to 2008 series.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Comoros", url: CTGOV },
            { label: "ClinicalTrials.gov: the same query through the data interface (total 0)", url: CTGOV_API },
            { label: "Europe PMC: title search for Comoros and cancer (data interface)", url: EPMC_SEARCH },
            L.policy,
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not found, not readable or blocked",
      plain:
        "OnCo did not find a national cancer plan, a cancer registry report, the medicines agency's own rules, the 2025 essential medicines list, or any current account of where cancer is treated in the Comoros or abroad. It describes none of these from memory.",
      detail:
        "The Ministry of Health's site (sante.gouv.km) failed its security certificate check on 16 November 2026 and was not read. No site was found for the medicines agency. The IAEA's website (iaea.org) returned HTTP 403 to OnCo's requests, so anything the IAEA has published on cancer services in the Comoros is unread here, and its public radiotherapy directory has no row for the country. In WHO's 2020 profile the rows on pathology, opioid availability and the number of treatment services, which the first reading could not match to their values, were matched by their position on the page on 17 November 2026: pathology services generally not available (2019), 1 treatment service among surgery, radiotherapy and chemotherapy (2019), and opioids for pain management at 4 defined daily doses per million inhabitants per day (2015 to 2017). Nothing was found on what the insurance pilot covers for cancer, on costs to patients, or on adult referral routes to Madagascar, Mauritius, Tanzania, Mayotte or La Réunion. A future pass should read the ministry's site once it answers, the 2025 medicines list, the results of the 2025 risk factor survey, and IAEA documents; a reader can ask WHO's country office or the national hospital, El-Maarouf.",
      links: [
        { label: "Ministry of Health, Union of the Comoros (certificate check failed on 16 November 2026)", url: MOH },
        L.iccp,
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: DIRAC },
        { label: "WHO Regional Office for Africa: Comoros", url: "https://www.afro.who.int/countries/comoros" },
      ],
    },
  ],
  institutions: ["who", "iarc", "iaea"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from public sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 and 2021 country profiles, WHO's health expenditure and immunisation rows, the Ministry of Health's policy on non-communicable diseases for 2020 to 2029 and its 2013 draft strategy as posted on the ICCP portal, WHO Comoros's annual reports for 2024 and 2025, UNICEF Comoros's account of the HPV campaign, and one French article from La Réunion. The national documents are in French and were read in French. The ministry's own site could not be read.",
  verify:
    "The cancer figures on this page are modelled estimates, the service answers are WHO survey rows from 2019 to 2021, and the account of care abroad rests on documents from 2013 and 2021. Anyone seeking care should ask the treating hospital, the Ministry of Health or WHO's country office what is available now.",
  verifyLinks: [L.iarc, L.cervical, L.profile, L.report2025],
};

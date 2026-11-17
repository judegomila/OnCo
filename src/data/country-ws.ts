import type { CountryDive } from "@/data/country-dive";

/**
 * Samoa deep dive: the hand-written cards for /countries/ws/ (wave 16). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Samoa (PDF text); the
 * Ministry of Health's National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF text, master copy dated
 * 12 September 2024), its Overseas Medical Treatment Revised Policy 2023 (PDF text) and its National Medicines Policy
 * and Plan of Action FY2023/24 to FY2027/28 (PDF text); WHO's cancer country profile 2020 and cervical cancer country
 * profile 2021 (PDF text); WHO's vaccine introduction, HPV coverage and Global Health Expenditure Database rows from
 * its public data APIs; IAEA DIRAC's public equipment data; the Pasifika Medical Association Group's page for the New
 * Zealand Medical Treatment Scheme; the full text of Sarfati et al. 2019 through PubMed Central; and the other papers'
 * abstracts through Europe PMC. Where a figure could not be read it is named under `gaps`.
 *
 * Second accuracy pass, 16 November 2026: every source above was fetched again and re-read as raw text. DIRAC's
 * equipment grid (8,627 rows, 157 countries) has no row for Samoa. The Ministry's publications page was read for the
 * first time: its latest annual report is for 2023-2024, and it carries the Pharmacy Act 2007, which was read. UICC's
 * member page for the Samoa Cancer Society and the Pacific Islands Legal Information Institute both refused an
 * automated request, so what rests on them is labelled as not re-verified.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/882-samoa-fact-sheet.pdf";
const CANCER_POLICY = "https://www.health.gov.ws/wp-content/uploads/2025/02/NATIONAL-CANCER-POLICY-AND-ACTION-PLAN-MASTER-COPY-12.09.2024.pdf";
const OVT_POLICY = "https://www.health.gov.ws/wp-content/uploads/2024/06/OVT-Revised-Policy-2023-ENDORSED-COPY-BY-NPCC-28-08-2023.pdf";
const MEDICINES_POLICY = "https://www.health.gov.ws/wp-content/uploads/2024/06/FINAL-NATIONAL-MEDICINES-POLICY-PLAN-OF-ACTION_MASTER-COPY.pdf";
const MOH = "https://www.health.gov.ws/";
const MOH_PUBLICATIONS = "https://www.health.gov.ws/acts-regulations/";
const PHARMACY_ACT = "https://www.health.gov.ws/wp-content/uploads/2022/07/13Pharmacy_Act_2007-_Eng.pdf";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/wsm-2020.pdf";
const WHO_CERVICAL_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-wsm-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'WSM'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'WSM'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'WSM'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'WSM'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'WSM'";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'WSM'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const NZMTS = "https://pmagroup.org.nz/medical-treatment-scheme";
const CTGOV = "https://clinicaltrials.gov/search?country=Samoa&cond=cancer";
const AMOSA_2021 = "https://doi.org/10.1177/1010539520975261";
const SOFIJA_2023 = "https://doi.org/10.1093/heapro/daac021";
const CUESTA_2021 = "https://doi.org/10.1177/10105395211019857";
const SARFATI_2019 = "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746436/";

export const WS_DIVE: CountryDive = {
  iso2: "WS",
  iso3: "WSM",
  name: "Samoa",
  flag: "🇼🇸",
  asOf: "2026-11-16",
  title: "Cancer in Samoa",
  description:
    "Cancer in Samoa from its own and WHO sources: IARC's estimate of 317 new cancers and 139 deaths in 2024, based on neighbouring countries' data; 149 cancers confirmed by the national hospital laboratory in 2023; a National Cancer Policy for 2024/25 to 2028/29; no radiotherapy and no intravenous chemotherapy for adults in the country; and two overseas treatment schemes, funded by Samoa and by New Zealand.",
  lede:
    "Samoa's National Cancer Policy says plainly what the country can and cannot yet do: surgeons in Apia operate on cancer, but no intravenous cancer treatment is given to adults and there is no radiation therapy, so most treatment beyond surgery means a referral overseas under a scheme funded by the Samoan or the New Zealand government. IARC estimates 317 new cancers and 139 deaths in 2024, a figure built from neighbouring countries' data.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Samoa is 317 new cancers and 139 deaths, an age-standardised incidence of 168.8 per 100,000 (157.5 in men, 182.0 in women) and mortality of 74.2. The fact sheet names no country-specific incidence source and gives the method as \"Rates based on incidence estimates or registry data from neighbouring countries\": the incidence is not built from Samoan diagnoses. For mortality the data source is \"No data\" and the method \"National incidence estimates applied to model-based M:I ratios (neighbouring country registry data)\", so the deaths are in turn derived from that incidence estimate. Samoa's own hospital laboratory confirmed 149 cancers in 2023, which the National Cancer Policy says is only a minority of the cases in the country. The fact sheet's totals with and without non-melanoma skin cancer are the same.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Samoa",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Samoa (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 320 new cancers a year in IARC's estimate, with breast and lung cancer the commonest",
          plain:
            "IARC estimates 317 new cancers in Samoa in 2024, 144 in men and 173 in women, and 139 cancer deaths. Breast cancer is the commonest overall, lung cancer second and prostate cancer third. The estimate is built from neighbouring countries' data, not from Samoan diagnoses.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 71 breast cancers (24 deaths), 44 lung cancers (39 deaths), 33 prostate cancers (10 deaths), 31 colorectal cancers (9 deaths), 22 thyroid cancers and 14 each of liver, uterine and non-Hodgkin lymphoma. In men the leading cancers are prostate (33, 22.9%), lung (26) and colorectum (18); in women, breast (71, 41.0%), then lung and thyroid (18 each). By deaths the order is lung, breast, then stomach. The risk of developing cancer before 75 is 18.5%, and of dying of it 8.3%. With numbers this small, a few cases change a ranking.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Samoa (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "hospital-registry",
          title: "A registry kept in the hospital laboratory confirmed 149 cancers in 2023",
          plain:
            "Samoa's cancer registry is held at Tupua Tamasese Meaole Hospital in Apia, kept by the laboratory in a spreadsheet. It counted 149 cancers confirmed under the microscope in 2023. The Ministry of Health says the real number of cancers is significantly higher.",
          detail:
            "The National Cancer Policy says the registry gives an estimate of the common cancers, that the 2023 figures \"represent only a minority of cancer cases in the country\", and that the laboratory cannot do the immunohistochemistry needed to trace cancers of unknown origin. Over 2017 to 2023 an average of 100 women and 45 men a year had a confirmed cancer. The policy's ninth priority is a dedicated cancer registry recording type, stage, treatment and outcome, to be fully working by 2028/29. An earlier survey of all confirmed cancers from 2007 to 2016 found incidence rising from 28.5 per 100,000 in 2007 to 67.1 in 2012, then between 50 and 65 to 2016. Samoa is among the countries covered by IARC's Pacific Islands hub for cancer registration.",
          links: [
            { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
            { label: "Amosa-Lei Sam et al., cancer incidence in Samoa 2007 to 2016 (Asia Pac J Public Health 2021)", url: AMOSA_2021 },
            { label: "IARC Global Initiative for Cancer Registry Development: Pacific Islands hub", url: "https://gicr.iarc.who.int/hub/pacific-islands/" },
          ],
        },
      ],
      tables: [
        {
          id: "ws-top",
          title: "IARC's leading cancers for Samoa, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 71, deaths: 24 },
            { site: "Lung", cases: 44, deaths: 39 },
            { site: "Prostate", cases: 33, deaths: 10 },
            { site: "Colorectum", cases: 31, deaths: 9 },
            { site: "Thyroid", cases: 22, deaths: 0 },
            { site: "Liver", cases: 14, deaths: 11 },
            { site: "Corpus uteri", cases: 14, deaths: 0 },
            { site: "Non-Hodgkin lymphoma", cases: 14, deaths: 4 },
            { site: "Stomach", cases: 12, deaths: 12 },
            { site: "All cancers", cases: 317, deaths: 139 },
          ],
          note: "IARC bases Samoa's incidence on estimates or registry data from neighbouring countries, and derives deaths from that incidence, so a zero here is a product of the model and not a count of no deaths.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Samoa (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "ws-laboratory",
          title: "Cancers confirmed by the hospital laboratory, 2023",
          caption: "Cases confirmed by histology or cytology at Tupua Tamasese Meaole Hospital laboratory in 2023, all sexes, from Table 1 of the National Cancer Policy.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Confirmed cases", numeric: true },
            { key: "share", label: "Share of total (%)", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 36, share: 24 },
            { site: "Endometrium", cases: 26, share: 17 },
            { site: "Colon", cases: 13, share: 9 },
            { site: "Stomach", cases: 10, share: 7 },
            { site: "Skin", cases: 10, share: 7 },
            { site: "Cervix", cases: 8, share: 5 },
            { site: "Thyroid", cases: 7, share: 4 },
            { site: "Prostate", cases: 6, share: 4 },
            { site: "Throat (pharynx)", cases: 4, share: 3 },
            { site: "Other", cases: 10, share: 7 },
            { site: "Unknown", cases: 19, share: 13 },
            { site: "Total", cases: 149, share: 100 },
          ],
          note: "Only cancers confirmed in the laboratory are counted. A cancer diagnosed on a scan or by examination alone, or never diagnosed, is not here. Lung cancer, which IARC's model puts second, is not named in the table; the policy does not say why.",
          sources: [{ label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29, Table 1 (PDF)", url: CANCER_POLICY }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Ministry of Health: Overseas Medical Treatment Revised Policy 2023 (PDF)", url: OVT_POLICY },
      cards: [
        {
          id: "health-spending",
          title: "Government pays for most health care, and patients about an eighth",
          plain:
            "WHO's figures for 2023 put Samoa's health spending at about US$293 a person. The government paid 69.2% of it, external donors 16.5%, and people paid 13.4% out of their own pockets.",
          detail:
            "The figures are from WHO's Global Health Expenditure Database: current health expenditure per person of US$292.81 in 2023, a domestic government share of 69.2%, an external share of 16.5% and an out-of-pocket share of 13.4%, which has stayed between 12% and 14% since 2020. The National Cancer Policy costs its own action plan item by item, for example 100,000 tala for the cancer registry. OnCo did not find a Ministry document setting out what a patient is charged for cancer surgery or medicines in a public hospital; the hospital is the place to ask.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Samoa (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: external share (API)", url: WHO_EXT_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
            { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
          ],
        },
        {
          id: "overseas-schemes",
          title: "Two overseas treatment schemes, which usually leave airfares, visas and accommodation to the family",
          plain:
            "Two schemes pay for Samoans to be treated overseas, one funded by the Samoan government and one by New Zealand. In 2022/23 they referred 50 people with cancer. The National Cancer Policy says patients and their families must still pay for airfares, visas and accommodation; the overseas treatment policy lists some exceptions.",
          detail:
            "The National Cancer Policy says patients with treatable disease qualify under the clinical guidelines, so a cancer must be found early enough for treatment to be curative or to add significantly to quality of life. It counts 13 oncology patients referred in 2020/21 at a cost of NZD 294,097, 25 in 2021/22 at NZD 1,315,044 and 50 in 2022/23 at NZD 1,058,405, and says patients are now also sent to Apollo Hospitals in India. The Ministry's own Overseas Medical Treatment Revised Policy 2023 gives a different cost for 2021/22: its table puts the 25 oncology patients at NZD 1,020,947.55 and gives NZD 1,315,044.88 as the two-year total for 38 patients. The cancer policy calls the uncovered travel costs an element of inequity, and notes that the guidelines are not always followed. The Revised Policy describes referral as mainly to New Zealand and sets out who pays for what: under the Samoan scheme, fare and accommodation are covered for patients referred to India, with the family paying about 8,000 tala for a companion's airfare; under the New Zealand scheme, airfare, visa and accommodation can be covered for patients on a low income if approved. The New Zealand scheme is run by the Pasifika Medical Association Group and takes referrals through Samoa's Overseas Treatment Referral Committee.",
          links: [
            { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
            { label: "Ministry of Health: Overseas Medical Treatment Revised Policy 2023 (PDF)", url: OVT_POLICY },
            { label: "Pasifika Medical Association Group: New Zealand Medical Treatment Scheme", url: NZMTS },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Ministry of Health: National Medicines Policy and Plan of Action FY2023/24 to FY2027/28 (PDF)", url: MEDICINES_POLICY },
      cards: [
        {
          id: "quality-assurance-division",
          title: "The Ministry of Health regulates medicines through its Quality Assurance Division",
          plain:
            "The sources OnCo read describe no separate medicines agency in Samoa. The National Medicines Policy says the Ministry of Health is in charge of regulating medicines through its Quality Assurance Division, under laws that include the Drugs Act 1967, the Narcotics Act 1967 and the Poisons Act 1968. It says the essential medicines list holds about 170 medicines; the latest edition it names is that of 2022.",
          detail:
            "The National Medicines Policy for 2023/24 to 2027/28 names five laws as the framework: the Drugs Act 1967, the Narcotics Act 1967, the Ministry of Health Act 2006, the National Health Services Act 2006 and the Poisons Act 1968, and elsewhere adds the Pharmacy Act 2007. Its own review says the legal framework is old, that medicine supply and regulation are not fully separated, and that the review of products for registration does not clearly cover quality, safety and efficacy. Samoa takes part in the Pacific Medicines Testing Program led by Australia's Therapeutic Goods Administration, which tests five products a year for each island country at no charge. The policy also says that no system for evaluating, registering or listing products exists at the moment, and that Samoa depends on reliance on Australia and New Zealand when it imports medicines and selects them for purchase; it does not set out how that reliance works.",
          links: [
            { label: "Ministry of Health: National Medicines Policy and Plan of Action FY2023/24 to FY2027/28 (PDF)", url: MEDICINES_POLICY },
            { label: "Ministry of Health, Samoa", url: MOH },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer country profile 2021, Samoa (PDF)", url: WHO_CERVICAL_2021 },
      cards: [
        {
          id: "hpv-vaccine",
          title: "HPV vaccination since 2022, reaching 87% of the girls targeted in 2025",
          plain:
            "Samoa added the HPV vaccine to its national immunisation programme in 2022. WHO's rows for 2025 give 87% coverage: 2,260 doses for a target of 2,601 girls. Samoa reports the same figure for the first and the last dose.",
          detail:
            "WHO's vaccine introduction rows record nationwide HPV vaccination from 2022. Its introduction rows give the schedule as one dose, which is why the first and last dose figures match. Its coverage rows give 67% in 2022, when the target was 12,952 girls, then 85% in 2023, 84% in 2024 and 87% in 2025, with the target population varying between about 2,500 and 7,800 from year to year. WHO's 2021 cervical cancer profile, written before the introduction, records no HPV vaccination programme. The National Cancer Policy lists keeping up HPV and hepatitis B vaccination among its prevention actions and adopts the WHO target of 90% of girls fully vaccinated by the age of 15.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Samoa (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Samoa (API)", url: WHO_INTRO_API },
            { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
          ],
        },
        {
          id: "no-programme",
          title: "No national screening programme yet; an HPV screen-and-treat pilot is planned",
          plain:
            "The National Cancer Policy says Samoa has no consistent national screening programme and that screening happens opportunistically. It plans a cervical screening programme based on HPV testing with treatment of pre-cancer, starting as a pilot, as part of a single women's health check.",
          detail:
            "The policy says the \"Pinktober\" campaign for breast and other cancers does not run all year and that there is no evidence it has increased screening. It sets out a pilot HPV screen-and-treat programme with point-of-care testing, to be combined with breast examination, blood pressure, body mass index and glucose checks in one visit, and leaves mammography and Pap smear programmes to be considered as the health system strengthens; the hospital has one analogue mammography unit. WHO's 2021 profile records no national cervical screening programme and estimates that 29% of women aged 30 to 49 had been screened in the previous five years and 36% ever. WHO's 2020 profile also records no breast screening programme.",
          links: [
            { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
            { label: "WHO: cervical cancer country profile 2021, Samoa (PDF)", url: WHO_CERVICAL_2021 },
            { label: "WHO: cancer country profile 2020, Samoa (PDF)", url: WHO_PROFILE_2020 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Treatment in Samoa and overseas",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "No radiotherapy, and no intravenous chemotherapy for adults",
          plain:
            "The National Cancer Policy states that there is no radiation therapy available in Samoa and that no intravenous cancer treatment is currently given to adults. IAEA's radiotherapy directory lists no centre in Samoa. Cancer surgery is done in Apia, and some hormone tablets are available.",
          detail:
            "The policy says two general surgeons, two gynaecologists and one oral surgeon carry out cancer operations, including mastectomy, thyroidectomy, bowel resection and hysterectomy. Women with hormone-positive breast cancer can have tamoxifen, the one hormone therapy on the essential medicines list; aromatase inhibitors can be obtained through private clinics; abiraterone and steroids are available for prostate cancer; and methotrexate is listed, though clinicians have not felt able to give it safely, for cases such as gestational choriocarcinoma, without guidelines and support. Tupua Tamasese Meaole Hospital has one pathologist, one full-time radiologist and a 256-slice CT scanner, and cannot do CT-guided or lung biopsies. Treatment beyond this means referral under the overseas schemes described above.",
          links: [
            { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
          ],
        },
        {
          id: "children-and-palliative",
          title: "Children start treatment in Auckland; palliative care is mostly given by families",
          plain:
            "Children with a curable cancer travel to Starship Hospital in Auckland to begin treatment, then return to Samoa for maintenance chemotherapy given by local paediatricians. Samoa has no formal palliative care service: care at home comes mostly from families, with a Samoa Cancer Society nurse visiting some patients.",
          detail:
            "The National Cancer Policy describes a ten-year partnership between the paediatric department in Apia and Starship Hospital. About ten children a year have usually been sent, but none were referred in 2023, when Starship had capacity problems; maintenance chemotherapy is given in a ward treatment room because there is no chemotherapy unit. On palliative care, the policy says the Samoa Cancer Society's nurse delivers basic supplies and dresses wounds, and that the Society estimates it reaches about a third of the patients who need palliative care. A coordinated palliative care service, with guidelines by 2025/26, is the policy's eighth priority.",
          links: [{ label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY }],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Samoa does differently",
      cards: [
        {
          id: "policy-candour",
          title: "A national cancer policy that counts what is missing and costs the plan to fix it",
          plain:
            "Samoa's National Cancer Policy and Action Plan for 2024/25 to 2028/29 treats local services, visiting medical teams and overseas treatment as one system. It sets ten priorities, from health promotion to a cancer centre, and its annex puts a cost in tala against each action, 13,089,500 tala over five years in all.",
          detail:
            "The policy's stated objective includes lessening dependence on expensive overseas treatment by strengthening prevention, early diagnosis and local treatment. Its priorities are health promotion, cancer information campaigns, early detection, screening, local diagnostic services, local treatment services, an equitable and cost-effective overseas treatment programme, palliative care, a cancer registry and a cancer centre to coordinate them. It was written with consultation of 40 organisations and names partners including New Zealand's Polynesian Health Corridors team and the University of Auckland. It says cancer is the second commonest cause of death in Samoa after cardiovascular disease.",
          links: [{ label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY }],
        },
        {
          id: "vave-campaign",
          title: "Vave, a cancer awareness campaign run by the Samoa Cancer Society",
          plain:
            "The Samoa Cancer Society ran a campaign called Vave, meaning quickly, with three messages: notice signs and symptoms quickly, see a doctor quickly, and call the Society quickly. It used mass media, printed material, and visits to churches, villages and schools.",
          detail:
            "An evaluation published in 2023 found the campaign raised awareness of cancer and of early detection, shown by recall of its messages, more enquiries to the Society and better knowledge after outreach sessions. Almost 30% of those surveyed said they were unsure or would not see a doctor about a possible sign of cancer, giving lack of knowledge, lack of trust in hospitals and a preference for traditional healing as reasons; the authors suggest working with traditional healers. A separate interview study of 19 Samoan patients found that lack of follow-up caused significant delays in diagnosis.",
          links: [
            { label: "Sofija et al., the Vave campaign evaluation (Health Promot Int 2023)", url: SOFIJA_2023 },
            { label: "Cuesta-Briand et al., delays in the pathway to cancer diagnosis in Samoa (Asia Pac J Public Health 2021)", url: CUESTA_2021 },
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
          title: "No trial in OnCo's records has a site in Samoa",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Samoa. OnCo holds a selection of trials, not the whole registry, so search the registry itself. The published papers OnCo found are on cancer counts, awareness and delays in diagnosis.",
          detail:
            "The papers behind this page are the ten-year survey of confirmed cancers from 2007 to 2016, led from Tupua Tamasese Meaole Hospital with IARC and the University of Otago as, in the authors' words, a preliminary step to upscale population-based cancer registry initiatives; the 2023 evaluation of the Vave campaign; and the 2021 interview study of patients' routes to diagnosis. A 2019 review of cancer control across the Pacific, with Samoan authors, recorded for mid-2018 that chemotherapy in Samoa was available for children only and that there was no radiotherapy.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Samoa", url: CTGOV },
            { label: "Amosa-Lei Sam et al., cancer incidence in Samoa 2007 to 2016 (Asia Pac J Public Health 2021)", url: AMOSA_2021 },
            { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "true-incidence",
      title: "Samoa's true cancer incidence is not known",
      plain:
        "The laboratory registry counts only cancers confirmed under the microscope, and IARC's estimate is built from neighbouring countries. Neither is a count of everyone diagnosed in Samoa, and OnCo found no survival figure for any cancer.",
      detail:
        "IARC's 317 cases for 2024 is about twice the 149 the laboratory confirmed in 2023, and the Ministry itself says the unrecorded number is significantly higher than its count. The policy plans a registry that records stage, treatment and outcome, and does not say that the present spreadsheet does. WHO's 2020 and 2021 profiles both describe a population-based registry as existing, which sits uneasily with the policy's own description of a laboratory spreadsheet; this page follows the Ministry's account. The cancer registry promised by 2028/29 is what would settle the figures.",
      links: [
        { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
        { label: "WHO: cancer country profile 2020, Samoa (PDF)", url: WHO_PROFILE_2020 },
      ],
    },
    {
      id: "progress-and-fees",
      title: "No progress report on the policy, and patient charges were not found",
      plain:
        "The National Cancer Policy runs from 2024/25. OnCo found no published report on what has been done so far, including whether the HPV screen-and-treat pilot has started, and no Ministry document on what patients pay in public hospitals.",
      detail:
        "The policy's indicators are to be reported in the Ministry's annual reports and at a mid-term review. On 16 November 2026 the latest annual report on the Ministry's publications page was the one for 2023-2024, the year before the policy starts, so it cannot report on it; OnCo did not read it. The Ministry's home page carried no item on cancer that day. The Samoa Cancer Society's own website could not be reached when OnCo's record of it was written on 11 November 2026 and was not tried again. The Society's National Cancer Resource Centre in Apia and the Ministry are the places to ask what is running now; the Centre is named on UICC's member page for the Society, which refused an automated request on 16 November 2026, so it was not re-verified.",
      links: [
        { label: "Ministry of Health, Samoa", url: MOH },
        { label: "Ministry of Health: publications page, with its annual reports", url: MOH_PUBLICATIONS },
        { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
      ],
    },
    {
      id: "medicines-law",
      title: "The Drugs Act and the essential medicines list were not read",
      plain:
        "OnCo read the National Medicines Policy and the Pharmacy Act 2007, but not the Drugs Act 1967 or the Essential Medicines List 2022 themselves. Which cancer medicines are on the list, beyond those the cancer policy names, is not on this page.",
      detail:
        "The cancer policy names tamoxifen and methotrexate as listed, and abiraterone as available. The Pharmacy Act 2007 is on the Ministry's publications page. Its long title describes it as an Act for \"a reformed Pharmacists Council\" and \"the professional administration of the pharmacy profession in Samoa\", and its parts cover the registration and discipline of pharmacists; it is about the profession, not about how a medicine is approved. OnCo did not find the Drugs Act 1967 or the Essential Medicines List 2022 on that page on 16 November 2026. The Pacific Islands Legal Information Institute, which publishes Pacific legislation, refused an automated request the same day, so the Drugs Act was not retrieved. The National Medicines Policy says the 2022 list was drawn up by an ad hoc committee and that the national medicines and therapeutics committee did not appear to be functioning. The Ministry's pharmacy service can say what is stocked.",
      links: [
        { label: "Ministry of Health: National Medicines Policy and Plan of Action FY2023/24 to FY2027/28 (PDF)", url: MEDICINES_POLICY },
        { label: "Ministry of Health: Pharmacy Act 2007 (PDF)", url: PHARMACY_ACT },
        { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
      ],
    },
  ],
  institutions: ["samoa-ministry-of-health", "tupua-tamasese-meaole-hospital", "samoa-cancer-society", "iaea", "who", "iarc"],
  companies: [],
  drugs: ["tamoxifen", "abiraterone", "methotrexate"],
  trials: [],
  papers: [
    "paper-amosa-lei-sam-cancer-incidence-samoa-apjph-2021", "paper-sofija-vave-campaign-samoa-hpi-2023", "paper-cuesta-briand-diagnosis-delays-samoa-apjph-2021",
  ],
  people: [],
  how:
    "Every card was written from Samoa's own policies and from international agencies, read in full rather than through a summary: the Ministry of Health's National Cancer Policy and Action Plan FY2024/25 to FY2028/29, its Overseas Medical Treatment Revised Policy 2023 and its National Medicines Policy and Plan of Action FY2023/24 to FY2027/28; WHO's 2020 cancer profile, its 2021 cervical cancer profile, and its vaccine and health expenditure rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet; the Pasifika Medical Association Group's page for the New Zealand Medical Treatment Scheme; and the papers through Europe PMC and PubMed Central. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry and three papers) carry their own sources.",
  verify:
    "National incidence figures for Samoa are modelled from neighbouring countries, and the hospital's own count covers only laboratory-confirmed cancers. Who qualifies for overseas treatment, where patients are sent and what the schemes pay for are decided case by case and change with the budget; ask your doctor at Tupua Tamasese Meaole Hospital, the Ministry of Health or the Samoa Cancer Society what applies to you.",
  verifyLinks: [
    { label: "Ministry of Health, Samoa", url: MOH },
    { label: "National Cancer Policy and Action Plan (PDF)", url: CANCER_POLICY },
    { label: "Overseas Medical Treatment Revised Policy 2023 (PDF)", url: OVT_POLICY },
    { label: "National Medicines Policy (PDF)", url: MEDICINES_POLICY },
  ],
};

import type { CountryDive } from "@/data/country-dive";

/**
 * Fiji deep dive: the hand-written cards for /countries/fj/ (wave 16). Every figure was read from the raw text of its
 * source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Fiji (PDF text); the
 * Ministry of Health and Medical Services' cancer page, its overseas medical treatment page, its Fiji Pharmaceutical
 * and Biomedical Services Centre page and its Fiji Medicines Regulatory Authority page (HTML text); the summary of the
 * imPACT Review of February 2023 by the IAEA, WHO and IARC (PDF text, dated November 2023); WHO's cervical cancer
 * country profile 2021 (PDF text); WHO's vaccine introduction, HPV coverage and Global Health Expenditure Database
 * rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's page for its Pacific Islands hub for
 * cancer registration; the full text of Naidu et al. 2025 through Europe PMC and of Sarfati et al. 2019 through PubMed
 * Central; and the other papers' abstracts through Europe PMC. Where a figure could not be read it is named under
 * `gaps`. WHO's 2020 cancer country profile for Fiji was not at the address first tried (404); the second accuracy
 * pass on 16 November 2026 found it under another file name and read it (PDF text).
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/242-fiji-fact-sheet.pdf";
const MOH_CANCER = "https://www.health.gov.fj/cancer/";
const MOH_OVERSEAS = "https://www.health.gov.fj/overseas-medical-treatment/";
const FPBS = "https://www.health.gov.fj/fiji-pharmaceutical-biomedical-services-centre-fpbs/";
const FIJI_MRA = "https://www.health.gov.fj/fiji-mra/";
const IMPACT_2023 = "https://www.iaea.org/sites/default/files/documents/review-missions/impact-review-fiji-feb2023.pdf";
const WHO_CANCER_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-fji-2020.pdf";
const WHO_CERVICAL_2021 = "https://cdn.who.int/media/docs/default-source/country-profiles/cervical-cancer/cervical-cancer-fji-2021-country-profile-en.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'FJI'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'FJI'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'FJI'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'FJI'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'FJI'";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'FJI'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const GICR_PACIFIC = "https://gicr.iarc.who.int/hub/pacific-islands/";
const NZMTS = "https://pmagroup.org.nz/medical-treatment-scheme";
const CTGOV = "https://clinicaltrials.gov/search?country=Fiji&cond=cancer";
const NAIDU_2025 = "https://doi.org/10.1177/10105395241306488";
const REYBURN_2023 = "https://doi.org/10.1016/j.lanwpc.2023.100798";
const KIM_2017 = "https://doi.org/10.1016/j.canep.2017.02.008";
const KUNATOGA_2024 = "https://doi.org/10.1016/j.heliyon.2024.e30220";
const SARFATI_2019 = "https://pmc.ncbi.nlm.nih.gov/articles/PMC7746436/";

export const FJ_DIVE: CountryDive = {
  iso2: "FJ",
  iso3: "FJI",
  name: "Fiji",
  flag: "🇫🇯",
  asOf: "2026-11-16",
  title: "Cancer in Fiji",
  description:
    "Cancer in Fiji from its own and international sources: IARC's estimate of 1,731 new cancers and 843 deaths in 2024, modelled from national mortality; 12,433 cases recorded by the Ministry of Health from 2010 to 2018; care paid from general taxes; a medicines regulator under the Medicinal Products Act 2011; HPV vaccination since 2013; and no radiotherapy in the country, so patients who need it are referred overseas.",
  lede:
    "Fiji treats cancer with surgery and limited chemotherapy in its three divisional hospitals, and the Ministry of Health and Medical Services says people who need radiotherapy are referred overseas with government assistance. IARC estimates 1,731 new cancers and 843 deaths in 2024, with breast, prostate and cervical cancer the commonest; the incidence figure is modelled from national mortality, because IARC lists no incidence data for Fiji.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Fiji is 1,731 new cancers and 843 deaths, an age-standardised incidence of 183.2 per 100,000 (163.7 in men, 206.9 in women) and mortality of 91.6. The fact sheet gives the country-specific incidence data source as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (neighbouring country registry data)\": incidence is worked out from Fiji's deaths using ratios taken from registries in neighbouring countries. Mortality comes from WHO national data, with \"Trends in national rates projected to 2024\". The Ministry's own database recorded 12,433 cases over the nine years 2010 to 2018, about 1,380 a year, in an analysis whose authors say the data quality is limited. The fact sheet's totals with and without non-melanoma skin cancer are the same.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Fiji",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Fiji (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 1,700 new cancers a year, six in ten of them in women",
          plain:
            "IARC estimates 1,731 new cancers in Fiji in 2024, 696 in men and 1,035 in women, and 843 cancer deaths. Breast cancer is the commonest overall, prostate cancer second and cervical cancer third. These are estimates worked out from deaths, not counts of diagnoses.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 297 breast cancers (188 deaths), 228 prostate cancers (49 deaths), 192 cervical cancers (114 deaths), 136 colorectal cancers (54 deaths), 109 thyroid cancers (12 deaths) and 104 liver cancers (76 deaths). In men the leading cancers are prostate (228, 32.8%), liver (77) and colorectum (70); in women, breast (297, 28.7%), cervix (192, 18.6%) and thyroid (100). By deaths the order is breast, cervix, then liver. The risk of developing cancer before 75 is 18.8%, and of dying of it 9.9%. Women account for 538 of the 843 deaths.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Fiji (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "ministry-database",
          title: "The Ministry's database recorded 12,433 cancers from 2010 to 2018",
          plain:
            "Fiji's cancer figures are kept by the Ministry of Health's Data Analysis and Management Unit. An analysis of its data for 2010 to 2018 counted 12,433 cancers, 8,457 in women and 3,965 in men, and 5,963 deaths. The two sex counts are the paper's own and add up to 12,422, eleven short of its total. Breast and cervical cancer were the commonest.",
          detail:
            "Naidu and colleagues, writing with the Ministry in 2025, say the unit compiles cancer data from pathology reports, the hospital records system and other sources into its own database. In their words, \"Instead of a dedicated cancer registry, the DAMU database serves as a comprehensive repository for cancer-related information.\" They add that the data do not capture stage at diagnosis and that treatment outcomes are poorly documented. Their table gives 2,231 breast cancers and 2,043 cervical cancers over the nine years, and 1,122 cancers of ill-defined or unknown site. The 2023 imPACT Review says Fiji needs one overall cancer registry that combines and verifies data across sources. WHO's 2021 cervical cancer profile answers \"Yes\" to whether a population-based cancer registry exists, and IARC's Pacific Islands hub for cancer registration lists trainers from Fiji's Ministry of Health and Lautoka Hospital.",
          links: [
            { label: "Naidu et al., epidemiology of cancer in the Fiji Islands 2010 to 2018 (Asia Pac J Public Health 2025)", url: NAIDU_2025 },
            { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
            { label: "WHO: cervical cancer country profile 2021, Fiji (PDF)", url: WHO_CERVICAL_2021 },
            { label: "IARC Global Initiative for Cancer Registry Development: Pacific Islands hub", url: GICR_PACIFIC },
          ],
        },
      ],
      tables: [
        {
          id: "fj-top",
          title: "IARC's leading cancers for Fiji, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 297, deaths: 188 },
            { site: "Prostate", cases: 228, deaths: 49 },
            { site: "Cervix uteri", cases: 192, deaths: 114 },
            { site: "Colorectum", cases: 136, deaths: 54 },
            { site: "Thyroid", cases: 109, deaths: 12 },
            { site: "Liver", cases: 104, deaths: 76 },
            { site: "Corpus uteri", cases: 82, deaths: 22 },
            { site: "Lung", cases: 69, deaths: 52 },
            { site: "All cancers", cases: 1731, deaths: 843 },
          ],
          note: "IARC lists no incidence data for Fiji: new cases are modelled from national mortality estimates and mortality-to-incidence ratios taken from neighbouring countries' registries.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Fiji (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "fj-ministry-counts",
          title: "Cancers recorded by the Ministry of Health, 2010 to 2018",
          caption: "Cases recorded over nine years, both sexes, from Table 1 of Naidu et al. 2025, using the Data Analysis and Management Unit's database.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "Cases, 2010 to 2018", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 2231 },
            { site: "Cervix uteri", cases: 2043 },
            { site: "Corpus uteri", cases: 592 },
            { site: "Prostate", cases: 500 },
            { site: "Ovary", cases: 444 },
            { site: "Liver", cases: 370 },
            { site: "Lung and bronchus", cases: 358 },
            { site: "Colon", cases: 334 },
            { site: "Ill-defined and unknown site", cases: 1122 },
            { site: "All cancers", cases: 12433 },
          ],
          note: "Nine years of recorded cases, not one year, and the authors say the data have quality limits. The paper counts colon and rectum separately, so the colon row is not comparable with IARC's colorectum row.",
          sources: [{ label: "Naidu et al., epidemiology of cancer in the Fiji Islands 2010 to 2018 (Asia Pac J Public Health 2025)", url: NAIDU_2025 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
      cards: [
        {
          id: "tax-funded",
          title: "Public care is paid from general taxes, with no social health insurance",
          plain:
            "Public health care in Fiji is paid for from general tax revenue, and there is no universal or social health insurance scheme. WHO puts out-of-pocket payment at 8.3% of health spending in 2023, down from 24.7% in 2021, a fall in the series that OnCo cannot explain. A Free Medicine Scheme lets registered people collect approved medicines at participating pharmacies.",
          detail:
            "The 2023 imPACT Review says public health care is funded exclusively from general taxes, that donor funding is generally low, and that health facilities and laboratories frequently report stockouts of medicines, supplies and consumables. WHO's Global Health Expenditure Database gives, for 2023, current health spending of about US$213 a person, 74.8% of it from government, 11.6% from external sources and 8.3% paid out of pocket. The same series gives an out-of-pocket share of 24.7% for 2021 and 8.0% for 2022, a break OnCo cannot explain from the data. The Ministry's page for the Free Medicine Scheme says applicants register with a birth certificate and photo identification and should confirm eligibility with the scheme team.",
          links: [
            { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
            { label: "Ministry of Health and Medical Services: Fiji Pharmaceutical and Biomedical Services Centre, Free Medicine Scheme", url: FPBS },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Fiji (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: external share (API)", url: WHO_EXT_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
          ],
        },
        {
          id: "overseas-funding",
          title: "Government help with treatment overseas is means-tested and may be partial",
          plain:
            "When a treatment is not available in Fiji, a patient can apply to the Ministry's Overseas Referral Committee for help with the cost. The application needs a consultant's report saying the treatment is not available locally, and proof of the household's income. Approved cases may not receive the full cost.",
          detail:
            "The Ministry's checklist asks for a medical report from a local consultant or specialist stating the diagnosis, that the treatment is not available locally and the expected outcome, with pay slips, bank statements, a statutory declaration and passport pages for the patient and a companion. The 2023 imPACT Review says a referral for government funding must be justified by the lack of treatment in Fiji and by an assessment of survival at five years or more after treatment, and that the amount paid depends on the patient's means and on the budget. It reports that from 2019 to 2022 private insurers paid US$2.5 million for treatment overseas, while the Ministry paid US$175,000 for 55 patients, mostly for radiation treatment.",
          links: [
            { label: "Ministry of Health and Medical Services: overseas medical treatment, assistance checklist", url: MOH_OVERSEAS },
            { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "Ministry of Health and Medical Services: Fiji Medicines Regulatory Authority", url: FIJI_MRA },
      cards: [
        {
          id: "fiji-mra",
          title: "The Fiji Medicines Regulatory Authority registers medicines under the Medicinal Products Act 2011",
          plain:
            "Medicines in Fiji are regulated by the Fiji Medicines Regulatory Authority, part of the Ministry of Health and Medical Services. Under the Medicinal Products Act 2011 a medicine must be registered before it is imported, made, sold or distributed in Fiji.",
          detail:
            "The Ministry's page says the Fiji Medicinal Products Board has assigned the authority to manage provisional registration, through an online portal where a company registers as a sponsor and then applies. The authority also prequalifies manufacturers and products that supply the government, issues import permits, inspects premises that make, store, distribute or sell medicines, licenses importers and wholesalers, registers pharmacists, monitors medicine safety, and is secretariat to the Medicinal Products Board and the Pharmacy Profession Board. Australia supports it through the Pacific Medicines Testing Program and the Indo-Pacific Regulatory Strengthening Program. The page says the portal also supports streamlined registration for products already approved in Australia or New Zealand; it does not describe how that route works, and OnCo did not read the Act itself.",
          links: [
            { label: "Ministry of Health and Medical Services: Fiji Medicines Regulatory Authority", url: FIJI_MRA },
            { label: "Ministry of Health and Medical Services: Fiji Pharmaceutical and Biomedical Services Centre", url: FPBS },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: cervical cancer country profile 2021, Fiji (PDF)", url: WHO_CERVICAL_2021 },
      cards: [
        {
          id: "hpv-vaccine",
          title: "HPV vaccination in schools since 2013, with about seven in ten girls completing it",
          plain:
            "Fiji offers the HPV vaccine free to girls in class 8. It has been part of the national immunisation programme since 2013. WHO's rows for 2025 give 88% coverage for the first dose and 71% for the last dose.",
          detail:
            "WHO's vaccine introduction rows record nationwide HPV vaccination from 2013, and its coverage rows give 7,349 first doses and 5,881 last doses against a target of 8,317 girls in 2025. Last-dose coverage was 50% in 2021 and 2022 and 70% in 2023. The 2023 imPACT Review says the vaccine was first introduced in 2009, that two cohorts missed their second dose during the COVID-19 pandemic, and that a cost analysis had looked at moving to a single dose and including boys. The Ministry's cancer page, which is undated, says the vaccine is offered free to girls in class 8.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Fiji (API)", url: WHO_HPV_API },
            { label: "WHO: vaccine introduction rows for Fiji (API)", url: WHO_INTRO_API },
            { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
            { label: "Ministry of Health and Medical Services: cancer", url: MOH_CANCER },
          ],
        },
        {
          id: "cervical-screening",
          title: "A national cervical screening programme by cytology, reaching about one woman in six",
          plain:
            "WHO's 2021 profile says Fiji has a national cervical screening programme using cytology for women aged 25 to 70. It estimates that in 2019, 16% of women aged 30 to 49 had been screened in the previous five years and 31% had ever been screened.",
          detail:
            "The 2023 imPACT Review repeats the 16% figure, calls it well below the 70% target, and says a costing exercise found a critical lack of staff and infrastructure to reach the screening targets; it recommends HPV DNA testing as the primary test, with liquid-based cytology for women who need further testing. At the Women's Wellness Clinic in Suva, 12,074 of the 39,579 women who attended from 2014 to 2018 had a cervical screening test (30.5%). A 2019 review of cancer control in the Pacific recorded no organised breast or bowel screening programme in Fiji, and OnCo found no later official statement of one. The same table also answers no for an organised cervical programme, which does not agree with WHO's 2021 profile; ask the clinic how screening is offered where you live.",
          links: [
            { label: "WHO: cervical cancer country profile 2021, Fiji (PDF)", url: WHO_CERVICAL_2021 },
            { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
            { label: "Kunatoga et al., cervical cancer screening in Suva 2014 to 2018 (Heliyon 2024)", url: KUNATOGA_2024 },
            { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy, cancer units and treatment overseas",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "No radiotherapy in Fiji: people who need it are referred overseas",
          plain:
            "IAEA's radiotherapy directory lists no centre in Fiji. The Ministry's cancer page says cancer is managed in the oncology units of the three divisional hospitals with surgery and limited chemotherapy, and that those who need radiotherapy are referred overseas through government assistance.",
          detail:
            "The 2023 imPACT Review by the IAEA, WHO and IARC states that radiation oncology services are not available in the country, that a small number of patients travel overseas, most of them paid for by personal insurance or themselves, and that Fiji had no fully trained radiotherapy professionals. It records an agreement between the government and Aspen Medical for a public-private partnership at Lautoka Hospital, with a new building for a radiotherapy department planned to be operational by June 2025; OnCo found no primary source saying that it has opened. No DIRAC entry is not proof of no radiotherapy, so ask the treating hospital what is available now. New Zealand's Medical Treatment Scheme, run by the Pasifika Medical Association Group, also takes referrals from Fiji's Overseas Referral Committee.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 16 November 2026)", url: DIRAC },
            { label: "Ministry of Health and Medical Services: cancer", url: MOH_CANCER },
            { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
            { label: "Pasifika Medical Association Group: New Zealand Medical Treatment Scheme", url: NZMTS },
          ],
        },
        {
          id: "cancer-units",
          title: "Three divisional hospitals give limited chemotherapy, with Suva as the referral centre",
          plain:
            "Limited chemotherapy is given at Fiji's three divisional hospitals. Colonial War Memorial Hospital in Suva is the national referral centre for complex cases. It and Lautoka Hospital together manage 45 to 50 new childhood cancers a year.",
          detail:
            "The imPACT Review says a limited range of chemotherapy and hormonal drugs is available, that childhood cancer is treated to a shared Pacific protocol with remote and visiting support from Christchurch, New Zealand, and that when a drug treatment is not available locally the patient qualifies for overseas referral. It estimates that three quarters of new cancers are diagnosed at an advanced stage, notes a pain management team at Colonial War Memorial Hospital and a Community Palliative Care Project dated 2022 whose work had begun in the central division, and says there is no specialised palliative care centre or unit. A 2019 review of the Pacific counted one medical oncologist in Fiji in mid-2018; OnCo found no current count.",
          links: [
            { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
            { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Fiji does differently",
      cards: [
        {
          id: "single-dose-evidence",
          title: "Fiji's early HPV campaign showed one dose still protecting eight years later",
          plain:
            "In 2008 and 2009 Fiji vaccinated more than 30,000 girls aged 9 to 12 against HPV, and many received fewer than three doses. A follow-up study eight years later found that a single dose was 81% effective against the two HPV types that cause most cervical cancers.",
          detail:
            "Reyburn and colleagues studied 822 pregnant women aged 23 or under who had been eligible for the vaccine in 2008 and 2009. HPV 16 or 18 was found in 13.3% of the unvaccinated women, 2.5% of those given one dose, none of those given two and 1.6% of those given three. Adjusted effectiveness was 81% for one dose (95% CI 48 to 93), 100% for two and 89% for three (64 to 96). The authors describe it as the longest duration of protection shown for a reduced-dose schedule of this vaccine in a low- or middle-income country in the Western Pacific. The study was limited to pregnant women, and it measured infection, not cancer.",
          links: [{ label: "Reyburn et al., single-dose quadrivalent HPV vaccine effectiveness in Fiji (Lancet Reg Health West Pac 2023)", url: REYBURN_2023 }],
        },
        {
          id: "radiotherapy-case",
          title: "A published cost-benefit case for a radiotherapy centre, and a road map for building one",
          plain:
            "Whether Fiji should build its own radiotherapy service has been studied. A 2017 analysis by researchers at Seoul National University and WHO's Pacific office in Suva found it would pay for itself if a year of life is valued at national income per person, but not if valued at the minimum wage. The 2023 imPACT Review team of the IAEA, WHO and IARC gave Fiji a road map for the planned facility.",
          detail:
            "Kim and colleagues modelled a radiation oncology centre over 2021 to 2035 from a societal perspective. Valuing life-years at the national minimum wage gave a net loss of FJD 31.6 million and a benefit-cost ratio of 0.69; valuing them at gross national income per person gave a net benefit of FJD 4.0 million and a ratio of 1.04, with a range from 0.46 to 1.20 across pessimistic and optimistic scenarios. A 2019 review of the Pacific judged that Fiji and Papua New Guinea were the two island countries with enough patients, over 400 new radiotherapy cases a year, to make use of a single megavoltage machine. The imPACT Review team's road map covers infrastructure, equipment, workforce development, quality and safety, and the review summary says a Radiation Safety Act still needed to be finalised and endorsed.",
          links: [
            { label: "Kim et al., cost-benefit analysis of radiation oncology services in Fiji (Cancer Epidemiol 2017)", url: KIM_2017 },
            { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
            { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
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
          title: "No trial in OnCo's records has a site in Fiji",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Fiji. OnCo holds a selection of trials, not the whole registry, so search the registry itself. The published papers OnCo found are on cancer counts, HPV vaccination, cervical screening and radiotherapy planning.",
          detail:
            "The papers behind this page are a 2025 analysis of the Ministry's cancer data for 2010 to 2018, the 2023 follow-up of the 2008 and 2009 HPV vaccination campaign, a 2024 review of five years of cervical screening records at one Suva clinic, and the 2017 cost-benefit analysis of a radiotherapy centre. Fiji is also covered by the IARC Pacific Islands hub for cancer registration, a partnership of IARC, WHO's Division of Pacific Technical Support and the Pacific Community that the hub's page describes as still being implemented.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Fiji", url: CTGOV },
            { label: "Naidu et al., epidemiology of cancer in the Fiji Islands 2010 to 2018 (Asia Pac J Public Health 2025)", url: NAIDU_2025 },
            { label: "IARC Global Initiative for Cancer Registry Development: Pacific Islands hub", url: GICR_PACIFIC },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "plan-status",
      title: "The National Cancer Control Plan was a draft when last described",
      plain:
        "The 2023 imPACT Review describes a draft National Cancer Control Plan for 2023 to 2030 that still needed consultation before approval. OnCo found no published, approved plan on the Ministry's site, so its present status is not on this page.",
      detail:
        "A 2019 review of the Pacific already listed Fiji's plan as a draft dated 2016. WHO's 2020 cancer country profile for Fiji, by contrast, records a national cancer control plan as \"operational\" for 2019, which does not agree with either description of a draft. The imPACT summary also says a Wellness and non-communicable disease strategic plan for 2020 to 2025 was awaiting finalisation. The International Cancer Control Partnership portal was not read. The Ministry's non-communicable disease team is the place to ask which plan is in force.",
      links: [
        { label: "IAEA, WHO and IARC: imPACT Review of Fiji, February 2023, summary (PDF)", url: IMPACT_2023 },
        { label: "WHO: cancer country profile 2020, Fiji (PDF)", url: WHO_CANCER_2020 },
        { label: "Sarfati et al., cancer control in the Pacific (Lancet Oncol 2019, author manuscript)", url: SARFATI_2019 },
        { label: "Ministry of Health and Medical Services: cancer", url: MOH_CANCER },
      ],
    },
    {
      id: "radiotherapy-status",
      title: "Whether radiotherapy has opened in Fiji, and where patients are sent, was not confirmed",
      plain:
        "The planned radiotherapy department at Lautoka Hospital was due by June 2025, and OnCo found no primary source confirming it is treating patients. The Ministry's pages do not name the countries or hospitals that Fijian patients are referred to.",
      detail:
        "The IAEA's news article on the Fiji road map refused automated requests (403), so only the review summary was read. IAEA DIRAC held no row for Fiji on 16 November 2026. The Ministry's cancer page is undated and still describes an intention to establish a cancer hospital with IAEA help. News reports of newer plans were not used as sources. The Overseas Referral Committee at the Ministry, or the oncology unit of a divisional hospital, can say what is available now and where referrals go.",
      links: [
        { label: "Ministry of Health and Medical Services: overseas medical treatment", url: MOH_OVERSEAS },
        { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      ],
    },
    {
      id: "survival-and-medicines",
      title: "No survival figures, and the cancer medicines on the national list were not read",
      plain:
        "OnCo found no population-based survival figure for any cancer in Fiji. The Ministry publishes a medicine list for its Free Medicine Scheme, but OnCo did not read it or the essential medicines list, so which cancer medicines the public system supplies is not on this page.",
      detail:
        "The Ministry's database does not capture stage at diagnosis and has a gap in documenting treatment outcomes, according to the 2025 analysis of it, which reports no survival figures. The imPACT Review mentions an essential medicines list of 2019 that includes a full set of opioid pain medicines, says most of the drugs on that list are out of date and need upgrading, and says keeping opioids continuously in supply is a major challenge. The Medicinal Products Act 2011 and the National Medicinal Products Policy 2013 were not read. The Fiji Pharmaceutical and Biomedical Services Centre's page links the scheme's published medicine list and gives its contact details.",
      links: [
        { label: "Ministry of Health and Medical Services: Fiji Pharmaceutical and Biomedical Services Centre", url: FPBS },
        { label: "Naidu et al., epidemiology of cancer in the Fiji Islands 2010 to 2018 (Asia Pac J Public Health 2025)", url: NAIDU_2025 },
      ],
    },
  ],
  institutions: ["fiji-ministry-of-health", "fiji-medicines-regulatory-authority", "colonial-war-memorial-hospital-suva", "fiji-cancer-society", "iaea", "who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-naidu-cancer-epidemiology-fiji-apjph-2025", "paper-reyburn-single-dose-hpv-fiji-lanwpc-2023",
    "paper-kim-radiotherapy-cost-benefit-fiji-cancerepidemiol-2017", "paper-kunatoga-cervical-screening-fiji-heliyon-2024",
  ],
  people: [],
  how:
    "Every card was written from Fiji's own pages and from international agencies, read in full rather than through a summary: the Ministry of Health and Medical Services' cancer page, its overseas medical treatment checklist, and its pages for the Fiji Pharmaceutical and Biomedical Services Centre and the Fiji Medicines Regulatory Authority; the summary of the February 2023 imPACT Review by the IAEA, WHO and IARC; WHO's 2021 cervical cancer profile and its vaccine and health expenditure rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet and its Pacific Islands hub page; WHO's 2020 cancer country profile; and the papers through Europe PMC and PubMed Central. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the regulator, Colonial War Memorial Hospital and four papers) carry their own sources.",
  verify:
    "National incidence figures for Fiji are modelled from deaths, not counted. Whether radiotherapy is available in Fiji, which medicines a hospital has in stock and what the Overseas Referral Committee will fund change faster than any report; ask the oncology unit at your divisional hospital or the Ministry of Health and Medical Services what applies to you.",
  verifyLinks: [
    { label: "Ministry of Health and Medical Services: cancer", url: MOH_CANCER },
    { label: "Overseas medical treatment checklist", url: MOH_OVERSEAS },
    { label: "Fiji Medicines Regulatory Authority", url: FIJI_MRA },
    { label: "imPACT Review of Fiji, February 2023 (PDF)", url: IMPACT_2023 },
  ],
};

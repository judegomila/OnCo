import type { CountryDive } from "@/data/country-dive";

/**
 * Ethiopia deep dive: the hand-written cards for /countries/et/ (wave 4). Every figure was read from the raw text of
 * its source on 4 November 2026, not from a summary of it: the Federal Ministry of Health's Integrated National Cancer
 * Control Plan 2025 to 2029 (PDF text, including its appendix of imPACT Review recommendations, its workforce table and
 * its list of treatment centres for December 2024), the Ministry's 2015 cervical cancer guideline (PDF text), the
 * Ministry's February 2022 news page on the Jimma radiotherapy centre, the IAEA's March 2024 article on the imPACT
 * Review (read through the Internet Archive, as the IAEA page refused a plain request), the Ethiopian Health Insurance
 * Service's 2025 news pages, EFDA's home page, its maturity level 3 announcement and two of its guidelines (PDF text),
 * the African Cancer Registry Network's page for the Addis Ababa registry, WHO's HPV coverage rows for Ethiopia from
 * its public data API, IARC's GLOBOCAN 2024 fact sheet for Ethiopia, and the papers' abstracts through Europe PMC.
 * Where a figure could not be read it is named under `gaps`.
 */
const NCCP_2025 = "https://www.iccp-portal.org/sites/default/files/plans/NCCP%20Ethiopia%20Final%20%20Submitted%20%20PDF_1.pdf";
const NCCP_NEWS = "https://www.iccp-portal.org/news/national-cancer-control-plan-ethiopia-2025-2029";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/231-ethiopia-fact-sheet.pdf";
const IAEA_IMPACT = "https://www.iaea.org/newscenter/news/ethiopia-is-expanding-access-to-radiation-medicine-and-earlier-detection-of-adult-and-childhood-cancer";
const IAEA_IMPACT_WB = "https://web.archive.org/web/2026/https://www.iaea.org/newscenter/news/ethiopia-is-expanding-access-to-radiation-medicine-and-earlier-detection-of-adult-and-childhood-cancer";
const MOH_JIMMA = "https://www.moh.gov.et/node/317";
const AFCRN_ADDIS = "https://afcrn.org/index.php/membership/membership-list/100-addisababa";
const EHIS_65M = "https://www.ehis.gov.et/en/news/27";
const EHIS_63M = "https://www.ehis.gov.et/en/news/29";
const EHIS_ZIM = "https://www.ehis.gov.et/en/news/30";
const EFDA_HOME = "https://www.efda.gov.et/";
const EFDA_ML3 = "https://www.efda.gov.et/efda-attains-who-maturity-level-3-in-medicine-regulation-2/";
const EFDA_GMP_RELIANCE = "https://www.efda.gov.et/wp-content/uploads/2024/07/Guideline-on-Reliance-for-GMP-inspection-scan-pdf.pdf";
const EFDA_CT = "https://www.efda.gov.et/wp-content/uploads/2025/08/GUIDELINE-FOR-CLINICAL-TRIAL-AUTHORIZATION-2025-Version-005-3.pdf";
const CX_2015 = "https://www.iccp-portal.org/sites/default/files/plans/Guideline%20Eth%20Final.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ETH'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Ethiopia&cond=cancer";

export const ET_DIVE: CountryDive = {
  iso2: "ET",
  iso3: "ETH",
  name: "Ethiopia",
  flag: "🇪🇹",
  asOf: "2026-11-04",
  title: "Cancer in Ethiopia",
  description:
    "Cancer in Ethiopia from Ethiopian sources: IARC's estimate of 79,239 new cancers and 46,841 deaths in 2024, made from subnational registry rates, the one population-based registry in Addis Ababa, the Ministry of Health's 2025 to 2029 cancer plan, community-based health insurance covering about 65 million people, the Ethiopian Food and Drug Authority and its 2025 maturity level 3 rating, screen-and-treat cervical screening in more than 1,500 facilities, breast cancer chemotherapy in 30 hospitals, and why no trial in our records has a site in Ethiopia.",
  lede:
    "Ethiopia's only population-based cancer registry covers its capital. The national figures are IARC estimates, made by applying subnational registry rates to the whole population: 79,239 new cancers and 46,841 deaths in 2024, two thirds of the cancers in women, with breast and cervical cancer leading. The country has gone from one comprehensive cancer treatment centre to seven, but treatment is still scarce and most patients are diagnosed late.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Ethiopia is 79,239 new cancers and 46,841 deaths, an age-standardised incidence of 94.6 per 100,000 (69.8 in men, 118.4 in women), including 2,604 non-melanoma skin cancers. IARC's fact sheet gives its incidence method as subnational rates applied to the 2024 population, from a subnational registry. The fact sheet does not name it; the Addis Ababa City Cancer Registry, which covers about 3% of Ethiopians, is described in its own papers as the only population-based registry in the country. Mortality is national incidence applied to modelled mortality-to-incidence ratios from registry survival data. The national estimate is close to that registry's published rates: the registry measured 66.5 cancers per 100,000 men and 113.5 per 100,000 women in 2018 to 2022, breast cancer at 39.8 (IARC 40.8) and cervical cancer at 18.9 (IARC 20.2). The registry's earlier rate for women, 136.2 in 2012 to 2013, was higher. What neither can show is whether rural Ethiopia, where most people live and diagnosis is harder to reach, has the same pattern; the registry's authors read its low prostate and liver cancer rates as possible under-diagnosis. The Ministry of Health's 2025 to 2029 plan, quoting GLOBOCAN 2022 (80,334 cases), warns that the estimates are highly likely to underestimate the real burden.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Ethiopia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Ethiopia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 79,000 new cancers a year, two thirds of them in women",
          plain:
            "IARC estimates 79,239 new cancers in Ethiopia in 2024: 52,362 in women and 26,877 in men. Breast cancer alone is more than a third of cancers in women, and cervical cancer is the second commonest. For every ten new cancers IARC estimates about six cancer deaths in the same year, and the Ministry of Health says most cancers are found late.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 18,840 breast cancers (8,812 deaths), 8,159 cervical cancers (5,007 deaths), 7,372 colorectal cancers (4,108 deaths), 3,494 prostate cancers (2,134 deaths) and 2,967 leukaemias. Breast cancer is 36.0% of cancers in women and 23.8% of all cancers. In men the leading cancers by cases are colorectum (3,518), prostate (3,494) and leukaemia (1,615); by deaths prostate, colorectum and liver. The risk of developing a cancer before age 75 is 7.5% for men and 12.1% for women, and an estimated 142,431 people are living within five years of a diagnosis. Deaths divided by new cases give 0.59 for 2024. The Ministry of Health's Integrated National Cancer Control Plan 2025 to 2029 states that about 80% of cancer cases are diagnosed at advanced stages and that an estimated 12,000 cancer patients are treated each year; elsewhere it puts the share of cases identified at advanced stages at 70%. It counts an estimated 6,000 new childhood cancers a year, with survival of 20 to 30% because care is largely limited to national referral hospitals and a few private facilities.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Ethiopia (PDF)", url: IARC_FACTSHEET },
            { label: "Integrated National Cancer Control Plan 2025 to 2029, sections 1.3 and 3.3.3 (Federal Ministry of Health, PDF)", url: NCCP_2025 },
          ],
        },
        {
          id: "care-capacity",
          title: "Where treatment is: from one cancer centre to seven, and chemotherapy in 30 hospitals",
          plain:
            "Until 2022 radiotherapy was available at one hospital, Tikur Anbessa (Black Lion) in Addis Ababa. The Ministry of Health says comprehensive cancer treatment centres have grown from one to seven, two in the capital and five in the regions, and lists 30 hospitals giving chemotherapy, those seven included. Radiotherapy remains scarce: in early 2024 it was available at only three public hospitals, with waits sometimes longer than a year.",
          detail:
            "The 2025 to 2029 plan reports that comprehensive cancer treatment centres increased from 1 to 7, and its list of treatment centres for December 2024 names them: Tikur Anbessa and St Paul's in Addis Ababa, and Ayder (Mekelle), Gondar, Hawassa, Hiwot Fana (Harar) and Jimma, each labelled comprehensive with radiotherapy. The same list has 10 hospitals treating all cancers with at least one clinical oncologist and 13 giving breast cancer chemotherapy only. The Ministry's news page of 20 February 2022 reported the opening of the country's second centre at Jimma University Hospital, saying radiation treatment had until then been available only at the Black Lion (Tikur Anbessa) hospital. The IAEA wrote in March 2024, after its imPACT Review mission of November 2023, that radiotherapy was possible at only three public hospitals, that waits were sometimes more than a year, and that five more radiotherapy centres were under construction in Addis Ababa, Gondar, Hawassa, Harar and Mekelle, one of them at St Paul's built through a public and private partnership. The plan says four centres are now equipped with linear accelerators, operational since November 2020, replacing two-dimensional cobalt-60 machines in use since 1999. OnCo could not confirm how many of the seven centres were giving radiotherapy in November 2026; see the gaps.",
          links: [
            { label: "Integrated National Cancer Control Plan 2025 to 2029, section 1.7.2 and appendix 6 (PDF)", url: NCCP_2025 },
            { label: "Ministry of Health: radiation therapy centre inaugurated at Jimma University Hospital (20 February 2022)", url: MOH_JIMMA },
            { label: "IAEA: Ethiopia is expanding access to radiation medicine (26 March 2024; read through the Internet Archive)", url: IAEA_IMPACT_WB },
          ],
        },
      ],
      tables: [
        {
          id: "et-registry",
          title: "What the Addis Ababa City Cancer Registry has published",
          caption: "New cancers and age-standardised incidence per 100,000, as reported in each paper's abstract. Latest published period: 2018 to 2022.",
          columns: [
            { key: "source", label: "Source (area covered)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "All cancers, men", numeric: true },
            { key: "women", label: "All cancers, women", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
            { key: "crcmen", label: "Colorectal, men", numeric: true },
          ],
          rows: [
            { source: "Addis Ababa City Cancer Registry (just over 3 million people)", period: "2012 to 2013", cases: 4139, men: 70.7, women: 136.2, breast: 40.6, cervix: 21.5, crcmen: 7.6 },
            { source: "Addis Ababa City Cancer Registry (about 3.7 million people in 2020)", period: "2018 to 2022", cases: 14053, men: 66.5, women: 113.5, breast: 39.8, cervix: 18.9, crcmen: 9.8 },
            { source: "National estimate from the registry plus cases from six regions (Memirie et al.)", period: "2015", cases: 64285, men: null, women: null, breast: null, cervix: null, crcmen: null },
          ],
          note: "The registry is the only population-based registry in Ethiopia and covers one city; registries publish new cases, not deaths. The 2015 national row is the sum of the paper's two estimates, 21,563 cancers in men and 42,722 in women; its rates are not in the abstract. Rates are age-standardised as each paper reports them.",
          sources: [
            { label: "Timotewos et al., first data from a population based cancer registry in Ethiopia (Cancer Epidemiol 2018)", url: "https://doi.org/10.1016/j.canep.2018.01.008" },
            { label: "Gizaw et al., cancer incidence in Addis Ababa 2018 to 2022 (Cancer Epidemiol 2026)", url: "https://doi.org/10.1016/j.canep.2026.103048" },
            { label: "Memirie et al., estimates of cancer incidence in Ethiopia in 2015 (J Glob Oncol 2018)", url: "https://doi.org/10.1200/JGO.17.00175" },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: one city registry, and a plan for five more",
      aside: { label: "African Cancer Registry Network: Addis Ababa City Cancer Registry", url: AFCRN_ADDIS },
      cards: [
        {
          id: "registry-addis",
          title: "One registry, started in 2011 at a radiotherapy centre, now counts cancer for 3.7 million people",
          plain:
            "Ethiopia has no national cancer registry. The Addis Ababa City Cancer Registry, set up in September 2011 at the Radiotherapy Center of Tikur Anbessa Specialized Hospital, counts new cancers among residents of the capital, about 3% of the population. The Ministry of Health plans population-based registries at five university cancer centres.",
          detail:
            "The registry's page on the African Cancer Registry Network, last updated in October 2014, describes its start in September 2011 with funding from the German Federal Ministry of Education and Research until March 2014 and then the American Cancer Society, technical support from Martin Luther University Halle-Wittenberg and the American Cancer Society, more than 20 contact persons trained in health institutions across the city, and a rule that a person must have lived in the city for six months to count. Its first paper covered 4,139 cancers in 2012 and 2013 from 22 hospitals, clinics and diagnostic facilities; its 2018 to 2022 report counted 14,053. The Ministry's 2025 to 2029 plan names the absence of a national registry and of accurate mortality surveillance as weaknesses, says the registry depends on donors, and plans population-based registries in all five university-affiliated cancer treatment centres, facility-based registries in every treatment centre, and advocacy for a law mandating cancer reporting. The imPACT reviewers of November 2023 recommended complete coverage of the city so its data could be accepted in Cancer Incidence in Five Continents, a Ministry budget line for registration, absorbing the registry's staff into Ministry structures, and making cancer a notifiable disease by law.",
          links: [
            { label: "African Cancer Registry Network: Ethiopia, Addis Ababa City Cancer Registry", url: AFCRN_ADDIS },
            { label: "Integrated National Cancer Control Plan 2025 to 2029, sections 2.4 and 6.2.2 and appendix 2 (PDF)", url: NCCP_2025 },
            { label: "Gizaw et al., cancer incidence in Addis Ababa 2018 to 2022 (Cancer Epidemiol 2026)", url: "https://doi.org/10.1016/j.canep.2026.103048" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: community insurance for most, but medicines often bought privately",
      aside: { label: "Ethiopian Health Insurance Service: news", url: "https://www.ehis.gov.et/en/news" },
      cards: [
        {
          id: "cbhi",
          title: "Community-based health insurance covers about 65 million people, 15 million of them free",
          plain:
            "Most Ethiopians work outside the formal economy, so the country built insurance district by district: households pay a yearly premium, and those who cannot pay are covered by the government. In 2025 the national insurer reported 1,195 districts and about 65 million people in the scheme. Members can use any service a government facility offers, but cancer care is often not on offer there.",
          detail:
            "In May 2025 the Deputy Director General of the Ethiopian Health Insurance Service said community-based health insurance, piloted in 13 districts in four regions in 2011, now covered 1,195 districts, with 65 million beneficiaries, 50 million making payments and 15 million covered although unable to pay. Its July 2025 news page reported the Health Minister giving 63 million beneficiaries in 13.67 million households for the 2017 Ethiopian fiscal year, and its Director General more than 63 million. In August 2025 a consultant presenting for the service said community-based insurance covers 80% of citizens and social health insurance for the formal sector will cover the remaining 20%; the 65 million beneficiaries reported in May are about 57% of the population of more than 115 million he cited, so the 80% may describe the share of the population the scheme is meant for and not the share enrolled; the news page does not say. The Ministry of Health's 2025 to 2029 cancer plan puts the premium at 921 birr per family per year and says members can use all services available at government facilities, but that because services are unavailable there, 60 to 70% of member families still pay out of pocket, including for medicines. National Health Accounts for 2019/2020 split health spending between donors (33.9%), government (32.2%) and households paying out of pocket (30.5%). The imPACT reviewers named high out-of-pocket costs, and the shortage of public cancer services that pushes patients to private care, as a major challenge.",
          links: [
            { label: "EHIS: Somali Region expands community-based health insurance to 37 more woredas (1 June 2025)", url: EHIS_65M },
            { label: "EHIS: community based health insurance and the prosperity journey (6 July 2025)", url: EHIS_63M },
            { label: "EHIS: Ethiopia and Zimbabwe connect on universal health coverage (22 August 2025)", url: EHIS_ZIM },
            { label: "WHO Africa: community-based health insurance drives Ethiopia's bid for universal health coverage (9 December 2022)", url: "https://www.afro.who.int/countries/ethiopia/news/community-based-health-insurance-drives-ethiopias-bid-universal-health-coverage" },
            { label: "Integrated National Cancer Control Plan 2025 to 2029, section 2.2 (PDF)", url: NCCP_2025 },
          ],
        },
        {
          id: "package",
          title: "How Ethiopia decides what is covered: an essential package ranked by seven criteria",
          plain:
            "OnCo found no separate Ethiopian agency that appraises each new medicine. Instead the Ministry of Health ranks health services in an essential package, revised in 2019 using criteria including cost-effectiveness and financial protection. The package lists 70 interventions for cancers, and 54 cancer medicines are on the national essential medicines list.",
          detail:
            "The 2019 revision of the essential health services package, described by Eregata and colleagues, used 35 workshops and seven criteria: disease burden, cost-effectiveness, equity, financial risk protection, budget impact, public acceptability and political acceptability. Of 1,018 interventions evaluated, 594 were ranked high priority, 213 medium and 211 low; 570 are to be free of charge, with the rest under cost-sharing or cost-recovery. The cancer plan records about 218 priority non-communicable disease interventions, 70 of them for neoplastic conditions and 10 high-priority interventions for cervical cancer, and notes that cryotherapy is listed only from secondary hospitals upward, which limits screen-and-treat at lower levels. The national essential medicines list (6th edition, 2020) includes 54 essential cancer medicines; the imPACT reviewers recommended adding important oncology drugs such as anti-HER2 treatment for breast cancer, and oral morphine for palliative care. Researchers costing the paediatric oncology unit at Tikur Anbessa found it cost about 361 US dollars per disability-adjusted life year averted and asked for childhood cancer treatment, ranked low and medium priority, to be reassessed. OnCo found no official cost-effectiveness threshold.",
          links: [
            { label: "Eregata et al., revision of the Ethiopian essential health service package (Health Syst Reform 2020)", url: "https://doi.org/10.1080/23288604.2020.1829313" },
            { label: "Integrated National Cancer Control Plan 2025 to 2029, sections 1.7.2 and 2.2 and appendix 2 (PDF)", url: NCCP_2025 },
            { label: "Kiros et al., cost-effectiveness of a paediatric oncology unit in Ethiopia (BMJ Open 2023)", url: "https://doi.org/10.1136/bmjopen-2022-068210" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Ethiopian Food and Drug Authority",
      aside: { label: "EFDA: EFDA attains WHO maturity level 3 in medicine regulation", url: EFDA_ML3 },
      cards: [
        {
          id: "efda-ml3",
          title: "Rated at the World Health Organization's maturity level 3 for medicines since September 2025",
          plain:
            "Ethiopia's medicines regulator, EFDA, registers medicines and authorises clinical trials. In September 2025 the World Health Organization rated it at maturity level 3, a stable and well-functioning system, and EFDA says it was the ninth African country to reach that level. EFDA's own 2024 reliance guideline listed long waits for registration among its problems.",
          detail:
            "The Ethiopian Food and Drug Authority is an autonomous federal body under Proclamation No. 1263/2021, with its powers set by Council of Ministers Regulation No. 531/2023, and regulates medicines, medical devices, food, cosmetics, alcohol and tobacco. Its announcement dated 29 September 2025 says the World Health Organization assessed it with its Global Benchmarking Tool and rated it at maturity level 3 for medicine regulation, making Ethiopia the ninth country in Africa to reach that milestone. Its reliance guideline for GMP inspection (EFDA/GDL/052, issued July 2024) states that EFDA has relied on stringent regulatory authorities for medicine registration and GMP inspection since 2014, and acknowledges that unprecedented shortages of critical and essential medicines, a limited number of registered medicines and relatively long waiting times for registration remain challenges. A 2025 study drawing on focus groups with regulatory experts reported application backlogs at EFDA. EFDA publishes no target or measured time for registering a new medicine that OnCo could find; this is named under gaps.",
          links: [
            { label: "EFDA: EFDA attains WHO maturity level 3 in medicine regulation (1 October 2025)", url: EFDA_ML3 },
            { label: "EFDA: about EFDA", url: EFDA_HOME },
            { label: "EFDA: guideline on reliance for cGMP inspection, EFDA/GDL/052 (PDF)", url: EFDA_GMP_RELIANCE },
            { label: "Hassen et al., lessons from Ethiopian pharmaceutical regulation (Front Med 2025)", url: "https://doi.org/10.3389/fmed.2025.1484649" },
          ],
        },
        {
          id: "efda-trials",
          title: "Clinical trial applications: 45 working days for a first answer",
          plain:
            "Before a trial can open in Ethiopia, EFDA must authorise it. Its 2025 guideline promises a first response within 45 working days for a routine application, up to 90 calendar days for a high-risk trial, and lets EFDA use the decisions of other regulators such as the European Medicines Agency and the US Food and Drug Administration.",
          detail:
            "The Guideline for Clinical Trial Authorization (EFDA/GDL/005, version 5, approved 2 June 2025 and issued 9 June 2025) sets a screening decision within seven working days for a routine application and four for a non-routine one, and a routine review time of 45 working days for first feedback on a complete application including the fee; the review of a high-risk trial may be extended to 90 calendar days, and a non-routine application is reviewed in no more than 30 calendar days. Further replies are reviewed within 20 working days, or 15 calendar days for non-routine applications, and the applicant has six months to respond. Reviews may be joint with other countries' regulators, and EFDA may recognise and use clinical trial decisions, reports or information from other national regulators and from bodies such as WHO, the African Vaccine Regulatory Forum (AVAREF), the EMA and the US FDA. The guideline's history dates the first version to December 2009. The Ministry of Health's cancer plan asks for collaboration with regulators on the quality of oncology products and for local manufacturing and pooled procurement to make them affordable.",
          links: [
            { label: "EFDA: guideline for clinical trial authorization 2025, EFDA/GDL/005 (PDF)", url: EFDA_CT },
            { label: "Integrated National Cancer Control Plan 2025 to 2029, section 3.3.3 (PDF)", url: NCCP_2025 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Integrated National Cancer Control Plan 2025 to 2029 (PDF)", url: NCCP_2025 },
      cards: [
        {
          id: "cervical-screening",
          title: "Cervical screening by visual inspection in more than 1,500 facilities, moving to HPV testing",
          plain:
            "Ethiopia screens women aged 30 to 49 for cervical cancer, mostly by looking at the cervix after applying vinegar (visual inspection with acetic acid) and treating any abnormal area at the same visit. More than a million women have been screened in over 1,500 public facilities. Coverage was projected at 20% by the end of 2024, against a target of 70%, and the plan moves to HPV testing.",
          detail:
            "The Ministry's 2015 Guideline for Cervical Cancer Prevention and Control set the target population at women aged 30 to 49, earlier for women living with HIV, with cryotherapy as the treatment of choice for eligible precancerous lesions offered without a biopsy (screen and treat). The 2025 to 2029 plan reports screening in more than 1,500 public health facilities and more than 1 million women aged 30 to 49 screened, projects coverage of 20% by the end of 2024, and sets targets of 70% of women aged 30 to 49 screened with a high-performance test and 90% of women with cervical disease treated, with HPV DNA testing adopted as the preferred method, self-sampling for remote areas, and thermal ablation or LEEP alongside cryotherapy. The imPACT reviewers recommended allowing midwives to perform cryotherapy. In a review of 2017 to 2020 logbooks from 14 facilities in Addis Ababa and Oromia, about 13,800 women were screened by VIA and 5.9% were positive; over 90% of those were treated, but only about half returned for follow-up.",
          links: [
            { label: "Guideline for Cervical Cancer Prevention and Control in Ethiopia (Ministry of Health, January 2015, PDF)", url: CX_2015 },
            { label: "Integrated National Cancer Control Plan 2025 to 2029, priority area 2 and table 12 (PDF)", url: NCCP_2025 },
            { label: "Stroetmann et al., adherence to treatment and follow-up of precancerous cervical lesions in Ethiopia (Oncologist 2024)", url: "https://doi.org/10.1093/oncolo/oyae027" },
          ],
        },
        {
          id: "hpv-breast",
          title: "HPV vaccine for girls since 2018, and a national push for earlier breast cancer diagnosis",
          plain:
            "Ethiopia has offered girls the HPV vaccine since 2018 and in November 2024 ran a campaign aimed at more than 7.4 million girls aged 9 to 14. For breast cancer the plan puts its weight on earlier diagnosis: it aims to find 60% of breast cancers at stage I or II, up from 35%, and to complete diagnosis within 60 days.",
          detail:
            "WHO's immunisation data record HPV vaccine introduced in Ethiopia in 2018, and the routine schedule reported to WHO for 2025 is one dose for girls at age 9. The cancer plan describes a large-scale campaign launched in November 2024 to vaccinate over 7.4 million girls aged 9 to 14 through schools and community outreach. WHO's data hold two different sets of rows for Ethiopia, read on 17 November 2026. WHO's own programme coverage estimates give 58% of a target of 9,051,554 girls in 2024 and 51% of 1,612,309 in 2025, and last-dose coverage between 22% and 29% for 2020 to 2023. The administrative and official coverage rows are much higher: 90% to 95% for the final dose in 2018, 2019, 2020, 2022 and 2023, and for the first dose 88% in 2024 and 96% in 2025. The plan's baseline for full vaccination by age 14 is 80%, rising to a target of 90%; that is nearer the administrative rows than WHO's estimates. For breast cancer, the plan's baselines are 35% of cancers found at stage I or II, 120 days to complete diagnosis and 30% of patients completing multimodality treatment, with 2029 targets of 60%, 60 days and 80% under WHO's Global Breast Cancer Initiative. The plan says Ethiopia has introduced screening programmes for breast and cervical cancer but gives no breast screening coverage figure; the imPACT reviewers recommended a national plan for breast cancer screening and suggested clinical breast examination for women aged 45 and over. Hepatitis B vaccine is part of childhood immunisation, and the plan reports over 85% of infants receiving three doses.",
          links: [
            { label: "WHO immunisation data: HPV coverage rows for Ethiopia, estimates and administrative (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: introduction of HPV vaccine", url: "https://immunizationdata.who.int/global/wiise-detail-page/introduction-of-hpv-(human-papilloma-virus)-vaccine" },
            { label: "Integrated National Cancer Control Plan 2025 to 2029, pillar 1, priority area 1 and table 12 (PDF)", url: NCCP_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Ethiopia does",
      title: "What Ethiopia does differently",
      cards: [
        {
          id: "decentralised-chemo",
          title: "Breast cancer chemotherapy taken out to regional hospitals",
          plain:
            "Because breast cancer is so common, Ethiopia launched a national initiative to give breast cancer chemotherapy and follow-up in regional hospitals as well as in the cancer centres. The Ministry of Health counts 30 hospitals that now give chemotherapy, 13 of them for breast cancer only.",
          detail:
            "The 2025 to 2029 plan describes a national initiative to decentralise breast cancer chemotherapy, given that breast cancer makes up 32% of cancer cases in its figures, and reports that 30 regional peripheral hospitals are equipped to provide it. Its list of cancer treatment centres for December 2024 has 30 entries: 7 comprehensive centres with radiotherapy, 10 hospitals treating all cancers with at least one clinical oncologist, and 13 hospitals, from Ambo, Assela and Axum to Jijiga, Nekemte and Dubti, defined as centres that focus exclusively on treating breast cancer using chemotherapy, along with follow-up care. The plan's workforce table counts 20 clinical oncologists across these 30 chemotherapy centres and 60 nationally, against an estimated need of 480 for 120 million people, 6 breast surgeons against a need of 1,200, and no oncology pharmacists. It also lists 60 oncology-trained general practitioners and 56 oncology-trained nurses, all in those chemotherapy centres. Its 2029 target for breast cancer is 80% of patients completing multimodality treatment, from a baseline of 30%.",
          links: [
            { label: "Integrated National Cancer Control Plan 2025 to 2029, section 1.7.2 and appendices 5 and 6 (PDF)", url: NCCP_2025 },
          ],
        },
        {
          id: "childhood",
          title: "Childhood cancer: paediatric units and satellite clinics built with partners",
          plain:
            "Ethiopia is one of the World Health Organization's priority countries for childhood cancer. With the Aslan Project and St. Jude Global, it has opened five paediatric haematology-oncology centres and eight satellite clinics, and the country now has 20 paediatric haemato-oncologists. Survival for children with cancer is 20 to 30%, and the plan aims for 60%.",
          detail:
            "The 2025 to 2029 plan reports that, in collaboration with the Aslan Project and St. Jude Global Health, 5 paediatric haematology-oncology centres and 8 satellite clinics have been established, and that the country has 20 paediatric haemato-oncologists with 7 more in fellowship. It folds the National Childhood and Adolescent Cancer Control Plan 2019 to 2023 into the integrated plan and sets targets of 60% survival for children with cancer, from a baseline of 30%, and a 60% fall in treatment abandonment by 2029. The IAEA wrote in March 2024 that WHO had flagged Ethiopia as a CureAll priority focus country, that treatment abandonment ran at 20 to 50%, and that 75% of children reaching a paediatric cancer unit already had advanced disease, citing the Aslan Project. The plan names civil society groups that give cancer patients accommodation, food and psychological support: the Mathiwos Wondu-Ye Ethiopia Cancer Society at Tikur Anbessa, and the Tesfa Addis Parents Childhood Cancer Organization across all five paediatric programmes. A 2023 study costed the paediatric oncology unit at Tikur Anbessa at about 361 US dollars per disability-adjusted life year averted.",
          links: [
            { label: "Integrated National Cancer Control Plan 2025 to 2029, sections 1.7.2 and 2.2 and priority area 3 (PDF)", url: NCCP_2025 },
            { label: "IAEA: Ethiopia is expanding access to radiation medicine (26 March 2024; read through the Internet Archive)", url: IAEA_IMPACT_WB },
            { label: "Kiros et al., cost-effectiveness of a paediatric oncology unit in Ethiopia (BMJ Open 2023)", url: "https://doi.org/10.1136/bmjopen-2022-068210" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the national plan",
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Ethiopia",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 4 November 2026, none of the cancer trials in our records lists a site in Ethiopia. The Ethiopian research on this page is observational or costing work: the Addis Ababa registry, a study of cervical screening follow-up, and costing used to set health priorities.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 4 November 2026: 0 trials list Ethiopia among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines, not every study in Ethiopia; when OnCo built its country file on 8 September 2026, ClinicalTrials.gov counted 364 studies of any condition with a site in Ethiopia, and the search linked below shows the cancer studies among them. OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Ethiopia 224 works in 2021, 256 in 2022, 252 in 2023, 299 in 2024 and 327 in 2025, 1,358 in total, of which 1,077 are open access and 85 highly cited. The Addis Ababa registry, based at Addis Ababa University, has had technical support from Martin Luther University Halle-Wittenberg, and researchers from both universities wrote the two registry papers and the screening follow-up study listed on this page. Before a trial opens, EFDA authorises it under its 2025 guideline, with a first answer due within 45 working days for a routine application.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Ethiopia (search)", url: CTGOV },
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "Timotewos et al., first data from a population based cancer registry in Ethiopia (Cancer Epidemiol 2018)", url: "https://doi.org/10.1016/j.canep.2018.01.008" },
          ],
        },
        {
          id: "plan-2025",
          title: "The 2025 to 2029 plan: cut premature cancer deaths by 15%, for about 141 million US dollars",
          plain:
            "Ethiopia's integrated national cancer plan, which follows a 2016 to 2020 plan and a childhood cancer plan, was posted on the International Cancer Control Partnership's portal in January 2025. It aims to reduce premature deaths from cancer by 15% by 2029. It focuses on breast, cervical and childhood cancers and costs about 141 million US dollars over five years, almost half of it for diagnosis and treatment.",
          detail:
            "The Integrated National Cancer Control Plan 2025 to 2029 builds on the first costed National Cancer Control Plan (2016 to 2020) and the National Childhood and Adolescent Cancer Control Plan (2019 to 2023), and was grounded in the recommendations of the IAEA, WHO and IARC imPACT Review of November 2023. Its goal is to reduce premature mortality from cancer by 15% by 2029, with four priority areas (breast cancer, cervical cancer, childhood and adolescent cancer, and other cancers including colorectal, prostate, non-Hodgkin lymphoma and liver) and five pillars from prevention to palliative care. It is costed at 141,026,900 US dollars over 2025 to 2029: 46.75% for diagnosis and treatment, 18.03% for prevention, 10.45% for supportive and palliative care and 7.71% for surveillance and research; by category, medical equipment is 35.3% and medicines 23.5%. It sets a target of keeping stock-outs of oncology commodities below 30%. The plan notes that the 2016 to 2020 National Cancer Control Committee, co-chaired by the First Lady, is no longer in place, and that the Ministry has two designated cancer officers and no regional cancer focal points yet.",
          links: [
            { label: "Integrated National Cancer Control Plan 2025 to 2029, chapters 2, 3 and 7 (PDF)", url: NCCP_2025 },
            { label: "ICCP: National Cancer Control Plan of Ethiopia 2025 to 2029 (24 January 2025)", url: NCCP_NEWS },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "impact-report",
      title: "The full imPACT Review report for Ethiopia could not be read",
      plain:
        "IAEA, WHO and IARC reviewers assessed Ethiopia's cancer services in November 2023. OnCo found no published report or summary of their findings; the recommendations quoted here come from the appendix of the Ministry of Health's 2025 to 2029 plan, and the IAEA's own article refused a plain request and was read through the Internet Archive.",
      detail:
        "OnCo found no published imPACT Review report for Ethiopia, only the IAEA's news article of 26 March 2024, which returned HTTP 403 to a plain request on 4 November 2026 and was read from the Internet Archive's copy, and the summary of recommendations reprinted in appendix 2 of the national plan. The reviewers' own counts of radiotherapy machines, oncologists, pathology and imaging, which the full report would hold, are therefore not on this page except as quoted by the plan or the article.",
      links: [
        { label: "IAEA: Ethiopia is expanding access to radiation medicine (26 March 2024)", url: IAEA_IMPACT },
        { label: "Integrated National Cancer Control Plan 2025 to 2029, appendix 2 (PDF)", url: NCCP_2025 },
      ],
    },
    {
      id: "radiotherapy-now",
      title: "How many radiotherapy centres are treating patients now is not confirmed",
      plain:
        "Sources disagree on radiotherapy. The IAEA wrote in March 2024 that only three public hospitals could give it, with five more centres under construction; the Ministry of Health's plan lists seven comprehensive centres with radiotherapy in December 2024. OnCo found no official announcement of the newer centres opening, and the IAEA's directory of radiotherapy centres lists two.",
      detail:
        "The Ministry's news page records the Jimma centre opening on 20 February 2022 as the country's second. The plan's statement that four centres are equipped with linear accelerators and operational since November 2020 is hard to square with the Ministry's own 2022 page, which says that before Jimma radiotherapy was available only at Tikur Anbessa. The plan's appendix 6 labels Ayder, Gondar, Hawassa, Hiwot Fana, Jimma, St Paul's and Tikur Anbessa comprehensive with radiotherapy, while its appendix of imPACT recommendations asks to complete construction at Gondar, Mekelle and St Paul's. The IAEA's Directory of Radiotherapy Centres, read on 16 November 2026, lists two centres in Ethiopia: Addis Ababa University Tikur Anbessa Specialized Hospital (Black Lion Hospital) in Addis Ababa, with one linear accelerator, one cobalt-60 unit and brachytherapy, in an entry last updated in 2021; and Jimma University Radiotherapy Center in Jimma, with one linear accelerator and no brachytherapy, in an entry last updated in 2022. Entries are self-reported and these are several years old, so the directory may lag behind the plan's four centres with linear accelerators. OnCo could not find a dated official count of working machines for 2025 or 2026; ask the referring hospital which centre is treating and how long the wait is.",
      links: [
        { label: "Ministry of Health: radiation therapy centre inaugurated at Jimma University Hospital (20 February 2022)", url: MOH_JIMMA },
        { label: "Integrated National Cancer Control Plan 2025 to 2029, section 1.7.2 and appendices 2 and 6 (PDF)", url: NCCP_2025 },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries data", url: DIRAC },
      ],
    },
    {
      id: "approval-times",
      title: "No published registration times for cancer medicines in Ethiopia",
      plain:
        "OnCo found no published target or measured time for EFDA to register a new medicine, no list of cancer medicines registered in Ethiopia with their dates, and no rules saying which cancer medicines community-based health insurance pays for. EFDA's own guideline acknowledges long waits for registration.",
      detail:
        "EFDA's guidelines page did not list a marketing authorisation guideline for new human medicines that OnCo could reach; its renewal guideline sets times for renewing an existing authorisation, not for a first registration, and is not used here. Third-party regulatory consultancies and university theses quote registration times; they are not used. The essential health services package and the 54 essential cancer medicines on the 6th national list are named in the plan, but the list itself was not read here; the plan's appendix 4 reprints an essential cancer drug list of 51 items. Whether a medicine is registered, stocked by the Ethiopian Pharmaceutical Supply Service, or free under the package is a separate question this page cannot answer medicine by medicine.",
      links: [
        { label: "EFDA: about EFDA", url: EFDA_HOME },
        { label: "EFDA: guideline on reliance for cGMP inspection, EFDA/GDL/052 (PDF)", url: EFDA_GMP_RELIANCE },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: survival after a cancer diagnosis in Ethiopia, the 2021 second edition of the cervical cancer guideline, an official cervical screening coverage figure for 2025 or 2026, and the registry's own report beyond its papers' abstracts.",
      detail:
        "No population-based survival figures for adults in Ethiopia were found in the sources read; the 20 to 30% survival for childhood cancer is the plan's statement. The cervical guideline read here is the 2015 edition; parts of its screening section are encoded in a font that extracts as unreadable text, and a 2021 edition is cited by researchers but was not found. The 20% cervical screening coverage is the plan's projection for the end of 2024, not a measured figure. The plan's HPV vaccination baseline (80%), WHO's own coverage estimates (58% in 2024 and 51% in 2025) and the administrative first-dose coverage in WHO's data (88% and 96%) differ, and all are quoted. The Addis Ababa registry has no website of its own, its African Cancer Registry Network page was last updated in October 2014, and only the abstract of its 2018 to 2022 paper was read. IARC's detailed data sources and methods page for Ethiopia was not read; the method is taken from the fact sheet.",
      links: [
        { label: "African Cancer Registry Network: Addis Ababa City Cancer Registry", url: AFCRN_ADDIS },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Ethiopia (PDF)", url: IARC_FACTSHEET },
      ],
    },
  ],
  institutions: [
    "ethiopia-ministry-of-health", "addis-ababa-city-cancer-registry", "efda-ethiopia", "ehis-ethiopia", "tikur-anbessa-hospital",
    "mathiwos-wondu-foundation", "iaea", "iarc", "who", "st-jude",
  ],
  companies: [],
  drugs: ["trastuzumab"],
  trials: [],
  papers: [
    "paper-gizaw-addis-ababa-incidence-2018-2022-canep-2026", "paper-timotewos-addis-ababa-first-data-canep-2018", "paper-memirie-ethiopia-cancer-incidence-2015-jgo-2018",
    "paper-eregata-ethiopia-ehsp-revision-hsr-2020", "paper-kiros-paediatric-oncology-cea-ethiopia-bmjopen-2023", "paper-stroetmann-via-follow-up-ethiopia-oncologist-2024",
  ],
  people: [],
  how:
    "Every card was written from Ethiopian official sources and international reviews, read in full rather than through a summary: the Federal Ministry of Health's Integrated National Cancer Control Plan 2025 to 2029 and its 2015 cervical cancer guideline; the Ministry's news page on the Jimma radiotherapy centre; the Ethiopian Health Insurance Service's 2025 news pages; EFDA's announcements and its 2024 reliance and 2025 clinical trial guidelines; the African Cancer Registry Network's page for the Addis Ababa registry; WHO's HPV coverage rows from its public data API; the IAEA's article on the November 2023 imPACT Review, through the Internet Archive, and its directory of radiotherapy centres; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data, and research output from OpenAlex. The new records added for this page (the Ministry, the registry, EFDA, the insurer and six papers) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates made by applying subnational registry rates to the whole population, not a national count. Which hospitals give radiotherapy, which medicines are in stock and what community-based insurance pays for change faster than the published plans; ask the treating hospital's oncology department or the district insurance office what applies to you. Cervical screening and HPV testing are being expanded facility by facility, so availability depends on where you live.",
  verifyLinks: [
    { label: "Federal Ministry of Health, Ethiopia", url: "https://www.moh.gov.et/" },
    { label: "Ethiopian Health Insurance Service", url: "https://www.ehis.gov.et/" },
    { label: "Ethiopian Food and Drug Authority", url: EFDA_HOME },
    { label: "Integrated National Cancer Control Plan 2025 to 2029 (PDF)", url: NCCP_2025 },
  ],
};

import type { CountryDive } from "@/data/country-dive";

/**
 * Rwanda deep dive: the hand-written cards for /countries/rw/ (wave 12). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: the National Cancer Control Plan 2025 to 2029 published by
 * the Rwanda Biomedical Centre (PDF text, March 2025), the Ministry of Health's page on the inauguration of the Rwanda
 * Cancer Centre, the Rwanda Social Security Board's page on community-based health insurance, WHO's 5 December 2024
 * news item on maturity level 3, WHO's HPV coverage rows for Rwanda from its public immunisation data API, the World
 * Bank's out-of-pocket series, and IARC's GLOBOCAN 2024 fact sheet for Rwanda. Where a figure could not be read it is
 * named under `gaps`.
 */
const NCCP_2025 = "https://www.rbc.gov.rw/fileadmin/user_upload/strategy/National_Cancer_Control_Plan__NCCP__2025-2029__3_-Signed.pdf";
const NCCP_2020 = "https://www.iccp-portal.org/system/files/plans/Rwanda%20NCCP%20Final_Signed.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/646-rwanda-fact-sheet.pdf";
const MOH_RCC = "https://www.moh.gov.rw/news-detail/president-kagame-inaugurates-rwanda-cancer-centre";
const RSSB_CBHI = "https://rssb.rw/schemes/cbhi-scheme";
const WHO_ML3 = "https://www.who.int/news/item/05-12-2024-senegal-and-rwanda-achieve-who-maturity-level-3-in-medicines-regulation";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'RWA'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=RW";
const CTGOV = "https://clinicaltrials.gov/search?country=Rwanda&cond=cancer";
const AFCRN_RW = "https://afcrn.org/index.php/membership/membership-list/167-rwanda-ncr";

export const RW_DIVE: CountryDive = {
  iso2: "RW",
  iso3: "RWA",
  name: "Rwanda",
  flag: "🇷🇼",
  asOf: "2026-11-11",
  title: "Cancer in Rwanda",
  description:
    "Cancer in Rwanda from Rwandan sources: IARC's estimate of 12,440 new cancers and 7,991 deaths in 2024, a national registry that recorded 25,754 cases from 2019 to 2024, community-based health insurance that adds cancer medicines from July 2025, one radiotherapy centre with two machines, a school HPV vaccination programme since 2011, and a regulator rated at WHO maturity level 3.",
  lede:
    "Rwanda has a national cancer registry, a cancer plan for 2025 to 2029 and health insurance that covers most of the population, but cancer treatment is concentrated in three hospitals and one radiotherapy centre. Its cancer plan says the registry captures about four in five of the cancers IARC estimates, and that most cancers are found late.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Rwanda is 12,440 new cancers and 7,991 deaths, an age-standardised incidence of 136.0 per 100,000 (139.3 in men, 138.4 in women). IARC's fact sheet gives its incidence source as a subnational registry, with subnational rates applied to the 2024 population, and mortality as national incidence applied to modelled mortality-to-incidence ratios. The Rwanda National Cancer Registry counts what reaches its hospitals: 4,904 to 5,384 cancers a year from 2019 to 2023. The national plan compared its 2022 count of 5,548 with GLOBOCAN 2022's estimate of 7,122 and read the gap as under-reporting and undiagnosed patients; the 2024 estimate is higher again. The two numbers measure different things and should not be read as a trend.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Rwanda",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Rwanda (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 12,400 new cancers a year; prostate, breast and cervical cancer lead",
          plain:
            "IARC estimates 12,440 new cancers in Rwanda in 2024, 7,271 of them in women, and 7,991 cancer deaths. Prostate cancer is the commonest cancer overall, then breast and cervical cancer. Cervical cancer kills more people than breast cancer.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,856 prostate cancers (1,179 deaths), 1,684 breast cancers (813 deaths), 1,582 cervical cancers (965 deaths), 925 colorectal cancers (535 deaths) and 895 stomach cancers (728 deaths). In men the leading cancers by cases are prostate, colorectum and liver; in women breast, cervix and colorectum. The risk of developing a cancer before age 75 is 15.5% for men and 14.3% for women, and an estimated 23,979 people are living within five years of a diagnosis. The National Cancer Control Plan 2025 to 2029 says the national registry's data corroborate published findings that most cancers in Rwanda are diagnosed at advanced stages.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Rwanda (PDF)", url: IARC_FACTSHEET },
            { label: "National Cancer Control Plan 2025 to 2029, section 1 (Rwanda Biomedical Centre, PDF)", url: NCCP_2025 },
          ],
        },
        {
          id: "registry",
          title: "A national registry that counts what reaches hospitals: 25,754 cancers from 2019 to 2024",
          plain:
            "The Rwanda National Cancer Registry, revitalised since 2007 according to the national plan, records cancers seen in the country's hospitals. It recorded about 5,000 new cancers a year from 2019 to 2023, which the plan says is about 78% of the cancers IARC estimated.",
          detail:
            "The National Cancer Control Plan 2025 to 2029 gives the registry's annual totals as 4,983 (2019), 4,904 (2020), 5,261 (2021), 5,384 (2022) and 5,164 (2023), and 25,754 cases for 2019 to 2024, covering all hospitals, with its data now integrated into the national District Health Information System (DHIS2). It compares 5,548 registry cases with GLOBOCAN 2022's 7,122 and reads the gap as under-reporting in health facilities and patients who are never diagnosed. Over the five years the leading cancers in the registry were breast, cervical, prostate, gastric and blood cancers, and cancers among women made up 59% of cases. The plan names financial constraints, a shortage of registrars and inconsistent electronic medical records as the registry's problems, and plans to integrate it with hospital records. The registry's page on the African Cancer Registry Network tells a longer history: a first population-based registry for the former Butare Province from 1991, which stopped during the 1994 genocide against the Tutsi; a Kigali registry from 2010 that collapsed for lack of funds in 2014; and the national registry re-established by the Ministry of Health through RBC in July 2018, moved to a DHIS2 oncology tracker in 2019, which collects from five cancer centres, 23 private hospitals, clinics and laboratories, and 45 provincial and district hospitals.",
          links: [
            { label: "National Cancer Control Plan 2025 to 2029, sections 1.3 and 2.2.2.5 (PDF)", url: NCCP_2025 },
            { label: "African Cancer Registry Network: Rwanda National Cancer Registry", url: AFCRN_RW },
          ],
        },
      ],
      tables: [
        {
          id: "rw-registry",
          title: "Cancers recorded by the Rwanda National Cancer Registry",
          caption: "New cancers recorded per year, 2019 to 2023, as the National Cancer Control Plan 2025 to 2029 reports them.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "Cancers recorded", numeric: true },
          ],
          rows: [
            { year: "2019", cases: 4983 },
            { year: "2020", cases: 4904 },
            { year: "2021", cases: 5261 },
            { year: "2022", cases: 5384 },
            { year: "2023", cases: 5164 },
          ],
          note: "The registry records cancers presenting at health facilities, so it counts fewer than IARC estimates; the plan puts its capture at about 78%. The plan also gives 5,548 as a registry figure when it compares with GLOBOCAN 2022, a different number from its own 2022 row, and does not explain the difference.",
          sources: [{ label: "National Cancer Control Plan 2025 to 2029, section 1.3 (PDF)", url: NCCP_2025 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: community insurance that adds cancer medicines",
      aside: { label: "RSSB: community-based health insurance (Mutuelle de Santé)", url: RSSB_CBHI },
      cards: [
        {
          id: "cbhi",
          title: "Mutuelle de Santé covers 89% of Rwandans, and from July 2025 their cancer medicines",
          plain:
            "Most Rwandans are insured through community-based health insurance, known as Mutuelle de Santé, which the Rwanda Social Security Board runs and says covers 89.06% of the population. It covered most of the cost of diagnosis and surgery but not cancer medicines; the national plan says it would cover them from July 2025.",
          detail:
            "RSSB's page sets the annual premium by household income category: 4,000 Rwandan francs a person for those with no income, paid in full by the government; 4,000 francs for incomes below 30,000 francs a month, of which the member pays 3,000; 5,000 francs, 8,000 francs and 20,000 francs for the three higher bands, without subsidy. It reports 11 million beneficiaries and 89.06% population coverage. The National Cancer Control Plan 2025 to 2029 says the scheme covers only 90% of diagnostics and surgery and previously excluded cancer drugs, leaving systemic treatment unaffordable, so that many patients sought free care at Butaro or paid out of pocket at referral hospitals, and that systemic cancer drugs would be covered from July 2025. OnCo has not read a source confirming that the change took effect; see the gaps. The World Bank's series, from WHO's health expenditure database, puts out-of-pocket spending at 4.1% of current health spending in 2023.",
          links: [
            { label: "RSSB: CBHI scheme (Mutuelle de Santé)", url: RSSB_CBHI },
            { label: "National Cancer Control Plan 2025 to 2029, section 2.2.2.4 (PDF)", url: NCCP_2025 },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Rwanda", url: WB_OOP },
          ],
        },
        {
          id: "plan-cost",
          title: "The cancer plan costs 396 billion francs over five years, nearly half of it for medicines",
          plain:
            "Rwanda's cancer plan for 2025 to 2029 is costed at about 396 billion Rwandan francs, or 283 million US dollars, over five years. Cancer treatment medicines are 47% of the cost, the largest single item.",
          detail:
            "The plan's costing chapter estimates the total investment at RWF 396 billion (USD 283 million), with annual costs of RWF 91.8, 76.3, 84.5, 69.1 and 73.9 billion. It assumes inflation of 3.44% in year two and 3.69% after, a 20% rise in medicine and commodity costs from year one to year two and 10% a year after. A figure printed in the same chapter gives an earlier draft total of RWF 390 billion (USD 279 million). The plan's treatment pillar dominates the budget. It does not say how much of the cost is already funded.",
          links: [{ label: "National Cancer Control Plan 2025 to 2029, section 3.4 (PDF)", url: NCCP_2025 }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: Rwanda FDA, rated at maturity level 3",
      aside: { label: "WHO: Senegal and Rwanda achieve maturity level 3 (5 December 2024)", url: WHO_ML3 },
      cards: [
        {
          id: "rfda",
          title: "WHO rated the Rwanda Food and Drugs Authority at maturity level 3 in December 2024",
          plain:
            "The Rwanda Food and Drugs Authority is Rwanda's medicines regulator. In December 2024 WHO announced that it had reached maturity level 3, a stable and well-functioning regulatory system, after an assessment finished in October 2024.",
          detail:
            "WHO's news item of 5 December 2024 says Senegal and Rwanda became the seventh and eighth countries in Africa to reach maturity level 3 in WHO's global classification of national regulatory authorities, which benchmarks systems against more than 250 indicators; level 4 is the highest. The assessment was finalised in October 2024 with WHO's regional office for Africa and its country offices. WHO quotes its Assistant Director-General for Access to Medicines saying Rwanda was the second country in the East African region to reach the level, after Tanzania in 2018. The national cancer plan sets an action to develop a streamlined regulatory framework for approving and conducting cancer clinical trials; OnCo has not read Rwanda FDA's own trial authorisation guideline (see the gaps).",
          links: [
            { label: "WHO: Senegal and Rwanda achieve WHO maturity level 3 in medicines regulation (5 December 2024)", url: WHO_ML3 },
            { label: "National Cancer Control Plan 2025 to 2029, pillar 5, objective on clinical trials (PDF)", url: NCCP_2025 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Vaccination and screening",
      aside: { label: "WHO: HPV vaccination coverage rows for Rwanda (data API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination since 2011: 90% of girls in WHO's 2025 figures",
          plain:
            "Rwanda began vaccinating girls against HPV, the virus behind cervical cancer, in 2011 through schools. WHO's data give programme coverage among girls of 90% for both the first dose and the last dose in 2025.",
          detail:
            "The National Cancer Control Plan 2025 to 2029 states that Rwanda was the first country in Africa to introduce a national HPV vaccination programme, that coverage has consistently been above 90% of eligible girls, that more than 1.2 million girls and women have been vaccinated, and that coverage was about 91% for girls aged 9 to 14 from 2011 to 2018. WHO's immunisation data, read from its public API, give HPV programme coverage among females of 81% (first dose) and 70% (last dose) in 2023, 77% and 77% in 2024, and 90% and 90% in 2025. The plan also reports 99% national coverage of infant hepatitis B vaccination, which prevents liver cancer.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Rwanda (data API)", url: WHO_HPV_API },
            { label: "National Cancer Control Plan 2025 to 2029, section 2.2.2.1 (PDF)", url: NCCP_2025 },
          ],
        },
        {
          id: "cervical-screen",
          title: "464,690 women screened for cervical cancer in five years, most with an HPV test",
          plain:
            "From 2020 to 2024 Rwanda screened 464,690 women for cervical cancer at district hospitals and health centres, out of about 1.6 million eligible women a year. Women with precancer are treated on the spot. Breast checks are by clinical examination; there is no national breast screening programme.",
          detail:
            "The plan's table of cervical screening gives 27,858 women screened in 2020, 76,561 in 2021, 110,307 in 2022, 132,152 in 2023 and 117,812 in 2024, against 1,507,983 to 1,662,619 eligible women aged 25 to 65 a year. Of the 464,690, 322,504 (69.4%) had an HPV test and 45,471 tested positive; 142,186 had visual inspection with acetic acid only. 17,751 women were positive on visual inspection, 12,917 were treated by thermal ablation and 164 by loop excision, and 2,552 were suspected of having cancer. For breast cancer the plan says a national screening programme is yet to be established; 521,143 clinical breast examinations were done from 2019 to 2024, finding 25,813 abnormal results. It says colorectal screening, planned in the previous plan, did not materialise.",
          links: [{ label: "National Cancer Control Plan 2025 to 2029, tables 2 and 3 (PDF)", url: NCCP_2025 }],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Treatment capacity: three centres, one radiotherapy unit, 17 oncologists",
      aside: { label: "Ministry of Health: President Kagame inaugurates Rwanda Cancer Centre", url: MOH_RCC },
      cards: [
        {
          id: "radiotherapy",
          title: "One radiotherapy centre, with two linear accelerators, since 2019",
          plain:
            "Before 2019 Rwandans who needed radiotherapy were sent abroad. The Rwanda Cancer Centre at Rwanda Military Hospital in Kanombe, Kigali, began treating patients in March 2019 with two linear accelerators. The national plan still calls it the sole radiotherapy provider and plans two more centres.",
          detail:
            "The Ministry of Health's page on the inauguration says that four years earlier less than 10% of the population in need could get treatment and about USD 1 million was spent on transfers abroad for radiotherapy; that the centre, conceived in 2016 at Rwanda Military Hospital, was built by the French company UNTEC and funded by the Government of Rwanda, the Global Fund and the CDC; that it became operational in March 2019 and was launched on 4 February 2020; and that its radiotherapy unit has two linear accelerators using volumetric modulated arc therapy. The plan for 2025 to 2029 says treatment is concentrated at the Rwanda Cancer Centre, Butaro Hospital and King Faisal Hospital, that radiotherapy capacity is below the IAEA's recommended 4 units per million people with only two machines, that brachytherapy was expected by June 2025, and plans two further radiotherapy centres, at the University Teaching Hospital of Butare in the south and Butaro in the north.",
          links: [
            { label: "Ministry of Health: President Kagame inaugurates Rwanda Cancer Centre", url: MOH_RCC },
            { label: "National Cancer Control Plan 2025 to 2029, sections 2.2.2.4 and 3.3.4 (PDF)", url: NCCP_2025 },
          ],
        },
        {
          id: "workforce",
          title: "Seventeen oncologists, six medical physicists and seven radiation therapists",
          plain:
            "The national plan counts Rwanda's trained cancer workforce as 17 oncologists, 20 pathologists, 20 radiologists, 6 medical physicists, 25 oncology nurses and 7 radiation therapy technologists, concentrated in Kigali. Six facilities have mammography and five have MRI.",
          detail:
            "Section 2.2.1 of the plan gives 17 oncologists (3 medical and 14 clinical oncologists), 20 pathologists, 20 radiologists, 6 medical physicists, 25 oncology nurses and 7 radiation therapy technologists, centralised at Rwanda Military Referral and Teaching Hospital; a later section gives 5 medical physicists. It counts 19 facilities with endoscopy, pathology services in six institutions with limited immunohistochemistry, 13 CT scanners in 12 facilities, MRI in 5 facilities and mammography in 6, and 51 major operating theatres across university hospitals. Some pathology samples are sent abroad. The plan records a new medical oncology fellowship at the University of Rwanda.",
          links: [{ label: "National Cancer Control Plan 2025 to 2029, section 2.2.1 (PDF)", url: NCCP_2025 }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Rwanda does differently",
      cards: [
        {
          id: "decentralised",
          title: "Care built around a rural district hospital, and support to stay on treatment",
          plain:
            "Butaro, a district hospital in the rural north where the government and Partners In Health run a cancer centre, gives patients free care, lodging and transport support. The national plan wants to copy that support nationwide and to take chemotherapy to every province.",
          detail:
            "The plan describes Butaro's free lodging, counselling and transport as a model that could improve adherence if extended nationwide, notes that patients have travelled long distances and abandoned treatment for lack of lodging, and proposes a time-bound referral route modelled on the United Kingdom's two-week rule. Its treatment objectives include a chemotherapy infusion centre in each province, two new radiotherapy centres and cancer services in public insurance. The plan for 2020 to 2024, which called itself the first National Cancer Control Plan, was published in February 2020; the second costs treatment medicines at nearly half of all spending, in step with its plan to add cancer drugs to community insurance.",
          links: [
            { label: "National Cancer Control Plan 2025 to 2029, sections 2.2.2.4 and 3.3.4 (PDF)", url: NCCP_2025 },
            { label: "National Cancer Control Plan 2020 to 2024 (ICCP portal, PDF)", url: NCCP_2020 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Rwanda", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records lists a site in Rwanda",
          plain:
            "None of the trials in OnCo's records lists Rwanda among its countries. The national plan says Rwanda's cancer research is mostly about delivering services, with no clinical trial or translational research output, and sets out to build trial capacity.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: no trial record lists Rwanda. OnCo holds a selection of trials, not the registry, so ClinicalTrials.gov itself (link) is the place to search. The National Cancer Control Plan 2025 to 2029 counts 400 PubMed cancer publications on Rwanda in the last five years against 194 in the five years before, says about four papers have used registry data, and describes the output as implementation, health service and epidemiological research with no clinical trials or translational research. Its research pillar includes a regulatory framework for cancer trials, training in trial design and patient education about trials.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Rwanda", url: CTGOV },
            { label: "National Cancer Control Plan 2025 to 2029, section 2.2.2.5 and pillar 5 (PDF)", url: NCCP_2025 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-drug-coverage",
      title: "Whether cancer medicines are now covered by Mutuelle de Santé",
      plain:
        "The national plan, published in March 2025, says community insurance would cover cancer medicines from July 2025. OnCo did not find an RSSB or Ministry of Health page confirming that the change took effect or listing which medicines it covers.",
      detail:
        "RSSB's scheme page (read 11 November 2026) lists premiums and coverage but no benefit list for cancer drugs. A reader should ask RSSB or the treating hospital what is covered. OnCo will add the source when it finds one rather than infer it from the plan.",
      links: [
        { label: "RSSB: CBHI scheme", url: RSSB_CBHI },
        { label: "National Cancer Control Plan 2025 to 2029 (PDF)", url: NCCP_2025 },
      ],
    },
    {
      id: "gap-sources",
      title: "Sources not read for this page",
      plain:
        "OnCo did not read the Rwanda FDA's clinical trial guidelines or its list of registered cancer medicines, a registry report from the Rwanda National Cancer Registry itself, or IAEA radiotherapy figures for Rwanda. The figures on this page come from the national plan instead.",
      detail:
        "The registry figures here are those the National Cancer Control Plan 2025 to 2029 quotes; OnCo did not find a separate published registry report. IAEA's DIRAC database needs an account for most queries. The Rwanda FDA site (rwandafda.gov.rw) was not read for this page. Each is a named gap, not a claim that the source does not exist.",
      links: [
        { label: "Rwanda Food and Drugs Authority", url: "https://rwandafda.gov.rw/" },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["rwanda-biomedical-centre", "rwanda-fda", "rssb-rwanda", "rwanda-cancer-centre", "butaro-cancer-center", "who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [],
  people: ["nadine-karema"],
  how:
    "Every card was written from Rwandan public sources read as raw text on 11 November 2026: the National Cancer Control Plan 2025 to 2029 (PDF), the Ministry of Health's page on the Rwanda Cancer Centre, RSSB's page on community-based health insurance, WHO's maturity level announcement and immunisation data, the World Bank's out-of-pocket series and IARC's GLOBOCAN 2024 fact sheet. Most figures come from the national plan, which quotes the national registry.",
  verify:
    "Check the plan's figures against its own tables before relying on them, and ask RSSB or the treating hospital what community insurance covers today. Treatment capacity changes as centres open.",
  verifyLinks: [
    { label: "National Cancer Control Plan 2025 to 2029 (PDF)", url: NCCP_2025 },
    { label: "RSSB: CBHI scheme", url: RSSB_CBHI },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Rwanda (PDF)", url: IARC_FACTSHEET },
  ],
};

import type { CountryDive } from "@/data/country-dive";

/**
 * Iceland deep dive: the hand-written cards for /countries/is/ (wave 13). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: the OECD and European Commission Country Cancer Profile
 * for Iceland 2025 (PDF text, columns split); the Directorate of Health's quality reports on cervical and breast
 * screening for 2025, published June 2026 (PDF text, in Icelandic), and its screening register and annual report
 * pages; the Coordination Centre for Cancer Screening's pages on breast, cervical and bowel screening; the Ministry of
 * Health's August 2025 report "Geislameðferð" on radiotherapy (PDF text) and its news items of 29 January 2019,
 * 20 June 2024 and 28 October 2025 on the cancer plan; Alþingi's resolution 611/156 on the cancer action plan 2025 to
 * 2029 (Internet Archive copy, because althingi.is answered a plain request with 403); the Icelandic Cancer Society's
 * pages on the Cancer Registry; the Icelandic Medicines Agency's pages on its role, international cooperation, pricing
 * and reimbursement decisions, and regulation 1414/2020; Iceland Health's pages on the co-payment systems for care and
 * for medicines; Landspítali's pages on its radiotherapy department and its Cancer Centre; IARC's GLOBOCAN 2024 fact
 * sheet for Iceland; the IAEA DIRAC country row; WHO's HPV coverage rows from its immunisation data API; and the World
 * Bank's health spending series. Icelandic sources were read in Icelandic. The Cancer Registry publishes its
 * statistics only in an interactive dashboard and NORDCAN needs JavaScript, so neither set of tables could be read;
 * that and every other gap is named under `gaps`.
 */
const CCP_2025 = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-is-2024-1671-en.pdf";
const CCP_PAGE = "https://cancer-inequalities.jrc.ec.europa.eu/country-cancer-profiles-2025";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/352-iceland-fact-sheet.pdf";
const REGISTRY = "https://www.krabb.is/rannsoknir/rannsokna-og-skraningarsetur";
const REGISTRY_STATS = "https://www.krabb.is/krabbamein/tolfraedi/krabbamein-og-gaedaskraning";
const REGISTRY_SUMMARY = "https://www.krabb.is/krabbamein/tolfraedi/krabbamein-og-gaedaskraning/heildartolfraedi-meina";
const NORDCAN = "https://nordcan.iarc.fr/en";
const RT_REPORT = "https://www.stjornarradid.is/library/04-Raduneytin/Heilbrigdisraduneytid/ymsar-skrar/Geislame%c3%b0fer%c3%b0_sk%c3%bdrsla%20spretth%c3%b3ps_25.pdf";
const RT_DEPT = "https://island.is/s/landspitali/geislamedferdardeild/geislamedferdardeild-thjonusta";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const LSH_CENTRE = "https://island.is/s/landspitali/krabbameinsmidstod-landspitala";
const PLAN_2019 = "https://www.stjornarradid.is/efst-a-baugi/frettir/stok-frett/2019/01/29/Unnid-ad-verkefnum-krabbameinsaaetlunar-med-gildistima-til-arsins-2030/";
const PLAN_2024 = "https://www.stjornarradid.is/efst-a-baugi/frettir/stok-frett/2024/06/20/Tillaga-ad-adgerdaaaetlun-skyrsla-samradshops-um-krabbamein/";
const COUNCIL_2025 = "https://www.stjornarradid.is/efst-a-baugi/frettir/stok-frett/2025-10-28-Krabbameinsrad-sett-a-fot/";
const ACTION_PLAN = "https://web.archive.org/web/20251028130737/https://www.althingi.is/altext/156/s/0611.html";
const SCREEN_REPORTS = "https://island.is/skimun-krabbamein/arsskyrslur";
const SCREEN_CERVIX_2025 = "https://assets.ctfassets.net/8k0h54kbe6bj/2t2MxVyUTgMxaWzBiMVasm/930eb91cf6d42168ecd5f35f57698d33/da4eff1e-efbd-404a-a5ce-f30376a2d78e.pdf";
const SCREEN_BREAST_2025 = "https://assets.ctfassets.net/8k0h54kbe6bj/4iPWfQLPxwlWkWv9AyzoLa/dbe0885b820ffd11331c127f099492d8/d6af4238-68b0-4b11-90cd-b823e2003411.pdf";
const SCREEN_REGISTER = "https://island.is/skimun-fyrir-krabbameini-toelur";
const SKS = "https://island.is/s/hh/samhaefingarstod-krabbameinsskimana";
const SKS_BREAST = "https://island.is/s/hh/samhaefingarstod-krabbameinsskimana/brjostaskimun";
const SKS_CERVIX = "https://island.is/s/hh/samhaefingarstod-krabbameinsskimana/leghalsskimun";
const SKS_BOWEL = "https://island.is/s/hh/samhaefingarstod-krabbameinsskimana/ristilskimun";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'ISL'%20and%20startswith(ANTIGEN,'PRHPV')";
const COPAY = "https://island.is/en/co-payment-system-for-health-service";
const COPAY_MEDS = "https://island.is/greidsluthatttokukerfi-lyfja";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=IS";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=IS";
const WB_PC = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=IS";
const IMA_ROLE = "https://island.is/en/o/ima/organisation-and-role";
const IMA_INTL = "https://island.is/en/o/ima/international-cooperation";
const IMA_PRICING = "https://island.is/en/o/ima/pricing-and-reimbursement";
const IMA_DECISIONS = "https://island.is/s/lyfjastofnun/akvardanir-um-greidsluthatttokumal";
const REG_1414 = "https://island.is/reglugerdir/nr/1414-2020";
const CTGOV = "https://clinicaltrials.gov/search?country=Iceland&cond=cancer";

export const IS_DIVE: CountryDive = {
  iso2: "IS",
  iso3: "ISL",
  name: "Iceland",
  flag: "🇮🇸",
  asOf: "2026-11-16",
  title: "Cancer in Iceland",
  description:
    "Cancer in Iceland from Icelandic and European sources: a national registry kept since the 1950s that counted 2,043 new cancers in 2024, IARC's estimate of 2,025 cases and 679 deaths, one radiotherapy department with two linear accelerators at Landspítali, breast and cervical screening run by the public sector since 2021, bowel screening being introduced, HPV vaccination above 90 per cent for girls and boys, and a cancer action plan for 2025 to 2029 passed by parliament.",
  lede:
    "Iceland has fewer than 400,000 people, about 2,000 new cancers a year and one hospital, Landspítali in Reykjavík, that gives all of the country's radiotherapy and most of its specialised cancer care. A national registry has recorded cancers since the 1950s, parliament passed a cancer action plan for 2025 to 2029 in June 2025, and some patients travel to Sweden for treatment that Iceland does not offer.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Iceland is 2,025 new cancers (1,027 in men, 998 in women) and 679 deaths (360 and 319), an age-standardised incidence of 279.7 per 100,000 (275.7 in men, 287.1 in women) and mortality of 77.9 (82.9 in men, 74.3 in women). IARC's fact sheet names a national registry as the source for incidence and WHO's national mortality data for deaths, each with trends in national rates projected to 2024, so these are projections from Iceland's own data and not figures borrowed from neighbours. IARC's total includes non-melanoma skin cancer; without it the estimate is 1,850. A Ministry of Health report quotes the Icelandic Cancer Registry's own count as 2,043 new cancer diagnoses in 2024. IARC's rates are standardised to the world population, the European profile's to the European standard population and the Directorate of Health's to the Nordic one, so rates from the three cannot be compared with each other.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Iceland",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Iceland (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 2,000 new cancers a year; breast and prostate are the commonest, lung causes the most deaths",
          plain:
            "About 2,000 people in Iceland are told they have cancer each year. Breast cancer is the commonest in women and prostate cancer in men, followed by lung and bowel cancer. Lung cancer causes the most cancer deaths. Men's cancer death rate is the second lowest of the 29 European countries the European profile compares, and women's is a little above the European Union average.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet estimates 287 breast cancers (55 deaths), 274 prostate cancers (72 deaths), 221 lung cancers (150 deaths), 213 colorectal cancers (72 deaths) and 108 bladder cancers. The OECD and European Commission's Country Cancer Profile 2025 puts cancer mortality in 2021 at 217 deaths per 100,000 people, 8% below the EU average of 235; the rate among men (246) was the second lowest among the 27 EU countries plus Iceland and Norway, and the rate among women (198) was 8% above the EU average, which the profile calls the lowest gap between the sexes in that group. Between 2011 and 2021 cancer mortality fell by 22% among men and 10% among women. The profile adds that Iceland and Sweden became the two countries of the group in which lung cancer incidence is higher among women than men, and that lung cancer incidence appears to have peaked after smoking fell: the smoking rate among people aged 15 and over is 6%, which the profile gives as the lowest in the group.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Iceland (PDF)", url: IARC_FACTSHEET },
            { label: "OECD and European Commission: Country Cancer Profile Iceland 2025, sections 2 and 3 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "registry",
          title: "A national registry founded in 1954, run by the Cancer Society for the Directorate of Health",
          plain:
            "The Icelandic Cancer Registry (Krabbameinsskrá Íslands) was founded in 1954 and holds records of cancers diagnosed in Iceland from 1955; the Society says it covers more than 99% of them. The Icelandic Cancer Society runs it under a contract with the Directorate of Health. It counted 2,043 new cancers in 2024, according to a Ministry of Health report that quotes it.",
          detail:
            "The Society's page says the registry was founded by the Icelandic Cancer Society with the Directorate of Health in 1954, holds information on all cancers and their precursors from 1955, and covers more than 99% of cancers diagnosed in the population. It gained a legal basis in 2007 (Act 41/2007 and Regulation 548/2008) as one of the Directorate's health registers; the Society and the Ministry of Health share its running costs. Reports come from pathology and haematology laboratories, hospital wards, health centres and individual doctors, usually within two months of diagnosis. The registry is also building a quality register with Landspítali and Akureyri Hospital, modelled on Sweden's; the Country Cancer Profile says it is being developed for 23 cancers and is not used to compare hospitals. The profile quotes the registry's average for 2018 to 2022 as 937 men and 916 women diagnosed a year, and the Ministry of Health's August 2025 radiotherapy report gives 2,043 new cancer diagnoses in 2024 on the registry's information. The registry publishes its statistics as interactive dashboards, which OnCo could not read as text; see the gaps.",
          links: [
            { label: "Icelandic Cancer Society: Research Centre and Cancer Registry (in Icelandic)", url: REGISTRY },
            { label: "Icelandic Cancer Society: cancer statistics by site (dashboards, in Icelandic)", url: REGISTRY_STATS },
            { label: "Ministry of Health: Geislameðferð, report of August 2025, section 6 (PDF, in Icelandic)", url: RT_REPORT },
            { label: "Country Cancer Profile Iceland 2025, sections 2 and 5.2 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "survival-and-forecast",
          title: "Five-year relative survival rose from 23% to 68% over five decades; cases are forecast to rise by more than half by 2040",
          plain:
            "Of people diagnosed with cancer in Iceland between 2008 and 2017, 68% were alive five years later once other causes of death are allowed for, against 23% of those diagnosed between 1958 and 1967. Because the population is growing and ageing, the number of new cancers is forecast to rise by more than half by 2040.",
          detail:
            "The Country Cancer Profile 2025, citing the Icelandic Cancer Registry, gives five-year relative survival for all cancers as 23% among patients diagnosed in 1958 to 1967 and 68% among those diagnosed in 2008 to 2017, with gains for prostate, breast, colorectal and lung cancer, and 91.5% for boys and 95.8% for girls aged under 15 diagnosed in 2008 to 2017. It puts five-year prevalence in 2022 at 1,569 per 100,000 people against an EU average of 1,876; IARC's fact sheet estimates 6,832 people alive in 2024 within five years of a diagnosis. The Ministry of Health's notice on the cancer council says a recent forecast for Iceland expects new cancer cases to rise by 53 to 57% between 2022 and 2040 and the number of people living after a cancer diagnosis to rise by 54%. Survival figures describe groups of patients diagnosed years ago and do not predict any one person's course.",
          links: [
            { label: "Country Cancer Profile Iceland 2025, sections 2, 5.2 and 6 (PDF)", url: CCP_2025 },
            { label: "Ministry of Health: cancer council established, 28 October 2025 (in Icelandic)", url: COUNCIL_2025 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Iceland (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
      tables: [
        {
          id: "is-counts",
          title: "New cancers in Iceland: the registry's counts beside the estimates",
          caption: "Number of new cancers a year, from the Icelandic Cancer Registry as quoted in two reports, the European Cancer Information System's estimate and IARC's GLOBOCAN 2024 estimate.",
          columns: [
            { key: "source", label: "Source" },
            { key: "year", label: "Year" },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "all", label: "Both sexes", numeric: true },
          ],
          rows: [
            { source: "Icelandic Cancer Registry, quoted by the Ministry of Health", year: "2024", men: null, women: null, all: 2043 },
            { source: "Icelandic Cancer Registry, yearly average quoted in the Country Cancer Profile", year: "2018 to 2022", men: 937, women: 916, all: 1853 },
            { source: "European Cancer Information System estimate, without non-melanoma skin cancer", year: "2022", men: 847, women: 816, all: 1663 },
            { source: "IARC GLOBOCAN 2024 estimate, all cancers", year: "2024", men: 1027, women: 998, all: 2025 },
            { source: "IARC GLOBOCAN 2024 estimate, without non-melanoma skin cancer", year: "2024", men: null, women: null, all: 1850 },
          ],
          note: "Counts of new cases, not deaths. The two registry rows are as quoted by the Ministry of Health's August 2025 radiotherapy report and by the Country Cancer Profile 2025; neither source says whether non-melanoma skin cancer is included, and the registry's own tables could not be read. The both-sexes figures for 2018 to 2022 and for the 2022 estimate are OnCo's sums of the two sexes; the profile itself says over 1,660 for 2022.",
          sources: [
            { label: "Ministry of Health: Geislameðferð, August 2025, section 6 (PDF, in Icelandic)", url: RT_REPORT },
            { label: "Country Cancer Profile Iceland 2025, section 2 (PDF)", url: CCP_2025 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Iceland (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "is-sites",
          title: "IARC's five commonest cancers in Iceland, 2024",
          caption: "Estimated new cases, deaths and people alive within five years of diagnosis, both sexes, from IARC's GLOBOCAN 2024 fact sheet.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "prev", label: "5-year prevalent cases", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 287, deaths: 55, prev: 1257 },
            { site: "Prostate", cases: 274, deaths: 72, prev: 1201 },
            { site: "Lung", cases: 221, deaths: 150, prev: 307 },
            { site: "Colorectum", cases: 213, deaths: 72, prev: 713 },
            { site: "Bladder", cases: 108, deaths: 20, prev: 389 },
          ],
          note: "IARC's estimates, projected to 2024 from Iceland's registry and mortality data, not the registry's own counts. IARC computes prevalence from Nordic ratios of incidence to prevalence for 2011 to 2020. With a population under 400,000 the yearly numbers for less common cancers are small and move from year to year.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Iceland (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: public health insurance, with monthly and yearly ceilings on what a patient pays",
      aside: { label: "Iceland Health: the co-payment system for health care", url: COPAY },
      cards: [
        {
          id: "cover",
          title: "Hospital stays are free; outpatient fees stop at a monthly ceiling",
          plain:
            "Public health insurance, run by Iceland Health (Sjúkratryggingar), pays most of the cost of care. A stay in hospital, including surgery and medicines given there, is free. For visits, tests and scans a person pays fees up to a monthly ceiling of ISK 37,794, or ISK 25,198 for older and disabled people and children, and less in the months that follow.",
          detail:
            "Iceland Health's page says health insurance ensures that a person does not pay more than a set maximum each month: ISK 37,794 in general and ISK 25,198 for the elderly, the disabled, people on a rehabilitation pension and children aged 2 to 18, with no fee under 2. After reaching the maximum a person pays at most ISK 6,299 a month (ISK 4,331 for the reduced groups). Health centre fees, day ward and outpatient ward fees, specialists, tests, imaging and physiotherapy count towards it. The Country Cancer Profile 2025 says inpatient care, including surgery and drugs administered in hospitals, is free of charge, that travel costs for cancer care far from home are partly reimbursed with low-cost accommodation, and that patients on low incomes can apply for reimbursement of high medical, medicine and travel costs. The World Bank's series, from WHO's health expenditure database, puts out-of-pocket payments at 14.9% of current health spending in 2024 and the government's share at 83.6% in 2023, with spending of USD 7,642 per person in 2024; these cover all care, not cancer alone.",
          links: [
            { label: "Iceland Health: what do you have to pay for health care? The co-payment system", url: COPAY },
            { label: "Country Cancer Profile Iceland 2025, section 5.1 (PDF)", url: CCP_2025 },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Iceland", url: WB_OOP },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Iceland", url: WB_GOV },
            { label: "World Bank: current health expenditure per capita, Iceland", url: WB_PC },
          ],
        },
        {
          id: "medicine-costs",
          title: "Pharmacy medicines: the patient's share falls in five steps to nothing within 12 months",
          plain:
            "For medicines collected from a pharmacy, a person pays the full price up to ISK 22,800 in a 12-month period, then 40%, 15% and 7.5% of the price, and nothing once they have paid ISK 62,000. The limits are lower for people aged 67 and over, disability pensioners and people under 22. Medicines given in hospital are free.",
          detail:
            "Iceland Health's page sets out five steps for medicines with reimbursement: 100% up to ISK 22,800, 40% up to ISK 29,680, 15% up to ISK 36,730, 7.5% up to ISK 62,000 and 0% after that, counted over 12 months from the first purchase. For people aged 67 and over, disability pensioners, children and people under 22 the steps end at ISK 11,400, 16,840, 21,640 and 41,000. The fifth step, full payment by Iceland Health once the ceiling is reached, was added on 1 January 2026. Reimbursement is based on the lowest maximum price among equivalent generics, and a person who chooses a dearer product pays the difference. A doctor can apply for a medicine card (lyfjaskírteini) for a medicine that has no general reimbursement. The Icelandic Medicines Agency decides which medicines Iceland Health subsidises.",
          links: [
            { label: "Iceland Health: medicine costs and the reimbursement steps (in Icelandic)", url: COPAY_MEDS },
            { label: "Country Cancer Profile Iceland 2025, section 5.1 (PDF)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and access: the European route for authorisation, and a national decision on payment",
      aside: { label: "Icelandic Medicines Agency: organisation and role", url: IMA_ROLE },
      cards: [
        {
          id: "approval",
          title: "Lyfjastofnun authorises medicines inside the European Economic Area's network",
          plain:
            "The Icelandic Medicines Agency (Lyfjastofnun) is the medicines regulator. Iceland is in the European Economic Area, and the agency describes itself as a link in the chain of the area's medicines agencies around the European Medicines Agency. Authorisations that cover the whole area are handled centrally; the Icelandic agency handles national ones and authorises clinical trials.",
          detail:
            "The agency's page says it is an independent agency under the Ministry of Health with about 70 staff, that it grants marketing authorisations, supervises the manufacture, distribution and sale of medicines, handles adverse reaction reports and authorises clinical trials of medicinal products. It says the European Medicines Agency is at the centre of a network of medicines agencies in the European Economic Area and is responsible for authorisations that apply throughout the area, the centralised marketing authorisations, while the national agencies assess applications for national authorisations and those granted through mutual recognition. Its statutory tasks include assessing medicines under the Medicinal Products Act No. 100/2020 in accordance with the rules that apply in the European Economic Area, and handling applications to import and sell on prescription medicines that have no marketing authorisation in Iceland. The Country Cancer Profile covers Iceland and Norway beside the 27 EU member states and does not count them in its EU averages. OnCo did not read a source setting out the legal step by which a centralised authorisation takes effect in Iceland; see the gaps.",
          links: [
            { label: "Icelandic Medicines Agency: organisation and role", url: IMA_ROLE },
            { label: "Icelandic Medicines Agency: international cooperation", url: IMA_INTL },
          ],
        },
        {
          id: "reimbursement",
          title: "The same agency sets prices and decides reimbursement, with Landspítali's medicines committee advising on hospital drugs",
          plain:
            "After a cancer medicine is authorised, the Icelandic Medicines Agency sets its maximum price and decides whether the public system pays for it. Costly specialist medicines are classed as licence-requiring (leyfisskyld lyf): the agency decides on payment for each use after an opinion from the medicines committee of Landspítali, and that committee decides on requests for individual patients.",
          detail:
            "Regulation 1414/2020 on the pricing and reimbursement of medicines defines licence-requiring medicines as those that may be used only with the prior approval of Landspítali's medicines committee (lyfjanefnd Landspítala), usually costly or hard to handle and needing specialist knowledge. The agency's page says it decides whether a medicine is licence-requiring and whether an indication is reimbursed after the committee's opinion, publishes the approved list, and decides on general medicines in consultation with Iceland Health. The Country Cancer Profile 2025 says decisions on new oncology medicines rest on relative therapeutic benefit, medical necessity, relative cost-effectiveness and budget impact. For 13 indications of 10 new breast and lung cancer medicines with high clinical benefit, the average time from European Medicines Agency approval to public reimbursement was 272 days and 69% were reimbursed on the list of 1 April 2023, above the EU average. For 19 biosimilars of bevacizumab, rituximab and trastuzumab the average was 796 days, the third longest after Cyprus and Greece. Since 2022 an annual budget of ISK 500 million has been set aside for newly licensed drugs. Where a doctor recommends a medicine that is not reimbursed, the doctor can apply for state funding, which is approved or refused.",
          links: [
            { label: "Icelandic Medicines Agency: decisions on reimbursement (in Icelandic)", url: IMA_DECISIONS },
            { label: "Icelandic Medicines Agency: pricing and reimbursement", url: IMA_PRICING },
            { label: "Regulation 1414/2020 on the pricing and reimbursement of medicines (in Icelandic)", url: REG_1414 },
            { label: "Country Cancer Profile Iceland 2025, sections 5.1 and 5.3 (PDF)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Directorate of Health: annual quality reports on cancer screening (in Icelandic)", url: SCREEN_REPORTS },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening for women aged 40 to 74: about 65% took part in 2025",
          plain:
            "Women aged 40 to 69 are invited for a mammogram every two years and women aged 70 to 74 every three years. Screening is done at Landspítali's Breast Centre in Reykjavík, at Akureyri Hospital and by a mobile unit that tours the regions in spring and autumn. About 65% of invited women took part in 2025, up 13 percentage points in three years.",
          detail:
            "The Directorate of Health's quality report for 2025, published in June 2026, says population screening by mammography began in 1987, that 78,002 women were of screening age in 2025 and that 34,112 invitations were sent, reaching 99.9% of the target group. Participation was about 65% against the Directorate's target of over 75%: 71% among women with Icelandic citizenship and 25% among women with foreign citizenship, highest in the north (71%) and east (70%) and lowest in Suðurnes (55%). Nearly 25,000 screening mammograms were taken, 2% of women were recalled for further examination, and over 90% of those were seen within 10 working days; results took about 8 working days. The report counts 339 women diagnosed with breast cancer in 2025, 320 with invasive cancer and 19 with cancer in situ. It says the attendance fee for breast screening was lowered in 2024 and that a shortage of radiographers limits capacity. Women with a confirmed BRCA change are followed separately by the Breast Centre.",
          links: [
            { label: "Directorate of Health: breast screening quality report 2025 (PDF, in Icelandic)", url: SCREEN_BREAST_2025 },
            { label: "Coordination Centre for Cancer Screening: breast screening (in Icelandic)", url: SKS_BREAST },
          ],
        },
        {
          id: "cervical-screening",
          title: "Cervical screening by HPV test at health centres: about 70% took part in 2025",
          plain:
            "People with a cervix aged 23 to 29 are invited every three years and those aged 30 to 64 every five years. The sample is taken by a midwife or nurse at any health centre, or by a gynaecologist, and is tested first for HPV. About 70% were up to date in 2025, with a wide gap between Icelandic and foreign citizens.",
          detail:
            "The Directorate of Health's quality report for 2025 says participation was about 70%, up on the year before, and that from 2025 it is measured over the last 5.5 years for ages 30 to 64 and 3.5 years for ages 23 to 29, where earlier reports used 3.5 years for all ages; the report says the window now follows how often each age group is invited and goes on comparing the rate between years, giving a rise of six percentage points on 2024. Participation was 81% among women with Icelandic citizenship and 34% among those with foreign citizenship, highest in the capital area (72%) and lowest in the east, the Westfjords and Suðurnes (61% each). Results took about 9 working days; about 11% of women were referred for colposcopy and 86% of those with a high-grade result attended within three months. Over 2021 to 2025 the report gives cervical cancer incidence as 8.5 and mortality as 1.8 per 100,000. The Country Cancer Profile dates the national programme to 1964 and says self-sampling is planned.",
          links: [
            { label: "Directorate of Health: cervical screening quality report 2025 (PDF, in Icelandic)", url: SCREEN_CERVIX_2025 },
            { label: "Coordination Centre for Cancer Screening: cervical screening (in Icelandic)", url: SKS_CERVIX },
            { label: "Country Cancer Profile Iceland 2025, section 4 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "screening-2021",
          title: "In 2021 screening moved from the Cancer Society to the public health service",
          plain:
            "Until the end of 2020 the Icelandic Cancer Society's screening clinic ran cancer screening. Since 2021 a Coordination Centre for Cancer Screening inside the capital area's primary care service sends invitations and results, hospitals and health centres do the tests, and the Directorate of Health keeps the screening register and publishes a quality report each year.",
          detail:
            "The Directorate of Health's page on the screening register says its forerunner was the register of the Cancer Society's screening clinic (Leitarstöð), kept since organised cervical screening began in 1964, electronic from 2006 and holding complete data from 1985; the clinic closed at the end of 2020 and the register and responsibility for it passed to the Directorate. The Coordination Centre (Samhæfingarstöð krabbameinsskimana) at Heilsugæsla höfuðborgarsvæðisins oversees screening nationally under the Directorate's guidelines, sends invitation and result letters and advises the public and professionals. Results arrive electronically in the Heilsuvera and Ísland.is portals. The Country Cancer Profile adds that information and booking are offered in English and Polish, and that women pay a fee to attend, which it gave as ISK 500 for a cervical sample. Iceland has taken part in the European EUCanScreen project since 2024.",
          links: [
            { label: "Directorate of Health: the cancer screening register (in Icelandic)", url: SCREEN_REGISTER },
            { label: "Coordination Centre for Cancer Screening (in Icelandic)", url: SKS },
            { label: "Country Cancer Profile Iceland 2025, section 4 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "bowel-screening",
          title: "Bowel screening by home test is being introduced, starting at ages 60 to 69",
          plain:
            "Iceland is introducing bowel cancer screening with a home stool test (FIT) sent by post every two years. It starts with people aged 60 to 69, and the Coordination Centre says everyone aged 50 to 74 who lives in Iceland will be offered it before 2031. If blood is found, a colonoscopy is offered.",
          detail:
            "The Coordination Centre's page describes the project as being in implementation, following European screening guidelines and the proposals of the Screening Council: the sample is taken at home, returned to a health centre or by post, and analysed at Landspítali; results come electronically within four weeks, and a colonoscopy is offered within four weeks if blood is found. The Country Cancer Profile 2025 described bowel screening as opportunistic and Iceland as one of the few countries in its group without a population programme. The cancer action plan passed by Alþingi in June 2025 tells providers to implement population screening for bowel cancer in full and costs it at about ISK 200 million in the first year and about ISK 500 million a year from 2026 to 2029. OnCo did not find published participation figures for the new programme.",
          links: [
            { label: "Coordination Centre for Cancer Screening: bowel screening (in Icelandic)", url: SKS_BOWEL },
            { label: "Alþingi: resolution on the cancer action plan 2025 to 2029, action 2 (Internet Archive copy, in Icelandic)", url: ACTION_PLAN },
            { label: "Country Cancer Profile Iceland 2025, section 4 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination at age 12, for girls since 2011 and boys since 2023, with coverage above 90%",
          plain:
            "Girls have been offered the HPV vaccine at age 12 since 2011, and boys since autumn 2023. WHO's figures for 2025 give 94% of girls and 93% of boys a first dose, and 92% and 91% the last dose.",
          detail:
            "The Directorate of Health's cervical screening report says HPV vaccination began in 2011, when all girls were offered it at age 12, that 12-year-old boys were offered it from autumn 2023, and that serious cell changes have become fewer among vaccinated birth cohorts. The Country Cancer Profile 2025 says that since 2023 all 12-year-olds are offered the 9-valent vaccine free of charge, that older cohorts can get it on prescription at their own cost, and that the rate among 15-year-old girls was 96% in 2023, which it gives as the highest among the EU countries, Iceland and Norway and above WHO's 90% target for 2030. WHO's immunisation data give HPV programme coverage among females of 90% (first dose) and 84% (last dose) in 2023, 93% and 89% in 2024, and 94% and 92% in 2025; among males 95% and 90% in 2024 and 93% and 91% in 2025.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Iceland (data API)", url: WHO_HPV_API },
            { label: "Directorate of Health: cervical screening quality report 2025 (PDF, in Icelandic)", url: SCREEN_CERVIX_2025 },
            { label: "Country Cancer Profile Iceland 2025, section 3 (PDF)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Iceland does differently",
      cards: [
        {
          id: "one-hospital",
          title: "One hospital gives most specialised cancer care, with chemotherapy at regional hospitals",
          plain:
            "Most specialised cancer care, including most surgery and all radiotherapy, is given at Landspítali in Reykjavík. Regional hospitals such as Akureyri give chemotherapy and follow-up closer to home, and doctors across the country and abroad discuss patients in online team meetings. Landspítali set up a Cancer Centre in 2025.",
          detail:
            "The Country Cancer Profile 2025 says regional hospitals including Akureyri, Selfoss, Ísafjörður, Neskaupsstaður and Vestmannaeyjar provide outpatient and inpatient chemotherapy and minor procedures, that online multidisciplinary tumour boards are used extensively, and that professionals use international guidelines such as those of NICE, the NCCN and Nordic specialist associations. It counts 1,025 physicians and 3,462 nurses per 1,000 new cancer cases against EU averages of 679 and 1,376, while reporting perceived shortages of radiologists, radiation therapists, general practitioners and oncology nurses. Landspítali's page says its Cancer Centre (Krabbameinsmiðstöð Landspítala) was founded in 2025, works to the standards of the Organisation of European Cancer Institutes as a step towards certification and towards carrying out the government's cancer plan, and is building a cancer research centre with the University of Iceland.",
          links: [
            { label: "Country Cancer Profile Iceland 2025, sections 5.1 and 5.2 (PDF)", url: CCP_2025 },
            { label: "Landspítali: about the Landspítali Cancer Centre (in Icelandic)", url: LSH_CENTRE },
          ],
        },
        {
          id: "radiotherapy",
          title: "One radiotherapy department with two linear accelerators, and a third recommended",
          plain:
            "Landspítali's radiotherapy department is the one place in Iceland that gives radiotherapy. It has two linear accelerators, named Þór and Eir. Waits lengthened in the year to mid-2025, and a Ministry of Health group recommended a third machine, a larger department and steps to recruit trained staff.",
          detail:
            "Landspítali's page says the department is the only place in Iceland where patients receive radiotherapy and that it has two linear accelerators. The IAEA's DIRAC directory lists one radiotherapy centre for Iceland, with 2 in its field for megavoltage photon and electron beam units and 1 in its brachytherapy field, in a row updated in 2026. The Ministry of Health's August 2025 report says the machines gave 11,000 treatment sessions in 2023, can give up to 12,000 a year in daytime hours, and serve nearly 1,000 patients a year; the older machine was 8 years old and the newer 1 year old, and the number of treatment places had been the same for at least 20 years. It says no official maximum wait for radiotherapy had been defined, that in June 2025 the wait was 9.2 weeks for low-risk and 5.6 weeks for high-risk breast cancer and up to 20 weeks for prostate cancer, and that the causes were chiefly difficulty staffing the service with specially trained radiographers and delays tied to replacing the older machine. Against the European standard it cites of one accelerator per 350 new cancers a year, it says Iceland would need five. The Country Cancer Profile, on OECD statistics, gives 7.8 radiation therapy units per million people in 2023, close to the EU average.",
          links: [
            { label: "Ministry of Health: Geislameðferð, report of August 2025 (PDF, in Icelandic)", url: RT_REPORT },
            { label: "Landspítali: the radiotherapy department (in Icelandic)", url: RT_DEPT },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "Country Cancer Profile Iceland 2025, section 5.1 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "abroad",
          title: "Treatment Iceland does not offer is arranged in Sweden and paid for publicly",
          plain:
            "For rare cancers, some childhood cancers and treatments not available in Iceland, patients are sent abroad, mainly to Sweden, with travel and treatment costs covered. In summer 2025 some women with breast cancer were offered radiotherapy in Stockholm because the wait at home had grown too long.",
          detail:
            "The Country Cancer Profile 2025 says Iceland works with hospitals in Sweden for care not available at home, that an agreement was being concluded for Sahlgrenska Hospital in Gothenburg to provide isolated hepatic perfusion and stereotactic body radiation therapy, and that funding covers travel and health care costs for rare cancers treated abroad. It says children's cancer care is centralised at Landspítali, that stem cell transplant, proton therapy and brachytherapy for children are not available in Iceland, and that 2 of 436 European trials for children and adolescents with cancer between 2010 and 2022 ran there. The Ministry of Health's August 2025 report says that, under the waiting time rule in Regulation 442/2012, Iceland Health made contact with Karolinska in Stockholm, whose radiotherapy department was ready to take two patients a week that summer: women aged 50 to 70 with low-risk breast cancer needing a five-session course, staying 10 to 12 days and followed up at home afterwards.",
          links: [
            { label: "Country Cancer Profile Iceland 2025, sections 5.1 and 6 (PDF)", url: CCP_2025 },
            { label: "Ministry of Health: Geislameðferð, report of August 2025, section 5 (PDF, in Icelandic)", url: RT_REPORT },
          ],
        },
        {
          id: "plan",
          title: "A first cancer plan in force from 2019 to 2030, and an action plan for 2025 to 2029 passed by parliament",
          plain:
            "Iceland's first cancer plan took effect in 2019 and runs to 2030. On 2 June 2025 parliament (Alþingi) passed a cancer action plan for 2025 to 2029, which the Ministry of Health counts as 16 actions, among them full bowel screening, at least 75% taking part in screening, a published maximum wait for treatment and a cancer council, which the health minister set up in October 2025.",
          detail:
            "The Ministry of Health's 2019 notice says an advisory group drafted the plan between 2013 and 2016, that its report with 10 main goals was published in July 2017, and that the minister decided in January 2019 to carry it out with a term to 2030, in line with the health policy then before parliament. The ministry's 2024 notice describes that first plan as a 100-page report proposing 65 actions and says a consultation group drafted the new one. The resolution passed on 2 June 2025 says the action plan is to be taken into account in each year's budget and updated yearly. Its actions include prevention, organised screening with participation of at least 75%, risk-based screening starting with carriers of BRCA changes, earlier diagnosis, a cancer council, a single cancer centre for Iceland, a maximum waiting time set on the lines of the standard of the Organisation of European Cancer Institutes, rehabilitation, a standard discharge process, linked record systems and a workforce forecast. The ministry's October 2025 notice counts 16 actions and names the council's members.",
          links: [
            { label: "Alþingi: resolution 611/156 on the cancer action plan 2025 to 2029 (Internet Archive copy, in Icelandic)", url: ACTION_PLAN },
            { label: "Ministry of Health: cancer council established, 28 October 2025 (in Icelandic)", url: COUNCIL_2025 },
            { label: "Ministry of Health: proposal for an action plan, 20 June 2024 (in Icelandic)", url: PLAN_2024 },
            { label: "Ministry of Health: work on the cancer plan with a term to 2030, 29 January 2019 (in Icelandic)", url: PLAN_2019 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Iceland", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "8 trials in OnCo's records list a site in Iceland",
          plain:
            "Eight trials in OnCo's records include Iceland among their countries. ClinicalTrials.gov classes five as phase 3 and one as phase 4; one is a screening trial with no phase and one is an observational study. One, the PRECEDE study of people at raised risk of pancreatic cancer, was recruiting when the registry was last read. OnCo holds a selection of trials, not the whole registry.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026: 8 trials list Iceland. Read the same day, ClinicalTrials.gov lists 1 as recruiting (PRECEDE, NCT04970056, an observational study), 3 as active and not recruiting (OlympiA, NCT02032823; iStopMM, NCT03327597, which the registry classes as interventional with no phase; and NordICC, NCT00883792), 1 as terminated (NCT05132075, a lung cancer trial of JDQ443 against docetaxel) and 3 as completed (CARD, NCT02485691, which the registry classes as phase 4; PROSPECT, NCT01322490; and NCT01305655, a trial of glucarpidase in children treated with high-dose methotrexate). Two of them are screening studies: iStopMM, which screens for a blood condition that can come before myeloma, and NordICC, a trial of colonoscopy screening. The Icelandic Cancer Society says more than 600 scientific studies have been published from the Cancer Registry's material, and Landspítali says its Cancer Centre is building a cancer research centre with the University of Iceland.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Iceland", url: CTGOV },
            { label: "iStopMM (NCT03327597)", url: "https://clinicaltrials.gov/study/NCT03327597" },
            { label: "PRECEDE (NCT04970056)", url: "https://clinicaltrials.gov/study/NCT04970056" },
            { label: "Icelandic Cancer Society: Research Centre and Cancer Registry (in Icelandic)", url: REGISTRY },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry-tables",
      title: "The registry's own tables could not be read as text",
      plain:
        "The Icelandic Cancer Registry publishes its statistics as interactive dashboards, and the Nordic database NORDCAN needs JavaScript, so OnCo could not read either as plain text. The registry figures on this page are those quoted in a Ministry of Health report and in the European profile, not figures read from the registry's own tables.",
      detail:
        "The Icelandic Cancer Society's statistics pages, the summary page, the tables page and each cancer's page hold only an embedded Power BI dashboard; fetched on 16 November 2026 they returned no figures as text. nordcan.iarc.fr returned a page that loads its data by script. As a result this page has no registry counts by cancer site, no stage at diagnosis, no registry survival by site and no count for 2025 other than the breast cancer count in the screening report. The 2,043 diagnoses in 2024 and the 2018 to 2022 averages are second-hand quotations of the registry, and neither says whether non-melanoma skin cancer is counted.",
      links: [
        { label: "Icelandic Cancer Society: summary statistics (dashboard, in Icelandic)", url: REGISTRY_SUMMARY },
        { label: "NORDCAN: cancer statistics for the Nordic countries", url: NORDCAN },
      ],
    },
    {
      id: "gap-medicines",
      title: "What was not read about medicines",
      plain:
        "OnCo did not read a source that sets out the legal step by which a European centralised authorisation takes effect in Iceland, nor the current list of hospital medicines with approved reimbursement, nor the pages of Landspítali's medicines committee. The timings for new medicines come from one study, on a list dated April 2023.",
      detail:
        "The Icelandic Medicines Agency's English pages describe the European Economic Area network in general terms only. Its list of licence-requiring medicines and indications with approved reimbursement is a spreadsheet, which was not opened, so this page names no individual cancer medicine as reimbursed or refused in Iceland. The Country Cancer Profile's figures of 272 days and 69% rest on 13 indications of 10 breast and lung cancer medicines and may not hold for other cancers or later years. Part of the profile's passage on the number of oncologists could not be read unambiguously from the PDF text and was left out.",
      links: [
        { label: "Icelandic Medicines Agency: decisions on reimbursement (in Icelandic)", url: IMA_DECISIONS },
        { label: "Country Cancer Profile Iceland 2025 (European Cancer Inequalities Registry)", url: CCP_PAGE },
      ],
    },
    {
      id: "gap-sources",
      title: "Other sources blocked, missing or left unreconciled",
      plain:
        "Alþingi's website refused a plain request, so the action plan was read in an Internet Archive copy from October 2025. OnCo did not find the current fee for a screening visit, participation figures for bowel screening, or a national count of radiotherapy staff, and two radiotherapy figures on this page do not match.",
      detail:
        "althingi.is answered 403 to two requests on 16 November 2026; the archived copy of resolution 611/156 was captured on 28 October 2025 and lists 15 numbered actions in the text OnCo could read, where the ministry counts 16. A guessed address for a Directorate of Health page on HPV vaccination returned 404, so the programme is described from the screening report, the European profile and WHO's rows. The profile's fee of ISK 6,098 for a mammogram predates the 2024 reduction the Directorate reports, and the current fee was not read. The profile's 7.8 radiation therapy units per million people (OECD statistics, 2023) is higher than two linear accelerators would give for a population under 400,000; OnCo could not see what else that count includes. In the IAEA's DIRAC row the field named LinearAccelerator reads 0 while the megavoltage field reads 2, and OnCo reports the latter without knowing how the row is compiled. The Coordination Centre's bowel screening page gives two different yearly counts of bowel cancer, so neither is used here. WHO's 2020 cancer country profile was not used.",
      links: [
        { label: "Alþingi: resolution 611/156 (Internet Archive copy, in Icelandic)", url: ACTION_PLAN },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
        { label: "Coordination Centre for Cancer Screening: bowel screening (in Icelandic)", url: SKS_BOWEL },
      ],
    },
  ],
  institutions: [
    "landspitali",
    "icelandic-cancer-registry",
    "krabbameinsfelag-islands",
    "embaetti-landlaeknis",
    "samhaefingarstod-krabbameinsskimana",
    "icelandic-medicines-agency",
    "icelandic-health-insurance",
    "sjukrahusid-a-akureyri",
    "university-of-iceland",
  ],
  companies: [],
  drugs: [],
  trials: ["precede", "istopmm", "nordicc", "olympia", "nct05132075", "card", "prospect-prostvac", "nct01305655"],
  papers: [],
  people: ["sigurdur-kristinsson", "vigdis-hallgrimsdottir"],
  how:
    "Every card was written from Icelandic and European public sources read as raw text on 16 November 2026: the OECD and European Commission's 2025 Country Cancer Profile, the Directorate of Health's 2025 screening quality reports, the Coordination Centre for Cancer Screening, the Ministry of Health's 2025 radiotherapy report and cancer plan notices, Alþingi's resolution on the action plan in an archived copy, the Icelandic Cancer Society, the Icelandic Medicines Agency, Iceland Health, Landspítali, the IAEA's DIRAC directory, WHO's immunisation data, the World Bank and IARC's GLOBOCAN 2024 fact sheet. Icelandic sources were read in Icelandic.",
  verify:
    "Fees, payment ceilings and the medicine steps change, usually at the start of a year; Iceland Health publishes the current amounts. Screening ages and intervals are set by the Directorate of Health's guidelines, and the Coordination Centre for Cancer Screening can say when a person is next due. Radiotherapy waits move month to month; ask the treating team at Landspítali.",
  verifyLinks: [
    { label: "Iceland Health: the co-payment system for health care", url: COPAY },
    { label: "Coordination Centre for Cancer Screening (in Icelandic)", url: SKS },
    { label: "Icelandic Cancer Society: cancer statistics (dashboards, in Icelandic)", url: REGISTRY_STATS },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Iceland (PDF)", url: IARC_FACTSHEET },
  ],
};

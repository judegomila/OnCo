import type { CountryDive } from "@/data/country-dive";

/**
 * Ghana deep dive: the hand-written cards for /countries/gh/ (wave 7). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: the Ministry of Health's National Strategy for Cancer Control
 * in Ghana 2012 to 2016 (PDF text, ICCP portal) and its April 2025 page on the Ghana Medical Trust Fund, the IAEA's
 * June 2026 article on the April 2026 imPACT Review (read through the Internet Archive, as the IAEA page refused a plain
 * request), the Information Services Department's November 2025 page on a Tamale radiotherapy centre, the National
 * Health Insurance Scheme's benefits page and news pages, the Ghana News Agency's September 2023 report of an NHIS
 * statement, the Food and Drugs Authority's history and clinical trials pages, WHO's May 2020 feature on the
 * Authority's maturity level, the African Cancer Registry Network's 2017 page for the Kumasi Cancer Registry (Internet
 * Archive) and its current membership list, Gavi's October 2025 HPV release, WHO's HPV coverage rows and Global Health
 * Observatory indicators from their public data APIs, Graphic Online, Ghanaian Times and MyJoyOnline reports where no
 * official text was found, IARC's GLOBOCAN 2024 fact sheet for Ghana, and the papers' abstracts through Europe PMC.
 * Where a figure could not be read it is named under `gaps`.
 */
const NSCC_2011 = "https://www.iccp-portal.org/system/files/plans/Cancer%20Plan%20Ghana%20Ministry%20of%20Health.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/288-ghana-fact-sheet.pdf";
const IAEA_IMPACT = "https://www.iaea.org/newscenter/news/impact-review-identifies-opportunities-to-strengthen-cancer-control-planning-in-ghana";
const IAEA_IMPACT_WB = "https://web.archive.org/web/2026/https://www.iaea.org/newscenter/news/impact-review-identifies-opportunities-to-strengthen-cancer-control-planning-in-ghana";
const ISD_TAMALE = "https://www.isd.gov.gh/health-ministry-and-iaea-partner-to-establish-radiotherapy-centre/";
const MOH_GMTF = "https://moh.gov.gh/president-mahama-launches-ghana-medical-trust-fund-to-support-chronic-disease-care/";
const GT_FORUM = "https://ghanaiantimes.com.gh/ghana-medical-trust-fund-to-cover-all-cancer-treatment-next-year-health-minister/";
const GRAPHIC_GMTF_PAYOUT = "https://www.graphic.com.gh/news/general-news/mahamacares-begins-payouts-as-government-sets-14-day-response-time-for-applications.html";
const GRAPHIC_GMTF_CANCER = "https://www.graphic.com.gh/news/general-news/ghana-news-mahamacares-begins-next-month-focuses-on-cancer-treatment-administrator";
const NHIS_BENEFITS = "https://www.nhis.gov.gh/benefits";
const NHIS_CHILD = "https://www.nhis.gov.gh/News/childhood-cancers-included-in-nhis-benefit-package-5365";
const NHIS_18M = "https://nhis.gov.gh/News/nhis-registers-over-18-million-active-members--5982";
const GNA_CHILD = "https://gna.org.gh/2023/09/nhis-saving-lives-of-children-with-childhood-cancers/";
const GT_UNCAP = "https://allafrica.com/stories/202511260044.html";
const FDA_HISTORY = "https://fdaghana.gov.gh/history/";
const FDA_CT = "https://fdaghana.gov.gh/services-2/clinical-trials-authorization-service/";
const WHO_FDA_ML3 = "https://www.who.int/news-room/feature-stories/detail/ghana-bolsters-medicines-regulatory-system-guarantees-product-quality";
const AFCRN_KUMASI_WB = "https://web.archive.org/web/2026/https://afcrn.org/membership/members/99-kath";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const JOY_KSCR = "https://www.myjoyonline.com/kumasi-cancer-registry-appeals-for-government-public-support/";
const GAVI_HPV = "https://www.gavi.org/news/media-room/ghana-launches-hpv-vaccine-protect-over-2-million-girls-and-combat-cervical-cancer";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'GHA'%20and%20startswith(ANTIGEN,'PRHPV')";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'GHA'";
const GHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'GHA'";
const CTGOV = "https://clinicaltrials.gov/search?country=Ghana&cond=cancer";

export const GH_DIVE: CountryDive = {
  iso2: "GH",
  iso3: "GHA",
  name: "Ghana",
  flag: "🇬🇭",
  asOf: "2026-11-11",
  title: "Cancer in Ghana",
  description:
    "Cancer in Ghana from Ghanaian sources: IARC's estimate of 27,260 new cancers and 17,662 deaths in 2024 beside the Kumasi Cancer Registry's much lower counts, national health insurance that pays for breast, cervical and four childhood cancers but not others, the Ghana Medical Trust Fund that began paying for cancer care in 2026, four radiotherapy machines in the April 2026 imPACT Review, the Food and Drugs Authority at WHO maturity level 3, the October 2025 HPV vaccine campaign, and the two trials in our records with a site in Ghana.",
  lede:
    "Ghana counts cancer directly in one city, Kumasi, so its national figures are IARC estimates: 27,260 new cancers and 17,662 deaths in 2024, with breast, cervical, liver and prostate cancer the commonest. National health insurance pays for breast and cervical cancer treatment, a trust fund launched in 2025 is starting to pay for the rest, and the April 2026 international review counted four radiotherapy machines in the country.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Ghana is 27,260 new cancers and 17,662 deaths, an age-standardised incidence of 113.6 per 100,000 (101.9 in men, 127.2 in women), including 296 non-melanoma skin cancers. IARC's fact sheet gives the incidence method as national or subnational rates scaled to regional all-cancer rates, and mortality as national incidence applied to modelled mortality-to-incidence ratios from registry survival data (its mortality source is named as Survcan). The fact sheet does not name the subnational source, and IARC's detailed data sources page could not be read. The only population-based registry, in Kumasi, records far fewer cancers than IARC estimates: 46.1 per 100,000 in 2015, with breast cancer at 16.1 per 100,000 women against IARC's 40.5, cervical cancer at 13.7 against 30.4, and prostate cancer at 10.5 per 100,000 men against 32.5. The gap is mostly cancers the registry cannot see: in 2015 its manager said it could not yet reach private hospitals, private laboratories, herbal centres or prayer camps, where many patients go. The Accra registry's founders wrote that GLOBOCAN 2012 graded Ghana's data at its lowest level for inclusion. Neither the registry nor IARC's estimate is a national count.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Ghana",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Ghana (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 27,000 new cancers a year, three in five of them in women",
          plain:
            "IARC estimates 27,260 new cancers in Ghana in 2024: 16,516 in women and 10,744 in men. Breast cancer is a third of cancers in women and cervical cancer more than a fifth; in men prostate and liver cancer lead. For every ten new cancers IARC estimates between six and seven cancer deaths in the same year.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 5,487 breast cancers (2,695 deaths), 3,740 cervical cancers (2,324 deaths), 2,975 liver cancers (2,640 deaths), 2,817 prostate cancers (1,784 deaths) and 1,268 ovarian cancers (856 deaths). Breast cancer is 33.2% of cancers in women and cervical cancer 22.6%; in men prostate is 26.2% and liver 19.0%, followed by non-Hodgkin lymphoma (664). By deaths, liver cancer leads in men and breast cancer in women. The risk of developing a cancer before age 75 is 11.1% for men and 13.2% for women, and an estimated 56,295 people are living within five years of a diagnosis. Deaths divided by new cases give 0.65 for 2024. The Ministry of Health's National Strategy for Cancer Control 2012 to 2016 recorded that 50 to 70% of breast cancer patients present with stage III or IV disease, often 8 to 10 months after first noticing a change, and cited a five-year survival of only 25% at Korle Bu Teaching Hospital. The IAEA wrote after the April 2026 imPACT Review that many patients are diagnosed at advanced stages.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Ghana (PDF)", url: IARC_FACTSHEET },
            { label: "National Strategy for Cancer Control in Ghana 2012 to 2016, chapter 3 (Ministry of Health, PDF)", url: NSCC_2011 },
            { label: "IAEA: imPACT Review identifies opportunities to strengthen cancer control planning in Ghana (11 June 2026; read through the Internet Archive)", url: IAEA_IMPACT_WB },
          ],
        },
        {
          id: "plan-status",
          title: "A national strategy that ran to 2016, and a review in 2026 asking for a new plan",
          plain:
            "The latest national cancer strategy OnCo found covered 2012 to 2016. In November 2025 the Ministry of Health held a first National Cancer Forum to draft a new framework and five-year strategy, and in April 2026 international reviewers recommended an updated, costed national cancer control plan.",
          detail:
            "The National Strategy for Cancer Control in Ghana 2012 to 2016, dated July 2011, aimed to document 50% of all cancer cases and establish a cancer registry, and to reduce cancer incidence and mortality by 30% through prevention, screening and early detection. It was costed at 46,564,000 US dollars over five years, including 11,382,000 for early detection and screening, 6,335,500 for treatment and 5,820,000 for the registry and research. The Ghanaian Times reported that the maiden National Cancer Forum in Accra in November 2025 aimed to develop a national cancer control framework and a revised five-year cancer strategy. The imPACT Review, run by the IAEA, WHO and IARC with the Ministry of Health from 19 to 24 April 2026 with 11 experts visiting Accra, Kumasi and Tamale, recommended an updated, costed National Cancer Control Plan and scaling up early detection, diagnosis and radiation medicine. Ghana's previous imPACT Review was in 2005. OnCo found no published successor to the 2012 to 2016 strategy.",
          links: [
            { label: "National Strategy for Cancer Control in Ghana 2012 to 2016 (Ministry of Health, PDF, ICCP portal)", url: NSCC_2011 },
            { label: "Ghanaian Times: Ghana Medical Trust Fund to cover all cancer treatment next year (19 November 2025)", url: GT_FORUM },
            { label: "IAEA: imPACT Review identifies opportunities to strengthen cancer control planning in Ghana (11 June 2026; read through the Internet Archive)", url: IAEA_IMPACT_WB },
          ],
        },
      ],
      tables: [
        {
          id: "gh-registry",
          title: "What the Kumasi Cancer Registry has published, beside IARC's estimate",
          caption: "New cancers and incidence per 100,000, as reported in each source. Latest published registry year: 2015.",
          columns: [
            { key: "source", label: "Source (area covered)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "All cancers, men", numeric: true },
            { key: "women", label: "All cancers, women", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
            { key: "prostate", label: "Prostate", numeric: true },
          ],
          rows: [
            { source: "Kumasi Cancer Registry, first year (city of Kumasi)", period: "2012", cases: null, men: 10.9, women: 22.4, breast: null, cervix: null, prostate: null },
            { source: "Kumasi Cancer Registry, stated at its launch", period: "2012 to 2014", cases: 1070, men: null, women: null, breast: null, cervix: null, prostate: null },
            { source: "Kumasi Cancer Registry (city of Kumasi)", period: "2015", cases: 736, men: 37.1, women: 54.1, breast: 16.1, cervix: 13.7, prostate: 10.5 },
            { source: "IARC GLOBOCAN 2024 estimate (all Ghana, for comparison)", period: "2024", cases: 27260, men: 101.9, women: 127.2, breast: 40.5, cervix: 30.4, prostate: 32.5 },
          ],
          note: "The 2012 rates are age-standardised as the paper reports them; its abstract gives no case count. The 2015 abstract does not say whether its rates are age-standardised. The 1,070 cases for 2012 to 2014 were given by the registry at its April 2015 launch, as reported by MyJoyOnline. Registries count new cases, not deaths. The IARC row is a model for the whole country, age-standardised, and is not a registry count.",
          sources: [
            { label: "Laryea et al., cancer incidence in Ghana, 2012 (BMC Cancer 2014)", url: "https://doi.org/10.1186/1471-2407-14-362" },
            { label: "Amoako et al., malignant tumours in urban Ghana: Kumasi (BMC Cancer 2019)", url: "https://doi.org/10.1186/s12885-019-5480-0" },
            { label: "MyJoyOnline: Kumasi Cancer Registry appeals for government, public support (24 April 2015)", url: JOY_KSCR },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Ghana (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: one city registry in Kumasi, and one set up in Accra",
      aside: { label: "African Cancer Registry Network: Kumasi Cancer Registry (2017; Internet Archive)", url: AFCRN_KUMASI_WB },
      cards: [
        {
          id: "registry-kumasi",
          title: "The Kumasi Cancer Registry: population-based since 2012, run on a teaching hospital's budget",
          plain:
            "Ghana has no national cancer registry. The Kumasi Cancer Registry, at Komfo Anokye Teaching Hospital, began as a hospital registry in 2004 and has counted new cancers among the city's residents, about two million people, since 2012. A 2025 review calls it Ghana's only population-based registry, and its own managers said in 2015 that it lacked money and staff.",
          detail:
            "The registry's African Cancer Registry Network page, dated March 2017, records its start in 2004 as a hospital-based registry at Komfo Anokye Teaching Hospital, a network visit in 2012 recommending population-based registration, its manager's training in Malawi in July 2012, a reference population of 2,035,064 people from the 2010 census, and a staff of one full-time and five part-time registrars in the hospital's Public Health Unit. At its official launch in April 2015 its manager said it had been run from the hospital's own funds since 2012, recorded 1,070 cancers in 2012 to 2014, and could not yet visit private hospitals, private pathology laboratories, herbal centres or prayer camps for lack of transport and staff; he asked the government to employ permanent registrars. Its published data run to 2015. A 2025 narrative review of West African registries named limited funding, difficult data linkage between collection sites and the lack of electronic data collection as barriers to its expansion. The registry was not on the African Cancer Registry Network's current membership list when that list was read on 11 November 2026, and OnCo found no later report from it.",
          links: [
            { label: "African Cancer Registry Network: Ghana, Kumasi Cancer Registry (March 2017; read through the Internet Archive)", url: AFCRN_KUMASI_WB },
            { label: "African Cancer Registry Network: current membership list", url: AFCRN_LIST },
            { label: "MyJoyOnline: Kumasi Cancer Registry appeals for government, public support (24 April 2015)", url: JOY_KSCR },
            { label: "Nair et al., the role of a national cancer registry in the Global Breast Cancer Initiative in Ghana (Transl Breast Cancer Res 2025)", url: "https://doi.org/10.21037/tbcr-24-60" },
          ],
        },
        {
          id: "registry-accra",
          title: "The Accra Cancer Registry, set up after Ghana's data were graded at the lowest level",
          plain:
            "Korle Bu Teaching Hospital and the University of Ghana set up a population-based registry for nine districts of Accra, with support from Stanford University and the African Cancer Registry Network. Its founders described the set-up in 2020, but OnCo found no incidence figures from it.",
          detail:
            "Yarney and colleagues wrote in 2020 that in GLOBOCAN 2012 Ghana's data sources were classified as Frequencies, the lowest classification for inclusion, and that the Accra Cancer Registry was proposed as part of the national cancer strategy in response. It uses trained registrars who actively abstract cases from hospital departments and pathology services, records them in CanReg5, has an advisory board and a technical committee, and covers a defined population of nine municipal districts; earlier attempts at registration in Accra had failed. The authors expected it to become the focal point where national data are collated. The 2012 to 2016 national strategy had set the goal of a functional population-based registry and budgeted 5,820,000 US dollars for registration and research. The imPACT reviewers in April 2026 listed established cancer registries among Ghana's strengths.",
          links: [
            { label: "Yarney et al., establishing a cancer registry in a resource-constrained region: Ghana (JCO Glob Oncol 2020)", url: "https://doi.org/10.1200/JGO.19.00387" },
            { label: "National Strategy for Cancer Control in Ghana 2012 to 2016, chapter 8 (PDF)", url: NSCC_2011 },
            { label: "IAEA: imPACT Review in Ghana (11 June 2026; read through the Internet Archive)", url: IAEA_IMPACT_WB },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: national insurance for some cancers, a trust fund for the rest",
      aside: { label: "National Health Insurance Scheme: benefits and exclusions", url: NHIS_BENEFITS },
      cards: [
        {
          id: "nhis",
          title: "National health insurance pays for breast and cervical cancer, and four childhood cancers",
          plain:
            "Ghana's National Health Insurance Scheme lists breast and cervical cancer treatment in its benefit package, and since June 2022 four childhood cancers. Treatment of other cancers, including prostate and liver cancer, is excluded, as are medicines not on the scheme's list. In November 2025 the insurer said about 56% of Ghanaians were active members.",
          detail:
            "The scheme's benefits page lists cervical and breast cancer treatment, and diagnosis and complications of other cancers such as anaemia or obstruction, among in-patient services, and lists cancer treatment other than cervical and breast cancer among exclusions, with medicines not on the NHIS Medicines List and treatment abroad. In November 2021 the scheme announced that diagnosis and treatment of acute lymphoblastic leukaemia, Burkitt lymphoma, retinoblastoma and Wilms tumour, about 60% of childhood cancers, would be added; a statement reported in September 2023 dates implementation to June 2022 at seven facilities, from Korle Bu and Komfo Anokye to Tamale Teaching Hospital and Holy Family Hospital, Techiman. In November 2025 the insurer's research unit said 18.47 million members were enrolled in 2024 and that 56.3% of Ghanaians were currently active members; the same month the Health Minister told Parliament active membership had grown from about 18 million to more than 20 million, close to 60%. WHO's Global Health Observatory gives out-of-pocket spending as 26.7% of current health expenditure in 2023 and a UHC service coverage index of 56. A 2022 study at Korle Bu found breast cancer patients' households spent about 990 US dollars on treatment on average, and the imPACT reviewers in 2026 said limited insurance cover for cancer leaves patients with significant out-of-pocket costs.",
          links: [
            { label: "NHIS: benefits and exclusions", url: NHIS_BENEFITS },
            { label: "NHIS: childhood cancers included in NHIS benefit package (16 November 2021)", url: NHIS_CHILD },
            { label: "Ghana News Agency: NHIS, saving lives of children with childhood cancers (12 September 2023)", url: GNA_CHILD },
            { label: "NHIS: NHIS registers over 18 million active members (6 November 2025)", url: NHIS_18M },
            { label: "Ghanaian Times via AllAfrica: Health Minister announces uncapping of NHIS (25 November 2025)", url: GT_UNCAP },
            { label: "WHO Global Health Observatory: out-of-pocket share of health spending, Ghana (API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: UHC service coverage index, Ghana (API)", url: GHO_UHC },
          ],
        },
        {
          id: "gmtf",
          title: "The Ghana Medical Trust Fund: launched in 2025, paying for cancer care first",
          plain:
            "In April 2025 the government launched the Ghana Medical Trust Fund, known as MahamaCares, to pay for chronic disease care that national insurance does not cover. The Health Minister said on 1 December 2025 that it had begun paying out, and in May 2026 its Administrator said cancer, including four major childhood cancers, would be the first disease group, through about 30 hospitals.",
          detail:
            "The Ministry of Health's launch page says the Fund will cover the cost of care and medication for non-communicable diseases not included in the National Health Insurance Scheme, including cancers, cardiovascular disease, chronic kidney failure and stroke, and invest in infrastructure, equipment, specialist training and research. At the November 2025 National Cancer Forum the Minister said that from 2026 the Fund would cover cancer treatment, from diagnostics and imaging to chemotherapy, radiotherapy, surgery and supportive care. Graphic Online reported that Parliament approved the Fund's law in July 2025, and that on 1 December 2025 the Minister said its secretariat was operating, disbursements had begun, about 2.3 billion cedis had been allocated, and an application made by a specialist doctor would be answered within 14 days. In May 2026 its Administrator said a pilot in February supported 50 patients for nearly 4.8 million cedis, that patient navigators would work across 21 facilities, joined by six private and quasi-government hospitals including Korle Bu, which she put at 30 facilities in all, and that the Fund had agreed with the insurer where its cover ends. These are news reports of officials' statements; OnCo did not read the Fund's law or its benefit rules.",
          links: [
            { label: "Ministry of Health: President Mahama launches Ghana Medical Trust Fund (29 April 2025)", url: MOH_GMTF },
            { label: "Ghanaian Times: Ghana Medical Trust Fund to cover all cancer treatment next year (19 November 2025)", url: GT_FORUM },
            { label: "Graphic Online: MahamaCares begins payouts as government sets 14-day response time (1 December 2025)", url: GRAPHIC_GMTF_PAYOUT },
            { label: "Graphic Online: MahamaCares begins next month, focuses on cancer treatment (6 May 2026)", url: GRAPHIC_GMTF_CANCER },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Food and Drugs Authority",
      aside: { label: "WHO: Ghana bolsters medicines regulatory system (13 May 2020)", url: WHO_FDA_ML3 },
      cards: [
        {
          id: "fda-ml3",
          title: "WHO maturity level 3 for medicines since 2020, and level 4 for clinical trial oversight since 2024",
          plain:
            "Ghana's Food and Drugs Authority registers medicines and authorises clinical trials. WHO rated it at maturity level 3, a stable and well-functioning system, in 2020, making Ghana the second country in the WHO African Region to reach that level. The Authority says its clinical trials function reached level 4 in July 2024.",
          detail:
            "The Food and Drugs Board was established by the Food and Drugs Law 1992 (PNDCL 305B), inaugurated its first board on 26 August 1997, and became the Food and Drugs Authority under the Public Health Act 2012 (Act 851). WHO's feature of 13 May 2020 reports that Ghana became the second country in the WHO African Region to attain maturity level 3, the second-highest of four levels, after evaluations with the Global Benchmarking Tool in 2014, 2015 and 2019, and that Tanzania had reached it in November 2018. The Authority's clinical trials page states that in July 2024 its Clinical Trials Function attained maturity level 4 in clinical trials oversight under the same tool, and describes this as making Ghana the first regulatory authority in Africa at that level for trials. OnCo did not find WHO's own announcement of the level 4 rating; the claim is the Authority's. The Authority publishes summaries of its reviews of clinical trial applications as public assessment reports. It publishes no target time for registering a new medicine that OnCo could find; see the gaps.",
          links: [
            { label: "WHO: Ghana bolsters medicines regulatory system, guarantees product quality (13 May 2020)", url: WHO_FDA_ML3 },
            { label: "FDA Ghana: history", url: FDA_HISTORY },
            { label: "FDA Ghana: clinical trials authorization", url: FDA_CT },
          ],
        },
        {
          id: "fda-trials",
          title: "Clinical trials need an ethics approval, a Pan African registry entry and an FDA certificate",
          plain:
            "No clinical trial may run in Ghana without a certificate from the Food and Drugs Authority, given after an ethics committee approves it. Every application must show the trial is registered with the Pan African Clinical Trials Registry, and trials already approved by a well-resourced regulator can use a reliance pathway.",
          detail:
            "The Authority's mandate for clinical trials is Part 8, sections 150 to 166, of the Public Health Act 2012, Act 851, which covers guidelines, a Technical Advisory Committee on Clinical Trials, the application procedure, appeals, the power to stop or suspend a trial, monitoring and penalties. An application must include, among 18 items, the protocol, investigator's brochure, product dossier, GMP certificate, ethics approval or evidence of submission, insurance for all participants, a data safety monitoring board charter, and proof of registration with the Pan African Clinical Trials Registry. An application is rejected at screening if less than 70% of the required documents are present, and lapses if issues are not answered within a year. For a trial approved by a well-resourced or reference regulator, the Authority can rely on that regulator's full assessment reports, case by case or at the applicant's request, provided the documents are identical. Summaries of review comments are published as public assessment reports, and the status of every application is shown on the Authority's clinical trials registry. The page gives no target review time.",
          links: [
            { label: "FDA Ghana: clinical trials authorization", url: FDA_CT },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Gavi: Ghana launches HPV vaccine (8 October 2025)", url: GAVI_HPV },
      cards: [
        {
          id: "cervical-screening",
          title: "No national cervical screening programme, and fewer than one woman in twenty ever screened",
          plain:
            "Ghana's 2012 to 2016 strategy planned organised and opportunistic cervical screening using Pap smears and visual inspection with vinegar, but a national programme has not been set up. In the 2022 national household survey, 4.6% of women had ever been screened: 6.3% in towns and 3.0% in the countryside.",
          detail:
            "The National Strategy for Cancer Control 2012 to 2016 says Ghana had used Pap smear and visual inspection with acetic acid linked to cryotherapy in limited project-based programmes, that the national programme would continue with both and introduce HPV DNA testing as it became accessible, and that screening would be integrated with family planning and STI services. A 2025 qualitative study of 16 stakeholders describes screening in Ghana as taking place without a population-based programme, sustained by facilities, non-governmental organisations and sponsors, with costs often reduced during Cervical Cancer Awareness Month in January; it cites reported uptake of 0.8% to 12%. An analysis of 14,973 women in the 2022 Ghana Demographic and Health Survey found 4.6% had been screened, with higher odds among women aged 40 to 49, the better educated, the richest and those enrolled in health insurance. The imPACT reviewers in April 2026 recommended scaling up early detection.",
          links: [
            { label: "National Strategy for Cancer Control in Ghana 2012 to 2016, section 3.2 (PDF)", url: NSCC_2011 },
            { label: "Appiah et al., rural-urban variations in cervical screening in Ghana, 2022 DHS (BMC Womens Health 2025)", url: "https://doi.org/10.1186/s12905-025-03802-3" },
            { label: "Vandyck-Sey and Burchett, cervical screening in the absence of a national programme in Ghana (BMC Public Health 2025)", url: "https://doi.org/10.1186/s12889-025-24817-3" },
          ],
        },
        {
          id: "hpv-breast",
          title: "HPV vaccine for girls nationwide since October 2025, and breast examination rather than mammography",
          plain:
            "In October 2025 Ghana ran its first nationwide HPV vaccination campaign, aiming at 2.4 million girls aged 9 to 14, and then added the vaccine to routine immunisation for 9-year-old girls. Ghana reported 79% coverage for 2025 to WHO. For breast cancer the national strategy relies on breast awareness and clinical examination.",
          detail:
            "Gavi's release of 8 October 2025 says Ghana Health Service, with Gavi, WHO and UNICEF, launched the first nationwide HPV vaccination campaign, running from 8 to 11 October, to reach 2.4 million girls aged 9 to 14 in and out of school, free of charge, with the vaccine then integrated into the routine schedule for 9-year-old girls; UNICEF said Ghana had secured 2.5 million doses. In the programme coverage rows Ghana reported to WHO for 2025, 1,886,585 of a target of 2,398,796 girls were vaccinated, 79%, with identical first and last dose rows; no coverage is recorded for earlier years. The imPACT reviewers wrote in 2026 that HPV and hepatitis B vaccination are in routine immunisation but that uptake remains low. For breast cancer, the 2012 to 2016 strategy set breast self-examination taught from age 16, clinical breast examination every three years under 35 and yearly from 35, and mammography from 40. In May 2026 the Trust Fund's Administrator said the country had only about five mammography machines.",
          links: [
            { label: "Gavi: Ghana launches HPV vaccine to protect over 2 million girls (8 October 2025)", url: GAVI_HPV },
            { label: "WHO immunisation data: HPV programme coverage rows for Ghana (API)", url: WHO_HPV_API },
            { label: "National Strategy for Cancer Control in Ghana 2012 to 2016, section 3.1 (PDF)", url: NSCC_2011 },
            { label: "Graphic Online: MahamaCares begins next month, focuses on cancer treatment (6 May 2026)", url: GRAPHIC_GMTF_CANCER },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy: a handful of machines in a few cities",
      aside: { label: "IAEA: imPACT Review in Ghana (11 June 2026; Internet Archive)", url: IAEA_IMPACT_WB },
      cards: [
        {
          id: "rt-capacity",
          title: "Four radiotherapy machines in operation in 2026, and about a quarter of patients who need radiotherapy treated",
          plain:
            "The international reviewers who visited in April 2026 counted four radiotherapy machines operating in Ghana, concentrated in a few cities. A 2020 study found only about 23% of patients who needed radiotherapy received it, and that 23 more machines would be needed. Patients from the north travel to Kumasi or Accra, and the government plans a centre in Tamale.",
          detail:
            "The IAEA's article of 11 June 2026 says that with only four radiotherapy machines in operation nationwide, and PET-CT and radiotherapy concentrated in a few urban centres, further investment is needed, and that the IAEA had recently helped Ghana write a bankable document for expanding radiation medicine. In May 2026 the Ghana Medical Trust Fund's Administrator said its tour of hospitals found only two functional radiotherapy machines, both in Accra, with waits of up to four months; the two counts differ and OnCo could not reconcile them (see the gaps). Scott and colleagues counted 2,883 patients treated with external beam radiotherapy in 2020, a utilisation rate of 11% against an optimal 48%, so that only 23% of the 11,524 patients with an indication were treated; the median distance from a district centre to the nearest radiotherapy centre was 110.6 km, and a centre in the northern regional capital would raise the share of people within 200 km from 70% to 84%. In November 2025 the Health Minister and an IAEA Deputy Director General discussed a radiotherapy and nuclear medicine centre in Tamale; the Minister said patients from the north often travel to Kumasi and Accra, or to neighbouring countries, and that a bankable document had not yet been received.",
          links: [
            { label: "IAEA: imPACT Review identifies opportunities to strengthen cancer control planning in Ghana (11 June 2026; read through the Internet Archive)", url: IAEA_IMPACT_WB },
            { label: "Graphic Online: MahamaCares begins next month, focuses on cancer treatment (6 May 2026)", url: GRAPHIC_GMTF_CANCER },
            { label: "Scott et al., geographic accessibility and availability of radiotherapy in Ghana (JAMA Netw Open 2022)", url: "https://doi.org/10.1001/jamanetworkopen.2022.26319" },
            { label: "Information Services Department: Health Ministry and IAEA partner to establish radiotherapy centre (5 November 2025)", url: ISD_TAMALE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Ghana does",
      title: "What Ghana does differently",
      cards: [
        {
          id: "insurance-first",
          title: "Named cancers inside national health insurance, with a second fund for the rest",
          plain:
            "Ghana's national health insurance has named the cancers it pays for: breast and cervical cancer, then four curable childhood cancers from 2022. In 2025 the government added a separate trust fund for conditions outside the scheme and chose cancer as the first group it covers, routing applications through specialist doctors.",
          detail:
            "The National Health Insurance Scheme's benefits page names breast and cervical cancer treatment as covered and other cancer treatment as excluded. Its childhood cancer benefit was introduced after what a September 2023 statement describes as the scheme's benefit package review process: mapping reimbursable treatment pathways with paediatric oncologists from seven hospitals, writing reimbursement protocols, costing and tariff setting, and actuarial and budget impact analysis; coverage was limited to the seven facilities with the specialists and equipment to treat. The Ghana Medical Trust Fund, launched in April 2025, is designed to pay for what the scheme does not; its Administrator said in May 2026 that it had worked with the insurer to establish where the insurance ends and the Fund begins, and that it would add disease groups one at a time, starting with cancers. At the November 2025 forum the Minister also announced Ghana's subscription to the WHO-led Global Platform for Access to Childhood Cancer Medicines. Prostate cancer, the commonest cancer in men in IARC's estimate, is not in the insurance benefit package; a 2022 study in the Ashanti Region put six months of hormone therapy with goserelin at 3,000 cedis when the daily minimum wage was 12.53 cedis.",
          links: [
            { label: "NHIS: benefits and exclusions", url: NHIS_BENEFITS },
            { label: "Ghana News Agency: NHIS, saving lives of children with childhood cancers (12 September 2023)", url: GNA_CHILD },
            { label: "Graphic Online: MahamaCares begins next month, focuses on cancer treatment (6 May 2026)", url: GRAPHIC_GMTF_CANCER },
            { label: "Ghanaian Times: Ghana Medical Trust Fund to cover all cancer treatment next year (19 November 2025)", url: GT_FORUM },
            { label: "Wiafe et al., the direct cost of diagnosing and managing prostate cancer in Ghana (BMC Health Serv Res 2022)", url: "https://doi.org/10.1186/s12913-022-08476-3" },
          ],
        },
        {
          id: "childhood",
          title: "Childhood cancer: insurance cover for four cancers and a growing paediatric oncology workforce",
          plain:
            "Since 2022 national insurance has paid for diagnosis and treatment of four childhood cancers that are often curable: acute lymphoblastic leukaemia, Burkitt lymphoma, retinoblastoma and Wilms tumour. The 2026 reviewers noted more paediatric oncologists and dedicated units, but said children are still underdiagnosed and families often abandon treatment.",
          detail:
            "The scheme said in November 2021 that the four cancers make up approximately 60% of childhood cancers and are highly curable if detected early. The IAEA's article on the April 2026 review says childhood cancers remain underdiagnosed and families often abandon treatment because of financial and social barriers, and quotes St. Jude Children's Research Hospital, which supported the mission, on the growing number of paediatric oncologists, multidisciplinary teams and dedicated treatment units; the Global Platform for Access to Childhood Cancer Medicines and the IAEA's Rays of Hope initiative are named as routes to better outcomes. A study of 1,073 children diagnosed at Korle Bu and Komfo Anokye Teaching Hospitals in 2015 to 2019 found lymphomas and leukaemias the commonest cancers. The Ghana Medical Trust Fund's first batch of cancer support, its Administrator said in May 2026, includes four major childhood cancers.",
          links: [
            { label: "NHIS: childhood cancers included in NHIS benefit package (16 November 2021)", url: NHIS_CHILD },
            { label: "IAEA: imPACT Review in Ghana (11 June 2026; read through the Internet Archive)", url: IAEA_IMPACT_WB },
            { label: "Owusu et al., childhood cancer in two tertiary hospitals in Ghana, 2015 to 2019 (Cancer Epidemiol 2023)", url: "https://doi.org/10.1016/j.canep.2023.102470" },
            { label: "Graphic Online: MahamaCares begins next month, focuses on cancer treatment (6 May 2026)", url: GRAPHIC_GMTF_CANCER },
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
          id: "trials-research",
          title: "Two trials in OnCo's records list a site in Ghana",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, two cancer trials list a site in Ghana: a Roche phase 3 trial in liver cancer, and a planned phase 2 trial in triple-negative breast cancer in women of African ancestry led from the Caribbean.",
          detail:
            "The two trials are IMbrave152, also called SKYSCRAPER-14 (NCT05904886), a Roche phase 3 trial of atezolizumab and bevacizumab with or without tiragolumab in untreated advanced hepatocellular carcinoma whose countries include Ghana, Nigeria and Côte d'Ivoire; and HEADWATERS (NCT07528768), a phase 2 trial of gemcitabine against paclitaxel in metastatic triple-negative breast cancer sponsored by The University of The West Indies, with sites in Barbados, Ghana and Jamaica, not yet recruiting. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines, not every study in Ghana; the search linked below shows the cancer studies registered there. A 2022 review focused on Ghana argued that most cancer therapies are introduced to Africa without confirmatory clinical trials, and discussed Ghana's trial regulation and the barriers to recruitment. Every trial in Ghana needs the Food and Drugs Authority's certificate and an entry in the Pan African Clinical Trials Registry. Yemaachi Biotech in Accra collects and sequences tumour samples from African patients.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Ghana (search)", url: CTGOV },
            { label: "ClinicalTrials.gov: NCT05904886 (IMbrave152)", url: "https://clinicaltrials.gov/study/NCT05904886" },
            { label: "ClinicalTrials.gov: NCT07528768 (HEADWATERS)", url: "https://clinicaltrials.gov/study/NCT07528768" },
            { label: "Roberts et al., unmet needs in oncology clinical research and treatment in Africa: focus on Ghana (Oncologist 2022)", url: "https://doi.org/10.1093/oncolo/oyac109" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "impact-report",
      title: "The April 2026 imPACT Review report has not been published",
      plain:
        "IAEA, WHO and IARC reviewers assessed Ghana's cancer services in April 2026. OnCo found no published report or summary of their findings, only the IAEA's news article, which refused a plain request and was read through the Internet Archive.",
      detail:
        "The IAEA's article of 11 June 2026 returned HTTP 403 to a plain request on 11 November 2026 and was read from the Internet Archive's copy of 18 June 2026. The reviewers' own counts of oncologists, pathology, imaging and radiotherapy, which a full report would hold, are not on this page except as the article quotes them. OnCo found no current national cancer control plan; the strategy read here ran to 2016.",
      links: [
        { label: "IAEA: imPACT Review identifies opportunities to strengthen cancer control planning in Ghana (11 June 2026)", url: IAEA_IMPACT },
        { label: "National Strategy for Cancer Control in Ghana 2012 to 2016 (PDF)", url: NSCC_2011 },
      ],
    },
    {
      id: "radiotherapy-now",
      title: "How many radiotherapy machines are treating patients is not settled",
      plain:
        "Two statements a month apart disagree. The Ghana Medical Trust Fund's Administrator said in May 2026 that only two radiotherapy machines were functional, both in Accra; the IAEA wrote in June 2026 that four were in operation nationwide. Neither names the hospitals.",
      detail:
        "Neither source says whether its count includes private centres or machines under repair, and the Trust Fund's figure is reported by a newspaper, not published by the Fund. A 2022 study counted three radiotherapy centres in 2020: Korle Bu Teaching Hospital and the private Sweden Ghana Medical Centre in Accra, and Komfo Anokye Teaching Hospital in Kumasi, which then had two external beam machines. The May 2026 statement that both functional machines were in Accra suggests radiotherapy in Kumasi may not have been available then. Ask the referring hospital which centre is treating and how long the wait is.",
      links: [
        { label: "Graphic Online: MahamaCares begins next month, focuses on cancer treatment (6 May 2026)", url: GRAPHIC_GMTF_CANCER },
        { label: "IAEA: imPACT Review in Ghana (11 June 2026; read through the Internet Archive)", url: IAEA_IMPACT_WB },
        { label: "Scott et al., geographic accessibility and availability of radiotherapy in Ghana (JAMA Netw Open 2022)", url: "https://doi.org/10.1001/jamanetworkopen.2022.26319" },
      ],
    },
    {
      id: "approval-times",
      title: "No published registration times or cancer medicines list read",
      plain:
        "OnCo found no published target or measured time for the Food and Drugs Authority to register a new medicine, and did not read the NHIS Medicines List or Ghana's essential medicines list, so this page cannot say which cancer medicines are registered, listed or paid for.",
      detail:
        "The Authority's clinical trials page sets document and response rules but no review time, and its reliance policy is a download that was not read. The NHIS benefits page excludes medicines not on the NHIS Medicines List, but the list itself was not read. Ghana's national essential medicines list was not found in a form OnCo could read. The Trust Fund's law and benefit rules were not read; what it pays for comes from news reports of officials' statements.",
      links: [
        { label: "FDA Ghana: clinical trials authorization", url: FDA_CT },
        { label: "NHIS: benefits and exclusions", url: NHIS_BENEFITS },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: registry data after 2015, any incidence figures from the Accra registry, population-based survival, a national count of oncologists, and IARC's detailed method for Ghana.",
      detail:
        "The Kumasi registry's latest published year found was 2015, and its African Cancer Registry Network page dates from March 2017; the live page now returns not found. The Accra registry's 2020 paper describes its set-up but gives no incidence. The 25% five-year breast cancer survival at Korle Bu is an older hospital figure the 2011 strategy cites from a study by Baako, not a recent measurement. No national count of clinical oncologists, pathologists or oncology nurses was found in an official source. IARC's detailed data sources page for Ghana is an interactive page that could not be read as text; the method is taken from the fact sheet, which leaves the incidence source unnamed.",
      links: [
        { label: "African Cancer Registry Network: Kumasi Cancer Registry (March 2017; read through the Internet Archive)", url: AFCRN_KUMASI_WB },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Ghana (PDF)", url: IARC_FACTSHEET },
      ],
    },
  ],
  institutions: [
    "ghana-ministry-of-health", "nhia-ghana", "ghana-medical-trust-fund", "fda-ghana", "kumasi-cancer-registry",
    "korle-bu-teaching-hospital", "komfo-anokye-teaching-hospital", "psycho-oncology-society-of-ghana", "iaea", "iarc", "who", "st-jude",
  ],
  companies: ["roche-genentech", "yemaachi-biotech"],
  drugs: ["atezolizumab", "bevacizumab", "tiragolumab", "gemcitabine", "paclitaxel"],
  trials: ["nct05904886", "nct07528768"],
  papers: [
    "paper-laryea-kumasi-cancer-incidence-2012-bmccancer-2014", "paper-amoako-kumasi-malignant-tumours-2015-bmccancer-2019", "paper-yarney-accra-cancer-registry-jgo-2020",
    "paper-scott-radiotherapy-access-ghana-jamanetworkopen-2022", "paper-appiah-cervical-screening-ghana-dhs-bmcwh-2025", "paper-adanu-breast-cancer-household-cost-ghana-pgph-2022",
  ],
  people: ["yakubu-seidu-adam", "paa-kwesi-baidoo"],
  how:
    "Every card was written from Ghanaian official sources and international reviews, read in full rather than through a summary: the Ministry of Health's National Strategy for Cancer Control 2012 to 2016 and its page on the Ghana Medical Trust Fund; the National Health Insurance Scheme's benefits and news pages; the Food and Drugs Authority's history and clinical trials pages; WHO's feature on the Authority's maturity level; the African Cancer Registry Network's page for the Kumasi registry, through the Internet Archive, and its current membership list; Gavi's HPV release and WHO's coverage rows and Global Health Observatory indicators from their public data APIs; the IAEA's article on the April 2026 imPACT Review, through the Internet Archive; the Information Services Department's page on a Tamale centre; news reports from Graphic Online, the Ghanaian Times, the Ghana News Agency and MyJoyOnline where officials' statements were not published elsewhere; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, the insurer, the regulator, the Trust Fund, the Kumasi registry and six papers) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates, not a national count, and the Kumasi registry sees only part of one city's cancers. What national insurance and the Ghana Medical Trust Fund pay for, which hospitals are giving radiotherapy and how long the waits are change faster than any published page; ask the treating hospital's oncology department or your NHIS district office what applies to you.",
  verifyLinks: [
    { label: "Ministry of Health, Ghana", url: "https://moh.gov.gh/" },
    { label: "National Health Insurance Scheme", url: "https://www.nhis.gov.gh/" },
    { label: "Food and Drugs Authority, Ghana", url: "https://fdaghana.gov.gh/" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Ghana (PDF)", url: IARC_FACTSHEET },
  ],
};

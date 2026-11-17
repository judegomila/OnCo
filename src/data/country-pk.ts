import type { CountryDive } from "@/data/country-dive";

/**
 * Pakistan deep dive: the hand-written cards for /countries/pk/. Read on 4 November 2026 from the raw text of each
 * page or PDF (pdftotext or the HTML itself), not from a summary: the Punjab Cancer Registry's reports for 2022 and
 * 2023, the PAEC cancer registry report for 2018 and 2019 and PAEC's medical services page (Internet Archive copies),
 * PAEC's 2020 and 2021 registry report (downloaded from paec.gov.pk in the 4 November audit), Shaukat Khanum's 2022 hospital registry report and its own
 * about page, the Gazette of Pakistan for Act XXIX of 2025, DRAP's reliance guideline and Drug Pricing Policy 2018
 * (as amended to 30 September 2024), State Life's pages for the federal and Khyber Pakhtunkhwa health cards, two
 * Dawn reports through dated Internet Archive copies (dawn.com serves a bot check), UNICEF's HPV vaccine release,
 * WHO's 2020 cancer country profile, IARC's 2024 fact sheet, the President's World Cancer Day message (English and
 * Urdu texts, which agree) and ClinicalTrials.gov API v2. Abstracts were read in Europe PMC after resolving each DOI
 * through Crossref. Where a figure could not be read it is named under `gaps`.
 */
const PCR = "https://punjabcancerregistry.org.pk/";
const PCR_2023 = "https://punjabcancerregistry.org.pk/reports/PCR_2023.pdf";
const PCR_2022 = "https://punjabcancerregistry.org.pk/reports/PCR_2022.pdf";
const NCR_2023 = "https://doi.org/10.29271/jcpsp.2023.06.625";
const LAHORE = "https://doi.org/10.1136/bmjopen-2020-047049";
const KCR = "https://doi.org/10.31557/apjcp.2020.21.11.3251";
const SCOPING = "https://doi.org/10.1016/j.lansea.2025.100615";
const PAEC_MED = "https://web.archive.org/web/20261025161918/https://paec.gov.pk/Medical/";
const PAECR_1819 = "https://web.archive.org/web/20211112173232/http://www.paec.gov.pk/Documents/Medical/PAECR_report_2018-19.pdf";
const PAECR_2021 = "https://paec.gov.pk/Documents/Medical/PAECR_report_2020-21.pdf";
const SKM_ZAKAT = "https://shaukatkhanum.org.pk/donors/zakat/";
const SKM_2022 = "https://shaukatkhanum.org.pk/wp-content/uploads/2023/09/Annual-Cancer-Registry-Report-2022.pdf";
const SKM_ABOUT = "https://shaukatkhanum.org.pk/about-us/";
const NIH_ACT = "https://na.gov.pk/uploads/documents/68ca64766a52d_543.pdf";
const SL_PM = "https://www.statehealth.com.pk/pmnationalprogram";
const SL_KP = "https://www.statehealth.com.pk/sehat-card-plus-kp";
const DAWN_ICT = "https://web.archive.org/web/20260718140843/https://www.dawn.com/news/1967205";
const DAWN_PUNJAB = "https://web.archive.org/web/20251210130518/https://www.dawn.com/news/1921079/health-insurance-closed-at-public-hospitals-to-promote-cms-initiatives";
const DRAP_RELIANCE = "https://www.dra.gov.pk/wp-content/uploads/2023/01/2nd-edition-Relaince-Mechansim-in-Regulatory-Processess.pdf";
const DRAP_PRICING = "https://www.dra.gov.pk/wp-content/uploads/2025/04/Drug-Pricing-Policy-2018.pdf";
const DRAP_PRICE_SEARCH = "https://e.dra.gov.pk/public/price";
const JPMA_IMPORT = "https://doi.org/10.47391/jpma.3458";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/pak-2020.pdf";
const UNICEF_HPV = "https://www.unicef.org/pakistan/press-releases/pakistan-introduces-hpv-vaccine-protect-girls-cervical-cancer-joining-150-countries";
const PRESIDENT_2026 = "https://president.gov.pk/message-from-the-president-of-the-islamic-republic-of-pakistan-on-world-cancer-day-4th-february-2026-2";
const GCO_FACT = "https://gco.iarc.who.int/media/globocan/factsheets/populations/586-pakistan-fact-sheet.pdf";
const ARAB_NEWS_CART = "https://www.arabnews.pk/node/2649707";
const CTGOV_PK = "https://clinicaltrials.gov/search?locStr=Pakistan&country=Pakistan";
const SKM_KARACHI = "https://shaukatkhanum.org.pk/karachi-vdw/";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PAK'%20and%20contains(ANTIGEN,'HPV')";

export const PK_DIVE: CountryDive = {
  iso2: "PK",
  iso3: "PAK",
  name: "Pakistan",
  flag: "🇵🇰",
  asOf: "2026-11-04",
  title: "Cancer in Pakistan",
  description:
    "Cancer in Pakistan from Pakistani sources: regional and hospital registries and a 2025 law that makes the National Institutes of Health build a national one, the first pooled report of 269,707 cancers from 2015 to 2019, the health card schemes and what they pay for cancer, the atomic energy commission's chain of cancer hospitals, DRAP's reliance route and price rules, the 2025 HPV vaccine campaign, and a first CAR-T treatment reported in July 2026 at a military hospital that makes the cells on site.",
  lede:
    "Pakistan has no unified national cancer registry, a 2025 review found: its numbers come from regional and hospital registries, seventeen of which that review identified, and IARC's model puts 2024 at 190,308 new cancers, with breast cancer the commonest; in the pooled count of registered cases, oral cancer is the commonest in men. Much of its cancer care is given by a chain of hospitals run by the atomic energy commission and by charity hospitals, publicly funded health cards pay for inpatient cancer treatment in some provinces, and in July 2026 a military hospital in Rawalpindi that makes CAR-T cells on site for two trials was reported to have carried out its first successful CAR-T treatment.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Pakistan is 190,308 new cancers and 119,742 deaths in 2024, an age-standardised incidence rate of 106.8 per 100,000 and a mortality rate of 69.4. Both are modelled. IARC's fact sheet gives its incidence method as national or subnational rates scaled to regional all-cancer rates, and its mortality method as national incidence estimates applied to model-based mortality-to-incidence ratios from registry survival data. Separately, WHO's 2020 profile records no coverage for the quality of mortality registration in 2007 to 2016. IARC's total includes 4,075 non-melanoma skin cancers; without them it is 186,233. OnCo found no Pakistani source that counts the whole country. The pooled national report counted 269,707 registered cases over the five years 2015 to 2019, about 54,000 a year, from six registries, and PAEC says its own hospital-based registry supplied about 67% of the cases: that is a count of people who reached a registering centre, not an incidence estimate, so it cannot be set against IARC's figure like for like. The Punjab Cancer Registry's population series for Lahore district from 2010 to 2019, which its authors describe as the first report of cancer statistics over ten years for any region of Pakistan, gives age-standardised rates of 103.4 per 100,000 women and 65.6 per 100,000 men, against IARC's 106.8 for both sexes nationally. Both put breast cancer first: IARC estimates 43,721 new cases, 23% of its total, and the national report found 21.4% of registered cases. The President's World Cancer Day message of February 2026 gives an annual incidence of 185 per 100,000 without naming its source; IARC's 190,308 cases in a population of 251.3 million work out at about 76 per 100,000 before age standardisation (OnCo's arithmetic from the fact sheet).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Pakistan",
      aside: { label: "National Cancer Registry of Pakistan: first report, 2015 to 2019 (JCPSP 2023)", url: NCR_2023 },
      cards: [
        {
          id: "shape",
          title: "269,707 registered cancers in five years, led by breast cancer in women and oral cancer in men",
          plain:
            "When six of Pakistan's registries pooled their records for 2015 to 2019, they held 269,707 cancers. Breast cancer was one in five of them, and nearly two in five of the cancers in women. In men the commonest was cancer of the mouth, then liver, bowel, lung and prostate. The report's authors note that many of them have known, largely preventable causes.",
          detail:
            "The report, compiled at the Health Research Institute of the National Institutes of Health in Islamabad and published in 2023, pooled the Punjab Cancer Registry, the Karachi Cancer Registry, the Pakistan Atomic Energy Commission registry, the Armed Forces Institute of Pathology registry, Nishtar Medical University Hospital in Multan and Shifa International Hospital in Islamabad. 46.7% of cases were in men and 53.61% in women; 45.13% came from Punjab, 26.83% from Sindh, 16.46% from Khyber Pakhtunkhwa and 3.52% from Balochistan. Breast cancer accounted for 57,633 cases (21.4%). In men the top five were oral (14,477; 11.6%), liver (8,398), colorectal (8,024), lung (7,547) and prostate (7,322); in women breast (56,250; 38.8%), ovary (8,823), oral (7,195), cervix (6,043) and colorectal (4,860). Leukaemia led in children and bone cancer in adolescents. The authors link oral cancer to chewing habits, and liver, lung and cervical cancer to hepatitis B and C, smoking and high-risk human papillomavirus. The abstract reports counts and shares, not rates, and PAEC says its own hospital-based registry supplied about 67% of the cases, so the shares describe who reached a registering centre, not rates in the population. PAEC's 2020 and 2021 report describes the pooled report as drawing on eight registries, where the abstract names six.",
          links: [
            { label: "Ikram et al., National Cancer Registry of Pakistan 2015 to 2019 (JCPSP 2023)", url: NCR_2023 },
            { label: "Europe PMC abstract", url: "https://europepmc.org/article/MED/37300256" },
            { label: "PAEC Cancer Registry Report 2020 and 2021 (PDF)", url: PAECR_2021 },
          ],
        },
        {
          id: "late-diagnosis",
          title: "At the atomic energy cancer hospitals, most patients arrive with stage III or IV disease",
          plain:
            "In the atomic energy commission's cancer hospitals in 2018 and 2019, about three in five patients had stage III or IV disease, and fewer than one in fourteen had stage I. For breast cancer in 2018, only 327 of 8,816 patients were diagnosed at stage I. The stage at diagnosis shapes what treatment can do.",
          detail:
            "The PAEC Cancer Registry Report for 2018 and 2019 counts 79,254 newly registered patients across 17 Atomic Energy Cancer Hospitals: 6.8% were stage I, 17.1% stage II, 31.0% stage III, 28.5% stage IV, 7.9% unknown and 8.7% cancers with no AJCC stage, such as leukaemias and brain tumours. Its 2018 table for breast cancer (C50) counts 8,816 patients (8,577 women and 239 men): 327 at stage I, 2,049 at stage II, 3,886 at stage III, 1,818 at stage IV and 736 unstaged, so 44% were stage III and 21% stage IV. For lip, oral cavity and pharynx in 2018, 2,728 of 5,283 patients were stage IV. These are patients at hospitals that see many referred cases, so they may not mirror everyone diagnosed, but no population-based staging data for Pakistan were found. PAEC's next report, for 2020 and 2021 (33,512 and 39,358 patients), says the largest shares of patients were again diagnosed at stage III and IV, as in 2018 and 2019.",
          links: [
            { label: "PAEC Cancer Registry Report 2018 and 2019 (Internet Archive copy of 12 November 2021, PDF)", url: PAECR_1819 },
            { label: "PAEC Cancer Registry Report 2020 and 2021 (PDF)", url: PAECR_2021 },
            { label: "PAEC: medical services (Internet Archive copy, 25 October 2026)", url: PAEC_MED },
          ],
        },
        {
          id: "who-travels",
          title: "Patients come from across the country, and from Afghanistan",
          plain:
            "Pakistan's large cancer centres treat people who have travelled far. At Shaukat Khanum's hospitals in 2022, about one malignant cancer in seven was in a patient from Afghanistan, and the atomic energy commission's registry records about one patient in twenty-five from Afghanistan. Registries, and the large centres behind them, are in a few cities.",
          detail:
            "Shaukat Khanum's annual hospital registry for 2022 counts 7,381 new malignancies across its Lahore and Peshawar hospitals and its diagnostic centres: 4,941 registered in Lahore, 2,346 in Peshawar and 94 at the Karachi Diagnostic Centre. By residence, 4,143 (56.1%) were from Punjab, 1,856 (25.1%) from Khyber Pakhtunkhwa including the former tribal areas, 150 from Sindh, 80 from Balochistan, 64 from the federal capital and 1,003 (13.6%) from Afghanistan; breast cancer led with 1,893 cases. The PAEC registry records 3.9% of its 2018 patients, 4.0% of its 2019 patients and 4% of its 2020 and 2021 patients as from Afghanistan. A 2025 scoping review found that only 19 of Pakistan's 129 cities contribute data to any cancer registry.",
          links: [
            { label: "Shaukat Khanum: Annual Cancer Registry Report 2022 (PDF)", url: SKM_2022 },
            { label: "PAEC Cancer Registry Report 2018 and 2019 (PDF, Internet Archive)", url: PAECR_1819 },
            { label: "PAEC Cancer Registry Report 2020 and 2021 (PDF)", url: PAECR_2021 },
            { label: "Virani et al., Cancer registries in Pakistan: a scoping review (2025)", url: SCOPING },
          ],
        },
      ],
      tables: [
        {
          id: "ncr-2015-2019",
          title: "Commonest registered cancers, pooled national report, 2015 to 2019",
          caption: "Registered cases over five years from six registries (269,707 in all), by sex. Counts and shares of that sex's cases.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "sex", label: "Sex" },
            { key: "cases", label: "Registered cases, 2015 to 2019", numeric: true },
            { key: "share", label: "Share of that sex's cases (%)", numeric: true },
          ],
          rows: [
            { site: "Breast", sex: "Women", cases: 56250, share: 38.8 },
            { site: "Ovary", sex: "Women", cases: 8823, share: 6.09 },
            { site: "Oral cavity", sex: "Women", cases: 7195, share: 4.97 },
            { site: "Cervix", sex: "Women", cases: 6043, share: 4.17 },
            { site: "Colorectal", sex: "Women", cases: 4860, share: 3.36 },
            { site: "Oral cavity", sex: "Men", cases: 14477, share: 11.6 },
            { site: "Liver", sex: "Men", cases: 8398, share: 6.73 },
            { site: "Colorectal", sex: "Men", cases: 8024, share: 6.43 },
            { site: "Lung", sex: "Men", cases: 7547, share: 6.05 },
            { site: "Prostate", sex: "Men", cases: 7322, share: 5.87 },
          ],
          note: "Counts of registered cases pooled at the National Institutes of Health, about 67% of them from PAEC's hospital-based registry by PAEC's account; they are not incidence, and the abstract gives no population denominator. Breast cancer in both sexes together was 57,633 cases (21.4% of all).",
          sources: [{ label: "Ikram et al., JCPSP 2023;33(6):625 (abstract)", url: NCR_2023 }, { label: "PAEC Cancer Registry Report 2020 and 2021 (PDF)", url: PAECR_2021 }],
        },
        {
          id: "pcr-lahore",
          title: "Ten most frequently reported cancers in Lahore district, 2022 and 2023",
          caption: "New diagnoses among Lahore residents, both sexes, all ages, Punjab Cancer Registry preliminary reports. Blank where the site was not in that year's top ten.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "y2022", label: "2022", numeric: true },
            { key: "y2023", label: "2023", numeric: true },
          ],
          rows: [
            { site: "All malignancies reported", y2022: 6661, y2023: 6271 },
            { site: "Breast", y2022: 1659, y2023: 1391 },
            { site: "Brain and nervous system", y2022: 425, y2023: 417 },
            { site: "Colon, rectum and anus", y2022: 327, y2023: 326 },
            { site: "Lip and oral cavity", y2022: 278, y2023: 286 },
            { site: "Non-Hodgkin lymphoma", y2022: 327, y2023: 282 },
            { site: "Liver and intrahepatic bile ducts", y2022: null, y2023: 261 },
            { site: "Trachea, bronchus and lung", y2022: 183, y2023: 235 },
            { site: "Leukaemia", y2022: 257, y2023: 234 },
            { site: "Corpus uteri and uterus", y2022: 242, y2023: 217 },
            { site: "Urinary bladder", y2022: 243, y2023: 200 },
            { site: "Prostate", y2022: 218, y2023: null },
          ],
          note: "Both reports are marked preliminary and will be updated as more data arrive, so the fall from 2022 to 2023 may reflect late reporting rather than fewer cancers. The registry's population series for 2010 to 2019 gives age-standardised rates of 103.4 per 100,000 women and 65.6 per 100,000 men.",
          sources: [
            { label: "Punjab Cancer Registry Report 2023 (dated 20 August 2024)", url: PCR_2023 },
            { label: "Punjab Cancer Registry Report 2022", url: PCR_2022 },
            { label: "Badar and Mahmood, BMJ Open 2021", url: LAHORE },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer",
      aside: { label: "Gazette of Pakistan: Act XXIX of 2025 (PDF)", url: NIH_ACT },
      cards: [
        {
          id: "seventeen-registries",
          title: "Seventeen registries, covering 19 of Pakistan's 129 cities",
          plain:
            "Pakistan's cancer counts come from regional and hospital registries that each cover part of the country. Lahore's has collected the cancers reported among the district's residents since 2008, Karachi's has collected from eight hospitals since 2017, and the atomic energy commission and Shaukat Khanum keep registries of their own patients. A 2025 review found no unified national registry.",
          detail:
            "A 2025 scoping review in The Lancet Regional Health identified seventeen cancer registries, with data from only 19 of Pakistan's 129 cities, collection methods from paper forms to software, limited funding and several facing operational problems; it noted the Karachi Cancer Registry for its high research output. The Punjab Cancer Registry, set up in 2005 and run from Shaukat Khanum in Lahore, has collected population data for Lahore district since 1 July 2008 and has added districts since 2014; its latest report, for 2023, is preliminary and covers Lahore only. The Karachi Cancer Registry, described as part of the National Cancer Registry, has collected data from eight major hospitals since 2017 and recorded 33,309 malignancies in 2017 to 2019 for Karachi division (16.1 million people), with adult age-standardised rates of 223.6 per 100,000 women and 216.7 per 100,000 men; oral cancer led in adult men and breast cancer in adult women. PAEC's registry and Shaukat Khanum's are hospital-based. PAEC's latest report, for 2020 and 2021, counts 33,512 and 39,358 patients from 17 of its hospitals, and says its registry supplied about 67% of the cases in the pooled national report.",
          links: [
            { label: "Virani et al., Cancer registries in Pakistan: a scoping review (2025)", url: SCOPING },
            { label: "Punjab Cancer Registry", url: PCR },
            { label: "Pervez et al., Karachi Cancer Registry 2017 to 2019 (APJCP 2020)", url: KCR },
            { label: "PAEC Cancer Registry Report 2020 and 2021 (PDF)", url: PAECR_2021 },
          ],
        },
        {
          id: "registry-law",
          title: "Since September 2025, the law requires a national register of cancer patients",
          plain:
            "An Act of Parliament that came into force in September 2025 gives the National Institutes of Health in Islamabad the duty to register cancer patients from the whole country in one central database. It can require any hospital or laboratory to send its cancer data, and patients' personal details may not be disclosed to anyone unauthorised without their prior written consent.",
          detail:
            "The National Institute of Health (Re-organization) (Amendment) Act, 2025, Act XXIX of 2025, received presidential assent on 5 September 2025 and was published in the Gazette of Pakistan on 13 September 2025. It inserts sub-sections (2A) to (2C) into section 16 of the 2021 Act: the centre shall assure the registration of cancer patients in a central repository, as a vital step to understand the actual burden of disease and to implement a national action plan for cancer prevention, including names and national identity card numbers; it may call on any hospital or laboratory for data; it shall register confirmed cases, deaths, recoveries, hospitalised cases and demographic details; and data shall come from hospital records, laboratory reports and surveillance systems. OnCo found no published figures from the new register yet.",
          links: [
            { label: "Gazette of Pakistan, 13 September 2025: Act XXIX of 2025 (PDF)", url: NIH_ACT },
            { label: "National Institutes of Health, Islamabad", url: "https://www.nih.org.pk/" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays for cancer care",
      aside: { label: "State Life: Prime Minister's National Health Program", url: SL_PM },
      cards: [
        {
          id: "health-cards",
          title: "Health cards pay for inpatient cancer treatment, but the scheme now differs by province",
          plain:
            "Pakistan's government health insurance, begun in 2018 as the Sehat Sahulat Programme and known as the health card, pays hospitals directly for inpatient treatment, including chemotherapy, radiotherapy and cancer surgery. Since mid-2025 each province runs its own version: Khyber Pakhtunkhwa covers every permanent resident, while Punjab stopped it in government hospitals at the end of June 2025, the newspaper Dawn reported. The federal scheme covers Islamabad, Azad Kashmir and Gilgit-Baltistan.",
          detail:
            "Dawn reported on 16 January 2026 (read in an Internet Archive copy of 18 July 2026) that the programme was launched on 7 February 2018, ran to June 2025 and was then devolved to the provinces; the same report has the planning minister telling the meeting that it was first launched in 2015. On 15 January 2026 the Central Development Working Party cleared Rs40.188 billion to continue it in Islamabad Capital Territory, Azad Jammu and Kashmir and Gilgit-Baltistan for two years to 30 June 2027 and referred it to the Executive Committee of the National Economic Council for formal approval; it was to cover indoor treatment for all permanent resident families as recorded by NADRA, and the minister directed that it be renamed the Prime Minister's National Health Programme. State Life's page gives 16 January 2026 as the relaunch date. State Life, which runs it, lists chemotherapy, radiation therapy and surgical oncology among covered services, verified by national identity card at about 1,000 public and private hospitals, with no payment at the point of care. For Khyber Pakhtunkhwa, State Life gives annual cover of up to Rs1,000,000 per family for permanent residents, including cancer treatment, with an outpatient pilot in some districts. In Punjab, Dawn reported on 30 June 2025 (Internet Archive copy of 10 December 2025) that the scheme was closed at all public hospitals from 30 June 2025 and continues only at empanelled private hospitals, in favour of the Chief Minister's own disease programmes.",
          links: [
            { label: "State Life: Prime Minister's National Health Program", url: SL_PM },
            { label: "State Life: Sehat Card Plus KP", url: SL_KP },
            { label: "Dawn: CDWP clears Rs40bn health cover for AJK, GB, ICT (Internet Archive copy)", url: DAWN_ICT },
            { label: "Dawn: Health insurance closed at public hospitals (Internet Archive copy)", url: DAWN_PUNJAB },
          ],
        },
        {
          id: "charity-and-public",
          title: "Charity and public hospitals carry much of the cost of treatment",
          plain:
            "Outside the health cards, much cancer treatment is paid for by charity or given at public hospitals. Shaukat Khanum, which relies on donations, more than half of them zakat by its own account, says three in four of its patients receive financial support. The atomic energy commission says its cancer hospitals treat patients free or at subsidised rates.",
          detail:
            "Shaukat Khanum's own figures are 75% of patients financially supported, Rs74.08 billion (about US$627 million) spent on philanthropic care to date and an annual budget of Rs39 billion in 2023, across hospitals in Lahore (opened 29 December 1994, 195 beds) and Peshawar (29 December 2015, 60 beds); its page for a Karachi hospital, read on 17 November 2026, is headed \"Opening in December 2026\". Its zakat page says more than half of its philanthropic support comes from zakat, which is kept in a separate fund for eligible patients, while other costs are met from donations and hospital revenue. Its vision statement is to treat patients irrespective of their ability to pay. PAEC says its Atomic Energy Cancer Hospitals see over 40,000 new cancer patients and 1.0 million procedures a year, free of charge or at subsidised rates; it describes that as about 80% of the country's cancer burden, which does not match IARC's 190,308 new cancers in 2024 (40,000 would be about one in five). The health card pages read for this page describe inpatient cover; OnCo did not find a published rule on whether oral cancer medicines taken at home are covered, so ask the hospital's health facilitation desk before relying on it.",
          links: [
            { label: "Shaukat Khanum: about us (figures)", url: SKM_ABOUT },
            { label: "Shaukat Khanum: zakat", url: SKM_ZAKAT },
            { label: "Shaukat Khanum Hospital, Karachi", url: SKM_KARACHI },
            { label: "PAEC: medical services (Internet Archive copy, 25 October 2026)", url: PAEC_MED },
          ],
        },
        {
          id: "drug-prices",
          title: "Essential medicines have fixed prices, set against India and Bangladesh for a new brand",
          plain:
            "The regulator sets the maximum retail price of medicines on Pakistan's essential medicines list; since 2024 other medicines are free of price control. For a new medicine on the list, the original brand is priced at the average of what it costs in India and Bangladesh. Prices can be checked on the regulator's public price search.",
          detail:
            "Under the Drug Pricing Policy, 2018, as amended up to 30 September 2024, the policy applies only to drugs and biologicals on the National Essential Medicines List: their maximum retail prices are fixed and regulated, and those not on the list are exempt from the price-fixing section of the Drugs Act, 1976. Within the policy, the maximum retail price of the originator brand of a new chemical or biological entity is the average of its price in India and Bangladesh, or its price in one of them; if marketed in neither, the average of a basket of Indonesia, the Philippines, Lebanon, Sri Lanka and Malaysia. A generic may not be priced above its originator. Companies may apply once in three years for a hardship price review, which DRAP must decide within 120 days; in that formula imported anti-cancer medicines, biologicals, immunosuppressants and antiretrovirals carry a trade mark-up of 40% on landed cost against 45% for other imported drugs. OnCo found no Pakistani health technology assessment body that publishes appraisals of cancer medicines (see gaps).",
          links: [
            { label: "DRAP: Drug Pricing Policy, 2018, as amended to 30 September 2024 (PDF)", url: DRAP_PRICING },
            { label: "DRAP: public price search", url: DRAP_PRICE_SEARCH },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how long approval takes",
      aside: { label: "DRAP: Reliance Mechanism in Regulatory Processes (PDF)", url: DRAP_RELIANCE },
      cards: [
        {
          id: "drap-reliance",
          title: "DRAP registers medicines by relying on twenty-one foreign regulators",
          plain:
            "The Drug Regulatory Authority of Pakistan licenses medicines through its Registration Board. For a medicine already approved by one of twenty-one regulators it names, including the US FDA, the European Medicines Agency and the WHO, it accepts that approval as evidence of safety, efficacy and quality, and uses a shorter route. OnCo found no published average time from application to approval.",
          detail:
            "DRAP's guideline on good reliance practice (document QMSC/GL/RM/005, second edition, effective 4 January 2023) says the Registration Board, constituted under the DRAP Act, 2012 and working under the Drugs (Licensing, Registering and Advertising) Rules, 1976, has adopted reference regulatory authorities for an abridged pathway for initial approvals, post-approval changes and renewals. Finished pharmaceutical and biological products approved by those authorities are considered safe, effective and of quality, and the review relies on their public assessment reports, product information and certificates of pharmaceutical product. The list has twenty-one entries: the FDA, Health Canada, Australia's TGA, Japan's PMDA, the UK's MHRA, fourteen other European national agencies, the EMA, and the WHO, with whom DRAP has an agreement on collaborative registration of prequalified products. Rule 30(10) of the 1976 Rules accepts the approved clinical information of the USA, EU countries, Canada, Japan or Australia unless the Board changes it on scientific grounds. The guideline sets out no target time, and OnCo found no published approval-time statistics.",
          links: [
            { label: "DRAP: Reliance Mechanism in Regulatory Processes, 2nd edition, 2023 (PDF)", url: DRAP_RELIANCE },
            { label: "DRAP: Registration Board meeting minutes", url: "https://www.dra.gov.pk/category/publications/meeting_minutes/registration_board/" },
          ],
        },
        {
          id: "unregistered-imports",
          title: "Unregistered cancer medicines can be imported with a no-objection certificate",
          plain:
            "When a cancer medicine is not registered in Pakistan, a hospital or a patient can ask DRAP for a no-objection certificate to import it. Pharmacists at Shaukat Khanum wrote in 2021 that this can take 10 to 30 days, or up to 1 to 3 days for an individual patient, and that importing the medicine takes about four to six weeks on average.",
          detail:
            "The letter by Ehsan Elahi and Adeel Siddiqui of Shaukat Khanum's pharmacy department (J Pak Med Assoc 2021) says DRAP grants no-objection certificates to import unregistered drugs either for a named patient or for a hospital's institutional use, both subject to renewal; the process takes a minimum of 10 and a maximum of 30 days, and up to 1 to 3 days for an individual patient, while importing an unregistered drug takes about four to six weeks on average and can be delayed for months. They also describe shortages of anticancer drugs from lack of active ingredients. They proposed cutting import time to one week, listing a medicine as a special-status drug once imported so later imports are faster, exempting such imports from customs duties and encouraging local manufacture of generics. These are figures given in a 2021 letter by two pharmacists at one hospital; OnCo found none published by DRAP.",
          links: [
            { label: "Elahi and Siddiqui, A call for revamping the policy on import process of anticancer drugs in Pakistan (JPMA 2021)", url: JPMA_IMPORT },
            { label: "Journal of the Pakistan Medical Association: full text", url: "https://jpma.org.pk/index.php/public_html/article/view/3458" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "UNICEF: Pakistan introduces HPV vaccine (15 September 2025)", url: UNICEF_HPV },
      cards: [
        {
          id: "no-programme",
          title: "WHO's 2020 profile records no national screening programme for breast or cervical cancer",
          plain:
            "WHO's latest cancer profile for Pakistan, published in 2020 from 2019 data, records no breast or cervical screening programme, no early-detection programme or guidelines for breast, cervical, colon or childhood cancer, and no national cancer management guidelines. OnCo found no later official source describing a national programme that invites people for screening. In February 2026 the President said a national cancer strategy was being written.",
          detail:
            "WHO's Cancer Country Profile 2020 for Pakistan records, in rows dated 2019, breast cancer screening programme: no; cervical cancer screening: no; early detection programme or guidelines for breast, cervix, colon or childhood cancers: none; cancer management guidelines: no; and no defined referral system for childhood cancer. It counts 3.3 external-beam radiotherapy machines (2019), 0.9 mammography units and 0.3 PET or PET-CT scanners (both 2020) per 10,000 cancer patients. The President's World Cancer Day message of 4 February 2026, in English and Urdu, says a comprehensive national cancer strategy is under development with particular emphasis on childhood cancer, that national and provincial cancer control strategies are being formulated, and that selected cancer patients in federally administered areas will be treated free through public-private partnership. Where no screening invitation arrives, breast lumps and other warning signs are found by the person or a doctor, which is why knowing the signs matters.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Pakistan (PDF)", url: WHO_PROFILE },
            { label: "President of Pakistan: World Cancer Day message, 4 February 2026", url: PRESIDENT_2026 },
          ],
        },
        {
          id: "hpv-vaccine",
          title: "A free HPV vaccine campaign for 13 million girls began in September 2025",
          plain:
            "On 15 September 2025 Pakistan began vaccinating girls aged 9 to 14 against human papillomavirus, a virus that causes cervical cancer, free of charge, in Punjab, Sindh, Azad Kashmir and Islamabad. The aim was to reach at least nine in ten of 13 million girls, and then to give the vaccine routinely at age 9.",
          detail:
            "UNICEF's release of 15 September 2025 says the Federal Directorate of Immunization, with Gavi, UNICEF and WHO, launched the campaign at fixed centres, schools, outreach sites and with mobile teams, with the goal of vaccinating at least 90% of 13 million eligible girls in the first phase and then integrating the vaccine into routine immunisation for 9-year-old girls. The WHO Representative in Pakistan is quoted: \"In Pakistan, we lose 8 women every day due to cervical cancer\", and says WHO aims to protect over 17 million girls by 2027. The health minister appealed to parents not to believe false propaganda about the vaccine. WHO's immunisation data, read on 17 November 2026, hold a 2025 row for Pakistan for first-dose HPV programme coverage in females: 7,032,118 doses against a target number of 17,580,296, coverage 40%. That row is WHO's national figure for the year, not the campaign's own count against its 13 million target, which OnCo did not find (see gaps).",
          links: [
            { label: "UNICEF Pakistan: HPV vaccine introduction (15 September 2025)", url: UNICEF_HPV },
            { label: "Gavi: Pakistan introduces HPV vaccine", url: "https://www.gavi.org/news/media-room/pakistan-introduces-hpv-vaccine-protect-girls-cervical-cancer-joining-150-countries" },
            { label: "WHO immunisation data: HPV rows for Pakistan (JSON)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Pakistan does",
      title: "What Pakistan does differently",
      cards: [
        {
          id: "atomic-energy-hospitals",
          title: "The atomic energy commission runs a nationwide chain of cancer hospitals",
          plain:
            "In most countries cancer hospitals belong to the health ministry or universities. In Pakistan the atomic energy commission, which runs the nuclear programme, has built about twenty cancer hospitals from Swat to Karachi over six decades. By the commission's account they give radiotherapy, nuclear medicine and chemotherapy free or at subsidised rates, and they keep a cancer registry.",
          detail:
            "PAEC says it has provided services in the use of radiation in health since the 1960s and has established 19 Atomic Energy Cancer Hospitals, with one more under construction at Muzaffarabad; its registry report for 2020 and 2021, produced in 2026, gives the network as 20 hospitals. It lists linear accelerators, cobalt-60 units, CyberKnife, brachytherapy, PET-CT, SPECT-CT, cyclotrons and radionuclide therapy, about 2,600 staff including about 250 doctors, and recognition for specialist training by the College of Physicians and Surgeons Pakistan. Its 2018 and 2019 registry report names the institutes, including INMOL in Lahore, NORI in Islamabad, KIRAN in Karachi, IRNUM in Peshawar, PINUM in Faisalabad, MINAR in Multan, CENAR in Quetta and SINOR in Swat, and says KIRAN, INMOL, NORI and IRNUM were the busiest. PAEC says it provides these services under its mandate of peaceful, safe and secure application of nuclear technology.",
          links: [
            { label: "PAEC: medical services (Internet Archive copy, 25 October 2026)", url: PAEC_MED },
            { label: "PAEC Cancer Registry Report 2018 and 2019 (PDF, Internet Archive)", url: PAECR_1819 },
            { label: "PAEC Cancer Registry Report 2020 and 2021 (PDF)", url: PAECR_2021 },
          ],
        },
        {
          id: "charity-hospital",
          title: "A cancer hospital built on donations and zakat, which also hosts the Punjab Cancer Registry",
          plain:
            "Shaukat Khanum Memorial Cancer Hospital, opened in Lahore in 1994, relies on donations, more than half of them zakat, the Islamic obligation to give to those in need. Three in four of its patients are financially supported, and it is also home to the Punjab Cancer Registry, so a charity sponsors one of the country's main cancer registries.",
          detail:
            "Shaukat Khanum gives its founder as Imran Khan, chairman of its Board of Governors, and its vision as being the premier institution for diagnosis and treatment of cancer in the region irrespective of the patient's ability to pay. Its figures are 75% of patients financially supported, Rs74.08 billion spent on philanthropic care to date, a 2023 budget of Rs39 billion and 3,686 staff. It opened in Lahore on 29 December 1994 and in Peshawar on 29 December 2015, and its page for a Karachi hospital, read on 17 November 2026, is headed \"Opening in December 2026\". The Punjab Cancer Registry's central office is inside the Lahore hospital and is sponsored by the Shaukat Khanum Memorial Trust, and the hospital publishes its own registry report each year: 7,381 new malignancies in 2022, 13.6% of them in patients from Afghanistan.",
          links: [
            { label: "Shaukat Khanum: about us", url: SKM_ABOUT },
            { label: "Shaukat Khanum: zakat", url: SKM_ZAKAT },
            { label: "Shaukat Khanum Hospital, Karachi", url: SKM_KARACHI },
            { label: "Punjab Cancer Registry: about", url: PCR },
            { label: "Shaukat Khanum: Annual Cancer Registry Report 2022 (PDF)", url: SKM_2022 },
          ],
        },
        {
          id: "made-in-pakistan-car-t",
          title: "CAR-T cells made in a Pakistani hospital, from June 2026",
          plain:
            "CAR-T cell therapy re-engineers a patient's own immune cells so that they attack leukaemia or myeloma. In June 2026 a military hospital in Rawalpindi started two small trials of CAR-T cells made on site, and in July 2026 it was reported to have carried out its first successful CAR-T treatment, in a 21-year-old said to have made a full recovery.",
          detail:
            "Two studies submitted to ClinicalTrials.gov on 27 June 2026 and first posted in July by the National Institute of Blood and Marrow Transplant, with Dr Zaineb Akram as sponsor-investigator, recruit at the National University of Medical Sciences clinical trial unit in Rawalpindi. NCT07695012 is a feasibility study of autologous anti-CD19 CAR-T cells in 10 patients aged 5 to 50 with relapsed or refractory B-cell acute lymphoblastic leukaemia, manufactured at the Armed Forces Bone Marrow Transplant Centre with a lentiviral vector supplied by BIOCCUS of China and an automated expansion system. NCT07689058 tests BCMA-directed CAR-T cells in 10 adults with relapsed or refractory multiple myeloma. Both started on 1 June 2026, with primary completion estimated at 31 December 2027. Arab News, reporting Radio Pakistan on 5 July 2026, said the centre had carried out its first successful CAR-T treatment, putting Pakistan among the countries able to offer it, and that a 21-year-old patient had made a full recovery; the report does not name the patient's cancer or say whether the patient was in one of the trials, and no peer-reviewed results have been published yet.",
          links: [
            { label: "ClinicalTrials.gov NCT07695012", url: "https://clinicaltrials.gov/study/NCT07695012" },
            { label: "ClinicalTrials.gov NCT07689058", url: "https://clinicaltrials.gov/study/NCT07689058" },
            { label: "Arab News: Pakistan marks major breakthrough in cancer treatment with first CAR T-cell therapy (5 July 2026)", url: ARAB_NEWS_CART },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: studies with a site in Pakistan", url: CTGOV_PK },
      cards: [
        {
          id: "trials-in-pakistan",
          title: "Few cancer trials, and most of the newest are Pakistani-led",
          plain:
            "ClinicalTrials.gov spells the country \"Pakistan\". Before this page, OnCo held one trial record with a Pakistani site, a Russian company's phase 3 trial of a copy of the immunotherapy nivolumab in melanoma. Among the newest cancer trials recruiting in Pakistan are a Lahore phase 3 trial of a gentler chemotherapy schedule for lymphoma and the two Rawalpindi CAR-T trials, now added.",
          detail:
            "OnCo's trial records were searched for the country name in each trial's ClinicalTrials.gov participation data: one matched, NCT06640530 (UNIVERSE), Biocad's phase 3 comparison of its BCD-263 with Opdivo in advanced melanoma, active and no longer recruiting. ClinicalTrials.gov's own location search for Pakistan returned 6,333 studies of all conditions on 4 November 2026 (OnCo's September 2026 snapshot counted 6,058). Restricted to interventional phase 3 studies whose conditions mention cancer, tumour, carcinoma, lymphoma, leukaemia or neoplasm, it returned 30, mostly older multinational industry trials such as ALTTO and NeoALTTO for HER2-positive breast cancer and International Atomic Energy Agency radiotherapy trials, plus single-centre studies. This page adds NCT07739654, King Edward Medical University's randomised trial of modified against standard DHAP in 74 adults with relapsed or refractory diffuse large B-cell lymphoma at Mayo Hospital, Lahore, and the two CAR-T studies. Of the 20 recruiting studies the same cancer search returned, 18 were run only at one or two sites in Pakistan by its universities and hospitals, several of them physiotherapy or surgical studies, and some not about cancer at all, because the registry's search also matches related terms.",
          links: [
            { label: "ClinicalTrials.gov: studies with a site in Pakistan", url: CTGOV_PK },
            { label: "ClinicalTrials.gov NCT07739654", url: "https://clinicaltrials.gov/study/NCT07739654" },
            { label: "ClinicalTrials.gov NCT06640530", url: "https://clinicaltrials.gov/study/NCT06640530" },
          ],
        },
        {
          id: "publications",
          title: "Oncology papers with a Pakistani author nearly doubled from 2021 to 2025",
          plain:
            "Pakistani researchers are publishing more cancer research each year. OpenAlex, an open index of scholarly papers, counts 576 oncology papers with at least one author in Pakistan in 2021 and 1,023 in 2025, 3,684 over the five years, about three in four of them free to read.",
          detail:
            "OnCo's snapshot of OpenAlex, built on 8 September 2026, counts works whose primary topic is in the oncology subfield, with whole counting by author country: 576 in 2021, 661 in 2022, 656 in 2023, 768 in 2024 and 1,023 in 2025, 3,684 in all, of which 2,707 are open access and 111 have more than 50 citations. Registry research is a large part of it: the 2025 scoping review noted the Karachi Cancer Registry for its high research output, and the Punjab Cancer Registry publishes district studies such as its 2023 report on Faisalabad and Nankana Sahib. The Aga Khan University in Karachi and Shaukat Khanum in Lahore are among the academic centres with records in OnCo. Whole counting credits a paper to every country of its authors, so international collaborations count in full for Pakistan.",
          links: [
            { label: "OpenAlex", url: "https://openalex.org/" },
            { label: "Virani et al., Cancer registries in Pakistan: a scoping review (2025)", url: SCOPING },
            { label: "Badar et al., Cancer in Faisalabad and Nankana Sahib, 2017 to 2019 (J Cancer Allied Spec 2023)", url: "https://doi.org/10.37029/jcas.v9i2.529" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-hta-no-times",
      title: "No health technology assessment body and no published approval times were found",
      plain:
        "OnCo could not find a Pakistani body that publishes assessments of whether cancer medicines are worth paying for, or any published figure for how long DRAP takes to register a new cancer medicine. The reliance guideline sets out a route but no target time.",
      detail:
        "DRAP's site, its reliance guideline and its pricing policy were read in full for this page; none states a registration time target or reports average registration times, and Registration Board minutes list decisions meeting by meeting without timing statistics. The only timing figures found are from a 2021 letter by Shaukat Khanum pharmacists on import no-objection certificates. OnCo found no national health technology assessment agency that publishes appraisals of cancer medicines, and no published list of which cancer medicines the health card schemes pay for outside hospital admission. If such a list exists, it was not on the State Life or DRAP pages read on 4 November 2026.",
      links: [{ label: "DRAP: guidelines", url: "https://www.dra.gov.pk/publications/guidelines/" }, { label: "DRAP: Reliance Mechanism in Regulatory Processes (PDF)", url: DRAP_RELIANCE }],
    },
    {
      id: "coverage-unknowns",
      title: "What the health cards pay for cancer, and the HPV campaign's own final count, could not be confirmed",
      plain:
        "The federal health card page lists chemotherapy and radiotherapy but gives no annual limit, and the programme's own website and the Khyber Pakhtunkhwa scheme's site did not answer. Sindh's and Balochistan's schemes were not read. WHO's data give 40% first-dose HPV coverage for 2025, but no final count from the campaign itself was found.",
      detail:
        "Neither pmhealthprogram.gov.pk nor sehatcardplus.gov.pk served a page on 4 November 2026 (one did not answer, the other returned HTTP 404), so the programmes are described from State Life's pages and two Dawn reports read through Internet Archive copies (dawn.com serves a browser check to scripts). Chemotherapy package rates, sub-limits for cancer, and whether take-home cancer medicines are covered are not stated on the pages read. State Life also lists a Balochistan Health Card Program, which was not read. For the HPV campaign, press reports give district and provincial figures, OnCo found no final campaign count from the Federal Directorate of Immunization or UNICEF, and WHO's regional office page returned an error on 4 November 2026. WHO's immunisation data, read on 17 November 2026, hold a 2025 row for Pakistan for first-dose HPV programme coverage in females: 7,032,118 doses against a target number of 17,580,296, coverage 40%. Its administrative and official HPV rows for 2024 and 2025 are blank. WHO's 2020 cancer profile is the latest found; a 2025 edition for Pakistan was not at the expected address.",
      links: [{ label: "State Life Health", url: "https://www.statehealth.com.pk/" }, { label: "WHO: Cancer Country Profile 2020, Pakistan (PDF)", url: WHO_PROFILE }, { label: "WHO immunisation data: HPV rows for Pakistan (JSON)", url: WHO_HPV_API }],
    },
    {
      id: "unreachable-pk",
      title: "Sources that could not be reached on 4 November 2026",
      plain:
        "Some official sources did not answer: the Pakistan Health Research Council's website and the federal health programme's site. The atomic energy commission's pages were read partly from Internet Archive copies; its detailed figures here are mostly for 2018 and 2019, with its 2020 and 2021 report used for totals and the stage pattern.",
      detail:
        "PAEC's medical services page was read from the Internet Archive copy of 25 October 2026 and its 2018 and 2019 registry report from the copy of 12 November 2021; its 2020 and 2021 report, which the Internet Archive does not hold, was downloaded from paec.gov.pk on 4 November 2026. The Pakistan Health Research Council's sites did not answer, so its role, if any, in cancer registration is not described here. WHO's 2020 profile records no coverage for the quality of mortality registration in 2007 to 2016, and OnCo found no national cause-of-death statistics for cancer; the death figures on this page are IARC's modelled estimates. Most official health sources in Pakistan publish in English; the President's World Cancer Day message was read in both its English and Urdu texts, which agree. Pakistani pharmaceutical companies making cancer medicines were not researched for this page.",
      links: [{ label: "PAEC: medical services (Internet Archive copy)", url: PAEC_MED }, { label: "IARC: GLOBOCAN 2024 fact sheet, Pakistan (PDF)", url: GCO_FACT }],
    },
  ],
  institutions: ["shaukat-khanum", "aku-karachi", "paec-cancer-hospitals", "punjab-cancer-registry", "nih-pakistan", "drap", "afbmtc-rawalpindi", "kemu-lahore"],
  companies: [],
  drugs: [],
  trials: ["nct07695012", "nct07689058", "nct07739654", "nct06640530"],
  papers: ["paper-national-cancer-registry-pakistan-jcpsp-2023", "paper-cancer-lahore-2010-2019-bmj-open-2021", "paper-cancer-registries-pakistan-scoping-review-2025"],
  people: ["faisal-sultan", "farhat-abbas"],
  how:
    "Every card was written from sources read in their raw text on 4 November 2026: the Punjab Cancer Registry's 2022 and 2023 reports and its BMJ Open study of Lahore, the pooled national registry report and the Karachi registry study (abstracts in Europe PMC, DOIs resolved through Crossref), the 2025 scoping review of Pakistan's registries, the PAEC registry reports for 2018 and 2019 (Internet Archive copy) and for 2020 and 2021, PAEC's medical page (Internet Archive copy), Shaukat Khanum's 2022 registry report, about page and zakat page, the Gazette of Pakistan for Act XXIX of 2025, DRAP's reliance guideline and Drug Pricing Policy, State Life's health card pages, two Dawn reports through dated Internet Archive copies, UNICEF's HPV release, WHO's 2020 country profile, IARC's 2024 fact sheet and the President's World Cancer Day message in English and Urdu. Trial counts come from OnCo's own records and ClinicalTrials.gov API v2; publication counts from OnCo's OpenAlex snapshot.",
  verify:
    "Incidence for Pakistan is a model: IARC's figures are estimates, and the national registry report counts registered cases, not a population rate. Registry reports for Lahore are preliminary. The health card schemes change by province and by year, and the federal scheme was cleared by a planning body in January 2026 to run to 30 June 2027; check eligibility by sending your national identity card number to the programme's SMS line or asking the hospital's health facilitation desk. Before relying on the price of a medicine, check DRAP's public price search.",
  verifyLinks: [
    { label: "Punjab Cancer Registry", url: PCR },
    { label: "DRAP: public price search", url: DRAP_PRICE_SEARCH },
    { label: "State Life: Prime Minister's National Health Program", url: SL_PM },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Pakistan (PDF)", url: GCO_FACT },
  ],
};

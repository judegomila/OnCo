import type { CountryDive } from "@/data/country-dive";

/**
 * Belarus deep dive: the hand-written cards for /countries/by/ (wave 7). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it. Belarusian government and hospital sites (minzdrav.gov.by,
 * omr.by, rceth.by, belstat.gov.by) did not answer plain requests from where OnCo fetched, so their pages were read
 * through the Internet Archive: the N.N. Alexandrov National Cancer Centre's history page and its February 2020 notice
 * of the registry's book, and the Center for Examinations and Tests in Health Service's activity, parent-body and
 * clinical trial document pages. Also read in full: the WHO and IARC expert mission report on breast and cervical
 * screening in Belarus (IARC Working Group Report 6, 2012, PDF text, including the Ministry of Health's annexes), the
 * European Observatory's 2013 health system review of Belarus (PDF text), WHO Europe's February 2018 news item on
 * screening training, IARC's GLOBOCAN 2024 fact sheet for Belarus (PDF text), WHO's HPV introduction and coverage rows
 * for Belarus and its Global Health Observatory rows on health spending and service coverage (public APIs), and the
 * papers' abstracts through Europe PMC. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/112-belarus-fact-sheet.pdf";
const IARC_MISSION = "https://www.iarc.who.int/wp-content/uploads/2018/07/Belarus_Report.pdf";
const HIT_2013 = "https://eurohealthobservatory.who.int/publications/i/belarus-health-system-review-2013";
const OMR_HISTORY_WB = "https://web.archive.org/web/20250908231747/https://omr.by/o-nas/istoriya";
const OMR_BOOK_WB = "https://web.archive.org/web/20230322225236/https://omr.by/news/news-main/rak-v-belarusi-tsifry-i-fakty-analiz-dannykh-belorusskogo-kantser-registra-za-2009-2018-gg";
const RCETH_HOME = "https://www.rceth.by/";
const RCETH_ACTIVITY_WB = "https://web.archive.org/web/2026/http://www.rceth.by/ru/About/Activity";
const RCETH_CT_WB = "https://web.archive.org/web/2026/http://www.rceth.by/ru/Departments/Rcpl/Documents/2";
const WHO_2018 = "https://www.who.int/europe/news/item/26-02-2018-capacity-building-for-cancer-screening-in-belarus";
const WHO_HPV_COV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BLR'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ANTIGEN%20eq%20'HPV'%20and%20ISO_3_CODE%20eq%20'BLR'";
const GHO_OOP = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'BLR'";
const GHO_GGHE = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'BLR'";
const GHO_UHC = "https://ghoapi.azureedge.net/api/UHC_INDEX_REPORTED?$filter=SpatialDim%20eq%20'BLR'";
const CTGOV = "https://clinicaltrials.gov/search?country=Belarus&cond=cancer";
const doi = (id: string) => `https://doi.org/${id}`;

export const BY_DIVE: CountryDive = {
  iso2: "BY",
  iso3: "BLR",
  name: "Belarus",
  flag: "🇧🇾",
  asOf: "2026-11-11",
  title: "Cancer in Belarus",
  description:
    "Cancer in Belarus from Belarusian and international sources: IARC's estimate of 46,420 new cancers and 22,838 deaths in 2024 built on a national registry that began on paper in 1953, a tax-funded health service free at the point of use, the Ministry of Health's expert centre for medicines, annual check-ups and screening pilots, HPV vaccination from 2025, thyroid cancer after Chernobyl, CAR T-cell therapy made in Belarus, and the 23 trials in our records with a Belarusian site.",
  lede:
    "Belarus counts every cancer through a national registry whose paper records began in 1953, and IARC projects its 2024 figures from those counts: 46,420 new cancers and 22,838 deaths, with bowel, breast, prostate and lung cancer the commonest. Thyroid cancer in Belarusian children rose within a few years of the 1986 Chernobyl accident, and the registry has followed that generation since.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Belarus is 46,420 new cancers and 22,838 deaths, an age-standardised incidence of 275.3 per 100,000 (361.5 in men, 225.9 in women) and mortality of 124.4, including 1,333 non-melanoma skin cancers. IARC's fact sheet names the national registry as the incidence source and its method as trends in national rates projected to 2024; for deaths the source is WHO's national mortality data, with national rates applied to the 2024 population. So both figures are projections of Belarus's own counts rather than models borrowed from other countries. OnCo could not read the registry's latest national total to compare: its annual book is printed rather than published online, and Belarusian government sites did not respond. One check is possible. The registry counted 2,539 cancers of the body of the womb in 2022 (ICD-10 C54 to C55), against GLOBOCAN's 2,198 for 2024 (C54 only); the registry's count includes C55, uterus not otherwise specified, so the two are not like for like and the gap is noted here rather than explained.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Belarus",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Belarus (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 46,000 new cancers a year, slightly more in men than in women",
          plain:
            "IARC estimates 46,420 new cancers in Belarus in 2024, 25,082 in men and 21,338 in women. Prostate cancer is the commonest in men and breast cancer in women. Lung cancer causes the most cancer deaths. IARC puts the chance of developing a cancer before age 75 at 36.1% for men and 22.5% for women.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 6,073 colorectal cancers (3,001 deaths), 5,076 breast cancers (1,394 deaths), 5,025 prostate cancers (1,159 deaths), 4,923 lung cancers (3,873 deaths) and 2,789 stomach cancers (2,133 deaths). In men the leading cancers by cases are prostate (20.0% of male cancers), lung (16.7%) and colorectum (12.2%); in women breast (23.8%), colorectum (14.1%) and the body of the womb (2,198 cases, 10.3%). Thyroid cancer is fifth in women, with 970 cases, and has 1,200 cases and 39 deaths in both sexes. Age-standardised mortality is 193.5 per 100,000 in men and 80.1 in women, and an estimated 127,422 people are living within five years of a diagnosis.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Belarus (PDF)", url: IARC_FACTSHEET },
          ],
        },
        {
          id: "trends",
          title: "What the registry shows over time: more cancers found, and found earlier",
          plain:
            "Studies of the national registry show some cancers becoming much more common. Cancer of the womb rose from 928 cases in 1993 to 2,539 in 2022, and more of it is now found at an early stage. Breast cancers rose from 2,774 in 2000 to 3,758 in 2009, and the share found at stage I grew from 15.5% to 23.4%.",
          detail:
            "Matylevich and colleagues, using registry data with 97.9% of cases confirmed under the microscope, report that the age-standardised incidence of cancers of the uterine corpus rose from 12.2 to 27.1 per 100,000 between 1993 and 2022, and from 5.9 to 13.5 in women aged 15 to 49; stage I or II diagnoses rose from 78.5% to 86.2%, and five-year relative survival in women aged 15 to 49 from 82.5% (1993 to 1997) to 90.8% (2018 to 2022). The Ministry of Health's breast cancer tables, printed in the 2012 WHO and IARC mission report, give 2,774 new breast cancers in 2000 and 3,758 in 2009, with stage known for more than 98% each year and stage IV falling from 9.1% to 4.9%. For cervical cancer the national presenters told the mission that invasive cases had been stable at 843 to 893 a year for ten years while carcinoma in situ rose from 191 to 868, and that stage I had risen from 15% to 37% of invasive cases over 30 years.",
          links: [
            { label: "Matylevich et al., uterine corpus malignancies in Belarus 1993 to 2022 (Int J Gynaecol Obstet 2026)", url: doi("10.1002/ijgo.70743") },
            { label: "IARC Working Group Report 6, section 4.3.1 and annex A9 (PDF)", url: IARC_MISSION },
          ],
        },
      ],
      tables: [
        {
          id: "by-registry",
          title: "Counts from the Belarusian Cancer Registry, as published",
          caption: "New cases, and the rate per 100,000 where the source gives one, by cancer and year. Latest year published in a source OnCo could read: 2022.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "year", label: "Year" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "rate", label: "Rate per 100,000", numeric: true },
            { key: "source", label: "Source" },
          ],
          rows: [
            { site: "Breast (women)", year: "2000", cases: 2774, rate: 27.7, source: "Ministry of Health tables in the WHO and IARC mission report" },
            { site: "Breast (women)", year: "2009", cases: 3758, rate: 38.9, source: "Ministry of Health tables in the WHO and IARC mission report" },
            { site: "Uterine corpus (C54 to C55)", year: "1993", cases: 928, rate: 12.2, source: "Matylevich et al. 2026" },
            { site: "Uterine corpus (C54 to C55)", year: "2022", cases: 2539, rate: 27.1, source: "Matylevich et al. 2026" },
            { site: "Papillary thyroid cancer, people registered", year: "1990 to 2021", cases: 30568, rate: null, source: "Taha et al. 2023" },
          ],
          note: "The registry publishes no national all-cancers total that OnCo could read online; its annual book, Cancer in Belarus: figures and facts, is printed. The breast rates are the totals per 100,000 in the Ministry's tables, apparently crude rates; the uterine rates are age-standardised as the paper reports them. The thyroid row is a cumulative cohort, not a yearly count.",
          sources: [
            { label: "IARC Working Group Report 6, annex A9: breast cancer epidemiology tables for Belarus (PDF)", url: IARC_MISSION },
            { label: "Matylevich et al., uterine corpus malignancies in Belarus 1993 to 2022 (Int J Gynaecol Obstet 2026)", url: doi("10.1002/ijgo.70743") },
            { label: "Taha et al., second primary cancer after papillary thyroid carcinoma following Chernobyl (JAMA Netw Open 2023)", url: doi("10.1001/jamanetworkopen.2023.29559") },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: one national registry, on paper since 1953",
      aside: { label: "N.N. Alexandrov National Cancer Centre: history (read through the Internet Archive)", url: OMR_HISTORY_WB },
      cards: [
        {
          id: "registry-history",
          title: "Paper records from 1953, computers from 1978, a separate registry unit from 2011",
          plain:
            "Belarus registers every cancer diagnosed in the country. The Ministry of Health told WHO and IARC that paper registration began in 1953 and a computer system in 1978. Since 2011 the Belarusian Cancer Registry has been its own unit at the N.N. Alexandrov National Cancer Centre near Minsk, and it publishes a book of national figures.",
          detail:
            "In its answers to the 2011 WHO and IARC mission, printed as annex A6 of the report, the Ministry of Health said cancer registration on paper was introduced in 1953, a computerised system created in 1978 and the current automated information system on oncology introduced in 1997, with ICD-10 coding and in situ cancers (D00 to D09) coded since 2004. The cancer centre's history says the registry's foundations were laid in 1972 to 1973, that the institute's automated cancer information system was recommended by the USSR Ministry of Health to all republics in 1976, and that a separate cancer registry unit was created in 2011, describing it as the most complete information resource on all cancer patients registered in the country. On 28 February 2020 the centre announced the registry's book Cancer in Belarus: figures and facts for 2009 to 2018, by Okeanov, Moiseev, Levin, Evmenenko and Ipatiy, available in print from the centre. The European Observatory lists the cancer register beside a separate state register of people affected by the Chernobyl catastrophe.",
          links: [
            { label: "N.N. Alexandrov National Cancer Centre: history (Russian, read through the Internet Archive)", url: OMR_HISTORY_WB },
            { label: "N.N. Alexandrov National Cancer Centre: Cancer in Belarus, figures and facts, 2009 to 2018 (28 February 2020, read through the Internet Archive)", url: OMR_BOOK_WB },
            { label: "IARC Working Group Report 6, annex A6 (PDF)", url: IARC_MISSION },
            { label: "European Observatory: Belarus health system review 2013", url: HIT_2013 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a tax-funded state service, with medicines the main cost to patients",
      aside: { label: "European Observatory: Belarus health system review 2013", url: HIT_2013 },
      cards: [
        {
          id: "state-service",
          title: "Free at the point of use, guaranteed by the Constitution",
          plain:
            "Health care in Belarus is paid for from general taxation, not insurance, and the Constitution guarantees it to citizens. Care in state hospitals and clinics is free, and medicines given in hospital are free. The main cost patients pay themselves is for medicines prescribed outside hospital, though some cancer medicines are given free.",
          detail:
            "The European Observatory's 2013 review describes entitlement guaranteed by Article 45 of the Constitution and based on citizenship, a universal system directly funded through general taxation with no compulsory social health insurance and only limited voluntary insurance, and primary, secondary and tertiary care covered in practice in predominantly state-owned facilities. Inpatient medicines are free. Outpatients generally pay the full cost of prescriptions, but certain essential medicines, broadly those on the WHO Essential Medicines List plus some for cancer, are free and are imported and bought centrally through the Ministry of Health. The national Essential Medicines List is described as broadly similar to WHO's but broader, including cancer treatments. Some groups, such as Second World War veterans and Chernobyl clean-up workers, have outpatient prescriptions fully covered. Treatments unavailable in Belarus, including innovative cancer treatments, could be funded abroad only from limited funds with a long waiting list, with children prioritised.",
          links: [
            { label: "European Observatory: Belarus health system review 2013, chapters 2 and 3", url: HIT_2013 },
          ],
        },
        {
          id: "oop-now",
          title: "Patients pay about 28% of health spending themselves, by WHO's latest figures",
          plain:
            "WHO's health spending data show people in Belarus paying 28.5% of current health spending out of their own pockets in 2023, up from 25.4% in 2018, with the government paying 66.8%. WHO's index of how well essential services reach the population is 80 out of 100 for Belarus.",
          detail:
            "From WHO's Global Health Observatory: out-of-pocket expenditure as a share of current health expenditure was 25.45% in 2018, 24.77% in 2020, 21.93% in 2021, 27.62% in 2022 and 28.48% in 2023; domestic general government health expenditure was 66.76% of current health expenditure in 2023; and the UHC service coverage index (SDG 3.8.1) was 80 in 2019 to 2023 (79 in 2018). The 2013 European Observatory review put out-of-pocket payments at 26.7% of total health expenditure, nearly all non-government spending and mainly co-payments for outpatient medicines, and found urban residents spending nearly ten times as much on medicines as rural residents. OnCo found no recent figure for what cancer patients in particular pay.",
          links: [
            { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Belarus (API)", url: GHO_OOP },
            { label: "WHO Global Health Observatory: government share of current health expenditure, Belarus (API)", url: GHO_GGHE },
            { label: "WHO Global Health Observatory: UHC service coverage index, Belarus (API)", url: GHO_UHC },
            { label: "European Observatory: Belarus health system review 2013", url: HIT_2013 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Ministry of Health and its expert centre",
      aside: { label: "Center for Examinations and Tests in Health Service", url: RCETH_HOME },
      cards: [
        {
          id: "rceth",
          title: "Medicines are registered by the state after review by the Center for Examinations and Tests",
          plain:
            "Medicines in Belarus are registered by the state. The Ministry of Health's expert centre, the Center for Examinations and Tests in Health Service, reviews the files first. It also reviews medicines under the shared rules of the Eurasian Economic Union, tests medicine quality and registers the maximum price a manufacturer may charge.",
          detail:
            "The Center for Examinations and Tests in Health Service is a republican unitary enterprise whose parent body is the Ministry of Health. Its activity page lists the technical work preceding state registration of medicines (document review, specialised review of clinical and bioequivalence reports, and testing of quality control methods), the examination of medicines for registration within the Eurasian Economic Union, quality control of medicines on the market, and the registration of manufacturers' maximum selling prices with the state register of those prices. Its document page lists review for state registration, conditional state registration, registration by a simplified procedure and registration within the Union, and the law on the circulation of medicines, No. 161-Z of 20 July 2006. Pages were read through the Internet Archive because the centre's site did not answer a plain request.",
          links: [
            { label: "Center for Examinations and Tests in Health Service: activity (Russian, read through the Internet Archive)", url: RCETH_ACTIVITY_WB },
            { label: "Center for Examinations and Tests in Health Service: clinical trial documents (Russian, read through the Internet Archive)", url: RCETH_CT_WB },
          ],
        },
        {
          id: "trial-rules",
          title: "Clinical trials need a permit, under national rules and the Union's good clinical practice",
          plain:
            "To run a trial of a medicine in Belarus, a sponsor needs permission, and the expert centre prepares the opinion that permission rests on. The rules are a 2020 Ministry of Health resolution and the Eurasian Economic Union's good clinical practice rules of 2016.",
          detail:
            "The centre's list of clinical trial documents names the Ministry of Health's resolution No. 94 of 6 November 2020 on clinical trials of medicines (amended by No. 88 of 22 August 2022), Ministry order No. 66 of 18 January 2023 approving a list of state health organisations, decision No. 79 of the Council of the Eurasian Economic Commission of 3 November 2016 approving the Union's good clinical practice rules, and the Law on Health Care No. 2435-XII of 18 June 1993. Its activity page lists preparing the opinion for permission to run clinical trials and reviewing substantial amendments to trial protocols. OnCo did not find published review times for registration or trial applications.",
          links: [
            { label: "Center for Examinations and Tests in Health Service: clinical trial documents (Russian, read through the Internet Archive)", url: RCETH_CT_WB },
            { label: "Center for Examinations and Tests in Health Service: activity (Russian, read through the Internet Archive)", url: RCETH_ACTIVITY_WB },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "IARC Working Group Report 6: breast and cervical cancer prevention in Belarus (PDF)", url: IARC_MISSION },
      cards: [
        {
          id: "checkups",
          title: "Annual check-ups with a cervical smear, for decades, and advice to move to organised screening",
          plain:
            "For more than 30 years Belarus has offered women a yearly preventive examination that includes a cervical smear and a breast check, paid for by the state. WHO and IARC experts who visited in 2011 advised replacing it with organised screening at longer intervals, with quality checks and personal invitations, piloted first.",
          detail:
            "The Ministry told the 2011 mission that annual examinations had existed for over 30 years, with smears and breast palpation at every level of care, and that around 60% of sexually active women were examined each year; national presenters reported 3.6 million cervical samples a year and 88% of women examined in 2009, a figure not built from individual data and so an overestimate of coverage. Smears were stained by the Pappenheim method, not the Papanicolaou method the European guidelines use, there was no computerised cytology registry, and HPV tests were paid for by patients. The experts recommended feasibility testing, a pilot in a region of at least 500,000 people, and phased national rollout. The 2013 European Observatory review still described annual smears from age 18, and a 2023 survey found Belarus staining smears by Romanowsky-Giemsa.",
          links: [
            { label: "IARC Working Group Report 6, executive summary, section 4.3.1 and annex A6 (PDF)", url: IARC_MISSION },
            { label: "European Observatory: Belarus health system review 2013, chapter 5", url: HIT_2013 },
            { label: "Znaor et al., screening practices in nine countries of Eastern Europe and Central Asia (J Cancer Policy 2023)", url: doi("10.1016/j.jcpo.2023.100436") },
          ],
        },
        {
          id: "breast-pilots",
          title: "Breast cancer found early without a mammography programme, and pilots since 2011",
          plain:
            "More than three quarters of breast cancers in Belarus in 2013 to 2017 were found at stage I or II, without a national mammography programme. The cancer centre started screening pilots for breast, cervical, bowel and prostate cancer in 2011, and the Ministry later named two Minsk sites to pilot breast screening.",
          detail:
            "Ryzhov and colleagues, comparing official statistics from ten former Soviet countries, found more than 75% of breast cancers in Belarus registered at stages I to II in 2013 to 2017, and called this a benchmark for what rapid diagnosis can achieve. The cancer centre's history records pilot screening projects for prostate, breast, colorectal and cervical cancer beginning in 2011. WHO Europe reported in February 2018 that the Ministry had appointed Polyclinic No. 34 in Minsk and the centre as pilot sites for a government breast screening project, and that two of the centre's radiologists trained in the United Kingdom under the EU-funded BELMED project. In a survey of 428 women published in 2019, 90% preferred mammography to the existing clinical breast examination.",
          links: [
            { label: "Ryzhov et al., breast and cervical cancer stage in ten former Soviet countries (Lancet Oncol 2021)", url: doi("10.1016/s1470-2045(20)30674-4") },
            { label: "WHO Europe: capacity-building for cancer screening in Belarus (26 February 2018)", url: WHO_2018 },
            { label: "N.N. Alexandrov National Cancer Centre: history, 2011 (read through the Internet Archive)", url: OMR_HISTORY_WB },
            { label: "Mandrik et al., breast screening preferences in Belarus (PLoS One 2019)", url: doi("10.1371/journal.pone.0224667") },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine introduced nationwide in 2025",
          plain:
            "Belarus added the HPV vaccine, given to girls to protect against cervical cancer, to its national programme in 2025, according to the data it reports to WHO. In its first year three quarters of the girls targeted received a first dose.",
          detail:
            "WHO's vaccine introduction rows for Belarus record no HPV vaccine in the national programme from 2018 to 2024 and introduction, nationwide, in 2025. Belarus's programme coverage rows for 2025 give 43,210 first doses among a target of 57,452 girls (75%) and 1,020 last doses (2%); no rows are reported for boys. The 2011 mission report records that HPV testing was then paid for by patients.",
          links: [
            { label: "WHO immunisation data: HPV vaccine introduction rows for Belarus (API)", url: WHO_HPV_INTRO },
            { label: "WHO immunisation data: HPV programme coverage rows for Belarus (API)", url: WHO_HPV_COV },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy, workforce and palliative care",
      cards: [
        {
          id: "capacity-snapshot",
          title: "What the 2011 mission and the 2013 review counted",
          plain:
            "The most detailed published counts OnCo could read are more than ten years old. In 2011 the Ministry of Health counted 8 linear accelerators, 24 cobalt units and 15 brachytherapy units in the country's cancer facilities, three of the accelerators at the national cancer centre. In 2013 the country had two hospices and 282 palliative care beds.",
          detail:
            "The Ministry's answers to the 2011 mission give 8 linear accelerators, 15 CT simulators for radiotherapy planning, 24 cobalt gamma units and 15 brachytherapy installations. Annex A11 lists the national cancer centre's three linear accelerators (in service from 1996, 2005 and 2008) beside cobalt and brachytherapy units, accelerators at the Vitebsk, Gomel, Brest and Mogilev regional clinics, and cobalt or brachytherapy units at the Minsk regional hospital and city clinic, the Vileyka, Polotsk, Baranovichi, Pinsk, Bobruisk and Grodno clinics, several of them gamma units from the 1970s and 1980s. The centre's history records linear accelerators bought or installed in 2011 and 2012, and in 2016 a stereotactic accelerator and a Gamma Knife added to its three existing accelerators, without a national total. The Ministry told the mission that 55 doctors practised gynaecological oncology. The 2013 European Observatory review counted 2 hospices (Minsk and Baranovichi), 11 regional palliative care departments and 282 palliative care beds, and the Belarusian Children's Hospice, a charity founded after Chernobyl.",
          links: [
            { label: "IARC Working Group Report 6, annexes A6 and A11 (PDF)", url: IARC_MISSION },
            { label: "European Observatory: Belarus health system review 2013, section 5.10", url: HIT_2013 },
            { label: "N.N. Alexandrov National Cancer Centre: history (read through the Internet Archive)", url: OMR_HISTORY_WB },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Belarus does",
      title: "What Belarus does differently",
      cards: [
        {
          id: "chernobyl-thyroid",
          title: "Following a generation exposed to Chernobyl fallout",
          plain:
            "The 1986 Chernobyl accident spread radioactive iodine over Belarus, and thyroid cancer in children rose within four years. Belarus has followed these patients through its registry ever since. Of 1,078 children and teenagers operated on from 1990 to 2005, 96.9% were alive after a median of 16 years. The rise now shows in adults aged 20 to 44.",
          detail:
            "Fridman and colleagues write that the rise in papillary thyroid cancer among exposed children was reported only four years after the accident, first in Belarus, where the heaviest fallout happened; their registry analysis of 1980 to 2019 finds waves that follow the exposed cohort as it ages, with incidence now rising only in people aged 20 to 44. Among 1,078 patients under 19 treated in 1990 to 2005, 73.8% had lymph node spread at diagnosis and overall survival was 96.9% at a median of 16.21 years. The Belarus-American cohort of 11,970 people, with doses estimated from individual thyroid measurements, found risk rising by an excess odds ratio of 2.15 per gray below 5 Gy. Among 30,568 people with papillary thyroid cancer, 9.2% developed a second cancer (standardised incidence ratio 1.25). An IARC-led study of the two most contaminated regions found no evidence that marrow dose raised lymphoma, myeloma or total leukaemia risk.",
          links: [
            { label: "Fridman et al., papillary thyroid carcinoma trends in Belarus after Chernobyl (Cancer Epidemiol 2025)", url: doi("10.1016/j.canep.2025.102745") },
            { label: "Fridman et al., post-Chernobyl thyroid carcinoma in Belarusian children (J Clin Endocrinol Metab 2014)", url: doi("10.1210/jc.2013-3131") },
            { label: "Zablotska et al., thyroid cancer risk in Belarus after Chornobyl (Br J Cancer 2011)", url: doi("10.1038/sj.bjc.6605967") },
            { label: "Zupunski et al., haematological cancers in the most contaminated regions of Belarus (Int J Cancer 2026)", url: doi("10.1002/ijc.70346") },
          ],
        },
        {
          id: "car-t-made-here",
          title: "CAR T-cell therapy made in Belarus rather than bought",
          plain:
            "CAR T-cell therapy reprogrammes a patient's own immune cells to attack a blood cancer. Commercial products are costly, and Belarusian teams have made their own and tested them in trials: one for 23 children and adults with leukaemia and lymphoma, and one for 76 adults with lymphoma at the national cancer centre.",
          detail:
            "A phase 1 trial (NCT05333302) at two Belarusian centres treated 23 patients, 17 with B-cell acute lymphoblastic leukaemia, with BY19, a CD19 CAR T-cell product manufactured in-house; 16 of 20 evaluable patients responded and complete remission at day 28 was 75%, with severe cytokine release syndrome in 19% of infusions. At the N.N. Alexandrov National Cancer Centre, 76 patients with relapsed or refractory B-cell lymphoma treated from June 2021 to December 2025 with an academic anti-CD19 product (NCT07524816) had a complete response rate of 57.5% and four-year overall survival of 67%. The authors describe such products as the only option where commercial ones are not accessible. Neither trial is yet among OnCo's trial records.",
          links: [
            { label: "Katsin et al., CD19 CAR T cell therapy BY19 in Belarus: phase 1 trial (Mol Ther Oncol 2025)", url: doi("10.1016/j.omton.2025.201081") },
            { label: "Konoplya et al., academic anti-CD19 CAR T-cell therapy for B-cell lymphomas (Front Oncol 2026)", url: doi("10.3389/fonc.2026.1862517") },
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
          title: "23 trials in OnCo's records list a site in Belarus, five of them run by a Russian company",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, 23 cancer trials in our records list a site in Belarus. Ten have finished, ten are running but no longer recruiting, one stopped early, and two are recruiting, both run by the Russian company Biocad.",
          detail:
            "Of the 23 trials, 5 are sponsored by Biocad and run in Belarus with Russia, and in two cases India or Pakistan: two melanoma studies of nurulimab with prolgolimab, a melanoma study comparing BCD-263 with Opdivo, and two recruiting studies, of BCD-248 with daratumumab in myeloma and of BCD-236 with chemotherapy in triple-negative breast cancer. The rest are international company trials, from 13 to 41 countries for most, including ARAMIS (darolutamide) and a study continuing darolutamide for patients from earlier Bayer studies, RUBY and a first-line ovarian study of dostarlimab and niraparib, an erdafitinib study in urothelial cancer, a niraparib study in prostate cancer, ALINA (alectinib), BROCADE3 (veliparib), EMPOWER-Lung 1 (cemiplimab), ROSEWOOD (zanubrutinib), LUME-Lung 1 (nintedanib), two rovalpituzumab tesirine trials and a rituximab maintenance study in Belarus and Poland. The academic CAR T-cell trials above are not yet among our records.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Belarus (search)", url: CTGOV },
          ],
        },
        {
          id: "registry-research",
          title: "The registry as a research resource, with international partners",
          plain:
            "Because Belarus registers every cancer nationally, its registry supports studies that few countries can run: thyroid cancer trends from 1980 to 2019, before and after Chernobyl, 30-year trends in womb and vaginal cancer, and comparisons with neighbouring countries done with IARC and WHO.",
          detail:
            "Studies built on the Belarusian Cancer Registry include papillary thyroid cancer trends from 1980 to 2019, second cancers among 30,568 thyroid cancer patients followed to 2021, uterine cancer from 1993 to 2022, vaginal cancer from 1990 to 2019 (868 patients) and testicular cancer from 1990 to 2015 (2,500 cases). IARC researchers led the studies of breast cancer and of blood cancers in the most contaminated regions, with a co-author from the national cancer centre's cancer control department, who also co-authored the IARC and WHO comparisons of stage at diagnosis and screening practice across former Soviet countries.",
          links: [
            { label: "Taha et al., second primary cancer after papillary thyroid carcinoma following Chernobyl (JAMA Netw Open 2023)", url: doi("10.1001/jamanetworkopen.2023.29559") },
            { label: "Matylevich et al., malignant neoplasms of the vagina in Belarus over 30 years (Gynecol Oncol Rep 2023)", url: doi("10.1016/j.gore.2023.101309") },
            { label: "Rolevich et al., testicular cancer trends in Belarus (Cent European J Urol 2019)", url: doi("10.5173/ceju.2019.0073") },
            { label: "Zupunski et al., breast cancer in the regions of Belarus and Ukraine most contaminated by Chernobyl (Int J Cancer 2021)", url: doi("10.1002/ijc.33346") },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-book",
      title: "The registry's national totals could not be read",
      plain:
        "The Belarusian Cancer Registry publishes its national figures in a printed book, Cancer in Belarus: figures and facts, and OnCo found no online copy. Belarusian government and hospital sites did not answer requests from where OnCo fetched, so this page has no national all-cancers count from the registry itself.",
      detail:
        "On 11 November 2026 minzdrav.gov.by, omr.by, rceth.by and belstat.gov.by timed out on plain requests, as did a Belarusian university repository and a Belarusian medical publisher holding papers that cite the book. Pages from the Ministry's expert centre and the cancer centre were read through the Internet Archive, and each is labelled so. The centre's notice of the 2009 to 2018 edition offered printed copies only. Figures on this page from the registry come from peer-reviewed papers that analysed its data and from the Ministry's own tables printed in the 2012 WHO and IARC report. Press reports quoting registry figures were not used.",
      links: [
        { label: "N.N. Alexandrov National Cancer Centre: Cancer in Belarus, figures and facts, 2009 to 2018 (read through the Internet Archive)", url: OMR_BOOK_WB },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Belarus (PDF)", url: IARC_FACTSHEET },
      ],
    },
    {
      id: "capacity-now",
      title: "Current radiotherapy machines and cancer workforce are not confirmed",
      plain:
        "OnCo found no current published count of radiotherapy machines, oncologists or cancer beds in Belarus. The counts on this page come from 2011 and 2013. The IAEA's directory of radiotherapy centres did not return its data to a plain request.",
      detail:
        "The IAEA's DIRAC directory loads its country data by script and returned only a page frame. The cancer centre's history records an imPACT mission by IAEA, WHO and IARC experts in 2016, but OnCo did not find its report. The 2011 equipment list was supplied by the Ministry of Health to the WHO and IARC mission, and the cancer centre's history mentions later machines without a national total.",
      links: [
        { label: "IAEA: DIRAC, directory of radiotherapy centres", url: "https://dirac.iaea.org/" },
        { label: "IARC Working Group Report 6, annex A11 (PDF)", url: IARC_MISSION },
      ],
    },
    {
      id: "medicines-now",
      title: "Which cancer medicines are free now, and how long registration takes, are not published here",
      plain:
        "The description of which cancer medicines the state gives free comes from a 2013 review. OnCo did not read the current national list of essential medicines, found no published registration times, and found no published result of a WHO assessment of the Belarusian medicines regulator.",
      detail:
        "The Ministry of Health's current list of essential medicines and its rules on free and discounted outpatient medicines were not reachable on its site. The expert centre's pages describe procedures but not their timelines. OnCo found no WHO Global Benchmarking Tool maturity level for Belarus in the sources read. How the Eurasian Economic Union's common registration rules have changed access to cancer medicines in Belarus was not established from a primary source.",
      links: [
        { label: "European Observatory: Belarus health system review 2013", url: HIT_2013 },
        { label: "Center for Examinations and Tests in Health Service: activity (read through the Internet Archive)", url: RCETH_ACTIVITY_WB },
      ],
    },
    {
      id: "plan-and-survival",
      title: "The current national cancer programme and national survival figures were not found",
      plain:
        "The cancer centre's history names a state programme for cancer prevention, diagnosis and treatment for 2010 to 2014 and the state programme Health of the Nation and Demographic Security for 2016 to 2020, with a large part on early diagnosis and screening, but OnCo did not read the text of either or of any later plan. National five-year survival for all cancers was not found in a primary source either.",
      detail:
        "Survival figures on this page are for specific groups in published studies: uterine cancer in women under 50, children with thyroid cancer, and patients in two CAR T-cell trials. The 2013 review quotes five-year survival for prostate cancer diagnosed in 2000 to 2004 of 43.0% in Belarus against 64.5% in Lithuania, from Smailyte and colleagues, but that study was not read here. UNSCEAR's reports on thyroid cancer after Chernobyl did not answer a plain request and are not used.",
      links: [
        { label: "N.N. Alexandrov National Cancer Centre: history, 2010 (read through the Internet Archive)", url: OMR_HISTORY_WB },
        { label: "European Observatory: Belarus health system review 2013", url: HIT_2013 },
      ],
    },
  ],
  institutions: [
    "belarus-ministry-of-health", "alexandrov-national-cancer-centre-belarus", "belarusian-cancer-registry", "rceth-belarus",
    "belarus-paediatric-oncology-centre", "who", "iarc",
  ],
  companies: ["biocad", "prestige-biopharma", "bayer", "abbvie", "boehringer-ingelheim", "regeneron", "sanofi"],
  drugs: ["darolutamide", "niraparib", "dostarlimab", "erdafitinib", "alectinib", "veliparib", "cemiplimab", "zanubrutinib", "nintedanib", "rituximab"],
  trials: [
    "nct05732805", "nct05751928", "nct06640530", "nct07742215", "nct07108309", "nct03390686", "nct03602859", "ruby", "nct03473743",
    "nct04497844", "aramis", "nct04464226", "alina", "brocade3", "empower-lung-1", "rosewood", "lume-lung-1", "nct03033511",
    "nct03061812", "nct00718549", "elm-pc-4-orteronel", "firstana", "romana-1-2",
  ],
  papers: [
    "paper-zablotska-thyroid-cancer-chornobyl-belarus-bjc-2011", "paper-fridman-post-chernobyl-thyroid-children-belarus-jcem-2014",
    "paper-fridman-papillary-thyroid-trends-belarus-canep-2025", "paper-taha-second-cancers-after-chernobyl-thyroid-jama-netw-open-2023",
    "paper-zupunski-haematological-cancers-chernobyl-belarus-ijc-2026", "paper-matylevich-uterine-corpus-belarus-1993-2022-ijgo-2026",
    "paper-ryzhov-breast-cervical-stage-former-soviet-lancet-oncol-2021", "paper-znaor-screening-practices-eastern-europe-central-asia-jcpo-2023",
    "paper-mandrik-breast-screening-preferences-belarus-plos-one-2019", "paper-katsin-by19-cd19-car-t-belarus-mol-ther-oncol-2025",
    "paper-konoplya-academic-cd19-car-t-lymphoma-belarus-front-oncol-2026",
  ],
  people: [],
  how:
    "Every card was written from Belarusian official sources, international reviews and peer-reviewed papers, read in full rather than through a summary: the N.N. Alexandrov National Cancer Centre's history and its notice of the registry's book, and the Center for Examinations and Tests in Health Service's pages, both read through the Internet Archive because Belarusian sites did not answer; the 2012 WHO and IARC report of the 2011 expert mission, with the Ministry of Health's annexes; the European Observatory's 2013 health system review; WHO Europe's 2018 news item; IARC's GLOBOCAN 2024 fact sheet; WHO's HPV and health spending data from its public APIs; and the abstracts of the papers listed, each resolved through Europe PMC. Trial counts are from ClinicalTrials.gov participation data in OnCo's graph.",
  verify:
    "National incidence and death figures are IARC projections from Belarus's registry and death records, not the registry's own latest count. Several sources here are more than ten years old, and which medicines are free, which screening a clinic offers and where radiotherapy is given may have changed; ask the regional oncology dispensary or the treating hospital what applies to you. Pages read through the Internet Archive show the site as it was captured, not necessarily as it is now.",
  verifyLinks: [
    { label: "Ministry of Health of the Republic of Belarus", url: "https://minzdrav.gov.by/" },
    { label: "N.N. Alexandrov National Cancer Centre of Belarus", url: "https://omr.by/" },
    { label: "Center for Examinations and Tests in Health Service", url: RCETH_HOME },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Belarus (PDF)", url: IARC_FACTSHEET },
  ],
};

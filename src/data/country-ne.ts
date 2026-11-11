import type { CountryDive } from "@/data/country-dive";

/**
 * Niger deep dive: the hand-written cards for /countries/ne/ (wave 10). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Niger (PDF text); WHO's
 * cancer country profiles for Niger (2014 and 2020) and its cervical cancer country profile (2021), as posted on the
 * ICCP portal (PDF text); the Ministry of Public Health's integrated strategic plan for non-communicable diseases
 * 2012 to 2016 (PDF text, read in French); WHO's immunisation data (introduction and coverage tables, public API); the
 * World Bank's health expenditure series (api.worldbank.org); WHO's list of regulators at maturity level 3 and 4 (PDF,
 * August 2026); the African Cancer Registry Network's member list; ClinicalTrials.gov's API; the Internet Archive's
 * copy of UICC's member page for the Ligue Nigérienne de Lutte contre le Cancer; and the papers' abstracts through
 * Europe PMC, with the full text of Ncube et al. (2023) for its table of regulators. Where a figure could not be read it
 * is named under `gaps`. No figure here is about the change of government in 2023 or its effects, because OnCo found no
 * WHO, UN or peer-reviewed source on what it changed for cancer care.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/562-niger-fact-sheet.pdf";
const PNLMNT_2012 = "https://www.iccp-portal.org/sites/default/files/plans/NER_B3_Plan%20Strat%C3%A9gique%20PNLMNT%20Niger.pdf";
const PNLMNT_2019 = "https://www.iccp-portal.org/sites/default/files/plans/NER_B3_s21_EXE%20-%20Doucument%20complet%20Valid%C3%A9%20PNLCMNT.pdf";
const WHO_CCP_2014 = "https://www.iccp-portal.org/sites/default/files/plans/CCC_Niger_2014.pdf";
const WHO_CCP_2020 = "https://www.iccp-portal.org/sites/default/files/plans/NER_2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-ner-2021-country-profile-en.pdf";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'NER'%20and%20(ANTIGEN%20eq%20'HPV'%20or%20ANTIGEN%20eq%20'HEPB'%20or%20ANTIGEN%20eq%20'HepB_BD')";
const WHO_HEPB3_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'NER'%20and%20ANTIGEN%20eq%20'HEPB3'";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=NE";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=NE";
const WHO_ML = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const NCUBE = "https://doi.org/10.3389/fmed.2023.1117439";
const GARBA = "https://doi.org/10.1684/bdc.2013.1699";
const RB = "https://doi.org/10.1016/j.jfo.2024.104258";
const ABDOU = "https://doi.org/10.1016/j.heliyon.2020.e04316";
const GFAOP_REGISTRY = "https://clinicaltrials.gov/study/NCT03803735";
const AFCRN = "https://afcrn.org/index.php/membership/membership-list";
const CTGOV = "https://clinicaltrials.gov/search?country=Niger&cond=cancer";
const LNLC_UICC_WB = "https://web.archive.org/web/20240303202953/https://www.uicc.org/membership/ligue-nigerienne-de-lutte-contre-le-cancer-lnlc";

export const NE_DIVE: CountryDive = {
  iso2: "NE",
  iso3: "NER",
  name: "Niger",
  flag: "🇳🇪",
  asOf: "2026-11-11",
  title: "Cancer in Niger",
  description:
    "Cancer in Niger from WHO, IARC, World Bank, Nigerien and peer-reviewed sources: IARC's estimate of 16,234 new cancers and 10,426 deaths in 2024, with breast and liver cancer leading; a cancer registry kept at a Niamey pathology laboratory since 1992; free care for women's cancers by a 2007 decree; out-of-pocket payments at 51% of health spending; the national cancer centre created by law in 2011 with the IAEA; no HPV vaccine in the national schedule; and why no trial in our records has a site in Niger.",
  lede:
    "Niger has no national count of cancer, so its figures are IARC estimates: 16,234 new cancers and 10,426 deaths in 2024, with breast cancer the commonest and liver cancer the commonest cause of cancer death. Niger made care for women's cancers free in public facilities in 2007, but households still pay about half of all health spending themselves, and radiotherapy, screening and pain relief remain scarce.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Niger is 16,234 new cancers and 10,426 deaths, an age-standardised incidence of 121.2 per 100,000 (117.1 in men, 128.9 in women) and mortality of 82.3, including non-melanoma skin cancers. IARC's fact sheet names no country-specific source for incidence and gives its method as national or subnational rates scaled to regional all-cancer rates; deaths are national incidence applied to modelled mortality-to-incidence ratios from registry survival data (SurvCan). So the national figure is mostly a regional estimate, not a count from Niger. Niger's own registry, kept at a pathology laboratory in Niamey, publishes counts rather than rates: its 1992 to 2009 series shows the same leading cancers as IARC's estimate, with breast cancer 27.4% of women's cancers (IARC 39.1%), cervical cancer 13.4% (IARC 13.6%) and liver cancer 19% of men's cancers (IARC 23.3%). WHO's 2020 profile, using IARC's 2018 estimate, gave 8,674 cancers and 7,115 deaths; the difference from 2024 reflects changed estimates as much as any change in Niger, and the two should not be read as a trend.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Niger",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Niger (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 16,000 new cancers a year; breast cancer is the commonest and liver cancer kills most",
          plain:
            "IARC estimates 16,234 new cancers in Niger in 2024: 9,156 in women and 7,078 in men. Breast cancer is two in every five cancers in women, and liver cancer almost a quarter of cancers in men. For every ten new cancers IARC estimates about six cancer deaths in the same year, and liver cancer causes more cancer deaths than any other.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 3,581 breast cancers (1,708 deaths), 2,230 liver cancers (2,000 deaths), 1,246 cervical cancers (755 deaths), 1,019 colorectal cancers (560 deaths) and 683 ovarian cancers (448 deaths). Breast cancer is 39.1% of cancers in women and 22.1% of all cancers. In men the leading cancers are liver (1,649, 23.3%), prostate (623), colorectum (594), stomach (446) and pancreas (384). Liver cancer is 19.2% of all cancer deaths. The risk of developing a cancer before age 75 is 13.2% for men and 13.5% for women, and an estimated 23,823 people are living within five years of a diagnosis. Deaths divided by new cases give 0.64 for 2024. WHO's 2020 profile estimated 1,586 cancers a year in children aged 0 to 14, and WHO's 2021 cervical cancer profile put the cervical cancer mortality-to-incidence ratio at 0.76. The Ministry of Public Health's 2012 plan names the limited means for diagnosis and the high cost of chemotherapy and radiotherapy among the reasons cancer had become a public health problem.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Niger (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
            { label: "WHO: cervical cancer country profile, Niger, 2021 (PDF)", url: WHO_CX_2021 },
          ],
        },
        {
          id: "care-capacity",
          title: "Where treatment is: one national cancer centre, and radiotherapy not generally available",
          plain:
            "Niger's national cancer centre in Niamey was created by law in 2011 and built with the International Atomic Energy Agency. WHO's figures correspond to about one public cancer centre and one radiotherapy machine for the whole country, and WHO recorded in 2021 that radiotherapy was not generally available, while chemotherapy, cancer surgery and pathology were.",
          detail:
            "WHO's cancer country profile for 2014 recorded no radiotherapy machines (0.0 high-energy units per million people), and radiotherapy, chemotherapy and oral morphine as not generally available in the public health system. Its 2020 profile counts, per 10,000 cancer patients in 2019, 1.2 public cancer centres and 1.2 external beam radiotherapy machines (about one of each for the 8,674 cancers it used), 2.3 medical physicists, 2.3 radiologists, 2.3 nuclear medicine physicians and 35.7 surgeons (2014); no figure for radiation oncologists; and, in 2020, 10.4 mammography machines, 4.6 CT scanners and no MRI or PET scanners per 10,000 cancer patients. It records pathology services, bone marrow transplantation and community palliative care as generally not available, and opioid consumption for pain at 0. WHO's 2021 cervical cancer profile records a cancer centre at tertiary level, pathology, cancer surgery and chemotherapy as generally available, radiotherapy as not, one radiotherapy and one brachytherapy unit per 10,000 cancer patients, and 0 mg of oral morphine equivalent per person (2017). OnCo could not confirm how many radiotherapy machines are treating patients now; see the gaps.",
          links: [
            { label: "WHO: cancer country profile, Niger, 2014 (PDF)", url: WHO_CCP_2014 },
            { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
            { label: "WHO: cervical cancer country profile, Niger, 2021 (PDF)", url: WHO_CX_2021 },
          ],
        },
      ],
      tables: [
        {
          id: "ne-registry",
          title: "What Niger's cancer registry has published, beside IARC's estimate",
          caption: "Cancers recorded by the registry at the Faculty of Health Sciences pathology laboratory, Niamey, and IARC's 2024 estimate. Shares are per cent of cancers in women or in men.",
          columns: [
            { key: "source", label: "Source" },
            { key: "period", label: "Years" },
            { key: "cases", label: "Cancers", numeric: true },
            { key: "breast", label: "Breast, % of women's", numeric: true },
            { key: "cervix", label: "Cervix, % of women's", numeric: true },
            { key: "liver", label: "Liver, % of men's", numeric: true },
          ],
          rows: [
            { source: "Niger cancer registry, as quoted by the Ministry of Public Health's 2012 plan", period: "From 1992 (end year not stated)", cases: 5119, breast: null, cervix: null, liver: null },
            { source: "Niger cancer registry (Garba et al., Bull Cancer 2013)", period: "1992 to 2009", cases: 7031, breast: 27.36, cervix: 13.41, liver: 19 },
            { source: "IARC GLOBOCAN 2024 estimate for the whole country, one year", period: "2024", cases: 16234, breast: 39.1, cervix: 13.6, liver: 23.3 },
          ],
          note: "The registry rows are counts of cases that reached the laboratory or hospitals, 70.2% of them from the Niamey area, not rates for the country; only 42% of the 1992 to 2009 diagnoses were confirmed. The 2012 plan's row is the sum of the 2,179 men and 2,940 women it quotes, at an average of 426 cases a year. The IARC row is a one-year national estimate built mainly on regional rates, so the rows measure different things.",
          sources: [
            { label: "Garba et al., épidémiologie des cancers au Niger, 1992 à 2009 (Bull Cancer 2013)", url: GARBA },
            { label: "Ministère de la Santé Publique: plan stratégique MNT 2012 to 2016, section on cancer (PDF)", url: PNLMNT_2012 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Niger (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a pathology-based registry in Niamey since 1992",
      aside: { label: "Garba et al., Bull Cancer 2013", url: GARBA },
      cards: [
        {
          id: "registry-niamey",
          title: "A registry kept at a university pathology laboratory, mostly counting the capital",
          plain:
            "Niger has kept a cancer registry since 1992 at the pathology laboratory of the Faculty of Health Sciences of Abdou Moumouni University in Niamey. It recorded 7,031 cancers from 1992 to 2009, most of them from patients living around the capital, so it shows which cancers are common but not how common cancer is in Niger.",
          detail:
            "The Ministry of Public Health's 2012 plan places the registry at the Faculty of Health Sciences pathology laboratory and lists its creation in 1992 among the government's measures against non-communicable diseases. Garba and colleagues analysed its data for 1992 to 2009: 7,031 cancers, rising from 186 in 1992 to 646 in 2009, more women than men (sex ratio 1.40), an average age of 43, 70.2% of patients from the Niamey area, about 7% children's cancers (Burkitt lymphoma the commonest among them) and 42% of diagnoses confirmed. WHO's 2014 country profile describes the registry as population-based with subnational coverage and 2012 as its last year of data, and WHO's 2021 cervical cancer profile records that a population-based registry exists; OnCo found no published incidence rates from it. The registry does not appear in the African Cancer Registry Network's member list, and IARC's 2024 fact sheet names no country-specific incidence source for Niger. WHO's 2020 profile rates Niger's mortality registration as having no coverage for 2007 to 2016, so cancer deaths are modelled, not counted.",
          links: [
            { label: "Garba et al., épidémiologie des cancers au Niger, 1992 à 2009 (Bull Cancer 2013)", url: GARBA },
            { label: "Ministère de la Santé Publique: plan stratégique MNT 2012 to 2016 (PDF)", url: PNLMNT_2012 },
            { label: "WHO: cancer country profile, Niger, 2014 (PDF)", url: WHO_CCP_2014 },
            { label: "African Cancer Registry Network: current membership list", url: AFCRN },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: households pay about half of all health spending",
      aside: { label: "World Bank: out-of-pocket expenditure, Niger", url: WB_OOP },
      cards: [
        {
          id: "spending",
          title: "About 26 US dollars of health spending per person, half of it paid out of pocket",
          plain:
            "Niger spent about 26 US dollars per person on health in 2023, about 4% of its economy, and households paid 51.5% of it directly when they used care. Health insurance covers few people: the Ministry of Public Health wrote in 2012 that it was mostly limited to company schemes and international organisations' staff.",
          detail:
            "In the World Bank's series from WHO's Global Health Expenditure Database, current health spending in Niger was 26.0 US dollars per person in 2023 (35.8 in 2020) and 4.0% of GDP (6.2% in 2020). Out-of-pocket payments were 51.5% of current health spending in 2023, against 40.3% in 2022 and 43.5% in 2020; domestic government spending was 24.0% in 2023, against 35.3% in 2022, and external funding 14.6%. The Ministry of Public Health's 2012 plan describes the same pattern a decade earlier: households paid 42.70% of health spending in 2009, almost all of it directly, mutual health schemes and insurance reimbursed 2.17% of total health spending, health insurance was largely the privilege of a few bilateral and multilateral organisations for their own staff, and the health budget fell from 7.85% of the national budget in 2010 to 6.14% in 2011, against the 15% of the Abuja Declaration. It names chronic underfunding, dependence on outside funding and the near absence of social protection as the main constraints. The Ministry's multisectoral plan for non-communicable diseases for 2019 to 2021 gives a newer figure: direct payments by households were 52.27% of health financing in 2015 (54.91% in 2014), and despite efforts to pool health risks, households still carried most of the cost.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Niger", url: WB_OOP },
            { label: "World Bank: current health expenditure per capita, Niger", url: WB_CHE },
            { label: "Ministère de la Santé Publique: plan stratégique MNT 2012 to 2016, section on health financing (PDF)", url: PNLMNT_2012 },
            { label: "Ministère de la Santé Publique: plan stratégique multisectoriel MNT 2019 to 2021, section on health financing (PDF, ICCP portal)", url: PNLMNT_2019 },
          ],
        },
        {
          id: "free-care-policy",
          title: "Free care for some groups since 2006, including gynaecological cancers",
          plain:
            "Since 2006 Niger has offered free care in public facilities to some groups: children under five, caesarean sections, family planning, antenatal care and gynaecological cancers. A 2007 decree set out the free services for women's cancers, from tests to radiotherapy and medicines. OnCo found no list of which cancer medicines are on Niger's essential medicines list.",
          detail:
            "The Ministry's 2012 plan states that the free care introduced in 2006 covers children aged 0 to 5, caesarean sections, family planning, antenatal consultations and gynaecological cancers, and that Decree No. 261/PRN/MSP of 19 July 2007 made services for women's cancers in public health facilities free: consultations after screening, examinations, care including radiotherapy, hospital stays, medical and surgical procedures, medicines, and check-ups and follow-up. The plan also says the cost of treatment (chemotherapy, radiotherapy, hormone therapy) is high, that oral morphine is very limited, and that many patients die without pain relief. Free care for men's cancers, such as liver and prostate cancer, is not described in the plan. Whether the decree is funded and applied today, and in which hospitals, is not in any source OnCo could read; see the gaps. WHO's 2020 profile reports opioid consumption for pain at 0 for 2015 to 2017.",
          links: [
            { label: "Ministère de la Santé Publique: plan stratégique MNT 2012 to 2016, preface, health financing and legal framework (PDF)", url: PNLMNT_2012 },
            { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: a ministry directorate under a 1997 pharmacy law",
      aside: { label: "Ncube et al., Front Med 2023, table 2", url: NCUBE },
      cards: [
        {
          id: "dpmt",
          title: "Medicines regulated by the Ministry's pharmacy directorate, with the law under revision",
          plain:
            "When African medicines regulators were surveyed around 2021, Niger's regulator was a directorate of the Ministry of Public Health, the Direction de la Pharmacie et de la Médecine Traditionnelle, working under a 1997 pharmacy law. The law was being revised to take in the African Union's model law, which supports regulators relying on each other's decisions.",
          detail:
            "Ncube and colleagues surveyed the national medicines regulators of English- and French-speaking African Union member states; 21 regulators replied, Niger among them. Their table of regulators that had not yet domesticated the African Union Model Law on Medical Products Regulation gives Niger's regulator as the Direction de la Pharmacie et de la Médecine Traditionnelle, its legislation as Law No. 97-05 of 2 June 1997 ratifying Ordinance 97-05 on pharmaceutical legislation (introduced 1997, updated 2021), and notes that the revision of the 1997 law was in progress and considered domesticating the model law; elsewhere the paper counts Niger among eight regulators adopting the model law in part, all of them taking up the parts that allow international cooperation and harmonisation. The authors found the main barriers across countries were lack of staff and money, competing priorities, overlapping roles and slow law reform. OnCo could not reach an official website for the regulator and could not confirm whether a new agency has since been created; this is named in the gaps.",
          links: [
            { label: "Ncube et al., domestication of the African Union model law on medical products regulation (Front Med 2023)", url: NCUBE },
          ],
        },
        {
          id: "maturity",
          title: "Not on WHO's list of regulators at maturity level 3 or 4",
          plain:
            "WHO rates medicines regulators against a benchmarking tool, and a regulator at maturity level 3 is judged stable and well functioning. Niger does not appear on WHO's list of regulators at maturity level 3 or 4, dated August 2026. OnCo found no published time for registering a cancer medicine in Niger.",
          detail:
            "WHO's list of national regulatory authorities operating at maturity level 3 or 4, benchmarked against its Global Benchmarking Tool and dated August 2026, includes African regulators in Egypt, Ethiopia, Ghana and Nigeria among others, and does not include Niger. Not being on the list does not mean a medicine sold in Niger is unsafe; it means WHO has not published a benchmarking result at those levels for Niger's regulator. Regulators surveyed by Ncube and colleagues expected the African Union model law to make it easier to rely on other regulators' decisions and to recognise them mutually. OnCo found no published list of cancer medicines registered in Niger, no registration times and no national guideline for authorising clinical trials; WHO's 2020 profile records no national cancer management guidelines in 2019.",
          links: [
            { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4", url: WHO_ML },
            { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "WHO: cervical cancer country profile, Niger, 2021 (PDF)", url: WHO_CX_2021 },
      cards: [
        {
          id: "cervical-screening",
          title: "No national cervical screening programme, and fewer than one woman in ten screened",
          plain:
            "WHO recorded in 2021 that Niger had no national cervical cancer screening programme and no national guideline for managing cervical cancer. In a 2019 survey 8% of women aged 30 to 49 had been screened in the last five years and 10% ever. Breast examination by a health worker was recorded as generally available in primary care in 2014.",
          detail:
            "WHO's 2021 cervical cancer profile for Niger records no national screening programme, no primary screening test, no programme or guideline for early detection of first symptoms in primary care, no clearly defined referral system from primary to secondary and tertiary care, and no national guideline for cervical cancer management; 8% of women aged 30 to 49 had been screened in the last five years and 10% ever (2019). WHO's 2014 profile recorded that neither Pap smears nor visual inspection with acetic acid were generally available in public primary care, but that clinical breast examination was, while mammography was not. The Ministry's 2012 plan said screening campaigns for breast and cervical cancer were organised unevenly by some NGOs and health facilities and often only in the capital. In a household survey in the Zinder and Niamey regions, Abdou and colleagues found that 41.2% of women were aware of breast cancer and 16.9% showed good breast cancer practice, and called for awareness programmes promoting clinical breast examination.",
          links: [
            { label: "WHO: cervical cancer country profile, Niger, 2021 (PDF)", url: WHO_CX_2021 },
            { label: "WHO: cancer country profile, Niger, 2014 (PDF)", url: WHO_CCP_2014 },
            { label: "Abdou et al., awareness of breast cancer among women in Niger (Heliyon 2020)", url: ABDOU },
          ],
        },
        {
          id: "vaccines",
          title: "Hepatitis B vaccine for infants since 2008; HPV vaccine not in the national schedule",
          plain:
            "Liver cancer causes more cancer deaths in Niger than any other, and a study in Niger found hepatitis B in most people with liver cancer or cirrhosis. Niger added hepatitis B vaccine to infant immunisation in 2008, and WHO estimates that 87% of infants received three doses in 2025, but there is no birth dose. WHO's data record no national introduction of the HPV vaccine, which prevents cervical cancer.",
          detail:
            "WHO's vaccine introduction table records hepatitis B vaccine as introduced nationwide in Niger in 2008, the hepatitis B birth dose as not introduced through 2025, and HPV vaccine as not introduced in any year from 2006 to 2025. WHO and UNICEF's estimates of coverage with three doses of hepatitis B vaccine are 84% for 2022, 85% for 2023, 86% for 2024 and 87% for 2025. WHO's programme coverage table holds no HPV coverage figures for Niger. WHO's 2021 cervical cancer profile likewise says HPV vaccination is not in the national schedule. WHO's 2014 profile, however, listed an HPV schedule for 11-year-olds with doses at 3 and 7 months as subnational, which reads as a limited project rather than a national programme; OnCo found no other record of it. In a 1995 study in Niger by Cenac and colleagues, 73% of 89 patients with chronic hepatitis, cirrhosis or liver cancer carried hepatitis B surface antigen, against 29.8% of controls, and the authors also pointed to hepatitis D superinfection. WHO's 2014 profile also recorded tobacco smoking at 8.9% of men and under 1% of women (2011).",
          links: [
            { label: "WHO immunisation data: vaccine introduction rows for Niger (API)", url: WHO_INTRO_API },
            { label: "WHO immunisation data: hepatitis B third dose coverage for Niger (API)", url: WHO_HEPB3_API },
            { label: "WHO: cervical cancer country profile, Niger, 2021 (PDF)", url: WHO_CX_2021 },
            { label: "WHO: cancer country profile, Niger, 2014 (PDF)", url: WHO_CCP_2014 },
            { label: "Cenac et al., hepatitis B, C and D in chronic liver disease and liver cancer in Niger (Am J Trop Med Hyg 1995)", url: "https://doi.org/10.4269/ajtmh.1995.52.293" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Niger does",
      title: "What Niger does differently",
      cards: [
        {
          id: "womens-cancers-decree",
          title: "A decree making care for women's cancers free, radiotherapy and medicines included",
          plain:
            "In 2007 Niger made care for women's cancers free in public facilities by decree, covering consultations after screening, tests, surgery, radiotherapy, hospital stays, medicines and follow-up. Breast, cervical and ovarian cancer are three of the five commonest cancers in Niger, so the decree reaches most of the cancers women there get.",
          detail:
            "Decree No. 261/PRN/MSP of 19 July 2007 instituted free provision, in public health facilities, of services related to women's cancers; the Ministry's 2012 plan lists what it covers: consultations after screening, examinations, care including radiotherapy, hospitalisation, medical and surgical procedures, medicines, and check-ups and follow-up. It sits within the free care policy introduced in 2006 for children under five, caesarean sections, family planning, antenatal care and gynaecological cancers. In IARC's 2024 estimate, breast (3,581), cervical (1,246) and ovarian (683) cancers together are 60.2% of cancers in women. A free right to treatment depends on treatment existing: WHO recorded radiotherapy as not generally available in 2021, and a 2026 paper by Adama and colleagues in the Bulletin du Cancer describes gynaecological cancer surgery in Niger as caught between late diagnosis and the inaccessibility of treatment after surgery (OnCo read its title only; no abstract is indexed). OnCo found no evaluation of how the decree works in practice.",
          links: [
            { label: "Ministère de la Santé Publique: plan stratégique MNT 2012 to 2016, preface and section on health financing (PDF)", url: PNLMNT_2012 },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Niger (PDF)", url: IARC_FACTSHEET },
            { label: "Adama et al., gynaecological oncological surgery in Niger (Bull Cancer 2026)", url: "https://doi.org/10.1016/j.bulcan.2026.03.018" },
          ],
        },
        {
          id: "childhood",
          title: "Children's cancer: a national centre in a francophone African network, and retinoblastoma found late",
          plain:
            "Niger's national cancer centre in Niamey is one of the sites of a registry run by the French Africa Pediatric Oncology Group, which follows children treated in units across francophone Africa. A study of retinoblastoma, an eye cancer of young children, found that nearly half arrived with the tumour already outside the eye, many after long journeys and visits to traditional healers.",
          detail:
            "The French African Pediatric Oncology Registry (NCT03803735), which started in January 2016 and aims to record about 10,000 children by 2030, lists the CNLC, Centre National de Lutte contre le Cancer in Niamey, among its recruiting sites, with units in 11 African countries and a coordinating site in Villejuif, France; its stated aim is to give local and national authorities data for planning children's cancer programmes. WHO's 2020 profile estimated 1,586 cancers a year in children aged 0 to 14 and recorded no early detection programme and no defined referral system for them in 2019. At Niger's tertiary centre for conservative treatment of retinoblastoma, Nouhou Diori and colleagues reviewed 2016 to 2022: retinoblastoma was 43.27% of the children's cancers seen, the mean age was 36 months, families travelled up to 1,355 km from Diffa, 58% had seen traditional healers first, 47.90% had extraocular extension, and 63.03% received chemotherapy before surgery. A white pupil (leukocoria) was the commonest sign, in 39.5%; the authors call for early diagnosis campaigns to continue.",
          links: [
            { label: "ClinicalTrials.gov: French African Pediatric Oncology Registry (NCT03803735)", url: GFAOP_REGISTRY },
            { label: "Nouhou Diori et al., stage at diagnosis of retinoblastoma in Niger (J Fr Ophtalmol 2024)", url: RB },
            { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and plans",
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Niger",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Niger. The Nigerien cancer research OnCo found is observational: the registry's case series, hospital studies of children's and women's cancers, and a survey of what women know about breast cancer.",
          detail:
            "Of 5,916 ClinicalTrials.gov participation records in OnCo's graph, 5,595 list their countries, and none includes Niger; none includes Mali, Burkina Faso, Senegal, Benin or Chad either, while four include Nigeria. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines. A search of ClinicalTrials.gov's own data on 11 November 2026 for cancer studies with a site in Niger returned two records: the French African Pediatric Oncology Registry, recruiting at the national cancer centre in Niamey, and a completed study of malnutrition screening by mothers that the search matched by keyword. The published Nigerien cancer research OnCo found is case series from pathology and hospital departments in Niamey, such as the registry's 1992 to 2009 analysis and the retinoblastoma study, and the breast cancer awareness survey in Zinder and Niamey. OnCo found no national guideline for authorising clinical trials in Niger.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Niger (search)", url: CTGOV },
            { label: "ClinicalTrials.gov: French African Pediatric Oncology Registry (NCT03803735)", url: GFAOP_REGISTRY },
            { label: "Garba et al., épidémiologie des cancers au Niger, 1992 à 2009 (Bull Cancer 2013)", url: GARBA },
          ],
        },
        {
          id: "plan-2012",
          title: "Cancer inside a plan for non-communicable diseases, and no separate cancer plan found",
          plain:
            "Niger's Ministry of Public Health folded cancer into an integrated plan for non-communicable diseases for 2012 to 2016, alongside heart disease, diabetes and others. WHO recorded an operational plan for non-communicable diseases in 2019 and gave no information on a national cancer control plan. OnCo found no Nigerien cancer plan on the International Cancer Control Partnership's portal.",
          detail:
            "The Plan Stratégique National Intégré de Prévention et de Lutte contre les Maladies Chroniques Non Transmissibles, dated March 2012, covers 2012 to 2016 and was written by the national programme for non-communicable diseases created by ministerial order on 25 January 2012. It names nine priority conditions, cancer among them, and six strategic directions: multisectoral prevention policies, better screening and treatment, wider health coverage and resource mobilisation, monitoring, governance, and research. It lists a Centre National de Traitement du Cancer among the bodies supporting its implementation, and the support of the International Atomic Energy Agency among Niger's strengths. WHO's 2020 profile records an operational integrated plan for non-communicable diseases in 2019, no information (n/a) on a national cancer control plan, no cancer management guidelines and no palliative care in the plan. The portal's sitemap, read on 11 November 2026, lists for Niger this plan, the Ministry's multisectoral plan for non-communicable diseases for 2019 to 2021, and WHO's profiles; the 2019 plan again treats cancer as one of several conditions, repeats the registry's figures and the 2007 decree, and lists the national cancer centre among the bodies it works with. Niger's 2007 STEPS survey, quoted in the plan, found 4.9% of adults smoked tobacco.",
          links: [
            { label: "Ministère de la Santé Publique: plan stratégique MNT 2012 to 2016 (PDF, ICCP portal)", url: PNLMNT_2012 },
            { label: "Ministère de la Santé Publique: plan stratégique multisectoriel MNT 2019 to 2021 (PDF, ICCP portal)", url: PNLMNT_2019 },
            { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "official-sites",
      title: "Niger's official health websites could not be reached",
      plain:
        "OnCo could not reach a website for Niger's Ministry of Public Health, its national cancer centre or its medicines regulator on 11 November 2026; the addresses tried did not resolve. So this page rests on WHO, IARC, World Bank and peer-reviewed sources and on a 2012 ministry plan, and may miss newer national decisions.",
      detail:
        "Addresses tried for the Ministry of Public Health, the Centre National de Lutte contre le Cancer and a medicines regulator did not resolve on 11 November 2026, and OnCo did not guess others. UICC's member pages for Nigerien organisations refused a plain request; the Ligue Nigérienne de Lutte contre le Cancer's page was read through the Internet Archive's copy of March 2024 (the page was last updated in January 2024), and the Internet Archive held no copy of the cancer centre's page. As a result OnCo could not read any national cancer plan (the newest national plan found is the Ministry's multisectoral plan for non-communicable diseases for 2019 to 2021, posted on the ICCP portal), any current list of cancer medicines on Niger's essential medicines list, the centre's own account of its services, or any statement on whether Niger's medicines regulator has been reorganised since the 2023 survey of regulators.",
      links: [
        { label: "UICC: Ligue Nigérienne de Lutte contre le Cancer (Internet Archive copy, March 2024)", url: LNLC_UICC_WB },
        { label: "Ncube et al., domestication of the African Union model law (Front Med 2023)", url: NCUBE },
      ],
    },
    {
      id: "radiotherapy-now",
      title: "How many radiotherapy machines are treating patients now is not confirmed",
      plain:
        "WHO's figures for 2019 and 2021 correspond to about one radiotherapy machine and one brachytherapy unit in Niger, yet WHO's 2021 profile records radiotherapy as not generally available. OnCo could not read the IAEA's radiotherapy directory, which needs a browser, or any IAEA report on the Niamey centre, so the current number of working machines is not known here.",
      detail:
        "The IAEA's Directory of Radiotherapy Centres (DIRAC) loads its country data in the browser and returned no figures to a plain request on 11 November 2026, and OnCo found no IAEA imPACT Review report for Niger. WHO's 2014 profile recorded no high-energy teletherapy units; its 2020 profile 1.2 external beam machines per 10,000 cancer patients in 2019; and its 2021 cervical profile one radiotherapy and one brachytherapy unit per 10,000 cancer patients while marking radiotherapy as not generally available. Ask the referring hospital whether radiotherapy is working in Niamey and how long the wait is.",
      links: [
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
        { label: "WHO: cervical cancer country profile, Niger, 2021 (PDF)", url: WHO_CX_2021 },
      ],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not here because OnCo could not find them in a primary source: cancer survival in Niger, incidence rates from the registry, how the free care decree for women's cancers works today, the cost of cancer treatment to families, and anything about cancer care after the change of government in 2023.",
      detail:
        "No population-based survival figures for Niger were found. The registry's analysis gives counts and shares, not rates, and its data after 2009 (WHO's 2014 profile names 2012 as the last year) were not found published. The 2007 decree is described here from the Ministry's 2012 plan; the decree's text, its funding and any evaluation were not read. The 2026 Bulletin du Cancer paper on gynaecological cancer surgery has no indexed abstract and was read by title only. Two 2026 preprints on breast cancer diagnosis in Niger were found but not used, as they are not peer-reviewed. The World Bank series shows government health spending falling from 35.3% to 24.0% of current health spending between 2022 and 2023; OnCo found no WHO, UN or peer-reviewed source explaining the change and does not attribute a cause. IARC's detailed data sources and methods page for Niger was not read; the method is taken from the fact sheet.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Niger (PDF)", url: IARC_FACTSHEET },
        { label: "World Bank: domestic general government health expenditure, Niger", url: "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=NE" },
      ],
    },
  ],
  institutions: [
    "niger-ministry-of-public-health", "cnlc-niger", "niger-cancer-registry", "dpmt-niger", "ligue-nigerienne-contre-le-cancer",
    "iaea", "iarc", "who", "uicc",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-garba-niger-cancer-registry-1992-2009-bulcan-2013", "paper-nouhou-diori-retinoblastoma-stage-niger-jfo-2024",
    "paper-abdou-breast-cancer-awareness-niger-heliyon-2020", "paper-ncube-au-model-law-domestication-fmed-2023",
  ],
  people: [],
  how:
    "Every card was written from WHO, IARC, World Bank, Nigerien and peer-reviewed sources, read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet for Niger; WHO's cancer country profiles for 2014 and 2020 and its cervical cancer profile for 2021; the Ministry of Public Health's integrated plan for non-communicable diseases 2012 to 2016, read in French; WHO's immunisation data; the World Bank's health expenditure series; WHO's August 2026 list of regulators at maturity level 3 and 4; the African Cancer Registry Network's member list; ClinicalTrials.gov; UICC's member page for the Nigerien league against cancer, through the Internet Archive; and the papers through Europe PMC and Crossref. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, the national cancer centre, the registry, the pharmacy directorate, the league and four papers) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates built mainly on regional rates, not a count from Niger. Whether radiotherapy is working, which medicines are in stock and what the free care for women's cancers covers in practice can change faster than any published source; ask the oncology service at the national cancer centre or the referring hospital in Niamey what applies to you. Screening is not organised nationally, so availability depends on campaigns and where you live.",
  verifyLinks: [
    { label: "WHO: cancer country profile, Niger, 2020 (PDF)", url: WHO_CCP_2020 },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Niger (PDF)", url: IARC_FACTSHEET },
    { label: "ClinicalTrials.gov: French African Pediatric Oncology Registry (NCT03803735)", url: GFAOP_REGISTRY },
  ],
};

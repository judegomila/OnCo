import type { CountryDive } from "@/data/country-dive";

/**
 * Montenegro deep dive: the hand-written cards for /countries/me/ (wave 13). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Montenegro; WHO's Cancer
 * Country Profile 2020; the Health Insurance Fund's (FZOCG) pages on insured persons, medicines and the medicines list,
 * with the Government decision and the list of October 2026 (PDF text); the medicines institute CInMED's pages on
 * marketing authorisation, maximum prices and clinical trials, and its register of approved clinical trials (PDF text,
 * updated 6 July 2026); the Clinical Centre of Montenegro's page for its Institute of Oncology; the Ministry of Health's
 * draft National Cancer Control Programme of July 2011 (PDF text, from the ICCP portal); a Ministry of Health statement
 * of 4 March 2026 and a 2018 World Cancer Day statement quoting "the Institute", both as carried by the Medical CG
 * portal; WHO's country story on the introduction of HPV vaccination; six papers read through Europe PMC (four in full text, two as
 * abstracts); IAEA's DIRAC country row; WHO's HPV coverage rows from its public immunisation data API;
 * the World Bank's health expenditure series; and the ClinicalTrials.gov API. Montenegrin sources were read in
 * Montenegrin. The Institute of Public Health's own site needs a browser and was not read; that and every other source
 * that could not be read is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/499-montenegro-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mne-2020.pdf";
const FZO_INSURED = "https://fzocg.me/osiguranici-i-osigurana-lica-fonda/";
const FZO_MEDICINES = "https://fzocg.me/ljekovi-i-medicinska-sredstva/";
const FZO_LIST_PAGE = "https://fzocg.me/lista-ljekova/";
const FZO_LIST_OCT = "https://fzocg.me/wp-content/uploads/2026/10/Lista-ljekova-oktobar-2026.-godine.pdf";
const FZO_DECISION_OCT = "https://fzocg.me/wp-content/uploads/2026/10/Odluka-o-utvrdjivanju-osnovne-i-doplatne-oktobar-2026.g.pdf";
const FZO_ABOUT = "https://fzocg.me/o-nama/";
const CINMED_MA = "https://cinmed.me/humani-lijekovi/izdavanje-dozvole-za-lijek/";
const CINMED_PRICES = "https://cinmed.me/humani-lijekovi/maksimalne-cijene-ljekova/";
const CINMED_TRIALS = "https://cinmed.me/humani-lijekovi/klinicka-ispitivanja-2/";
const CINMED_REGISTER = "https://cinmed.me/wp-content/uploads/2026/07/Registar-odobrenih-klinickih-ispitivanja-06072026.pdf";
const KCCG_ONCOLOGY = "https://www.kccg.me/klinike-i-centri/institut-za-onkologiju/";
const NCCP_2011 = "https://www.iccp-portal.org/system/files/plans/MNE_B5_NACIONALNI%20PROGRAMza%20kontrolu%20raka.pdf";
const MOH_HPV_2026 = "https://medicalcg.me/04-mart-ministarstvo-zdravlja-dosljednom-vakcinacijom-protiv-hpv-ka-trajnom-smanjenju-tereta-malignih-bolesti/";
const IJZ_2018 = "https://medicalcg.me/04-februar-obolijevanje-od-malignih-bolesti-u-porastu/";
const WHO_HPV_STORY = "https://www.who.int/about/accountability/results/who-results-report-2020-mtr/country-story/2022/introducing-hpv-vaccines-for-a-cervical-cancer-free-generation-in-montenegro";
const PAPER_CRC = "https://doi.org/10.1097/md.0000000000039402";
const PAPER_CRC_ROADMAP = "https://doi.org/10.1016/j.jcpo.2023.100464";
const PAPER_CERVIX_BARRIERS = "https://doi.org/10.1186/s12889-025-22535-4";
const PAPER_CERVIX_TREND = "https://doi.org/10.1093/eurpub/ckaf059";
const PAPER_HPV = "https://doi.org/10.3390/vaccines12070803";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'MNE'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=ME";
const WB_PER_PERSON = "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=ME";
const WB_GOV = "https://data.worldbank.org/indicator/SH.XPD.GHED.CH.ZS?locations=ME";
const DIRAC = "https://dirac.iaea.org/Query/Countries";
const CTGOV = "https://clinicaltrials.gov/search?country=Montenegro&cond=cancer";
const IJZ = "https://www.ijzcg.me/";
const MOH = "https://www.gov.me/mzd";

export const ME_DIVE: CountryDive = {
  iso2: "ME",
  iso3: "MNE",
  name: "Montenegro",
  flag: "🇲🇪",
  asOf: "2026-11-16",
  title: "Cancer in Montenegro",
  description:
    "Cancer in Montenegro from Montenegrin and international sources: IARC's estimate of 3,328 new cancers and 1,632 deaths in 2024, modelled because IARC holds no national incidence data; one public insurance fund and a published list of the medicines it pays for; national licensing by the medicines institute CInMED; screening for bowel and cervical cancer; HPV vaccination since 2022; and radiotherapy at one centre in Podgorica.",
  lede:
    "Montenegro, a country of about 620,000 people outside the European Union, pays for cancer care through one public insurance fund, and its Institute of Oncology is at the Clinical Centre of Montenegro in Podgorica. IARC estimates 3,328 new cancers and 1,632 deaths in 2024, but it had no national incidence data and modelled the figure. The medicines the fund pays for, including several newer cancer drugs, are published in a list the Government revises several times a year.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Montenegro is 3,328 new cancers and 1,632 deaths, an age-standardised incidence of 280.1 per 100,000 (293.9 in men, 275.0 in women) and mortality of 119.8 (149.4 in men, 98.2 in women). IARC's fact sheet gives the country-specific source for incidence as \"No data\" and the method as \"National mortality estimates applied to model-based M:I ratios (neighbouring country registry data)\": the number of new cases is worked out from Montenegro's deaths using ratios of deaths to cases seen in neighbouring countries' registries, so it is an estimate, not a count. Deaths come from Montenegro's own figures reported to WHO, with national rates applied to the 2024 population. Montenegro has a registry of malignant neoplasms at the Institute of Public Health, but OnCo could not read a published report from it, so no registry count is set beside IARC's figures here.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Montenegro",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Montenegro (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 3,300 new cancers a year in IARC's estimate; lung cancer causes the most deaths",
          plain:
            "IARC estimates 3,328 new cancers and 1,632 cancer deaths in Montenegro in 2024. Breast cancer is the commonest, then lung, bowel and prostate cancer. Lung cancer causes the most deaths, 367 of them, more than a fifth of all cancer deaths.",
          detail:
            "IARC's GLOBOCAN 2024 fact sheet gives 493 breast cancers (166 deaths), 421 lung cancers (367 deaths), 335 colorectal cancers (165 deaths), 172 prostate cancers (85 deaths) and 150 bladder cancers (52 deaths), in a population of 638,482. Among men the commonest are lung (292), colorectal (191) and prostate (172); among women breast (493), colorectal (144) and lung (129), followed by cancers of the womb (116) and cervix (69). The age-standardised death rate is 149.4 per 100,000 in men and 98.2 in women. About 9,662 people were living within five years of a cancer diagnosis. The risk of developing cancer before age 75 is put at 27.2%. The case figures are modelled from deaths, as the note under the table explains. WHO's 2020 country profile gave 2,366 cases and 1,287 deaths for 2018, without stating its method; the two figures come from different documents and are not set side by side here as a trend.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Montenegro (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: Cancer Country Profile 2020, Montenegro (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "registry",
          title: "A registry of malignant neoplasms exists, but IARC holds no incidence data from it",
          plain:
            "Montenegro has a registry of new cancers, which the Ministry of Health's 2011 plan placed at the Institute of Public Health. A statement for World Cancer Day carried by the Medical CG portal in 2018 said the registry's latest data showed 2,925 new cases, without naming the year. IARC's 2024 fact sheet lists no national incidence data for Montenegro, and OnCo could not read the Institute's own reports.",
          detail:
            "The Ministry of Health's draft National Cancer Control Programme of July 2011 says a national cancer registry was provided for by the Law on Data Collections in Health adopted in 2008, and that by 2011 the reporting forms and instructions were done while the by-laws, database and software were still to come. WHO's 2020 profile records the population-based cancer registry's status in 2019 as \"Registration activity\" and notes that its incidence estimates for the country have a high degree of uncertainty because they are not based on a population-based registry. The same draft's action plan provides for training staff of the Institute of Public Health to keep the registry. A statement for World Cancer Day, posted by the Medical CG portal on 8 March 2018 and attributed there to \"the Institute\" without its full name, said that according to the latest data from the Registry of Neoplasms 2,925 new cases were recorded, 52.51% in men and 47.49% in women, with lung cancer the commonest in men and breast cancer in women; the statement does not give the year of diagnosis. The Institute's site is built to run in a browser and returned no text to a plain request, so its registry reports were not read.",
          links: [
            { label: "Ministry of Health: National Cancer Control Programme, draft of July 2011, section 4.6.1 (PDF, in Montenegrin, ICCP portal)", url: NCCP_2011 },
            { label: "WHO: Cancer Country Profile 2020, Montenegro (PDF)", url: WHO_PROFILE },
            { label: "Medical CG: statement for World Cancer Day quoting the Registry of Neoplasms (posted 8 March 2018, in Montenegrin)", url: IJZ_2018 },
            { label: "Institut za javno zdravlje Crne Gore (needs a browser)", url: IJZ },
          ],
        },
      ],
      tables: [
        {
          id: "me-globocan-sites",
          title: "The five commonest cancers in Montenegro, IARC's 2024 estimate",
          caption: "New cases and deaths, both sexes, GLOBOCAN 2024. New cases are modelled from national deaths and neighbouring countries' registry data.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 493, deaths: 166 },
            { site: "Lung", cases: 421, deaths: 367 },
            { site: "Colorectum", cases: 335, deaths: 165 },
            { site: "Prostate", cases: 172, deaths: 85 },
            { site: "Bladder", cases: 150, deaths: 52 },
          ],
          note: "OnCo could not read a report from Montenegro's own registry to set beside these. IARC ranks the five without non-melanoma skin cancer, for which it estimates 321 cases. Deaths rest on national figures reported to WHO; new cases are estimates.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Montenegro (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: one public fund, and a list of the medicines it covers",
      aside: { label: "Fond za zdravstveno osiguranje Crne Gore (Health Insurance Fund)", url: "https://fzocg.me/" },
      cards: [
        {
          id: "cover",
          title: "One public insurance fund; residents with no other cover can register with it",
          plain:
            "Health care is paid for through the Health Insurance Fund of Montenegro. Workers, pensioners, farmers and registered unemployed people who receive unemployment benefit are insured, and so are citizens living in Montenegro and foreigners with permanent residence who have no other basis for insurance. Even so, about a quarter of all health spending in 2023 came straight from people's pockets.",
          detail:
            "The Fund says it was founded in 1991 by the republic's Assembly as the organisation of compulsory health insurance and took its present name under the 2016 health insurance law. Its page on insured persons lists ten groups, from employees and the self-employed to pensioners, farmers and people in custody, and adds that Montenegrin citizens resident in the country and foreigners with permanent residence gain insured status if they are insured on none of those grounds, as do people granted asylum or subsidiary protection; family members are covered through the insured person. The World Bank's series, taken from WHO's health expenditure database, puts out-of-pocket payments at 38.1% of current health spending in 2021, 25.5% in 2022 and 26.3% in 2023, government spending at 69.3% in 2023, and total health spending at US$1,148 a person and 9.7% of GDP in 2023. These figures cover all care, not cancer alone.",
          links: [
            { label: "FZOCG: insured persons (in Montenegrin)", url: FZO_INSURED },
            { label: "FZOCG: about the Fund (in Montenegrin)", url: FZO_ABOUT },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Montenegro", url: WB_OOP },
            { label: "World Bank: government share of current health expenditure, Montenegro", url: WB_GOV },
            { label: "World Bank: current health expenditure per person, Montenegro", url: WB_PER_PERSON },
          ],
        },
        {
          id: "medicines-list",
          title: "A basic list paid by the Fund and a supplementary list with a patient share",
          plain:
            "The Fund pays for medicines on a published list. Medicines on the basic list are paid by the Fund. For those on the supplementary list the Fund pays part and the patient pays the rest: for one 120-tablet pack of the chemotherapy tablet capecitabine, the list shows the Fund paying EUR 29.50 and the patient EUR 13.00.",
          detail:
            "The Fund's page on medicines says an insured person is entitled to medicines from the list, prescribed and issued at the Fund's expense, and that the list holds both prescription medicines and medicines used in health institutions. The list of October 2026 has a basic list (osnovna lista), a part of the basic list with a special prescribing regime, and a supplementary list (doplatna lista) whose columns give the pack price paid by the Fund and the pack price paid by the insured person. On the supplementary list a 120 x 500 mg pack of capecitabine (Ecansya) is priced at EUR 42.50, of which the Fund pays EUR 29.50 and the insured person EUR 13.00, and a 120 x 250 mg pack of abiraterone (Zytiga) at EUR 710.97, of which the insured person pays EUR 71.10. Capecitabine and abiraterone also appear on the basic list under other entries. Where a listed medicine could not be supplied by a contracted provider, the Fund's site describes how to claim the cost back with the prescription, the receipt and a confirmation that the medicine was out of stock.",
          links: [
            { label: "FZOCG: list of medicines, October 2026 (PDF, in Montenegrin)", url: FZO_LIST_OCT },
            { label: "FZOCG: medicines and medical devices (in Montenegrin)", url: FZO_MEDICINES },
            { label: "FZOCG: lists of medicines by year (in Montenegrin)", url: FZO_LIST_PAGE },
            { label: "FZOCG: home page, with the refund of medicine costs (in Montenegrin)", url: "https://fzocg.me/" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Approval and access: a national licence from CInMED, then a place on the Government's list",
      aside: { label: "CInMED: marketing authorisation of medicines (in Montenegrin)", url: CINMED_MA },
      cards: [
        {
          id: "approval",
          title: "Every medicine needs a Montenegrin licence, with a shorter review if the EU has approved it",
          plain:
            "Montenegro is not in the European Union, so a European approval does not apply there automatically. The Institute for Medicines and Medical Devices (CInMED) issues a national licence for each medicine. If the medicine is already registered in the EU, the law allows a shorter assessment that accepts the existing expert opinions.",
          detail:
            "CInMED's page on marketing authorisation says it issues a national licence valid in Montenegro, that licences issued in other countries have no automatic validity, and that each medicine must pass its procedure; where a medicine is already registered in the EU the Law on Medicines allows a shorter evaluation with acceptance of the relevant expert opinions. It checks that an application is complete within 30 days, its assessors work with outside experts from Montenegro and the region, and an advisory Commission for placing medicines on the market gives an expert opinion. Assessors use the guidelines of the European Medicines Agency and of the International Council for Harmonisation, and the page says procedures and time limits are aligned with EU directives. The applicant must be based in Montenegro until the country joins the EU. CInMED publishes the licensed medicines with their product information in a searchable database.",
          links: [
            { label: "CInMED: marketing authorisation of medicines (in Montenegrin)", url: CINMED_MA },
            { label: "CInMED: database of medicines for human use", url: "https://cinmed.me/registar-humanih-lijekova/" },
          ],
        },
        {
          id: "reimbursement",
          title: "The Government sets the list of covered medicines; newer cancer drugs need a specialist board's opinion",
          plain:
            "A licence does not mean the Fund pays. The Government, on the Ministry of Health's proposal, decides which medicines go on the list, and revised it in January, July and October 2026. The October list includes pembrolizumab, nivolumab, osimertinib and trastuzumab deruxtecan, each tied to named uses and to the opinion of a hospital board of specialists and of the Fund's commission.",
          detail:
            "The current decision was adopted by the Government on 24 September 2026 under article 21 of the Law on Compulsory Health Insurance, published in the Official Gazette (144/2026) on 2 October and in force from 10 October 2026, replacing the previous list. Each row carries an indication code and a prescribing code. The code SZK, shown against pembrolizumab (Keytruda), nivolumab (Opdivo) and trastuzumab deruxtecan (Enhertu), means use in a hospital on the opinion of a board (konzilijum) of specialists of the Clinical Centre of Montenegro, the Brezovik special hospital or the oncologists' board at Bijelo Polje general hospital, together with the opinion of the Fund's commission; osimertinib (Tagrisso) carries RK and SZK, the same route with a prescription from the patient's chosen doctor. Pembrolizumab's indication code lists specific uses in melanoma, lung, urothelial, head and neck and early triple-negative breast cancer. Olaparib (Lynparza) sits in the special-regime part of the list with the code K, which the legend defines as approval by a Ministry of Health commission. An asterisk on a price marks one set by a separate contract. Separately, CInMED sets maximum wholesale prices for prescription medicines by comparison with Serbia, the Czech Republic and Romania.",
          links: [
            { label: "Government decision setting the basic and supplementary lists, October 2026 (PDF, in Montenegrin)", url: FZO_DECISION_OCT },
            { label: "FZOCG: list of medicines, October 2026, with the legend of codes (PDF, in Montenegrin)", url: FZO_LIST_OCT },
            { label: "CInMED: maximum prices of medicines (in Montenegrin)", url: CINMED_PRICES },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "Barriers of organized cervical cancer screening in Albania and Montenegro (BMC Public Health, 2025)", url: PAPER_CERVIX_BARRIERS },
      cards: [
        {
          id: "screening-bowel",
          title: "Bowel screening since 2013, by a stool test every two years from age 50 to 74",
          plain:
            "Montenegro adopted a national programme for early detection of bowel cancer in 2011 and began screening on 1 June 2013. Men and women aged 50 to 74 are offered a stool test for hidden blood every two years, with colonoscopy if it is positive. Screening paused during the pandemic.",
          detail:
            "A 2024 paper by authors from the Institute of Public Health and the Clinical Centre describes the programme: adopted in 2011 with a goal of cutting bowel cancer deaths by at least 15% within five years of starting, launched on 1 June 2013, aimed at everyone aged 50 to 74, using an immunochemical faecal occult blood test in two-year cycles. The same paper finds that bowel cancer death rates rose by an average of 2.6% a year from 1990 to 2018 and that the 15% goal had not been met, and it quotes an unpublished Institute report giving a response to the screening call of between 70.9% and 81.8% in each year from 2013 to 2019. A separate roadmap paper says the programme was rolled out between 2013 and 2019 by gradually inviting more of the target population, and names three barriers: too little colonoscopy capacity in the north of the country, inadequate information systems and inadequate public promotion.",
          links: [
            { label: "Colorectal cancer mortality trend analysis in Montenegro from 1990 to 2018 (Medicine, 2024)", url: PAPER_CRC },
            { label: "Roadmap to improve the organized cancer screening programs: colorectal cancer screening in Montenegro (J Cancer Policy, 2024)", url: PAPER_CRC_ROADMAP },
          ],
        },
        {
          id: "screening-cervical",
          title: "Cervical screening by HPV test every five years, nationwide since 2018",
          plain:
            "Cervical screening began in Podgorica in July 2016 and went nationwide on 1 February 2018. Women registered with a gynaecologist at a health centre are tested for HPV, with a further cell test if the result is positive, and are called again after five years. A 2025 paper gives the target ages as 30 to 50.",
          detail:
            "A 2025 paper co-written by staff of the Institute of Public Health says the organised programme started on 18 July 2016 as a pilot in Podgorica for women aged 30 to 34, has run nationally since 1 February 2018 among insured women registered with a gynaecologist, targets women aged 30 to 50 with the aim of extending to 30 to 64, uses a molecular HPV test with liquid-based cytology as triage, and has had no published evaluation. The barriers it names are outdated contact details and overloaded nurses making invitations, no dedicated screening registry, two data systems that are not linked, and no up-to-date long-term strategy for prevention and early detection. A second paper reports a two-year suspension during the pandemic, and WHO says the Ministry decided to resume cervical screening in late 2022. IARC estimates 69 cervical cancers and 34 deaths in 2024, an age-standardised incidence of 15.8 per 100,000. WHO's 2020 profile recorded participation of between 10% and 50% in 2019.",
          links: [
            { label: "Barriers of organized cervical cancer screening in Albania and Montenegro (BMC Public Health, 2025)", url: PAPER_CERVIX_BARRIERS },
            { label: "Cervical cancer mortality trend in Montenegro, 1990 to 2018 (Eur J Public Health, 2025)", url: PAPER_CERVIX_TREND },
            { label: "WHO: Introducing HPV vaccines for a cervical-cancer free generation in Montenegro", url: WHO_HPV_STORY },
            { label: "WHO: Cancer Country Profile 2020, Montenegro (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "screening-breast",
          title: "Breast screening: a programme is recorded from age 50, but OnCo could not read its details",
          plain:
            "WHO's 2020 country profile records that Montenegro had a breast cancer screening programme in 2019 with a starting age of 50. OnCo could not read the programme's own description, its upper age limit, how women are invited or how many take part, so those are not stated here.",
          detail:
            "WHO's Cancer Country Profile 2020 lists a breast cancer screening programme as present in 2019 with a starting age of 50, and early detection programmes or guidelines for three of the four cancers it asks about (breast, cervix, colon and childhood), without saying which three. The Ministry of Health's 2011 draft cancer control programme plans screening as one of its areas of action. The pages of the Institute of Public Health, which a 2025 paper names as coordinator of the cervical programme, need a browser and returned no text, so the interval, the age range, the number of mammography sites and the uptake of breast screening were not read from a national source. IARC estimates 493 breast cancers and 166 deaths in 2024; a 2022 paper found breast cancer death rates rose by an average of 1.44% a year from 1990 to 2018 and called for higher screening coverage.",
          links: [
            { label: "WHO: Cancer Country Profile 2020, Montenegro (PDF)", url: WHO_PROFILE },
            { label: "Trend of breast cancer mortality in Montenegro, 1990 to 2018 (Eur Rev Med Pharmacol Sci, 2022)", url: "https://doi.org/10.26355/eurrev_202206_28952" },
            { label: "Institut za javno zdravlje Crne Gore (needs a browser)", url: IJZ },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination began in September 2022; WHO's 2025 figure is 27% of girls",
          plain:
            "Montenegro began vaccinating 9-year-old girls against HPV on 26 September 2022 and widened the programme to ages 9 to 14 in February 2023. In a statement of 4 March 2026 the Ministry of Health said the vaccine is free at health centres and recommended for girls and boys aged 9 to 26. WHO's data put programme coverage in 2025 at 27% of girls and 8% of boys.",
          detail:
            "WHO's account says the 9-valent vaccine was rolled out on 26 September 2022 for 9-year-old girls after a launch planned for 2020 was delayed by the pandemic, and that 654 doses had been given by mid-November 2022, 13.07% of the target group. A 2024 paper using the Institute of Public Health's immunisation registry reports that the programme was extended to ages 9 to 14 in February 2023 and that 22.1% of girls aged 9 to 14 had at least one dose after a year, with the highest uptake in Cetinje (39%) and Berane (36.4%). WHO's immunisation data give first-dose programme coverage among girls of 29% in 2022 (1,056 doses for a target of 3,696), 18% in 2023 (3,991 of 22,340), 5% in 2024 (984 of 19,199) and 27% in 2025 (5,065 of 18,870), and among boys 5% in 2024 and 8% in 2025. The target group changed between 2022 and 2023, so the percentages are not a like-for-like trend. A Ministry of Health statement of 4 March 2026, as carried by the Medical CG portal, says the vaccine is recommended for girls and boys aged 9 to 26, with ages 9 to 14 the primary target, and lists HPV vaccination among the free preventive programmes available at health centres.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Montenegro (data API)", url: WHO_HPV_API },
            { label: "WHO: Introducing HPV vaccines for a cervical-cancer free generation in Montenegro", url: WHO_HPV_STORY },
            { label: "First year of HPV immunisation in Serbia and Montenegro (Vaccines, 2024)", url: PAPER_HPV },
            { label: "Medical CG: Ministry of Health statement for HPV awareness day, 4 March 2026 (in Montenegrin)", url: MOH_HPV_2026 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Montenegro does differently",
      cards: [
        {
          id: "centres",
          title: "The Institute of Oncology is at the Clinical Centre in Podgorica; two other hospitals have cancer boards",
          plain:
            "The Clinical Centre of Montenegro in Podgorica has an Institute of Oncology with clinics for cancer medicines and for radiotherapy, a day hospital that prepares chemotherapy centrally, and a nuclear medicine centre. The medicines list also names specialist boards at the Brezovik special hospital and at Bijelo Polje general hospital.",
          detail:
            "The Clinical Centre's page for its Institut za onkologiju lists a Clinic for Medical Oncology, a Centre for Radiotherapy, a Clinic for Radiation Oncology with a ward that includes a semi-intensive unit, a day hospital with central preparation of cytotoxic medicines and laboratory diagnostics, a department for external beam radiotherapy, a brachytherapy department and a Centre for Nuclear Medicine. The legend of the Fund's medicines list of October 2026 names three places whose boards of specialists can propose restricted medicines: the Clinical Centre, the Brezovik special hospital and the oncologists' board of Bijelo Polje general hospital, and one indication note refers to Bijelo Polje's \"Onkološka DB\", which OnCo reads as its oncology day hospital. CInMED's trial register gives Brezovik's full name as the special hospital for lung diseases, at Nikšić. WHO's 2020 profile recorded bone marrow transplantation and home-based palliative care as generally not available in 2019; OnCo has not read a newer source on either.",
          links: [
            { label: "Klinički centar Crne Gore: Institute of Oncology (in Montenegrin)", url: KCCG_ONCOLOGY },
            { label: "FZOCG: list of medicines, October 2026, legend (PDF, in Montenegrin)", url: FZO_LIST_OCT },
            { label: "WHO: Cancer Country Profile 2020, Montenegro (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "radiotherapy",
          title: "One radiotherapy centre, with four megavoltage units in IAEA's directory",
          plain:
            "IAEA's directory of radiotherapy centres lists one centre in Montenegro. Its country row counts four megavoltage photon and electron beam units, with the data marked as updated in 2026, and its brachytherapy fields disagree with each other. The row does not name the centre; the Clinical Centre of Montenegro in Podgorica lists a Centre for Radiotherapy with a brachytherapy department.",
          detail:
            "The DIRAC country row, read on 16 November 2026, gives RTCenters 1, HePhotonAndElectronBeamRt 4 (the directory's count of megavoltage photon and electron beam units) and BrachyTherapyIncEl 1 while the separate field BrachyTherapy reads \"No\", with LastUpdate 2026; the row's separate machine-type fields are all zero, so OnCo does not say how many of the four are linear accelerators. The directory's public summary does not name the centre. The Ministry of Health's 2011 draft programme says radiotherapy was then given at one place, the Clinic for Oncology and Radiotherapy of the Clinical Centre in Podgorica, and the Clinical Centre's page today lists a Centre for Radiotherapy with external beam and brachytherapy departments. WHO's 2020 profile recorded 8.5 external beam units per 10,000 cancer patients in 2019 and no PET or PET/CT scanner in 2020. A Ministry of Health news item dated 18 July 2025 is headed, in translation, \"Montenegro has received the most modern linear accelerator for the treatment of malignant diseases\"; OnCo saw the headline in an archived copy of the Ministry's page but could not open the article.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "Klinički centar Crne Gore: Institute of Oncology (in Montenegrin)", url: KCCG_ONCOLOGY },
            { label: "Ministry of Health: National Cancer Control Programme, draft of July 2011, section 4.3.2 (PDF, in Montenegrin, ICCP portal)", url: NCCP_2011 },
            { label: "Ministry of Health of Montenegro: home page, with the July 2025 headline (Internet Archive copy of 13 July 2026)", url: "https://web.archive.org/web/20260713102219/https://www.gov.me/mzd" },
          ],
        },
        {
          id: "plan",
          title: "The cancer plan OnCo could read is a 2011 draft that looked ahead to 2020",
          plain:
            "The Ministry of Health wrote a National Cancer Control Programme in 2011, which said its parts should be fully in place by 2020. OnCo found no newer national cancer plan. A 2025 paper co-written by the Institute of Public Health says the country lacks an up-to-date long-term strategy for preventing and detecting cervical cancer early.",
          detail:
            "The document, marked as a proposal and dated July 2011, says the Minister of Health appointed a National Commission for the control of malignant diseases in September 2010 to support the programme. Its stated goals are fewer new cancers, fewer cancer deaths especially under age 65, better early detection, better diagnosis and treatment, better quality of life for patients and families, an adequate standard of services at every level of care, and better conditions for research. It covers prevention, screening, imaging, pathology, surgery, radiotherapy, systemic treatment, palliative care, rehabilitation and a cancer registry. WHO's 2020 profile recorded a national cancer control plan as operational in 2019 and palliative care as not included in the integrated plan for non-communicable diseases. OnCo could not confirm from a source it read whether the 2011 text was adopted unchanged or what has replaced it: the copy held by the Institute of Public Health refused a plain request and the Ministry's site did not answer.",
          links: [
            { label: "Ministry of Health: National Cancer Control Programme, draft of July 2011 (PDF, in Montenegrin, ICCP portal)", url: NCCP_2011 },
            { label: "Barriers of organized cervical cancer screening in Albania and Montenegro (BMC Public Health, 2025)", url: PAPER_CERVIX_BARRIERS },
            { label: "WHO: Cancer Country Profile 2020, Montenegro (PDF)", url: WHO_PROFILE },
          ],
        },
        {
          id: "abroad",
          title: "The Fund can send a patient abroad for care that Montenegro cannot provide",
          plain:
            "If a test or treatment cannot be provided in Montenegro, the Health Insurance Fund can approve it abroad. The request needs a proposal from the relevant board of specialists at the Clinical Centre and from its board for treatment abroad, and the patient must travel within 90 days of the referral.",
          detail:
            "The Fund's page says treatment abroad may be approved, within the insured person's rights, where there is a prospect of successful treatment, and that it covers specialist examinations, diagnostic procedures, outpatient and hospital treatment, searches of international organ and tissue registers, transplantation, and sending tissue samples and genetic material for analysis, where these cannot be provided in Montenegro. The procedure starts at the request of the insured person or the treating institution and rests on the Law on Compulsory Health Insurance and a 2017 rulebook. The request goes with the proposal of the Clinical Centre's specialist board and of its board for treatment abroad (for children, the board of the Institute for Children's Diseases) and is considered by a first-instance medical commission at a regional branch or by the Fund's Commission for treatment abroad. The Fund also publishes its contracts with health institutions outside Montenegro. OnCo has not read how many cancer patients are sent abroad each year.",
          links: [
            { label: "FZOCG: insured persons, section on referral for treatment abroad (in Montenegrin)", url: FZO_INSURED },
            { label: "FZOCG: contracts with health institutions outside Montenegro (in Montenegrin)", url: "https://fzocg.me/zdravstvene-usluge-sa-ustanovama-u-inostranstvu/" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Montenegro", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "No trial in OnCo's records has a site in Montenegro; the national register lists few",
          plain:
            "None of the trials in OnCo's records lists a site in Montenegro. ClinicalTrials.gov lists five cancer studies that have had one, none of them recruiting. The medicines institute's own register of approved trials has 29 entries across all diseases, two of them ongoing and neither in cancer.",
          detail:
            "OnCo holds a selection of trials, not the whole registry, and its ClinicalTrials.gov captures list no site in Montenegro. A search of ClinicalTrials.gov on 16 November 2026 for cancer studies with a location in Montenegro returned five: the phase 3 IMpassion132 trial of atezolizumab with chemotherapy in early relapsing triple-negative breast cancer (NCT03371017, completed), the phase 3 SPEAR trial of picoplatin in small-cell lung cancer (NCT00465491), an extension study of degarelix (NCT00268892, completed), a trial of zoledronic acid to prevent bone metastases (NCT00294437, terminated) and an observational study of bevacizumab (NCT01830647, completed). CInMED authorises clinical trials of medicines and publishes a register of those it has approved; the version updated on 6 July 2026 lists 29 entries, 27 marked completed and 2 ongoing. Its cancer entries include a phase 2 trial of INCB099280 in advanced squamous cell skin cancer at the Institute of Oncology and the atezolizumab trial above, both completed. CInMED says developing the infrastructure for trials in Montenegro is part of its policy.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Montenegro", url: CTGOV },
            { label: "CInMED: register of approved clinical trials, updated 6 July 2026 (PDF, in Montenegrin)", url: CINMED_REGISTER },
            { label: "CInMED: clinical trials of medicines (in Montenegrin)", url: CINMED_TRIALS },
            { label: "IMpassion132 (NCT03371017)", url: "https://clinicaltrials.gov/study/NCT03371017" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-registry",
      title: "No registry report, survival figure or stage at diagnosis could be read",
      plain:
        "OnCo could not read any report from Montenegro's registry of malignant neoplasms, so this page has no national count of new cancers by year, no survival figures and nothing on how early cancers are found. The single registry number quoted, 2,925 new cases, comes from a 2018 statement that does not name its year.",
      detail:
        "The Institute of Public Health's site (ijzcg.me) is an application that runs in a browser: a plain request on 16 November 2026 returned a page shell with no content, and the Internet Archive's copy of 6 November 2026 is the same shell. OnCo did not use a headless browser. The Institute's file store, which a 2024 paper cites for the cancer control and bowel screening programmes, answered 403 for the programme document. IARC's 2024 fact sheet lists no national incidence data, and its five-year prevalence is computed from Nordic ratios scaled by the Human Development Index. No source read today gave five-year survival, stage at diagnosis or waiting times for Montenegro.",
      links: [
        { label: "Institut za javno zdravlje Crne Gore (needs a browser)", url: IJZ },
        { label: "IARC: GLOBOCAN 2024 fact sheet, Montenegro (PDF)", url: IARC_FACTSHEET },
      ],
    },
    {
      id: "gap-sources",
      title: "Other sources not read for this page",
      plain:
        "The Ministry of Health's site did not answer, so OnCo read no current national cancer plan, no Ministry page on screening and not the 2025 article on a new linear accelerator. Breast screening details, co-payment rules outside the medicines list, palliative care and the cancer workforce were not found in a source OnCo could read.",
      detail:
        "gov.me/mzd and one of its articles each timed out on 16 November 2026; the Internet Archive holds the Ministry's home page (13 July 2026) but not the linear accelerator article. The two statements quoted from the Medical CG portal are republications, not the originals, and the 2018 one names its source only as \"the Institute\". WHO's 2020 profile does not state where its 2018 case and death figures come from. Two papers (the bowel screening roadmap and the breast cancer mortality trend) were read as abstracts only, because their full text is not open access. The Law on Compulsory Health Insurance and the rulebook on co-payments were not read, so this page does not say what a patient pays for a hospital stay or a scan. The 3 MB medicines list was read for the rows quoted and its legend, not audited medicine by medicine. WHO's 2020 profile is the newest source read for palliative care, transplantation and scanners, and its data are from 2019 and 2020. The count of trials on CInMED's register was made from the PDF's status column.",
      links: [
        { label: "Ministry of Health of Montenegro", url: MOH },
        { label: "FZOCG: legal framework (in Montenegrin)", url: "https://fzocg.me/pravna-regulativa/" },
        { label: "WHO: Cancer Country Profile 2020, Montenegro (PDF)", url: WHO_PROFILE },
      ],
    },
  ],
  institutions: [
    "clinical-centre-of-montenegro",
    "institute-of-public-health-montenegro",
    "health-insurance-fund-montenegro",
    "cinmed-montenegro",
    "ministry-of-health-montenegro",
    "special-hospital-brezovik",
  ],
  companies: [],
  drugs: ["pembrolizumab", "nivolumab", "osimertinib", "trastuzumab-deruxtecan", "olaparib"],
  trials: [],
  papers: [],
  people: [],
  how:
    "Every card was written from sources read as raw text on 16 November 2026: IARC's GLOBOCAN 2024 fact sheet, WHO's 2020 cancer country profile, the Health Insurance Fund's pages and its medicines list of October 2026, the medicines institute CInMED's pages and trial register, the Clinical Centre of Montenegro's oncology page, the Ministry of Health's 2011 draft cancer control programme, WHO's account of the HPV vaccine launch, six papers read through Europe PMC (four in full text, two as abstracts), two statements carried by the Medical CG portal, IAEA's DIRAC directory, WHO's immunisation data, the World Bank and ClinicalTrials.gov. Montenegrin sources were read in Montenegrin.",
  verify:
    "The medicines list is revised several times a year and each restricted medicine depends on a specialist board's opinion; check the Fund's current list and ask the treating team before relying on a row quoted here. IARC's case figures for Montenegro are modelled, and the registry's own reports were not read.",
  verifyLinks: [
    { label: "FZOCG: lists of medicines by year", url: FZO_LIST_PAGE },
    { label: "CInMED: database of medicines for human use", url: "https://cinmed.me/registar-humanih-lijekova/" },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Montenegro (PDF)", url: IARC_FACTSHEET },
    { label: "Institut za javno zdravlje Crne Gore (needs a browser)", url: IJZ },
  ],
};

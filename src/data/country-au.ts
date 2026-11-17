import type { CountryDive } from "@/data/country-dive";

/**
 * Australia deep dive: the hand-written cards for /countries/au/. Read on 2026-11-03 from Australian primary sources.
 *
 * Several Australian Government sites refused automated requests that day: aihw.gov.au sits behind a browser
 * challenge, and health.gov.au, tga.gov.au and canceraustralia.gov.au dropped the connection. Their pages were read
 * from the Internet Archive's dated copies of the same URL, and each link below that depends on one says so and gives
 * the capture date. pbs.gov.au, cancer.org.au, the trial groups' sites and PubMed were read directly. Every figure
 * was checked against the raw page text or PDF, not a summary of it.
 *
 * Counting conventions worth holding in mind:
 *  - AIHW incidence is actual to the latest year in the Australian Cancer Database (2020 in the 2024 edition) and
 *    projected after that; mortality is actual to 2022 in the same edition and projected for 2023 and 2024.
 *  - AIHW age-standardised rates use the Australian population of the report year, GLOBOCAN uses the World standard.
 *  - Both exclude basal and squamous cell carcinoma of the skin, which Australian registries do not collect.
 */
const ARCH = "https://web.archive.org/web";
const AIHW_OVERVIEW = `${ARCH}/20241026023444/https://www.aihw.gov.au/reports/cancer/cancer-data-in-australia/contents/overview`;
const AIHW_ABOUT = `${ARCH}/20241022124819/https://www.aihw.gov.au/reports/cancer/cancer-data-in-australia/contents/about`;
const AIHW_METHODS = `${ARCH}/20240625161112/https://www.aihw.gov.au/reports/cancer/cancer-data-in-australia/contents/technical-notes/methods`;
const AIHW_LIVE = "https://www.aihw.gov.au/reports/cancer/cancer-data-in-australia";
const NEWSGP_2025 = "https://www1.racgp.org.au/newsgp/clinical/long-term-cancer-survival-rates-on-the-rise-aihw";
const CC_FACTS = "https://www.cancer.org.au/cancer-information/what-is-cancer/facts-and-figures";
const PBS_ABOUT = "https://www.pbs.gov.au/info/about-the-pbs";
const PBS_ABOUT_ARCH = `${ARCH}/20260514081454/https://www.pbs.gov.au/info/about-the-pbs`;
const PBS_FEES = "https://www.pbs.gov.au/info/healthpro/explanatory-notes/front/fee";
const PBAC = "https://www.pbs.gov.au/industry/listing/participants/pbac";
const PBAC_MEETINGS = "https://www.pbs.gov.au/industry/pbac";
const MED_COSTS = `${ARCH}/20260612083539/https://www.health.gov.au/topics/medicare/about/costs`;
const MED_SAFETY = `${ARCH}/20260827063318/https://www.health.gov.au/topics/medicare/about/safety-nets`;
const MED_COVERS = `${ARCH}/20261010084337/https://www.health.gov.au/topics/medicare/about/what-medicare-covers`;
const HTA_REVIEW = `${ARCH}/20260515052708/https://www.health.gov.au/our-work/hta-review`;
const HTA_ABOUT = `${ARCH}/2026/https://www.health.gov.au/our-work/hta-review/about`;
const HTA_TOR = `${ARCH}/20260513034834/https://www.health.gov.au/sites/default/files/2023-03/health-technology-assessment-policy-and-methods-review-terms-of-reference.pdf`;
const HTA_PAPERS = `${ARCH}/2026/https://www.health.gov.au/our-work/hta-review/review-analysis-papers`;
const LSDP = `${ARCH}/20260617130626/https://www.health.gov.au/our-work/life-saving-drugs-program`;
const TGA_PERF_2324 = "https://www.tga.gov.au/sites/default/files/2025-03/tga-performance-report-2023-24.pdf";
const TGA_PERF_2425 = "https://www.tga.gov.au/resources/publication/corporate-reports/therapeutic-goods-administration-performance-report-2024-25";
const TGA_FAST = `${ARCH}/20250904025404/https://www.tga.gov.au/how-we-regulate/supply-therapeutic-good/supply-prescription-medicine/application-process-prescription-medicines/fast-track-approval-pathways`;
const TGA_PROV = `${ARCH}/20251008005948/https://www.tga.gov.au/how-we-regulate/supply-therapeutic-good/supply-prescription-medicine/application-process-prescription-medicines/apply-prescription-medicine-provisional-registration-pathway`;
const TGA_COR = `${ARCH}/20250902044814/https://www.tga.gov.au/how-we-regulate/supply-therapeutic-good/supply-prescription-medicine/application-process-prescription-medicines/comparable-overseas-regulators/comparable-overseas-regulators-cors-timeframes-and-milestones`;
const TGA_COR_LIST = `${ARCH}/20250830154701/https://www.tga.gov.au/products/medicines/prescription-medicines/list-countries-and-jurisdictions-determined-be-comparable-overseas-regulators-cors`;
const TGA_ORBIS = `${ARCH}/20260218100128/https://www.tga.gov.au/about-us/international-engagements/project-orbis`;
const TGA_ACCESS = `${ARCH}/20261020182410/https://www.tga.gov.au/about-us/international-engagements/australia-canada-singapore-switzerland-united-kingdom-access-consortium`;
const NLCSP_ABOUT = `${ARCH}/20261023103033/https://www.health.gov.au/our-work/nlcsp/about`;
const NLCSP_HOW = `${ARCH}/20260917041102/https://www.health.gov.au/our-work/nlcsp/how-it-works`;
const NBCSP = `${ARCH}/20261022144254/https://www.health.gov.au/our-work/national-bowel-cancer-screening-program`;
const NCSP = `${ARCH}/20261004034340/https://www.health.gov.au/our-work/national-cervical-screening-program`;
const BREASTSCREEN = `${ARCH}/20260822173657/https://www.health.gov.au/our-work/breastscreen-australia-program`;
const ELIMINATION = `${ARCH}/20260518025524/https://www.health.gov.au/resources/publications/national-strategy-for-the-elimination-of-cervical-cancer-in-australia`;
const HPV_NIP = `${ARCH}/20260517122206/https://www.health.gov.au/topics/immunisation/vaccines/human-papillomavirus-hpv-immunisation-service`;
const CA_ABOUT = `${ARCH}/20260713220314/https://www.canceraustralia.gov.au/about-us`;
const CA_PLAN = `${ARCH}/20261012222028/https://www.canceraustralia.gov.au/australian-cancer-plan`;
const OCP = "https://www.cancer.org.au/health-professionals/optimal-cancer-care-pathways";

export const AU_DIVE: CountryDive = {
  iso2: "AU",
  iso3: "AUS",
  name: "Australia",
  flag: "🇦🇺",
  asOf: "2026-11-03",
  title: "Cancer in Australia",
  description:
    "Cancer in Australia, read from Australian sources: the AIHW's registry figures and how they are projected, what Medicare and the PBS leave a patient to pay in 2026, how the PBAC decides and the TGA approves, the four national screening programmes including lung screening from July 2025, the plan to eliminate cervical cancer by 2035, and the Australian work behind the HPV vaccine, venetoclax, PSMA theranostics and ctDNA-guided chemotherapy.",
  lede:
    "Australia counts by law every cancer except the commonest skin cancers in each state and territory, pays for most medicines through one national scheme with a fixed co-payment, and has four free national screening programmes, the newest for lung cancer. Its national strategy aims to eliminate cervical cancer by 2035, building on a vaccine whose particles were first made in Brisbane.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimates 224,864 new cancers in Australia and 54,551 deaths for 2024, with an incidence rate of 461.3 per 100,000 on the World standard. That all-cancers total (ICD-10 C00-97) includes GLOBOCAN's separate line of 63,903 non-melanoma skin cancers. Australian registries do not collect basal or squamous cell carcinoma of the skin, so the AIHW's total has no such line; without it GLOBOCAN's figure is 160,961. For the same year the AIHW projected around 169,500 new cancers and around 52,700 deaths, from actual diagnoses to 2020 and actual deaths to 2022, so GLOBOCAN's figure without skin cancer is about 8,500 lower and its deaths about 1,850 higher. The AIHW counted 147,500 cancers from registry data for 2020. The rates cannot be compared at all: the AIHW standardises to the Australian population of the report year, IARC to the World standard, and IARC's rate includes its non-melanoma skin cancer line.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Australia",
      aside: { label: "AIHW: Cancer data in Australia", url: AIHW_LIVE },
      cards: [
        {
          id: "shape",
          title: "About 170,000 diagnoses a year, prostate first, and survival above seven in ten",
          plain: "The national statistics agency, the AIHW, estimated around 169,500 new cancers and around 52,700 cancer deaths in Australia in 2024. Prostate cancer is the commonest, then breast, melanoma, bowel and lung. About 71 in every 100 people diagnosed in 2016-2020 were alive five years later, against 55 in 100 in the early 1990s. These are projections built on the last complete year of registry data, which was 2020.",
          detail: "The AIHW's Cancer data in Australia 2024, released on 15 August 2024, gives around 169,500 cases and around 52,700 deaths for 2024 and five-year relative survival of 71 percent for 2016-2020, up from 55 percent in 1991-1995. Incidence for 2021 to 2024 and mortality for 2023 and 2024 are projections; the latest actual incidence year is 2020, when 147,500 cancers were diagnosed against 148,800 in 2019, the first fall since 1996, coinciding with COVID-19 restrictions and a month's closure of BreastScreen Australia. The age-standardised incidence rate rose from 582 per 100,000 in 2000 to an estimated 624 in 2024 while mortality fell from 255 to an estimated 194, and the AIHW attributes around 86 percent of the rise in case numbers since 2000 to population growth and ageing. Cancer accounts for around 3 in 10 deaths. Incidence is rising in people in their thirties and forties, from 121 to an estimated 141 per 100,000 and from 280 to 323 respectively, driven in the thirties most by colorectal and thyroid cancer and in the forties by thyroid, breast, prostate, colorectal and kidney cancer, while mortality in both groups has fallen. The AIHW's 2025 edition, reported by the Royal Australian College of General Practitioners in October 2025, moved survival to 72 percent for 2017-2021 and estimated around 170,000 new cases for 2025; we could not read that edition directly (see the gaps below).",
          links: [
            { label: "AIHW, Cancer data in Australia 2024: overview (Internet Archive copy, 26 October 2024)", url: AIHW_OVERVIEW },
            { label: "AIHW, Cancer data in Australia 2024: about (Internet Archive copy, 22 October 2024)", url: AIHW_ABOUT },
            { label: "newsGP (RACGP), October 2025: the AIHW's 2025 figures", url: NEWSGP_2025 },
            { label: "Cancer Council Australia: facts and figures", url: CC_FACTS },
          ],
        },
        {
          id: "melanoma",
          title: "Melanoma: very common, and falling in the generation that grew up with Slip Slop Slap",
          plain: "Melanoma is the third most commonly diagnosed cancer in Australia, and Melanoma Institute Australia notes that the country has one of the highest melanoma rates in the world. Rates are still rising in people over 50 but have been falling in people under 40 since the late 1990s, and deaths have fallen since 2013. About 94 in every 100 people diagnosed in 2016-2020 were alive five years later.",
          detail: "The AIHW puts melanoma incidence at 53 per 100,000 in 2000 and an estimated 70 per 100,000 in 2024, 86 in men and 56 in women, with 35 percent on the trunk, 26 percent on the upper limbs and 18 percent on the lower limbs; a quarter of women's melanomas are on the legs against 13 percent of men's. Incidence in people under 40 has been falling since the late 1990s. The AIHW sets that beside the Slip Slop Slap skin cancer awareness campaign, which began in the early 1980s: people now under 40 were born after or around it and, in the AIHW's words, have spent their lives in an environment where skin cancer awareness has been greater. It does not state the campaign as the proven cause. Age-standardised mortality peaked at 8.0 per 100,000 in 2013 and is estimated at 4.9 in 2024, with deaths falling from 1,625 to an estimated 1,340. Five-year relative survival for 2016-2020 was 94 percent, the highest recorded. Melanoma Institute Australia in Sydney is in the institution list below.",
          links: [
            { label: "AIHW, Cancer data in Australia 2024: overview, melanoma of the skin (Internet Archive copy)", url: AIHW_OVERVIEW },
            { label: "Melanoma Institute Australia: about melanoma", url: "https://melanoma.org.au/about-melanoma/" },
          ],
        },
        {
          id: "lung-and-bowel",
          title: "Lung cancer rising in women, bowel cancer falling overall but rising in the young",
          plain: "Lung cancer causes more cancer deaths in Australia than any other, about 8,900 in 2024. Rates have fallen steeply in men and risen in women, so the two are now close. Bowel cancer has fallen more than any other cancer since 2000, but it is becoming more common in people under 50, and free bowel screening now starts at 45.",
          detail: "Lung cancer incidence was stable overall at 57 per 100,000 in 2000 and an estimated 56 in 2024, but that hides a fall from 84 to 61 in men and a rise from 36 to 52 in women. Five-year survival was 26 percent in 2016-2020, the lowest of the five commonest cancers, up from 9.7 percent in men and 12 percent in women in 1991-1995 to 21 and 31 percent. Colorectal cancer was the most diagnosed cancer at the turn of the century and is estimated fourth in 2024, at around 15,500 cases; its age-standardised incidence peaked at 86 per 100,000 in 2001 and is estimated at 57 in 2024, and mortality fell from 35 to an estimated 19 per 100,000. In people aged 40 to 49 incidence rose from 22 per 100,000 in 2005 to an estimated 30 in 2024, and an estimated 6.5 percent of colorectal cancers in 2024 are in people under 40, against 2.2 percent in 2000. Survival for colorectal cancer rose from 56 to 71 percent between 1991-1995 and 2016-2020.",
          links: [
            { label: "AIHW, Cancer data in Australia 2024: overview, lung and colorectal (Internet Archive copy)", url: AIHW_OVERVIEW },
            { label: "National Bowel Cancer Screening Program (Internet Archive copy, 22 October 2026)", url: NBCSP },
          ],
        },
      ],
      tables: [
        {
          id: "aihw-2024",
          title: "The commonest cancers: AIHW estimates for 2024",
          caption: "Projected new cases and deaths in 2024 (both sexes unless stated) and five-year relative survival for 2016-2020, from Cancer data in Australia 2024",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases, 2024 (projected)", numeric: true },
            { key: "deaths", label: "Deaths, 2024 (projected)", numeric: true },
            { key: "survival", label: "5-year relative survival, 2016-2020 (%)", numeric: true },
          ],
          rows: [
            { id: "all", site: "All cancers (excluding basal and squamous cell skin cancer)", cases: 169500, deaths: 52700, survival: 71 },
            { id: "prostate", site: "Prostate", cases: 26400, deaths: 3900, survival: 96 },
            { id: "breast", site: "Breast (women)", cases: 21000, deaths: 3300, survival: 92 },
            { id: "melanoma", site: "Melanoma of the skin", cases: null, deaths: 1340, survival: 94 },
            { id: "colorectal", site: "Colorectal", cases: 15500, deaths: null, survival: 71 },
            { id: "lung", site: "Lung", cases: 15100, deaths: 8900, survival: 26 },
            { id: "blood", site: "All blood cancers combined", cases: 20000, deaths: null, survival: 70 },
            { id: "thyroid", site: "Thyroid", cases: 4300, deaths: 155, survival: null },
          ],
          note: "All figures are the AIHW's rounded estimates as printed in its 2024 overview; incidence after 2020 and deaths after 2022 are projections. Blank cells are figures the overview does not state as a count: for melanoma it gives a rate (an estimated 70 per 100,000), and for thyroid it gives survival by sex only (98 percent in women, 94 in men). The ranking prostate, breast, melanoma, colorectal, lung is Cancer Council Australia's reading of the same report.",
          sources: [
            { label: "AIHW, Cancer data in Australia 2024: overview (Internet Archive copy, 26 October 2024)", url: AIHW_OVERVIEW },
            { label: "AIHW, Cancer data in Australia 2024: about (Internet Archive copy)", url: AIHW_ABOUT },
            { label: "Cancer Council Australia: facts and figures", url: CC_FACTS },
          ],
        },
      ],
    },
    {
      id: "registries",
      nav: "Counting",
      title: "How Australia counts its cancers",
      cards: [
        {
          id: "notifiable",
          title: "Reporting a cancer is a legal duty in every state and territory",
          plain: "In each of Australia's eight states and territories the law requires hospitals and pathology laboratories to report every cancer to a central registry. Once a year each registry sends an agreed set of data to the AIHW in Canberra, which builds the national picture. The one big exception is the commonest skin cancers, basal and squamous cell carcinoma, which are not reported anywhere.",
          detail: "The AIHW's technical notes state that all forms of cancer except basal and squamous cell carcinomas of the skin are notifiable diseases in each state and territory, with legislation in each jurisdiction requiring hospitals, pathology laboratories and other institutions to report every case to the jurisdiction's central cancer registry; an agreed subset of the registries' data goes to the AIHW annually and is compiled into the Australian Cancer Database, which starts in 1982. Deaths come through a separate route, from each state's Registry of Births, Deaths and Marriages and the National Coronial Information System, coded by the Australian Bureau of Statistics and held in the National Mortality Database. The AIHW warns that registry records change as late information arrives, so a year's count can move between editions and may not match a state's own report; one edition explicitly did not estimate late registrations, so its latest year may understate incidence. Because full data take time to assemble, every headline figure for the current year is a projection, and the 2024 edition projected incidence from 2021 onwards. The AIHW also classifies cancers as rare (fewer than 6 cases per 100,000 a year), less common or common; rare and less common cancers together made up an estimated 24 percent of cases but 33 percent of cancer deaths in 2024.",
          links: [
            { label: "AIHW: technical notes, methods (Internet Archive copy, 25 June 2024)", url: AIHW_METHODS },
            { label: "AIHW, Cancer data in Australia 2024: overview, rare cancers (Internet Archive copy)", url: AIHW_OVERVIEW },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Who pays, and what a patient pays",
      aside: { label: "PBS: fees, patient contributions and safety net thresholds", url: PBS_FEES },
      cards: [
        {
          id: "medicare",
          title: "Medicare: free as a public patient, a gap as a private one",
          plain: "Medicare gives Australians free or subsidised health care, funded partly through a levy on income. If you are treated as a public patient in a public hospital, Medicare covers all your medical expenses. Outside hospital, Medicare pays the full schedule fee for a GP and 85 percent for a specialist, and the doctor may charge more, in which case you pay the difference. The health department's advice is to check what you will have to pay when you make the appointment.",
          detail: "The health department's pages state that Medicare covers all medical expenses for a public patient in hospital. A private patient in a public hospital pays for accommodation, theatre and doctors' fees, with Medicare subsidising the doctors' fees; in a private hospital Medicare pays 75 percent of the schedule fee, insurers at least 25 percent, and anything above the schedule fee falls to the patient or the insurer. Outside hospital Medicare pays 100 percent of the schedule fee for a GP and 85 percent for a specialist; when a doctor bulk bills the patient pays nothing, otherwise the patient pays the difference. Three rules limit what a patient pays for out-of-hospital MBS services. The Greatest Permissible Gap, $104.50 from 1 November 2025, is a per-item rule that caps the gap between the schedule fee and the Medicare benefit on any item with a schedule fee of $697.00 or more (the department indexes it each 1 November, and we could not read the amount set from 1 November 2026). Two safety nets then count what accumulates in a calendar year: the Original Medicare Safety Net, which after $594.40 of gap expenses in 2026 lifts the rebate to 100 percent of the schedule fee; and the Extended Medicare Safety Net, which after $2,699.10 of out-of-pocket costs in 2026, or $861.20 for concession card holders and families receiving Family Tax Benefit Part A, covers up to 80 percent of further out-of-pocket costs, subject to caps on some items. None of the safety nets applies to services delivered in hospital.",
          links: [
            { label: "Department of Health: Medicare costs (Internet Archive copy, 12 June 2026)", url: MED_COSTS },
            { label: "Department of Health: Medicare safety nets (Internet Archive copy, 27 August 2026)", url: MED_SAFETY },
            { label: "Department of Health: what Medicare covers (Internet Archive copy, 10 October 2026)", url: MED_COVERS },
          ],
        },
        {
          id: "pbs",
          title: "Medicines: at most $25 a script, or $7.70 with a concession card",
          plain: "Under the Pharmaceutical Benefits Scheme the government subsidises medicines for most medical conditions. From 1 January 2026 a person pays at most $25.00 for most PBS medicines, or $7.70 with a concession card, and the government pays the rest of the cost, apart from brand premiums and some other charges. After $1,748.20 in a year, or $277.20 with a concession card, the safety net makes further PBS medicines cheaper or free. Some medicines that need medical supervision, chemotherapy drugs among them, are available only at specialised medical services, usually hospitals.",
          detail: "The PBS site states that, following a reduction in the general co-payment, from 1 January 2026 a patient may pay up to $25.00 for most PBS medicines or $7.70 with a concession card, with the government paying the remaining cost apart from brand premiums and certain other allowable charges. The general co-payment will be indexed to the Consumer Price Index each January from 2027; the concessional co-payment stays at $7.70 until 2029 and is indexed from 2030. The pharmacist's optional $1.00 discount is being phased out from 2025: in 2026 it is nil for general patients and up to $0.60 for concessional patients. The Safety Net thresholds from 1 January 2026 are $1,748.20 for general patients and $277.20 for concession card holders, applied to the family unit. The scheme began in 1948 as free medicines for pensioners and a list of 139 life-saving and disease-preventing medicines free to everyone, is governed by the National Health Act 1953, and is open to every Australian resident with a Medicare card and to visitors from countries with a reciprocal agreement. Veterans with a DVA Gold or Orange Card get PBS and Repatriation PBS medicines at the concessional rate; a DVA White Card gives the concessional rate for the specific conditions it covers.",
          links: [
            { label: "PBS: fees, patient contributions and safety net thresholds", url: PBS_FEES },
            { label: "PBS: about the PBS", url: PBS_ABOUT },
            { label: "PBS: about the PBS, with the 2026 patient fees and discount rules (Internet Archive copy, 14 May 2026)", url: PBS_ABOUT_ARCH },
          ],
        },
      ],
      tables: [
        {
          id: "out-of-pocket-2026",
          title: "What a patient pays in 2026",
          caption: "Australian dollars; the amounts the Department of Health and the PBS publish for calendar year 2026",
          columns: [
            { key: "item", label: "Item" },
            { key: "general", label: "General patient" },
            { key: "concession", label: "Concession card holder" },
          ],
          rows: [
            { id: "pbs-copay", item: "PBS co-payment, per prescription", general: "$25.00", concession: "$7.70" },
            { id: "pbs-sn", item: "PBS Safety Net threshold, per family a year", general: "$1,748.20", concession: "$277.20" },
            { id: "public-hospital", item: "Treatment as a public patient in a public hospital", general: "Covered by Medicare", concession: "Covered by Medicare" },
            { id: "specialist", item: "Specialist consultation outside hospital", general: "Medicare pays 85% of the schedule fee; doctor may charge more", concession: "Same" },
            { id: "omsn", item: "Original Medicare Safety Net threshold (gap expenses)", general: "$594.40", concession: "$594.40" },
            { id: "emsn", item: "Extended Medicare Safety Net threshold (out-of-pocket costs)", general: "$2,699.10", concession: "$861.20" },
            { id: "gpg", item: "Greatest Permissible Gap (from 1 November 2025; re-indexed each 1 November)", general: "$104.50", concession: "$104.50" },
          ],
          note: "The concession column of the Extended Medicare Safety Net also applies to families receiving Family Tax Benefit Part A. Medicare safety nets apply only to out-of-hospital MBS services. Private health insurance, travel, accommodation and lost income are not in this table.",
          sources: [
            { label: "PBS: fees, patient contributions and safety net thresholds", url: PBS_FEES },
            { label: "Department of Health: Medicare safety nets (Internet Archive copy)", url: MED_SAFETY },
            { label: "Department of Health: Medicare costs (Internet Archive copy)", url: MED_COSTS },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "PBAC",
      title: "How Australia decides what the PBS pays for",
      aside: { label: "PBAC meeting agendas, outcomes and public summary documents", url: PBAC_MEETINGS },
      cards: [
        {
          id: "pbac",
          title: "No new medicine is subsidised without the PBAC's recommendation",
          plain: "The Pharmaceutical Benefits Advisory Committee is an independent expert committee appointed by the government. A new medicine cannot be listed on the PBS unless the committee recommends it, and the committee weighs how well the medicine works, how safe it is and whether it is value for money compared with other treatments. It meets three times a year and publishes a public summary of each decision.",
          detail: "The PBS site describes the PBAC as an independent expert body of doctors, health professionals and others whose primary role is to recommend new medicines for listing; no new medicine can be listed unless the committee makes a positive recommendation, and it also advises on vaccines. In recommending a listing it takes into account the conditions for which the medicine is registered in Australia and its clinical effectiveness, safety and cost-effectiveness ('value for money') compared with other treatments. It meets three times a year, usually in March, July and November, and publishes agendas, outcomes and public summary documents. Two sub-committees support it, the Drug Utilisation Sub-Committee and the Economics Sub-Committee, with a working party. The Chair is Professor Robyn Ward, a medical oncologist and cancer researcher and former Chair of the Medical Services Advisory Committee, the body that supported the lung screening pathway. We found no published cost per quality-adjusted life year above which the PBAC will not recommend a medicine; its reasoning for each decision is in the public summary documents.",
          links: [
            { label: "PBS: PBAC membership and role", url: PBAC },
            { label: "PBS: PBAC meeting agendas, outcomes and public summary documents", url: PBAC_MEETINGS },
            { label: "PBS: procedure guidance for listing medicines", url: "https://www.pbs.gov.au/industry/listing/listing-steps" },
          ],
        },
        {
          id: "hta-review",
          title: "The 2024 review of how Australia assesses health technology",
          plain: "Between 2022 and 2024 a review overseen by a reference committee examined how Australia assesses new medicines and other health technology, with the stated aims of faster access and keeping Australia attractive as a country where companies launch first. Its report was published in September 2024 and the government set up a group to plan its response.",
          detail: "The Health Technology Assessment Policy and Methods Review was a commitment under the 2022-27 Strategic Agreement between the Commonwealth and Medicines Australia, overseen by the HTA Review Reference Committee. Its terms of reference cite the agreement's shared goals of reducing time to access for Australians and maintaining the attractiveness of Australia as a first-launch country. The review started on 27 October 2022; expert papers were commissioned from Adelaide Health Technology Assessment, the Centre for Health Economics Research and Evaluation and the Centre of Research Excellence in Medicines Intelligence. The review concluded on 4 May 2024, the committee's final report went to the Minister on 31 May 2024, and the department released it in September 2024 with a summary and a full recommendations document. The PBAC and MSAC have given the government their initial advice on it, and an Implementation Advisory Group is developing a roadmap for sequencing the government's response.",
          links: [
            { label: "Department of Health: HTA Policy and Methods Review (Internet Archive copy, 15 May 2026)", url: HTA_REVIEW },
            { label: "Department of Health: about the HTA Review (Internet Archive copy)", url: HTA_ABOUT },
            { label: "HTA Review terms of reference (PDF, Internet Archive copy)", url: HTA_TOR },
            { label: "Department of Health: HTA Review research and analysis papers (Internet Archive copy)", url: HTA_PAPERS },
            { label: "PBS news, September 2024: final reports of the HTA Review and the Enhanced Consumer Engagement Process", url: "https://www.pbs.gov.au/news/2024/09/final-reports-hta-policy-and-methods-review-and-enhanced-consumer-engagment" },
          ],
        },
        {
          id: "lsdp",
          title: "The Life Saving Drugs Program: a separate fund for ultra-rare diseases",
          plain: "Australia has a separate fund, the Life Saving Drugs Program, that pays for specific essential medicines for ultra-rare, life-threatening diseases. It is separate from the PBS, which is how most medicines in Australia are subsidised, on the PBAC's recommendation.",
          detail: "The health department describes the Life Saving Drugs Program as paying for specific essential medicines to treat patients with ultra-rare and life-threatening diseases, with its own eligibility criteria, applications by treating physicians and annual reapplication; the outcome statements on its page in mid-2026 concerned medicines such as olipudase alfa for acid sphingomyelinase deficiency. The department's page about the program, in an Internet Archive copy of 12 April 2026, says most medicines in Australia are subsidised through the PBS, that the program's funding is separate, and that it is for medicines that are clinically effective but not cost effective enough for the PBS and treat conditions affecting 1 person in 50,000 or fewer. No new medicine can enter the PBS without a positive PBAC recommendation. We did not find an official national figure for how many Australians pay privately for unsubsidised cancer medicines.",
          links: [
            { label: "Department of Health: Life Saving Drugs Program (Internet Archive copy, 17 June 2026)", url: LSDP },
            { label: "Department of Health: about the Life Saving Drugs Program (Internet Archive copy, 12 April 2026)", url: `${ARCH}/20260412131341/https://www.health.gov.au/our-work/life-saving-drugs-program/about-the-lsdp` },
            { label: "PBS: PBAC membership and role", url: PBAC },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "TGA",
      title: "The Therapeutic Goods Administration",
      aside: { label: "TGA Performance Report 2024-25", url: TGA_PERF_2425 },
      cards: [
        {
          id: "pathways",
          title: "Three ways in: standard, priority and provisional, plus reliance on other regulators",
          plain: "The TGA decides whether a medicine can be sold in Australia; whether the government pays for it is a separate decision by the PBAC. A new medicine usually takes up to about eleven months to review. Priority review aims to finish up to three months sooner, using the same amount of evidence. Provisional approval lets a promising medicine for a serious condition be used up to two years earlier, on early data, while the company finishes its trials.",
          detail: "The legislated timeframe for a new prescription medicine is 255 working days for evaluation and decision, after 40 working days to pass preliminary assessment. The priority review pathway has a target of 150 working days on the same evidence as a standard application, and is reserved for medicines for serious and life-threatening conditions that are a major advance. Provisional registration has the same 255-day legislated timeframe but rests on preliminary clinical data and a plan to collect confirmatory data; it lasts two years, can be extended twice to a maximum of six, and lapses if not converted to full registration. Australia is not part of the European system, but the TGA can rely on a comparable overseas regulator's assessment report: under COR-A, where nothing beyond the Australian label, Product Information and risk management plan needs evaluating, the timeframe is 120 working days; under COR-B, with some additional data, 175. The regulators whose reports it accepts include the European Medicines Agency, the FDA, Health Canada, Japan's PMDA, Singapore's HSA, Swissmedic and the UK's MHRA. The TGA is also a member of the Access Consortium with Canada, Singapore, Switzerland and the United Kingdom, formed in 2007 as ACSS and renamed when the MHRA joined in October 2020, and has been a partner in the FDA's Project Orbis for cancer medicines since May 2019.",
          links: [
            { label: "TGA: fast track approval pathways (Internet Archive copy, 4 September 2025)", url: TGA_FAST },
            { label: "TGA: provisional registration pathway (Internet Archive copy, 8 October 2025)", url: TGA_PROV },
            { label: "TGA: COR timeframes and milestones (Internet Archive copy, 2 September 2025)", url: TGA_COR },
            { label: "TGA: list of comparable overseas regulators (Internet Archive copy, 30 August 2025)", url: TGA_COR_LIST },
          ],
        },
        {
          id: "performance",
          title: "How fast it actually moves: a median of 201 working days for a new medicine",
          plain: "In the year to June 2024 the TGA approved 36 applications for new chemical or biological entities and biosimilars through the standard route, taking a median of 201 working days against a legal limit of 255. Four medicines went through priority review, with a median of 133 working days, and 13 applications of all types were approved through the provisional route.",
          detail: "The TGA Performance Report for July 2023 to June 2024 records, for new chemical entities, new biological entities and biosimilars (application type A), 37 approvals, 3 withdrawals and 2 rejections among completed applications, and approval times for the 36 standard-route approvals of a mean 199 and median 201 working days, range 126 to 254, against the legislated 255; extensions of indication took a median of 197. Four medicines were approved through priority review, one new entity and three extensions of indication, with a median of 133 working days against the 150-day target, down from eight in 2022-23. Six provisional determinations were granted from seven applications, against fifteen from fifteen the year before, and 13 provisional registrations were approved with a median of 180 working days. Seventeen orphan drug registrations were approved, with a median of 175.5 working days, and orphan designation brings a 100 percent waiver of TGA fees. Through Project Orbis the TGA had approved approximately 25 new medicines and 35 new indications by 30 September 2023, well over half of them through the priority or provisional pathway. The report gives these times in what it calls TGA working days and does not give the calendar time from submission to approval. The 2024-25 report was published in 2026, but we could not open its statistical appendix (see the gaps below).",
          links: [
            { label: "TGA Performance Report, July 2023 to June 2024 (PDF)", url: TGA_PERF_2324 },
            { label: "TGA: Project Orbis (Internet Archive copy, 18 February 2026)", url: TGA_ORBIS },
            { label: "TGA: Access Consortium (Internet Archive copy, 20 October 2026)", url: TGA_ACCESS },
          ],
        },
      ],
      tables: [
        {
          id: "tga-2023-24",
          title: "Prescription medicine approvals, July 2023 to June 2024",
          caption: "Approvals and approval time in TGA working days, from the TGA Performance Report 2023-24",
          columns: [
            { key: "route", label: "Route and application type" },
            { key: "approved", label: "Approved", numeric: true },
            { key: "limit", label: "Legislated or target working days", numeric: true },
            { key: "median", label: "Median working days", numeric: true },
          ],
          rows: [
            { id: "std-a", route: "Standard: new chemical or biological entity, biosimilar", approved: 36, limit: 255, median: 201 },
            { id: "std-c", route: "Standard: extension of indication", approved: 37, limit: 255, median: 197 },
            { id: "priority", route: "Priority review: all types", approved: 4, limit: 150, median: 133 },
            { id: "provisional", route: "Provisional registration: all types", approved: 13, limit: 255, median: 180 },
            { id: "cor-a", route: "COR-A: new chemical or biological entity, biosimilar", approved: 2, limit: 120, median: 107 },
            { id: "cor-b", route: "COR-B: new chemical or biological entity, biosimilar", approved: 5, limit: 175, median: 154 },
            { id: "orphan", route: "Orphan drug registrations: all types", approved: 17, limit: null, median: 175.5 },
          ],
          note: "The standard-route rows exclude applications processed through priority review. Orphan registrations are also counted in their own application categories, so the rows overlap. The provisional row's limit is the legislated 255 working days. Times are in TGA working days as the report prints them, not calendar days.",
          sources: [{ label: "TGA Performance Report, July 2023 to June 2024, Appendix tables 1, 3, 5, 6 and 8 (PDF)", url: TGA_PERF_2324 }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Four free national screening programmes",
      cards: [
        {
          id: "lung",
          title: "Lung cancer screening, new from 1 July 2025",
          plain: "Since 1 July 2025 people aged 50 to 70 with no symptoms, who smoke now or quit within the past ten years, and who have a smoking history of at least 30 pack-years, can have a free low-dose CT scan every two years. You do not have to quit smoking to take part, and once you are in the program you can keep screening even if more than ten years pass since you quit. Your GP or Aboriginal health service can check whether you qualify.",
          detail: "The Australian Government announced the National Lung Cancer Screening Program on 2 May 2023 and it launched on 1 July 2025. A pack-year is one pack of 20 cigarettes a day for a year. The pathway, based on Cancer Australia's enquiry and feasibility work and supported by MSAC, sends people with no findings a reminder in two years and brings those with findings back at 12, 6 or 3 months depending on risk, with high-risk findings referred to a respiratory physician linked to a lung cancer multidisciplinary team. The National Cancer Screening Register, expanded to cover lung screening by the National Cancer Screening Register Amendment Act 2024, sends reminders and tells participants what to do next, while the scan results themselves go to the healthcare provider, and radiologists must report screening information to it within 30 days. The department's page, last updated 15 July 2026, schedules the first of five mobile screening trucks run with Heart of Australia for communities in the Kimberley and Pilbara from November 2025, with the trucks for the Northern Territory and Queensland from May and September 2026, and the department names equitable outcomes for Aboriginal and Torres Strait Islander people as a key focus of the program. The department's page estimates the share of lung cancers found at stage 1 to rise from 16 percent without screening to 60 percent with it, and stage 4 to fall from 53 to 11 percent.",
          links: [
            { label: "National Lung Cancer Screening Program: about (Internet Archive copy, 23 October 2026)", url: NLCSP_ABOUT },
            { label: "National Lung Cancer Screening Program: how it works (Internet Archive copy, 17 September 2026)", url: NLCSP_HOW },
          ],
        },
        {
          id: "cervical",
          title: "Cervical screening every five years, a test you can take yourself, and a date for elimination",
          plain: "Women and people with a cervix aged 25 to 74 are invited for an HPV-based Cervical Screening Test every five years and can choose to collect the sample themselves. The HPV vaccine is free in Year 7 as a single dose, with free catch-up to age 26. The national strategy aims to eliminate cervical cancer, meaning fewer than 4 cases per 100,000 women a year, by 2035.",
          detail: "The National Cervical Screening Program, introduced in 1991, moved in December 2017 from two-yearly cytology to primary HPV testing every five years, the kind of screening the Compass trial compares with cytology; updated clinical guidelines took effect in April 2025. One dose of Gardasil 9 is funded under the National Immunisation Program for adolescents aged 12 to 13, mainly through school programmes in Year 7. Australia introduced national HPV vaccination in 2007 and included boys from 2013. The National Strategy for the Elimination of Cervical Cancer in Australia, developed with the Australian Centre for the Prevention of Cervical Cancer, extends the WHO's targets: 90 percent HPV vaccination for boys as well as girls, 70 percent five-yearly screening participation from 25 to 74 rather than twice in a lifetime, 95 percent treatment, and fewer than 4 cases per 100,000 women, with elimination by 2035. A 2019 Lancet Public Health model projected incidence below that threshold around 2028 (range 2021-35). The AIHW records cervical cancer mortality falling from 3.1 per 100,000 women in 2000 to an estimated 1.7 in 2024.",
          links: [
            { label: "National Cervical Screening Program (Internet Archive copy, 4 October 2026)", url: NCSP },
            { label: "National Strategy for the Elimination of Cervical Cancer in Australia (Internet Archive copy, 18 May 2026)", url: ELIMINATION },
            { label: "HPV vaccine under the National Immunisation Program (Internet Archive copy, 17 May 2026)", url: HPV_NIP },
            { label: "Hall et al., The projected timeframe until cervical cancer elimination in Australia (Lancet Public Health 2019)", url: "https://doi.org/10.1016/S2468-2667(18)30183-X" },
          ],
        },
        {
          id: "bowel-breast",
          title: "Bowel screening from 45 at home, breast screening from 40",
          plain: "Australians aged 45 to 74 can do a free bowel screening test at home every two years; kits are posted to eligible people, and people aged 45 to 49 can ask for their first one. Women over 40 can have a free mammogram every two years through BreastScreen Australia, which actively invites women aged 50 to 74.",
          detail: "The National Bowel Cancer Screening Program's home test looks for invisible traces of blood in two small samples from two separate bowel motions, posted back free; a positive result means traces of blood were found, which can have causes other than cancer, and needs a visit to the doctor to investigate. From 1 July 2024 people aged 45 to 49 can join and screen free by requesting a kit online or by phone, and GPs can bulk-order kits to hand to eligible patients. The department states that more than 90 percent of bowel cancers can be treated successfully if found early. BreastScreen Australia is a joint programme of the Australian and state and territory governments; the AIHW notes that much of the rise in breast cancer incidence since 2000 came around 2013, when screening invitations were extended to women aged 70 to 74.",
          links: [
            { label: "National Bowel Cancer Screening Program (Internet Archive copy, 22 October 2026)", url: NBCSP },
            { label: "BreastScreen Australia Program (Internet Archive copy, 22 August 2026)", url: BREASTSCREEN },
          ],
        },
      ],
      tables: [
        {
          id: "screening-programmes",
          title: "The national cancer screening programmes",
          caption: "Who is eligible, the test and the interval, from the Department of Health's programme pages in 2026",
          columns: [
            { key: "programme", label: "Programme" },
            { key: "who", label: "Who" },
            { key: "test", label: "Test" },
            { key: "interval", label: "Interval" },
          ],
          rows: [
            { id: "bowel", programme: "National Bowel Cancer Screening Program", who: "Aged 45 to 74 (45 to 49 request their first kit)", test: "Home test for hidden blood in two stool samples", interval: "Every 2 years" },
            { id: "breast", programme: "BreastScreen Australia", who: "Women over 40; women 50 to 74 actively invited", test: "Mammogram", interval: "Every 2 years" },
            { id: "cervical", programme: "National Cervical Screening Program", who: "Women and people with a cervix aged 25 to 74", test: "HPV-based Cervical Screening Test, clinician- or self-collected", interval: "Every 5 years" },
            { id: "lung", programme: "National Lung Cancer Screening Program (from 1 July 2025)", who: "Aged 50 to 70, no symptoms, smoking now or quit within the past 10 years, at least 30 pack-years of cigarette smoking", test: "Low-dose CT scan", interval: "Every 2 years if no findings" },
          ],
          note: "All four are free. Participation rates are published separately by the AIHW and the National Cancer Screening Register and are not reproduced here because we could not read the current reports (see the gaps below).",
          sources: [
            { label: "National Bowel Cancer Screening Program (Internet Archive copy)", url: NBCSP },
            { label: "BreastScreen Australia Program (Internet Archive copy)", url: BREASTSCREEN },
            { label: "National Cervical Screening Program (Internet Archive copy)", url: NCSP },
            { label: "National Lung Cancer Screening Program: how it works (Internet Archive copy)", url: NLCSP_HOW },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Distinctive",
      title: "What Australia does that others do not",
      cards: [
        {
          id: "hpv-vaccine",
          title: "The HPV vaccine started in Brisbane",
          plain: "In 1991 Jian Zhou and Ian Frazer, working at a hospital laboratory in Brisbane, made empty shells of the HPV16 virus in cells. Those virus-like particles, which look like the virus to the immune system but carry none of its DNA, are what HPV vaccines are made of. Australia was among the first countries to vaccinate nationally and is now aiming to eliminate cervical cancer.",
          detail: "Zhou, Frazer and colleagues at the Lions Human Immunology Laboratory at the Princess Alexandra Hospital used a recombinant vaccinia virus to express the HPV16 capsid genes L1 and L2 together in epithelial cells and obtained 40-nanometre virus-like particles in the cell nucleus, which neither protein produced alone; they wrote that particles made this way could be a safe source of material for a vaccine. The licensed vaccines use particles made from L1 alone, a step to which several laboratories contributed, including Douglas Lowy and John Schiller's at the US National Cancer Institute, which reported in 1992 that L1 by itself assembles into highly immunogenic virus-like particles. Jian Zhou died in 1999, before the vaccine was licensed. The University of Queensland's Frazer Institute carries the name. Gardasil 9, the vaccine now given in Australian schools, is in the medicine list on this page as a descendant of that technology rather than an Australian product.",
          links: [
            { label: "Zhou et al., virus-like particles of HPV16 (Virology 1991)", url: "https://doi.org/10.1016/0042-6822(91)90772-4" },
            { label: "Kirnbauer, Lowy, Schiller et al., L1 self-assembles into virus-like particles (PNAS 1992)", url: "https://doi.org/10.1073/pnas.89.24.12180" },
            { label: "Zhao et al., Dr. Jian Zhou (Protein & Cell 2017)", url: "https://doi.org/10.1007/s13238-016-0358-2" },
            { label: "HPV vaccine under the National Immunisation Program (Internet Archive copy)", url: HPV_NIP },
          ],
        },
        {
          id: "venetoclax",
          title: "Venetoclax: a Melbourne discovery turned into a leukaemia medicine",
          plain: "Venetoclax, a treatment for chronic lymphocytic leukaemia that is also used in acute myeloid leukaemia, works by blocking a protein called BCL-2 that helps leukaemia cells survive. That role of BCL-2 was discovered at the Walter and Eliza Hall Institute in Melbourne in the late 1980s, and the first human study of the drug was led from Melbourne.",
          detail: "The Walter and Eliza Hall Institute describes venetoclax as based on its discovery in the late 1980s that BCL-2 helps leukaemia cells live, and the drug as developed through a research collaboration between AbbVie, Genentech and the Institute, with clinicians at the Royal Melbourne Hospital and Peter MacCallum Cancer Centre. The first-in-human study, published in the New England Journal of Medicine in 2016 with Andrew Roberts as first author and John Seymour as senior author, treated 116 people with relapsed CLL or small lymphocytic lymphoma: 79 percent responded, 20 percent had complete remission, and a weekly dose ramp-up removed clinical tumour lysis syndrome in the expansion cohort after it had occurred in 3 of 56 patients, one fatally, during dose escalation. Venetoclax with rituximab was listed on the PBS for previously treated CLL from 1 March 2019.",
          links: [
            { label: "WEHI: venetoclax listed on the PBS", url: "https://www.wehi.edu.au/news/anti-cancer-treatment-venetoclax-listed-australian-pbs/" },
            { label: "Roberts et al., Targeting BCL2 with venetoclax in relapsed CLL (NEJM 2016)", url: "https://doi.org/10.1056/NEJMoa1513257" },
          ],
        },
        {
          id: "theranostics",
          title: "PSMA theranostics: Australian trials that changed how prostate cancer is imaged and treated",
          plain: "Two Australian randomised trials run by Peter MacCallum Cancer Centre and the ANZUP trials group helped make PSMA PET scans and PSMA-targeted radioactive treatment part of prostate cancer care. proPSMA showed a PSMA PET scan was more accurate than CT and bone scans for staging. TheraP compared the radioactive treatment lutetium-PSMA with chemotherapy.",
          detail: "proPSMA randomised 302 men at ten Australian hospitals with biopsy-proven, high-risk prostate cancer to conventional imaging or PSMA PET-CT: accuracy was 92 percent against 65 percent, PSMA PET changed management more often (28 against 15 percent), had fewer equivocal results, and gave a lower radiation dose (8.4 against 19.2 mSv). TheraP randomised 200 men at 11 Australian centres with metastatic castration-resistant prostate cancer, for whom cabazitaxel was the next standard treatment, to lutetium-177 PSMA-617 or cabazitaxel: PSA response by intention to treat was 66 against 37 percent, and grade 3 or 4 adverse events occurred in 33 against 53 percent of men treated. Australia also has a radiopharmaceutical industry, among them Telix, Clarity and the national nuclear organisation ANSTO, in the company list below.",
          links: [
            { label: "Hofman et al., proPSMA (Lancet 2020)", url: "https://doi.org/10.1016/S0140-6736(20)30314-7" },
            { label: "Hofman et al., TheraP (Lancet 2021)", url: "https://doi.org/10.1016/S0140-6736(21)00237-3" },
          ],
        },
        {
          id: "ctdna",
          title: "DYNAMIC: a blood test to decide who needs chemotherapy after bowel cancer surgery",
          plain: "An Australian trial led from the Walter and Eliza Hall Institute and Peter Mac tested whether a blood test for tumour DNA after surgery for stage II colon cancer could decide who needs chemotherapy. Fewer people were given chemotherapy, and as many stayed free of recurrence.",
          detail: "DYNAMIC randomised 455 patients 2:1 to management guided by circulating tumour DNA at 4 or 7 weeks after surgery, with chemotherapy only if positive, or to standard clinicopathological decisions. Adjuvant chemotherapy was used in 15 percent of the ctDNA-guided group against 28 percent, and two-year recurrence-free survival was 93.5 against 92.4 percent, meeting the non-inferiority margin. It was supported by the National Health and Medical Research Council and registered on the Australian New Zealand Clinical Trials Registry. DYNAMIC-III, run with the Australasian Gastro-Intestinal Trials Group, extends the approach to stage III disease.",
          links: [{ label: "Tie et al., DYNAMIC (NEJM 2022)", url: "https://doi.org/10.1056/NEJMoa2200075" }],
        },
      ],
    },
    {
      id: "networks",
      nav: "Networks",
      title: "Trial groups, care pathways and the national cancer agency",
      cards: [
        {
          id: "trial-groups",
          title: "Cooperative trial groups that run the trials industry does not",
          plain: "Much of Australia's practice-changing cancer research comes from not-for-profit trial groups organised by cancer type and shared with New Zealand. They design trials that answer patients' questions, such as whether a treatment can safely be dropped, which companies have little reason to fund.",
          detail: "The groups in this corpus include ANZGOG for gynaecological cancers, whose OUTBACK trial found no survival benefit from chemotherapy after chemoradiation for cervical cancer; the Australasian Leukaemia and Lymphoma Group, running independent blood cancer trials since 1973 with more than 600 clinicians, scientists and staff; the Australasian Gastro-Intestinal Trials Group, partner on DYNAMIC-III; ANZUP for urogenital cancers, behind ENZAMET, TheraP and proPSMA; Breast Cancer Trials, a partner in SOFT and TEXT, APHINITY and OlympiA; and TROG Cancer Research for radiotherapy, which ran CHISEL comparing stereotactic radiotherapy with standard radiotherapy in early lung cancer, and RAVES with ANZUP. Peter MacCallum Cancer Centre in Melbourne describes itself as Australia's largest cancer research centre with more than 700 laboratory and clinical researchers. Australian trials are registered on the Australian New Zealand Clinical Trials Registry as well as, or instead of, ClinicalTrials.gov, so counts taken only from ClinicalTrials.gov undercount them.",
          links: [
            { label: "ANZGOG", url: "https://www.anzgog.org.au/" },
            { label: "ALLG: about us", url: "https://allg.org.au/about-us/" },
            { label: "Peter MacCallum Cancer Centre", url: "https://www.petermac.org/" },
            { label: "Australian New Zealand Clinical Trials Registry", url: "https://www.anzctr.org.au/" },
          ],
        },
        {
          id: "ocp",
          title: "Optimal Care Pathways: what good care should look like, wherever you are treated",
          plain: "Australia publishes Optimal Care Pathways for each common cancer, setting out what should happen at every step from diagnosis to recovery or end-of-life care, with patient versions called Guides to Best Cancer Care. They are a good way to check whether your own care is on track.",
          detail: "Cancer Council Australia describes the Optimal Care Pathways as a framework for consistent, safe, high-quality and evidence-based care covering every step from prevention and early detection to recovery, living with a chronic disease or end-of-life care, so that all people diagnosed receive the best care irrespective of where they live or are treated. Each comes as a full pathway, a Quick Reference Guide for clinicians and a Guide to Best Cancer Care for patients (formerly What to Expect). Cancer Council Victoria, supported by the Victorian Government, refreshed 15 of them into second editions; the Leukaemia Foundation developed pathways for six blood cancers; there is a pathway for Aboriginal and Torres Strait Islander people with cancer, and one for people with disability is in development. Guidance on developing a pathway comes from Cancer Australia, the national cancer control agency established in 2006, which also wrote the ten-year Australian Cancer Plan.",
          links: [
            { label: "Cancer Council Australia: Optimal Care Pathways", url: OCP },
            { label: "Cancer Australia: about us (Internet Archive copy, 13 July 2026)", url: CA_ABOUT },
            { label: "Cancer Australia: Australian Cancer Plan (Internet Archive copy, 12 October 2026)", url: CA_PLAN },
            { label: "Australian Cancer Plan", url: "https://www.australiancancerplan.gov.au/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unreachable",
      title: "What this page could not establish, and why",
      plain: "Several official Australian sites would not answer automated requests on the day this page was written, so some current figures are missing or come from a dated archive copy. Where that happened, the link says so.",
      detail: "The AIHW's site sits behind a browser check, so its 2025 edition of Cancer data in Australia, and any 2026 edition, could not be read; the registry table above is from the 2024 edition, read from an Internet Archive copy, and the 2025 figures quoted in the text (survival 72 percent for 2017-2021, around 170,000 cases for 2025) come from the Royal Australian College of General Practitioners' report of that release, not from the AIHW itself. The TGA's Performance Report for 2024-25 is published, but its PDF could not be retrieved, so the approval statistics are for 2023-24. Screening participation rates, the National Cancer Screening Register's reports on cervical self-collection uptake and the AIHW's screening monitoring reports were not read. The text of the Australian Cancer Plan is published as a web application we could not extract, so its objectives and launch date are not quoted. We found no official figure for the time from TGA registration to PBS listing for cancer medicines, no published PBAC cost-effectiveness threshold, and no national count of patients paying privately for unsubsidised medicines. The number of national cooperative cancer trial groups that Cancer Australia funds could not be confirmed. Each state and territory registry publishes its own reports, which this page does not summarise.",
      links: [
        { label: "AIHW: Cancer data in Australia", url: AIHW_LIVE },
        { label: "TGA Performance Report 2024-25", url: TGA_PERF_2425 },
        { label: "Australian Cancer Plan", url: "https://www.australiancancerplan.gov.au/" },
      ],
    },
    {
      id: "missing-records",
      title: "Records that should be in this corpus and are not",
      plain: "Naming the holes is part of the job. These are Australian organisations, trials and datasets that belong in OnCo and do not yet have a record.",
      detail: "Organisations: the Medical Services Advisory Committee, the National Health and Medical Research Council and the Medical Research Future Fund, the National Cancer Screening Register, each state and territory cancer registry, the Victorian Comprehensive Cancer Centre alliance, the Thoracic Oncology Group Australasia (listed on ClinicalTrials.gov as a collaborator on DREAM3R, whose sponsor there is PrECOG), the Cooperative Trials Group for Neuro-Oncology, the Australian and New Zealand Children's Haematology/Oncology Group, the NHMRC Clinical Trials Centre, the Leukaemia Foundation and the University of Sydney and University of Melbourne as institutions. Trials and evidence: the main Compass trial results when published, the ASCOLT aspirin trial, Breast Cancer Trials' EXPERT and the venetoclax phase 1 study as a trial record (NCT01328626). Collections: the Australian Cancer Database and the Australian New Zealand Clinical Trials Registry as registry records alongside ClinicalTrials.gov.",
      links: [{ label: "Suggest a record or a correction", url: "/suggest/" }],
    },
  ],
  institutions: ["aihw", "cancer-australia", "tga", "pbac", "peter-mac", "wehi", "garvan-institute", "melanoma-institute-australia", "qimr-berghofer", "uq-frazer-institute", "acpcc", "chris-obrien-lifehouse", "alfred-health-monash", "onj-cancer-centre", "royal-adelaide-hospital", "saigenci-adelaide", "sydney-childrens-hospitals-network", "university-of-western-australia", "cancer-council-australia", "movember"],
  companies: ["anzgog", "allg", "agitg", "anzup", "breast-cancer-trials", "trog", "csl", "telix", "clarity-pharmaceuticals", "ansto", "mesoblast", "immutep", "qbiotics", "imugene", "radiopharm-theranostics", "amplia-therapeutics", "engeneic", "arovella-therapeutics", "imagion-biosystems", "filamon", "skopos-bio"],
  drugs: ["venetoclax", "illuccix", "remestemcel-l", "gardasil-9"],
  trials: ["dynamic", "dynamic-iii", "propsma", "therap", "enzamet", "chisel", "raves", "outback", "dream3r", "compass-cervical-hpv-screening"],
  papers: [
    "paper-zhou-hpv16-virus-like-particles-virology-1991",
    "paper-canfell-compass-pilot-plos-med-2017",
    "paper-hall-cervical-elimination-australia-lancet-public-health-2019",
    "paper-roberts-venetoclax-relapsed-cll-nejm-2016",
    "paper-dynamic-nejm-2022",
    "paper-tie-ctdna-minimal-residual-disease-stage-ii-colon-sci-transl-med-2016",
    "paper-propsma-hofman-lancet-2020",
    "paper-therap-lancet-2021",
    "paper-enzamet-n-engl-j-med-2019",
    "paper-chisel-lancet-oncol-2019",
    "paper-outback-lancet-oncol-2023",
    "paper-biankin-pancreatic-exomes-axon-guidance-nature-2012",
    "paper-waddell-whole-genomes-pancreatic-nature-2015",
    "paper-bailey-molecular-subtypes-pancreatic-nature-2016",
    "paper-karapetis-kras-cetuximab-colorectal-nejm-2008",
  ],
  people: ["ian-frazer", "jian-zhou", "andrew-roberts", "john-seymour", "andrew-wei", "constantine-tam", "georgina-long", "mcarthur-grant", "hofman-michael", "sandhu-shahneen", "louise-emmett", "jeanne-tie", "linda-mileshkin", "anna-nowak", "danny-rischin", "loi-sherene", "timothy-hughes", "karen-canfell", "dorothy-keefe", "robyn-ward", "anthony-lawler", "jacinta-reddan"],
  how: "Written on 3 November 2026 from Australian primary sources: the AIHW's Cancer data in Australia and its technical notes, the Department of Health, Disability and Ageing's programme pages for Medicare, the four screening programmes, the HPV vaccine, the cervical elimination strategy, the HTA review and the Life Saving Drugs Program, the PBS site's fee and PBAC pages, the TGA's pathway pages and its 2023-24 Performance Report, Cancer Australia, Cancer Council Australia, and the trial groups' and institutes' own pages. Where a government site refused automated requests, its page was read from a dated Internet Archive copy of the same address, and the link names the date. Trial results and papers were read from their PubMed or Europe PMC abstracts, with each DOI resolved before use. The GLOBOCAN table is IARC's, for comparison across countries; the cards quote the Australian registry because it is the better count of Australia.",
  verify: "Fees, thresholds and screening eligibility change, usually on 1 January or 1 July. Before relying on a figure here, check the PBS site for co-payments and the safety net, the Department of Health for Medicare thresholds and screening programmes, the TGA for current pathway rules, and the AIHW for the newest cancer statistics, which replace the projections on this page each year. The AIHW's own pages are the authority where they differ from the archive copies used here.",
  verifyLinks: [
    { label: "AIHW: Cancer data in Australia", url: AIHW_LIVE },
    { label: "PBS: fees, patient contributions and safety net thresholds", url: PBS_FEES },
    { label: "TGA: prescription medicines", url: "https://www.tga.gov.au/" },
    { label: "Department of Health: National Lung Cancer Screening Program", url: "https://www.health.gov.au/our-work/nlcsp" },
  ],
};

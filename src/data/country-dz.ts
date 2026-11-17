import type { CountryDive } from "@/data/country-dive";

/**
 * Algeria deep dive: the hand-written cards for /countries/dz/ (wave 4). Every figure was read from the raw text of its
 * source on 4 November 2026, in French or Arabic where that is the original, not from a summary of it: the Plan
 * National Cancer 2015 to 2019 (PDF text), the INSP's Registre des Tumeurs d'Alger 2022 and its children's registry
 * bulletin for 2022 (PDF text from Internet Archive copies, because insp.dz did not answer), the Journal officiel texts
 * (Law 18-11 of 2018, decree 84-27 of 1984 read by OCR, executive decrees 20-325 and 21-53, presidential decree 24-65,
 * and the vaccination order of 28 April 2026), the ANPP's pages, the CNAS Chifa pages (Internet Archive), the CPMC's
 * own site, Radio Algérienne reports of ministers' statements, IARC's GLOBOCAN 2024 fact sheet for Algeria, and the IHE
 * cancer dashboard for Algeria (September 2025, commissioned by MSD, used only where it is the only source and named as
 * such). Where a figure could not be read it is named under `gaps`.
 */
const PNC = "https://extranet.who.int/ncdccs/Data/DZA_B5_plan_national_cancer.pdf";
const RTA_2022 = "https://web.archive.org/web/20260807070858/https://www.insp.dz/images/PDF/Les%20registres/TumeursAlger/Registre_tumeurs_Alger_2022.pdf";
const RNCEA_2022 = "https://web.archive.org/web/20250418150902/https://www.insp.dz/images/PDF/Les%20registres/TumeursAlger/Bulletins_RNCEA/Bulletin-RNCEA%202022.pdf";
const RADIO_2023 = "https://news.radioalgerie.dz/fr/node/73122";
const ALG360_FEB26 = "https://www.algerie360.com/sante-voici-les-types-de-cancers-les-plus-repandus-chez-les-algeriens-en-2026/";
const ALG360_OCT26 = "https://www.algerie360.com/cancer-algerie-chiffres-ministre-sante/";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/12-algeria-fact-sheet.pdf";
const LAW_18_11 = "https://www.joradp.dz/FTP/JO-francais/2018/F2018046.pdf";
const JO_1984_07 = "https://www.joradp.dz/FTP/JO-francais/1984/F1984007.pdf";
const JO_2020_69 = "https://www.joradp.dz/FTP/JO-francais/2020/F2020069.pdf";
const JO_2021_07 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021007.pdf";
const JO_2024_08 = "https://www.joradp.dz/FTP/JO-francais/2024/F2024008.pdf";
const JO_2026_36 = "https://www.joradp.dz/FTP/JO-francais/2026/F2026036.pdf";
const CNAS_TIERS = "https://web.archive.org/web/20180715202036/http://www.cnas.dz/fr/carte-chifa-et-le-system-du-tiers-payant/";
const ANPP_PRES = "https://anpp.dz/fr/presentation-de-lanpp/";
const ANPP_ML3 = "https://anpp.dz/%d9%88%d8%b2%d9%8a%d8%b1%d8%a7-%d8%a7%d9%84%d8%b5%d9%86%d8%a7%d8%b9%d8%a9-%d8%a7%d9%84%d8%b5%d9%8a%d8%af%d9%84%d8%a7%d9%86%d9%8a%d8%a9-%d9%88%d8%a7%d9%84%d8%b5%d8%ad%d8%a9-%d9%8a%d8%aa%d8%a7%d8%a8/";
const ANPP_RELIANCE = "https://anpp.dz/%d8%aa%d8%b9%d8%b2%d9%8a%d8%b2-%d9%85%d8%a8%d8%af%d8%a3-%d8%a7%d9%84%d8%b1%d9%8a%d9%84%d8%a7%d9%8a%d9%86%d8%b3-%d8%a7%d9%84%d8%aa%d9%86%d8%b8%d9%8a%d9%85%d9%8a/";
const IHE_2025 = "https://ihe.se/app/uploads/2025/10/IHE-Cancer-Dashboard-Algeria_french_.pdf";
const SAIHI_2025 = "https://news.radioalgerie.dz/fr/node/63463";
const MINISTER_FEB26 = "https://news.radioalgerie.dz/fr/node/79437";
const KETTAB_2026 = "https://news.radioalgerie.dz/fr/node/85413";
const COUNCIL_2026 = "https://news.radioalgerie.dz/fr/node/85317";
const CPMC = "https://cpmc.dz/";
const SETIF_2014 = "https://doi.org/10.1186/1471-2407-14-637";

export const DZ_DIVE: CountryDive = {
  iso2: "DZ",
  iso3: "DZA",
  name: "Algeria",
  flag: "🇩🇿",
  asOf: "2026-11-04",
  title: "Cancer in Algeria",
  description:
    "Cancer in Algeria from Algerian sources: IARC's estimate of 72,825 new cancers and 37,135 deaths in 2024 against the 51,095 cases the national registry network recorded in 2022, free care in public hospitals and 100% social security cover for cancer, the hospital purchasing body that buys cancer medicines, the ANPP and its 150-day registration rule, an HPV vaccine added for ages 11 to 13 in 2026, radiotherapy waits at the anti-cancer centres, and a presidential cancer commission.",
  lede:
    "Algeria counts cancer through wilaya registries grouped into three regional networks: the national network recorded 51,095 new cancers in 2022, while IARC estimates 72,825 for 2024, with breast, colorectal and lung cancer leading. Care in public hospitals is free by law and social security reimburses cancer care at 100%; the government's own cancer plan named the wait for radiotherapy as the weak point of treatment.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Algeria is 72,825 new cancers and 37,135 deaths, an age-standardised incidence of 153.3 per 100,000 (140.2 in men, 168.9 in women) and mortality of 79.4; the all-cancers figure includes non-melanoma skin cancer, and without it IARC gives 71,500 cases. IARC's fact sheet gives the incidence source as subnational registries, with subnational rates applied to the 2024 population, and mortality as national incidence estimates applied to modelled mortality-to-incidence ratios from registry survival data, so neither number is a count. Algeria's own network of wilaya registries counted 51,095 new cancers in 2022, and the national public health institute's director general reported 56,319 recorded in 2023. Likely reasons for the gap: the registry figures are cases registered in a given year by registries whose national completeness is not published, IARC's figure is a modelled estimate for a later year, and IARC counts skin cancers the registries handle differently. Where a registry measures rates directly the picture can be higher than IARC's national figure: Algiers recorded an age-standardised 173.2 per 100,000 men and 195.9 per 100,000 women in 2022, and breast cancer at 81.9 per 100,000 women against IARC's 69.2. The health minister's figures from the network's October 2026 meeting, 14,712 breast and 4,334 prostate cancers a year, compare with IARC's 17,110 and 3,615, but the report does not say which year they cover.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Algeria",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Algeria (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 73,000 new cancers a year, more of them in women",
          plain:
            "IARC estimates 72,825 new cancers in Algeria in 2024: 40,600 in women and 32,225 in men. Breast cancer is by far the commonest, at more than four in ten cancers in women, followed by colorectal and lung cancer. In men colorectal, lung and prostate cancer lead, and lung cancer causes the most deaths among men.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 17,110 breast cancers (6,237 deaths), 9,120 colorectal (3,921 deaths), 5,503 lung (4,450 deaths), 3,615 prostate and 3,552 thyroid cancers; cervical cancer is fourth in women at 1,792 cases. In men the leading cancers by cases are colorectum (4,868), lung (4,709), prostate (3,615), bladder (3,040) and stomach (1,800); in women breast (17,110, 42.1% of women's cancers), colorectum (4,252), thyroid (2,956), cervix (1,792) and ovary (1,387). The risk of developing a cancer before age 75 is 15.3% for men and 16.8% for women, and IARC estimates 184,478 people living within five years of a diagnosis. Registry figures tell a similar story with Algerian detail: the 2015 to 2019 national plan reported a median age of 47 for breast cancer, meaning half of breast cancers occurred before that age, and the Algiers registry found the median age at diagnosis in 2022 was 52 for breast cancer and 56 for all cancers in women, against 65 in men.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Algeria (PDF)", url: IARC_FACTSHEET },
            { label: "Plan National Cancer 2015 to 2019, part one (Ministry of Health, PDF)", url: PNC },
            { label: "INSP: Registre des Tumeurs d'Alger, année 2022 (PDF, Internet Archive copy)", url: RTA_2022 },
          ],
        },
        {
          id: "registry-network",
          title: "Wilaya registries, grouped into three regional networks",
          plain:
            "Algeria has counted cancer in Sétif since 1986 and in Algiers since 1993. A 2014 ministerial order provided for a registry in every wilaya; the national public health institute dates the wilaya registries, grouped into three regional networks, to 2015, and national counts of registered cases are presented at the network's annual meeting. The registry reports read for this page give new cases, not deaths.",
          detail:
            "The Plan National Cancer 2015 to 2019 counted 14 registries covering close to 40% of the population, with Algiers and Sétif voting members of the International Association of Cancer Registries and six others (Annaba, Batna, Constantine, Mascara, Oran and Sidi Bel Abbès) associate members, and committed to implementing ministerial order No. 22 of 18 February 2014 on population cancer registries in every wilaya. The national public health institute (INSP) dates the wilaya registries and their three regional networks to 2015, when the first national indicators were produced. Its Algiers registry, which covered 3.9 million people (8.6% of Algerians) in 2022, collects cases actively from public and private laboratories, cancer centres and hospitals and met the IARC quality criteria in 2022, apart from the share of men's cases known only from a death certificate (6.5% against a limit of 3%). A national registry of cancers in children and adolescents has run since 2018. At the network's meeting on 28 October 2025 the health minister announced work to link registries electronically to hospitals and laboratories.",
          links: [
            { label: "Plan National Cancer 2015 to 2019, strategic axis 6: cancer registries (PDF)", url: PNC },
            { label: "INSP: Registre des Tumeurs d'Alger, année 2022 (PDF, Internet Archive copy)", url: RTA_2022 },
            { label: "Radio Algérienne: annual meeting of the registry network on 2023 data (28 October 2025)", url: RADIO_2023 },
            { label: "Hamdi Cherif et al., cancer incidence trends in Sétif 1986 to 2010 (BMC Cancer 2014)", url: SETIF_2014 },
          ],
        },
      ],
      tables: [
        {
          id: "dz-registries",
          title: "What Algeria's cancer registries report",
          caption: "New cancers and rates per 100,000 as each source states them, 2006 to 2023. The rate type differs by row and is named in the last column.",
          columns: [
            { key: "registry", label: "Registry (area covered)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "Men, per 100,000", numeric: true },
            { key: "women", label: "Women, per 100,000", numeric: true },
            { key: "rate", label: "Rate type" },
          ],
          rows: [
            { registry: "National registry network (wilaya registries)", period: "2023", cases: 56319, men: null, women: null, rate: "Count only, as stated by the INSP director general" },
            { registry: "National registry network (wilaya registries): 22,477 men, 28,618 women", period: "2022", cases: 51095, men: null, women: null, rate: "Crude, both sexes 110.2" },
            { registry: "Centre regional network", period: "2022", cases: null, men: 91.5, women: 120.1, rate: "Crude; more than 17,000 cases" },
            { registry: "Algiers tumour registry (wilaya of Algiers, 3.95 million people)", period: "2022", cases: 8285, men: 173.2, women: 195.9, rate: "Age-standardised, world population" },
            { registry: "Children and adolescents under 20 treated in the Centre network", period: "2022", cases: 837, men: null, women: null, rate: "Count; 1.64% of the national total" },
            { registry: "Sétif population-based registry", period: "2006 to 2010", cases: null, men: 106.4, women: 110.3, rate: "Age-standardised, world population" },
          ],
          note: "The registry reports read for this page give new cases, not deaths, and no national completeness figure was found, so the network totals are registered cases rather than a measured national incidence; a press report of the network's October 2026 meeting has the health minister naming the extension of registry coverage to the whole country, the new wilayas in particular, as a priority. The Algiers count excludes 310 basal cell skin cancers. Two figures in the INSP's 2022 report that look like misprints are not used: it gives the same national rate (124.6) for women and for men, and an all-persons age-standardised rate (219.9) higher than either sex's rate. The 2023 total is from a radio report of the INSP director general's statement; the network's 2023 report itself was not found online.",
          sources: [
            { label: "INSP: Registre des Tumeurs d'Alger, année 2022 (December 2024, PDF, Internet Archive copy)", url: RTA_2022 },
            { label: "INSP: Registre National des Cancers de l'Enfant et de l'Adolescent, année 2022 (March 2025, PDF, Internet Archive copy)", url: RNCEA_2022 },
            { label: "Radio Algérienne: registry network meeting on 2023 data (28 October 2025)", url: RADIO_2023 },
            { label: "Hamdi Cherif et al. (BMC Cancer 2014)", url: SETIF_2014 },
            { label: "Algérie360: registry network meeting (published 30 October 2026)", url: ALG360_OCT26 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: free public care and 100% social security cover",
      aside: { label: "Law 18-11 of 2 July 2018 on health, Journal officiel No. 46 (PDF)", url: LAW_18_11 },
      cards: [
        {
          id: "free-care",
          title: "Free care in public hospitals, written into the 2018 health law",
          plain:
            "Algerian law says the state provides free care and guarantees access to it for every citizen across the country, with the means of diagnosis, treatment and hospitalisation in all public health structures. The law does not list treatments one by one. Public hospitals, which include the specialised anti-cancer centres, are paid for by the state budget with a contribution from social security.",
          detail:
            "Article 13 of Law No. 18-11 of 2 July 2018 on health states that the state ensures free care (la gratuité des soins) and guarantees access to it for all citizens throughout the national territory, providing the means of diagnosis, treatment and hospitalisation in all public health structures. Free care was instituted by a presidential ordinance that the 2015 to 2019 national cancer plan places in the period 1973 to 1986. Under articles 300 and 330 of the 2018 law, public hospitals are funded from the state budget, from social security contributions made under contracts with the Ministry of Health, and from other receipts. The plan also records two special accounts for cancer: the fund for emergencies and medical care created in 2002, whose receipts are meant partly for tobacco prevention and tobacco-related illness, which had a balance of about 65.9 billion dinars on 23 October 2014 with no anti-smoking spending yet made, and the cancer control fund created by the 2011 finance law, which pays for screening, training, mobile breast screening units and radiotherapy spare parts. In February 2026 the health minister said radiotherapy maintenance is paid from this cancer account. On 3 May 2026 the President told the Council of Ministers that Algeria provides free care and treatment.",
          links: [
            { label: "Law 18-11 of 2 July 2018 on health, articles 13, 300 and 330 (Journal officiel No. 46, PDF)", url: LAW_18_11 },
            { label: "Plan National Cancer 2015 to 2019, sections 2.1, 2.2 and strategic axis 8 (PDF)", url: PNC },
            { label: "Radio Algérienne: health minister at the National People's Assembly (9 February 2026)", url: MINISTER_FEB26 },
            { label: "Radio Algérienne: full text of the Council of Ministers communiqué (3 May 2026)", url: COUNCIL_2026 },
          ],
        },
        {
          id: "chifa-100",
          title: "Social security pays 100% for cancer, and the Chifa card means no money up front at the pharmacy",
          plain:
            "Since 1984 cancers have been on the list of long-term illnesses for which social security reimburses care at 100% of regulated tariffs. Insured patients and their families use the Chifa smart card at contracted pharmacies, which bill the fund directly, so a chronically ill patient does not pay up front for a covered treatment, apart from any co-payment or any amount above the medicine's reference tariff.",
          detail:
            "Decree No. 84-27 of 11 February 1984, applying the 1983 social insurance law, sets reimbursement at 100% of regulated tariffs for the affections in its article 5, which include the long-term illnesses of article 21: tuberculosis, serious psychiatric illness, cancers (les maladies cancéreuses), blood diseases (les hémopathies), malignant hypertension and listed heart, vascular and neurological diseases, among others. The CNAS, the fund for salaried workers, explains that its Chifa card carries the patient's entitlement and treatment, and that since 3 February 2013 the third-party payment system works in contracted pharmacies in every wilaya: a chronically ill patient can collect a specific treatment prescribed for up to three months without paying. Two charges can remain: the 20% co-payment for patients covered at 80%, waived for members of a contracted mutual fund, and the difference when a medicine's price is above its reference tariff. Medicines given in public hospitals are bought centrally by the hospital purchasing body described below. At a ministry meeting on 22 April 2025 a CNAS director said social security was preparing the legal framework to pay, through third-party payment, for radiotherapy in private clinics for children with cancer.",
          links: [
            { label: "Journal officiel No. 7 of 14 February 1984: decree 84-27, articles 4, 5 and 21 (scanned PDF)", url: JO_1984_07 },
            { label: "CNAS: Chifa card and third-party payment (Internet Archive copy, 2018)", url: CNAS_TIERS },
            { label: "Radio Algérienne: Ministry of Health meeting on cancer care (22 April 2025)", url: SAIHI_2025 },
          ],
        },
        {
          id: "medicine-budget",
          title: "Cancer medicines are bought centrally for public hospitals, with a dedicated state subsidy",
          plain:
            "Hospital cancer medicines in Algeria are bought by one public body, the Pharmacie Centrale des Hôpitaux, with a state subsidy for national programmes that include the cancer plan. The plan reported that the subsidy reached 50 billion dinars in 2015, and that more than half of 2014's oncology medicine spending went on targeted therapies.",
          detail:
            "The Plan National Cancer 2015 to 2019 records that a 2012 amendment to the PCH's 1994 founding decree let it act as a central purchasing body with its own credits, and that a ministerial order of 6 February 2013 named the cancer plan among the national programmes for which the PCH receives a subsidy to buy medicines. That subsidy rose from 27 billion dinars in 2012 to 50 billion in 2015. Purchases of cancer medicines for oncology and haematology averaged more than 30 billion dinars a year, and oncology purchases in 2014 were 21 billion dinars, more than half for targeted therapy. The plan put its own five-year budget at 178.674 billion dinars, including 66 billion for investment already under way, 2.166 billion for prevention and 1.907 billion for research. A 2025 IHE report commissioned and funded by MSD states that hospital medicines are put on the PCH's list by the Ministry of Health while pharmacy medicines are reimbursed by the health insurance funds, and that 47% of the PCH budget in 2023 went on cancer medicines; OnCo could not check the 47% against a PCH document. In May 2026 the President asked for a system to monitor the availability and distribution of cancer medicines.",
          links: [
            { label: "Plan National Cancer 2015 to 2019, strategic axis 8 and table 07 (PDF)", url: PNC },
            { label: "IHE: Tableau de bord du cancer pour l'Algérie (September 2025, commissioned by MSD, PDF)", url: IHE_2025 },
            { label: "Radio Algérienne: full text of the Council of Ministers communiqué (3 May 2026)", url: COUNCIL_2026 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the ANPP",
      aside: { label: "Executive decree 20-325 on the registration of pharmaceutical products (Journal officiel No. 69, PDF)", url: JO_2020_69 },
      cards: [
        {
          id: "anpp-registration",
          title: "A decision within 150 days, but only for medicines already sold in their country of origin",
          plain:
            "Every medicine sold in Algeria must be registered by the ANPP, which since 2020 reports to the Ministry of Pharmaceutical Industry. The law gives the agency 150 days to decide once a dossier is accepted, and an imported medicine must already be registered and on sale in the country it comes from.",
          detail:
            "The ANPP was created by article 223 of the 2018 health law; ordinance No. 20-02 of 30 August 2020 moved it from the Ministry of Health to the Ministry of Pharmaceutical Industry. Executive decree No. 20-325 of 22 November 2020 requires a company to file a pre-submission request first, on which the registration commission gives its opinion within 30 days; the company then has a year to file a dossier in the international Common Technical Document format. The agency checks admissibility within 8 days and must decide, after the commission's opinion, within 150 days of admissibility, a period its director general can exceptionally extend by up to 90 days, with the clock stopped while information is requested. Article 19 requires an imported product to be registered and marketed in its country of origin when the application is filed; for products registered but not marketed there, the decree leaves the rules to a ministerial order. A registration lasts five years. The agency can consult committees of clinical experts organised by therapeutic class, one of whose representatives sits on the commission, and experts and members must sign declarations that they have no conflict of interest. The agency also issues the price certificate after an interministerial economic committee sets the price.",
          links: [
            { label: "Journal officiel No. 69 of 22 November 2020: executive decree 20-325 (PDF)", url: JO_2020_69 },
            { label: "ANPP: présentation de l'ANPP", url: ANPP_PRES },
            { label: "ANPP: directorate for the registration of pharmaceutical products (Arabic)", url: "https://anpp.dz/a-propos-direction-enregistrement/" },
          ],
        },
        {
          id: "unregistered-access",
          title: "Unregistered medicines for serious illness, and work towards WHO maturity level 3",
          plain:
            "When a seriously ill patient needs a medicine not registered in Algeria and no equivalent exists, the minister of pharmaceutical industry can authorise its temporary use for up to a year, renewable. The regulator is also working with the World Health Organization towards certification at maturity level 3.",
          detail:
            "Executive decree No. 21-53 of 31 January 2021 lets the minister of pharmaceutical industry grant a temporary authorisation for an unregistered medicine prescribed for a serious illness with no equivalent treatment in Algeria and proven therapeutic usefulness, or at the health minister's request for public health reasons. The ANPP must give its opinion within eight working days, the authorisation names the indication, the manufacturer and the price, and it lasts no more than a year, renewable, possibly followed by a commitment to register. On 15 June 2025 the ministry and the ANPP opened a self-assessment workshop with World Health Organization experts using the WHO's global benchmarking method, and on 2 September 2025 the ministers of pharmaceutical industry and health reviewed progress towards maturity level 3 certification, which the pharmaceutical industry minister said would help medicines made in Algeria reach international markets. In November 2025 the ANPP's director general presented regulatory reliance, using the assessments of recognised regulators while keeping national decisions, at an African ministerial conference on local production of medicines in Algiers.",
          links: [
            { label: "Journal officiel No. 7 of 31 January 2021: executive decree 21-53 (PDF)", url: JO_2021_07 },
            { label: "ANPP: ministers review the maturity level 3 project (2 September 2025, Arabic)", url: ANPP_ML3 },
            { label: "ANPP: regulatory reliance presentation (November 2025, Arabic)", url: ANPP_RELIANCE },
          ],
        },
        {
          id: "approval-lag",
          title: "New cancer medicines: about a quarter of those approved in Europe in 2015 to 2020 were registered in Algeria, by an MSD-commissioned count",
          plain:
            "One review, commissioned and funded by the drug company MSD, counted the new cancer medicines approved by the European Medicines Agency between 2015 and 2020 and found 16 of 60 registered in Algeria by March 2025. Companies had applied for only 31 of them, so part of the gap is medicines never submitted.",
          detail:
            "The IHE cancer dashboard for Algeria (September 2025), written by the Swedish Institute for Health Economics, commissioned and funded by MSD and validated by Algerian oncologists, compared the European Medicines Agency's new cancer medicines of 2015 to 2020 with Algeria's national nomenclature of pharmaceutical products of March 2025: 16 of 60 (27%) were registered, 15 more were under registration and 29 had not been submitted. The share fell with the year of European approval: 5 of 11 from 2015, 6 of 10 from 2016, 3 of 11 from 2017, 1 of 11 from 2018, none of 7 from 2019 and 1 of 10 from 2020. The report states that every medicine with a marketing authorisation in Algeria is also reimbursed, either on the PCH hospital list or by health insurance for pharmacy medicines. Its Algerian approval dates came from the ANPP by personal communication, so OnCo cannot check them against a public list. A gap between European and Algerian approval does not by itself mean a patient cannot get a medicine, since temporary authorisations exist for serious illness.",
          links: [
            { label: "IHE: Tableau de bord du cancer pour l'Algérie, pillar 3, access to new cancer medicines (commissioned by MSD, PDF)", url: IHE_2025 },
            { label: "Journal officiel No. 7 of 31 January 2021: temporary authorisations, decree 21-53 (PDF)", url: JO_2021_07 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Order of 28 April 2026 adding the HPV vaccine, Journal officiel No. 36 (PDF)", url: JO_2026_36 },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening is offered, but there is no organised national programme with invitations",
          plain:
            "Algeria has no organised national breast screening programme that invites every woman. Screening is offered through one-off campaigns, and a pilot centre in Biskra gives healthy women a free clinical examination and mammogram. Colorectal screening was piloted in three wilayas in 2017; a 2025 report commissioned by MSD says there is no organised national programme for it.",
          detail:
            "The 2015 to 2019 national plan described breast screening initiatives by the CNAS, associations and others as dispersed and ineffective, recommended an organised programme with a validated national protocol, quality standards and identification of women to invite from census or population registers, and put the average cost of a screening examination at about 15,000 dinars. It noted that 39.4% of breast cancers were in women aged 40 to 49. In May 2026 the secretary general of the national federation of cancer patients' associations, Hamida Kettab, named the absence of a structured national screening programme as the main challenge and described the Biskra pilot, with double reading by teleradiology with the Centre Pierre et Marie Curie in Algiers and biopsy on site. For colorectal cancer, the IHE dashboard (commissioned and funded by MSD) reports that Algeria has no organised national colorectal screening programme and that pilot studies ran in Béjaïa, Annaba and Batna in 2017; in Béjaïa, 30% of a target population of 10,000 people aged 50 to 74 took an immunochemical stool test, 7.2% tested positive and 17 cancers were found. The 2015 plan judged PSA testing for mass prostate screening ineffective.",
          links: [
            { label: "Plan National Cancer 2015 to 2019, strategic axis 2: breast screening (PDF)", url: PNC },
            { label: "Radio Algérienne: Hamida Kettab on the national cancer strategy (5 May 2026)", url: KETTAB_2026 },
            { label: "IHE: Tableau de bord du cancer pour l'Algérie, pillar 2, early detection (commissioned by MSD, PDF)", url: IHE_2025 },
          ],
        },
        {
          id: "cervical-hpv",
          title: "Cervical screening since 1997, and an HPV vaccine added to the compulsory schedule in 2026",
          plain:
            "Algeria began a national cervical screening plan using smear tests in 1997, with screening units in every wilaya from 2001. A 2014 evaluation found results below the targets. In April 2026 the health minister added a vaccine against the human papillomavirus, which causes most cervical cancers, to the compulsory vaccination schedule at ages 11 to 13.",
          detail:
            "The 2015 to 2019 national plan records that Algeria chose in 1997, with the World Health Organization and the UN Population Fund, a national plan for cervical screening by cytology, with annual training of screeners and colposcopists at the INSP's reference laboratory, and that the 2001 national strategy integrated screening into primary care with units across the then 48 wilayas. An objective evaluation in 2014 found the results below the objectives set, and the plan proposed centralising HPV DNA testing in the three structures with the necessary platforms. The ministerial order of 28 April 2026, published in the Journal officiel No. 36 of 17 May 2026, completes the 2018 compulsory vaccination schedule with an anti-human papillomavirus vaccine at 11 to 13 years; the order does not specify girls or boys. In February 2026 the president of the national cancer commission had said Algeria planned to introduce the vaccine during 2026. OnCo found no recent national figure for cervical screening coverage from an Algerian source.",
          links: [
            { label: "Plan National Cancer 2015 to 2019, action 1.2: cervical cancer prevention (PDF)", url: PNC },
            { label: "Journal officiel No. 36 of 17 May 2026: order of 28 April 2026 on the vaccination schedule (PDF)", url: JO_2026_36 },
            { label: "Algérie360: health ministry and national commission on cancer in Algeria (9 February 2026)", url: ALG360_FEB26 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Algeria does",
      title: "What Algeria does differently",
      cards: [
        {
          id: "cac-network",
          title: "Specialised anti-cancer centres, among them the Centre Pierre et Marie Curie, opened in 1959",
          plain:
            "Algeria treats much of its cancer in specialised public hospitals called anti-cancer centres, among them the Centre Pierre et Marie Curie in Algiers, opened in 1959. The national plan counted 11 with radiotherapy in 2014; a Radio Algérienne report in May 2026 put the number of anti-cancer centres at 22. Chemotherapy is also given in 133 centres, according to the health minister in 2025.",
          detail:
            "The CPMC was inaugurated on 16 November 1959 with 320 beds and a cobalt unit, became the national cancer centre after independence and reports more than 450 beds and more than 50,000 patients a year today. The 2015 to 2019 plan described radiotherapy as delivered in 11 anti-cancer centres with the status of specialised hospital establishments, plus two private clinics, and listed the CPMC, Blida, Oran (Messerghine and the university hospital), Constantine, the army's central hospital, Ouargla, Sétif and Batna, with 15 more centres planned for 2015 to 2018. On 22 April 2025 the health minister said there were 45 linear accelerators in the public sector and 13 in the private sector, with four more about to start and 86 expected by the end of 2025 or early 2026, and 133 chemotherapy centres. The International Atomic Energy Agency's directory of radiotherapy centres, read on 16 November 2026, lists 23 centres in Algeria with 64 linear accelerators and no cobalt-60 units between them, nine of the centres listed with brachytherapy; the entries are self-reported and all were last updated in 2026. The minister's count and the directory's have different dates and neither is audited. In February 2026 the health minister, Mohamed Seddik Ait Messaoudene, told a committee of the National People's Assembly that 25 new radiotherapy services would open and that five specialised cancer hospitals in Chlef, Tiaret, Béjaïa and Oran were nearly complete. In May 2026 the President asked for a study of an oncology hospital in every wilaya.",
          links: [
            { label: "CPMC: official site (history)", url: CPMC },
            { label: "Plan National Cancer 2015 to 2019, section 2.3 and tables 03 to 05 (PDF)", url: PNC },
            { label: "Radio Algérienne: Ministry of Health meeting on cancer care (22 April 2025)", url: SAIHI_2025 },
            { label: "Radio Algérienne: 25 new radiotherapy services (minister's statement of 9 February 2026)", url: MINISTER_FEB26 },
            { label: "Radio Algérienne: Hamida Kettab on the national cancer strategy (5 May 2026)", url: KETTAB_2026 },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries data", url: "https://dirac.iaea.org/Data/CountriesLight" },
          ],
        },
        {
          id: "radiotherapy-waits",
          title: "Radiotherapy waits: six months on average in 2002, and five to six months in the big cities in 2026 by a patients' federation's account",
          plain:
            "The national cancer plan named the wait for radiotherapy as the one weak point of otherwise satisfactory treatment. A national survey of cancers registered in 2002 found an average wait of six months, and in 2026 a patients' federation reported five to six months in Algiers, Blida, Tizi Ouzou and Constantine, and up to a year at the CPMC, with shorter waits in the south.",
          detail:
            "The 2015 to 2019 national plan cites the INSP's national survey of 31,000 cancers registered in 2002: two thirds were diagnosed at invasive or metastatic stages, close to 40% of patients were not found in the treatment pathway, only a third received a complete treatment protocol, and the average wait for a course of radiotherapy was six months. The plan judged diagnosis and treatment generally satisfactory apart from radiotherapy appointment times, and its action 1.8, to shorten them, called for equipping new centres, restoring lost capacity and setting timetables. On 5 May 2026 Hamida Kettab of the national federation of cancer patients' associations said waits in Algiers, Blida, Tizi Ouzou and Constantine ran from five to six months and up to a year at some centres such as the CPMC, blamed recurrent breakdowns and maintenance, and said patients often had to travel to Adrar, Béchar or El Oued, where waits were shorter, sometimes 15 days to a month. These are an association's figures, not measured national waiting times, which OnCo did not find. In February 2026 the health minister described a digital platform for radiotherapy appointments and funding for preventive maintenance.",
          links: [
            { label: "Plan National Cancer 2015 to 2019, part one and action 1.8 (PDF)", url: PNC },
            { label: "Radio Algérienne: Hamida Kettab on the national cancer strategy (5 May 2026)", url: KETTAB_2026 },
            { label: "Radio Algérienne: health minister at the National People's Assembly (9 February 2026)", url: MINISTER_FEB26 },
          ],
        },
        {
          id: "presidential-commission",
          title: "A cancer commission attached to the President, and a strategy to 2035",
          plain:
            "Since February 2024 cancer policy has had its own commission attached to the President of the Republic, with six members; its president reports to the President every six months. It prepared a national strategy for cancer prevention and control to 2035, which the Council of Ministers examined in May 2026.",
          detail:
            "Presidential decree No. 24-65 of 3 February 2024 created the Commission nationale de prévention et de lutte contre le cancer as a permanent body to propose the national strategy, coordinate and evaluate the national plan for cancer care, strengthen early detection with the ministries of defence, health, higher education, pharmaceutical industry and labour and social security, encourage research, and propose mechanisms to prevent shortages of cancer medicines and devices. Its six members serve four years, renewable once. The commission held national meetings (assises) in May 2025, with seven workshops on Saturday 3 May on prevention, screening, diagnosis, the patient pathway, medicines and equipment, financing and governance, and training and research. On 3 May 2026 the Council of Ministers examined the strategy to 2035; the President asked for a national approach based on prevention, early detection and effective treatment, a study of an oncology hospital in each wilaya, and monitoring of the availability of cancer medicines. The strategy document itself had not been published when this page was checked. Algerian press and the IHE report name Professor Adda Bounedjar as the commission's president.",
          links: [
            { label: "Journal officiel No. 8 of 4 February 2024: presidential decree 24-65 (PDF)", url: JO_2024_08 },
            { label: "Radio Algérienne: national meetings on cancer prevention and control (4 May 2025)", url: "https://news.radioalgerie.dz/fr/node/64094" },
            { label: "Radio Algérienne: full text of the Council of Ministers communiqué (3 May 2026)", url: COUNCIL_2026 },
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
          title: "No trial in OnCo's records lists a site in Algeria; 74 to 109 oncology papers a year",
          plain:
            "No trial in OnCo's records lists a site in Algeria, counted from ClinicalTrials.gov participation data in OnCo's graph on 4 November 2026. OpenAlex counts 109 oncology papers with at least one author based in Algeria in 2025, up from 74 in 2021. Patients interested in trials should search the registry directly.",
          detail:
            "OnCo's graph holds ClinicalTrials.gov participation snapshots for its trials, and none lists Algeria; that reflects the trials in OnCo's records, not every study registered, so the ClinicalTrials.gov search below is the place to look. OpenAlex, counting works whose primary topic is oncology and counting a paper for every country among its authors' affiliations, gives Algeria 74 works in 2021, 79 in 2022, 98 in 2023, 77 in 2024 and 109 in 2025, 437 in total, of which 261 are open access and 8 highly cited. The Sétif registry's 1986 to 2010 data show incidence rising by 2.5% a year in men and 3.7% in women from 1996 to 2010. The 2015 to 2019 national plan budgeted 1.907 billion dinars for research. A 2025 IHE report commissioned by MSD recommends encouraging oncology trials to widen access to new treatments, and the president of the national cancer commission said in February 2026 that more than 60% of scientific research in the health sector concerns cancers.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Algeria", url: "https://clinicaltrials.gov/search?locStr=Algeria&country=Algeria&cond=Cancer" },
            { label: "OpenAlex: works by country", url: "https://openalex.org" },
            { label: "Hamdi Cherif et al., cancer incidence trends in Sétif 1986 to 2010 (BMC Cancer 2014)", url: SETIF_2014 },
            { label: "Algérie360: health ministry and national commission on cancer in Algeria (9 February 2026)", url: ALG360_FEB26 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-reports",
      title: "The national registry network's own reports could not be read directly",
      plain:
        "The national public health institute's website, which publishes the registry reports, did not answer on 4 November 2026. The Algiers and children's registry reports for 2022 were read from Internet Archive copies, and the national totals for 2022 and 2023 are quoted from those reports and from a radio report.",
      detail:
      "insp.dz timed out on every request. The Internet Archive held the Algiers registry report for 2022 and the children's registry bulletin for 2022, both read in full; the national network's own report on 2023 data was not found, so its total of 56,319 is the INSP director general's figure as Radio Algérienne reported it on 28 October 2025. The Centre network's bulletins for 2017 are archived but were not read for this page. The health minister's breast and prostate figures from the network's meeting in October 2026 come from a press report that does not state the year they cover. No national completeness estimate, no national mortality figures from the registries and no Algerian population-based survival figures were found; CONCORD-3 survival estimates quoted in the IHE report are not used here.",
      links: [
        { label: "INSP: Registre des Tumeurs d'Alger, année 2022 (PDF, Internet Archive copy)", url: RTA_2022 },
        { label: "Radio Algérienne: registry network meeting on 2023 data (28 October 2025)", url: RADIO_2023 },
        { label: "Algérie360: registry network meeting (published 30 October 2026)", url: ALG360_OCT26 },
      ],
    },
    {
      id: "approval-times-dz",
      title: "No published measured approval times or registration list for cancer medicines",
      plain:
        "OnCo found no figure for how long the ANPP actually takes to register a cancer medicine, only the 150-day limit in the 2020 decree. The only count of new cancer medicines registered in Algeria comes from a report commissioned by a drug company, using dates supplied privately by the agency.",
      detail:
        "The ANPP publishes the decrees and orders that govern registration but no median approval time, annual report of the registration commission or searchable register of cancer medicines with dates was found; the decree requires the commission to write an annual report to the director general, but none was found online. The national nomenclature of pharmaceutical products that the IHE report used was not located. A press-reported ministerial list of locally made medicines that may not be imported, published in 2015, could not be checked in the Journal officiel and is not used. Whether a registered medicine is on the PCH hospital list and in stock at a given centre is a separate question this page cannot answer medicine by medicine.",
      links: [
        { label: "ANPP: regulatory texts on pharmaceutical products (Arabic and French)", url: "https://anpp.dz/%d8%a7%d9%84%d9%86%d8%b5%d9%88%d8%b5-%d8%a7%d9%84%d8%aa%d9%86%d8%b8%d9%8a%d9%85%d9%8a%d8%a9-%d8%a7%d9%84%d9%85%d8%aa%d8%b9%d9%84%d9%82%d8%a9-%d8%a8%d8%a7%d9%84%d9%85%d9%88%d8%a7%d8%af-%d8%a7%d9%84/" },
        { label: "IHE: Tableau de bord du cancer pour l'Algérie (commissioned by MSD, PDF)", url: IHE_2025 },
      ],
    },
    {
      id: "unread-dz",
      title: "Other sources not reached or figures not verified",
      plain:
        "The websites of the hospital purchasing body and the social security fund for salaried workers did not answer, and the national cancer strategy to 2035 has not been published. Radiotherapy waiting times on this page are a patients' federation's figures, because no measured national waiting time was found.",
      detail:
        "pch.dz did not answer and its archived pages returned a firewall rejection, so the PCH record rests on the 2015 to 2019 plan and the IHE report. cnas.dz did not answer; its Chifa pages were read from Internet Archive copies of 2018, and the list of long-term illnesses covered at 100% is quoted from decree 84-27 itself, read by optical character recognition of the scanned 1984 Journal officiel. The 2015 to 2019 plan was read from the World Health Organization's repository copy, and no evaluation of the plan by an Algerian body was read. The equipment counts in the IHE report (67 radiotherapy units in December 2024) are personal communications and are not used. The decree creating the cancer commission does not name its members, so the president's name is from press and the IHE report.",
      links: [
        { label: "Plan National Cancer 2015 to 2019 (WHO repository copy, PDF)", url: PNC },
        { label: "Journal officiel No. 7 of 14 February 1984 (scanned PDF)", url: JO_1984_07 },
        { label: "Radio Algérienne: Hamida Kettab on the national cancer strategy (5 May 2026)", url: KETTAB_2026 },
      ],
    },
  ],
  institutions: ["algeria-cancer-registry-network", "insp-algeria", "cnplcc-algeria", "cnas-algeria", "pch-algeria", "anpp-algeria", "cpmc-algiers", "blida-anti-cancer-center", "iarc", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: ["paper-hamdi-cherif-setif-incidence-trends-bmc-cancer-2014"],
  people: ["adda-bounedjar"],
  how:
    "Every card was written from Algerian official sources, read in full rather than through a summary and in French or Arabic where that is the original: the Ministry of Health's Plan National Cancer 2015 to 2019; the national public health institute's Algiers registry report and children's registry bulletin for 2022; the Journal officiel texts on free care, social security cover, medicine registration, temporary authorisations, the cancer commission and the 2026 vaccination order (the 1984 decree read by optical character recognition); the ANPP's and the CPMC's own pages; the CNAS Chifa pages from the Internet Archive; Radio Algérienne's reports of ministers' statements and of the Council of Ministers' communiqué; IARC's GLOBOCAN 2024 fact sheet; and the Sétif registry paper through Europe PMC. The IHE dashboard for Algeria, commissioned by MSD, is used only where it is the sole source and is named each time. The new records for this page (the registry network, INSP, the cancer commission, ANPP, CNAS, PCH, the CPMC and one paper) carry their own sources.",
  verify:
    "National incidence and deaths are IARC estimates, and the registry totals are registered cases whose completeness is not published. Waiting times for radiotherapy vary by centre and change as machines are repaired or added; ask the centre directly and ask whether another centre can treat you sooner. Social security cover depends on your fund and on the medicine's reference tariff, so check with your CNAS or CASNOS agency.",
  verifyLinks: [
    { label: "Institut National de Santé Publique", url: "https://www.insp.dz" },
    { label: "ANPP", url: "https://anpp.dz" },
    { label: "CNAS", url: "https://cnas.dz" },
    { label: "Centre Pierre et Marie Curie", url: CPMC },
  ],
};

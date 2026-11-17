import type { CountryDive } from "@/data/country-dive";

/**
 * Ukraine deep dive: the hand-written cards for /countries/ua/. Ukrainian sources were read in Ukrainian, from the raw
 * text of each PDF or page (pdftotext or the HTML), not from a summary of it: the National Cancer Registry of
 * Ukraine's Bulletin No. 27 on 2024 to 2025 (its analytical review, Table 1, its thematic article on late-stage
 * diagnosis and its history of the registry), the Cabinet of Ministers' resolution No. 1808 on the 2026 Programme of
 * Medical Guarantees, the National Cancer Control Strategy (order No. 730-r of 2 August 2024) and its 2026 to 2028 action
 * plan (order No. 165-r of 18 February 2026), the Law "On Medicinal Products" in its February 2023 text and the new Law
 * No. 2469-IX that replaces it from 1 January 2027 (all through Internet Archive copies of zakon.rada.gov.ua, which did
 * not answer directly), the Ministry of Health's screening order No. 1368 and its annexes, the State Expert Centre's
 * pages and its health technology assessment conclusion on trastuzumab deruxtecan, the Ministry's and the National
 * Cancer Institute's own pages, and two papers resolved through Europe PMC. Every figure below is quoted from one of
 * those; where a figure could not be read it is named under `gaps`.
 */
const NCRU_B27 = "http://www.ncru.inf.ua/publications/BULL_27/index.htm";
const NCRU_REVIEW = "http://www.ncru.inf.ua/publications/BULL_27/PDF/10-23-oglyad_N27.pdf";
const NCRU_T1 = "http://www.ncru.inf.ua/publications/BULL_27/PDF/TABLE_1.pdf";
const NCRU_FULL = "http://www.ncru.inf.ua/publications/BULL_27/PDF/BULL_27.pdf";
const NCRU_30Y = "http://www.ncru.inf.ua/publications/BULL_27/PDF/1-4_NCRU_30years.pdf";
const NCRU_ZUB = "http://www.ncru.inf.ua/publications/BULL_27/PDF/Zub_realizatsia_strategyi_2024-2025.pdf";
const NCRU_OPYS = "http://www.ncru.inf.ua/publications/BULL_27/PDF/opys_27.pdf";
const PMG_2026 = "https://web.archive.org/web/20260719132453/https://zakon.rada.gov.ua/laws/show/1808-2025-%D0%BF";
const STRATEGY = "https://web.archive.org/web/20251116063459/https://zakon.rada.gov.ua/laws/show/730-2024-%D1%80";
const PLAN_2026 = "https://web.archive.org/web/20260224115223/https://zakon.rada.gov.ua/laws/show/165-2026-%D1%80";
const LAW_1996 = "https://web.archive.org/web/20230719204005/https://zakon.rada.gov.ua/laws/show/123/96-%D0%B2%D1%80/print";
const LAW_2027 = "https://web.archive.org/web/20251218062900/https://zakon.rada.gov.ua/laws/show/2469-20/print";
const SCREEN_ORDER = "https://moz.gov.ua/storage/uploads/837cc13c-f01d-42c9-a6b7-433575ede950/dn_1368_05082024.pdf";
const SCREEN_BREAST = "https://moz.gov.ua/storage/uploads/837cc13c-f01d-42c9-a6b7-433575ede950/dn_1368_05082024_dod.pdf";
const SCREEN_CERVIX = "https://moz.gov.ua/storage/uploads/837cc13c-f01d-42c9-a6b7-433575ede950/dn_1368_05082024_dod_2.pdf";
const SCREEN_BOWEL = "https://moz.gov.ua/storage/uploads/837cc13c-f01d-42c9-a6b7-433575ede950/dn_1368_05082024_dod_3.pdf";
const DEC_HTA = "https://www.dec.gov.ua/materials/derzhavna-oczinka-medychnyh-tehnologij/";
const DEC_HTA_DOSSIERS = "https://www.dec.gov.ua/materials/derzhavna-oczinka-medychnyh-tehnologij-zayavy-ta-dosye/";
const DEC_SRA = "https://www.dec.gov.ua/applicant/perelikiv-lz-yaki-zare-strovani-kompetentnimi-organami/";
const DEC_ABOUT = "https://www.dec.gov.ua/derzhavne-pidpryyemstvo-derzhavnyj-ekspertnyj-czentr-ministerstva-ohorony-zdorov-ya-ukrayiny/";
const TDXD_HTA = "https://www.dec.gov.ua/files/b7Hhr3JN9G/vysnovok-z-derzhavnoyi-omt-trastuzumab-derukstekan-enhertu-vid-27.02.2026.pdf";
const MOZ_MEA = "https://moz.gov.ua/uk/v-ukrayini-z-yavlyatsya-tri-novi-innovacijni-preparati-dlya-likuvannya-onkologichnih-zahvoryuvan";
const IFX_MPU = "https://interfax.com.ua/news/pharmacy/1142030.html";
const NCI_LINAC = "https://unci.org.ua/news/u-natsionalnomu-instytuti-raku-vidkryly-tretij-linijnyj-pryskoryuvach-dlya-provedennya-suchasnoyi-promenevoyi-terapiyi";
const NCI_DRUGS = "https://unci.org.ua/bezoplatni-liky";
const CTGOV_UA = "https://clinicaltrials.gov/search?cond=Cancer&locStr=Ukraine&country=Ukraine";

export const UA_DIVE: CountryDive = {
  iso2: "UA",
  iso3: "UKR",
  name: "Ukraine",
  flag: "🇺🇦",
  asOf: "2026-11-04",
  title: "Cancer in Ukraine",
  description:
    "Cancer in Ukraine from Ukrainian sources: the national registry's 124,801 cancers and 44,545 cancer deaths registered in 2024 and how the full-scale war has damaged that count, the national purchaser's chemotherapy and radiotherapy packages, central purchase and managed entry agreements for expensive cancer medicines, the health technology assessment that advises on them, the fast registration route for medicines approved by trusted regulators and the new medicines law from January 2027, the screening order in force since 2025, free HPV vaccination from 2026, a measured rise in late diagnosis, and how few new cancer trials have opened since 2022.",
  lede:
    "Ukraine has counted cancer in one national registry since the 1990s, and its 2024 count of 124,801 new cancers was made in wartime, with parts of four regions occupied and many people displaced. The National Health Service of Ukraine pays hospitals for cancer care in yearly packages, the state buys expensive cancer medicines centrally and gives them to patients free, and since December 2023 cancer has been on the agenda of the National Security and Defence Council.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Ukraine is 153,699 new cancers and 82,596 deaths for 2024 (ICD-10 C00-97, including 3,970 non-melanoma skin cancers), an age-standardised incidence of 218.3 per 100,000 and mortality of 108.4; IARC describes its method for both as trends in national rates projected to 2024. The National Cancer Registry of Ukraine registered 124,801 new cancers and 44,545 cancer deaths in 2024, not counting Crimea and Sevastopol. Leaving out non-melanoma skin cancer, which the registry counts far more fully (14,528 cases against IARC's 3,970), the registry has 110,273 cases against GLOBOCAN's 149,729, so IARC's figure is about 36% higher; for deaths it is about 85% higher. The registry explains much of the gap itself: cases from the occupied parts of Donetsk, Luhansk, Zaporizhzhia and Kherson regions are undercounted, and deaths are badly undercounted because regional registries lost access to death records, so that it registered 2.8 cases for every death in 2024 against 1.9 to 2.1 before 2021. It also publishes no rates per 100,000 for 2024, because there are no population figures for 2024 and 2025. The gap is not even across cancers: the registry's 9,934 prostate cancers are above IARC's 9,229, while for breast (13,966 against 18,344) and bowel cancer (15,109 against 21,007) IARC is well above the count.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Ukraine",
      aside: { label: "NCRU: Bulletin No. 27, Cancer in Ukraine 2024-2025", url: NCRU_B27 },
      cards: [
        {
          id: "shape",
          title: "124,801 cancers registered in 2024, and prostate cancer now the commonest in men",
          plain:
            "Ukraine's national cancer registry recorded 124,801 new cancers in 2024, slightly more women than men, and 44,545 cancer deaths. Breast cancer is the commonest cancer in women and prostate cancer in men, where it has overtaken lung cancer. Lung cancer still causes the most cancer deaths in men and breast cancer in women.",
          detail:
            "The registry's Bulletin No. 27 counts 60,397 cancers in men and 64,404 in women in 2024, 1,959 (1.6%) more than in 2023, and 44,545 cancer deaths, 25,094 men and 19,451 women. Most cancers were found at ages 45 to 74: about 75% of cases in men and almost 70% in women. In men prostate cancer was 16.4% of new cases (9,934, up 14.0% on 2023) and lung cancer 14.6% (7,882); the registry expects the long fall in lung cancer and rise in prostate cancer in men, visible since at least 2010, to continue. In women breast cancer was 21.5% of new cases (13,850). Thyroid cancer rose by 38.2% in men and 20.4% in women, and the registry says this may be a prolonged effect of the Chornobyl accident. Lung cancer caused the most cancer deaths in men aged 30 to 74, and breast cancer caused 20.1% of cancer deaths in women. The registry counted 579 cancers in children aged 0 to 17, three fewer than in 2023, which it describes as unchanged, but 35% fewer than in 2021; it says the fall may come from hospitals not sending the required reports, and that wartime migration cannot be ruled out.",
          links: [
            { label: "NCRU: analytical review, Bulletin No. 27, tables C1, C2 and C4 (PDF)", url: NCRU_REVIEW },
            { label: "NCRU: Table 1, general indicators for 2024 (PDF)", url: NCRU_T1 },
          ],
        },
        {
          id: "wartime-count",
          title: "What the war has done to the count",
          plain:
            "The registry says it can now count new cancers reliably, but not deaths. Occupation and displacement have cut the cases reported from parts of the south and east, regional registries have lost access to death records, and with no recent population figures it cannot calculate rates. It cannot measure survival for the same reasons.",
          detail:
            "Bulletin No. 27 states that cases have been undercounted in Donetsk and Luhansk regions since 2014 because of occupation, migration and the relocation of the regional registries and cancer centres, and that since 2022 similar problems affect many regions, most of all Zaporizhzhia and Kherson, large parts of which are occupied. In 2024 Luhansk registered 277 cases and Donetsk 1,049. It describes a substantial undercount of deaths since 2015, growing since 2019 in more than half of the regions, because registries lost access to data from the State Statistics Service and the civil registry offices; in Kharkiv the ratio of cases to deaths reached 10.3. With no population data for 2024 and 2025, the bulletin gives only counts and proportions. Late reports matter: the confirmed figures for 2024 contain 13,555 (12.2%) more cases than the first count. The registry concludes that it can keep only the count of new cases at a reliable level, close to 95%, and only a year after the year ends, and calls for its registrars to be given access to the national e-health system's data on whether patients are alive. The national strategy records that 22.3% fewer cancers were registered in 2022 than in 2021, with falls of 89% in Luhansk and 82.1% in Kharkiv regions.",
          links: [
            { label: "NCRU: analytical review and conclusions, Bulletin No. 27 (PDF)", url: NCRU_REVIEW },
            { label: "NCRU: definitions and description of tables, Bulletin No. 27 (PDF)", url: NCRU_OPYS },
            { label: "National Cancer Control Strategy, order No. 730-r of 2 August 2024 (Internet Archive copy)", url: STRATEGY },
          ],
        },
      ],
      tables: [
        {
          id: "ncru-2024",
          title: "Cancers registered and cancer deaths in 2024, by site",
          caption: "Registered new cases and deaths, Ukraine 2024, both sexes. Sums of the registry's male and female counts; Crimea and Sevastopol not included.",
          columns: [
            { key: "site", label: "Cancer (ICD-10)" },
            { key: "cases", label: "Registered cases, 2024", numeric: true },
            { key: "deaths", label: "Registered deaths, 2024", numeric: true },
          ],
          rows: [
            { site: "All cancers, C00 to C96", cases: 124801, deaths: 44545 },
            { site: "All cancers without non-melanoma skin cancer", cases: 110273, deaths: 44130 },
            { site: "Non-melanoma skin cancer (C44, C46.0)", cases: 14528, deaths: 415 },
            { site: "Breast (C50)", cases: 13966, deaths: 3939 },
            { site: "Trachea, bronchus and lung (C33 to C34)", cases: 10125, deaths: 6528 },
            { site: "Prostate (C61)", cases: 9934, deaths: 2646 },
            { site: "Colon (C18)", cases: 8124, deaths: 3495 },
            { site: "Rectum and anus (C19 to C21)", cases: 6985, deaths: 3106 },
            { site: "Uterine body (C54)", cases: 6643, deaths: 1210 },
            { site: "Stomach (C16)", cases: 5335, deaths: 3290 },
            { site: "Kidney (C64)", cases: 4372, deaths: 1277 },
            { site: "Thyroid (C73)", cases: 3936, deaths: 164 },
            { site: "Pancreas (C25)", cases: 3775, deaths: 2693 },
            { site: "Cervix (C53)", cases: 3426, deaths: 1157 },
          ],
          note: "Confirmed figures, published a year after the year ends because late reports add 5 to 15% to the first count. The registry warns that deaths are substantially undercounted in more than half of the regions, and that cases from occupied areas are undercounted, so neither column is a complete national count. No rates are given because there are no population figures for 2024.",
          sources: [
            { label: "NCRU: Bulletin No. 27, tables C1 and C4 of the analytical review (PDF)", url: NCRU_REVIEW },
            { label: "NCRU: Table 1, general indicators for 2024 (PDF)", url: NCRU_T1 },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry inside the National Cancer Institute",
      aside: { label: "NCRU: 30 years of the National Cancer Registry (PDF)", url: NCRU_30Y },
      cards: [
        {
          id: "ncru-card",
          title: "A population registry in every region, built on compulsory reporting since 1953",
          plain:
            "Every cancer diagnosed in Ukraine must be reported to the regional cancer centre, a rule the registry dates to 1953. Since a Ministry order of 1996 these regional records have formed one National Cancer Registry, run from the National Cancer Institute in Kyiv. It publishes a bulletin every year; the latest covers 2024 and 2025.",
          detail:
            "The registry's history, published in Bulletin No. 27 for its thirtieth anniversary, says its electronic system grew from work begun in 1989 at the Kyiv research institute of oncology, now the National Cancer Institute, and received state backing with the Ministry of Health's order No. 10 of 30 December 1996 on creating a national cancer registry. A population-based registry runs in every region, inside the regional cancer centre, and a hospital registry system is used in 26 of the largest cancer clinics, which pass electronic discharge summaries to the population registry; the whole country was covered by 2000. The registry says it covers the entire population, that its data appear in volumes X to XII of Cancer Incidence in Five Continents and in International Incidence of Childhood Cancer, and that it has been a member of the European Network of Cancer Registries since the end of the 1990s. It built a linkage that matches its records with the register of people affected by the Chornobyl disaster, and says this work was used in joint studies with two institutes of the National Academy of Medical Sciences. The bulletin notes that a Ministry reorganisation of the registry on modern information technology is planned and will not be quick.",
          links: [
            { label: "NCRU: 30 years of the National Cancer Registry, Bulletin No. 27 (PDF)", url: NCRU_30Y },
            { label: "NCRU: Bulletin No. 27, full issue (PDF)", url: NCRU_FULL },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: one national purchaser, and medicines bought by the state",
      aside: { label: "Cabinet resolution No. 1808, 2026 Programme of Medical Guarantees", url: PMG_2026 },
      cards: [
        {
          id: "nhsu-card",
          title: "The National Health Service of Ukraine buys cancer care in packages",
          plain:
            "Public health services in Ukraine are bought by a national agency, the National Health Service of Ukraine (NHSU), from hospitals and clinics that sign contracts under a yearly Programme of Medical Guarantees. Cancer care comes in separate packages for chemotherapy, radiotherapy and blood cancers, each paid at rates the government sets every year.",
          detail:
            "Cabinet resolution No. 1808 of 31 December 2025 sets the 2026 rules. The chemotherapy package is paid to each hospital as a monthly global rate built from an annual capitation of 36,807 hryvnias per patient, weighted 3.555 for children, 0.97 for adults treated in hospital and 0.7 for adults treated only as outpatients; it is open to providers that treated at least 100 patients with the listed diagnoses in the first half of 2025, and a provider that also holds a radiotherapy contract earns a higher weight of 1.1 for offering both. Radiotherapy is paid per course at 51,368 hryvnias, weighted 1.5 on a linear accelerator, gamma knife or brachytherapy and 0.753 on cobalt or X-ray units, which rewards modern equipment. Blood cancers have their own package, built from a rate of 74,429 hryvnias per patient per year with its own weights. PET-CT is paid at 19,185 hryvnias a scan, with 4,000 scans planned for the year, and a mammogram at 248.64 hryvnias. Providers in territories with active fighting or under occupation are excluded from some packages and paid under separate rules.",
          links: [
            { label: "Cabinet resolution No. 1808 of 31 December 2025, chapters 11 and 19 to 21 and 40 (Internet Archive copy, July 2026)", url: PMG_2026 },
          ],
        },
        {
          id: "central-purchase",
          title: "Expensive cancer medicines are bought centrally and given to patients free",
          plain:
            "Many expensive cancer medicines are bought centrally. The state enterprise Medical Procurement of Ukraine buys them, and the Ministry says patients receive them free. For the costliest medicines it signs managed entry agreements, confidential price deals with the manufacturer.",
          detail:
            "The Ministry of Health announced on 22 October 2025 that the government had added palbociclib for hormone-receptor-positive, HER2-negative advanced breast cancer, inotuzumab ozogamicin for acute lymphoblastic leukaemia and gemtuzumab ozogamicin for acute myeloid leukaemia to the medicines bought under managed entry agreements, with a three-year contract signed by Medical Procurement of Ukraine. It described the agreements as confidential arrangements that in many cases cut the price several times, said earlier agreements covered the HPV vaccine and atezolizumab for lung cancer, and said 17 medicines were then bought this way. On 4 February 2026, as reported by Interfax-Ukraine, the agency said cancer medicines take more than 20% of its yearly budget for medical goods, that it bought 243 cancer medicines and devices worth 11.6 billion hryvnias in 2020 to 2025, and that in 2025 it bought pembrolizumab, atezolizumab, brentuximab vedotin, palbociclib, inotuzumab ozogamicin and gemtuzumab ozogamicin. The National Cancer Institute publishes its remaining stock of state-funded medicines on its website, updated weekly.",
          links: [
            { label: "Ministry of Health: three new innovative cancer medicines (22 October 2025)", url: MOZ_MEA },
            { label: "Interfax-Ukraine: MPU on cancer purchases (4 February 2026)", url: IFX_MPU },
            { label: "National Cancer Institute: free medicines in stock", url: NCI_DRUGS },
          ],
        },
        {
          id: "affordable-medicines",
          title: "Outpatient medicines: hormone therapy for breast cancer is reimbursed",
          plain:
            "Under the yearly Programme of Medical Guarantees the NHSU reimburses a list of medicines for treatment outside hospital. Under the heading of cancer, the 2026 list has three hormone treatments for breast cancer: exemestane, letrozole and tamoxifen. Nothing else is listed under cancer; morphine and fentanyl are listed under pain and palliative care.",
          detail:
            "Section III of the 2026 Programme of Medical Guarantees, on reimbursement, lists the medicines the NHSU reimburses for outpatient treatment under the 2021 reimbursement procedure, by international non-proprietary name and form. Under the heading of cancer, for patients with hormone-dependent breast cancer and patients with other breast cancer prescribed hormone therapy under the national standards, it lists exemestane, letrozole and tamoxifen as solid oral forms. The other groups on the list are mostly heart, lung, diabetes and other chronic conditions; for some medicines the resolution sets a fixed 50% reimbursement. Cancer appears as a heading in the reimbursement section only for these three medicines. Methotrexate and everolimus are on the list, but under autoimmune conditions and organ transplants, not cancer. The resolution read for this page does not name the scheme or describe how patients collect the medicines.",
          links: [
            { label: "Cabinet resolution No. 1808, section III, reimbursement (Internet Archive copy, July 2026)", url: PMG_2026 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Ukraine decides which cancer medicines to buy",
      aside: { label: "State Expert Centre: health technology assessment", url: DEC_HTA },
      cards: [
        {
          id: "hta-card",
          title: "A health technology assessment that advises, and a budget that decides",
          plain:
            "Before a medicine is added to the essential medicines list, to the lists bought with central money or to a managed entry agreement, the State Expert Centre assesses its benefit, cost-effectiveness and budget impact. Its conclusion is a recommendation, not a decision, and a medicine can be recommended even when it is judged poor value.",
          detail:
            "The State Expert Centre's Department of Health Technology Assessment works under Cabinet resolution No. 1300 of 23 December 2020 and names its uses: adding or removing medicines from the National List of Essential Medicines, from the lists bought from the state budget, applying or extending managed entry agreements, and some regional purchases. The conclusion read for this page states that it is advisory. Its conclusion of 27 February 2026 on trastuzumab deruxtecan for HER2-positive metastatic breast cancer found the cost per quality-adjusted life year above five times GDP per head, 659,720 hryvnias on 2021 figures, and so not cost-effective on Ukraine's recommended scale, with a budget impact above the affordability threshold; after a meeting of the expert committee on 22 January 2026 it still recommended the medicine for central purchase, including through a managed entry agreement, and recommended updating the national breast cancer standard. The same conclusion records that 168,912 women with breast cancer were on the registry's books in 2024.",
          links: [
            { label: "State Expert Centre: state health technology assessment", url: DEC_HTA },
            { label: "State Expert Centre: HTA conclusion on trastuzumab deruxtecan, 27 February 2026 (PDF)", url: TDXD_HTA },
          ],
        },
        {
          id: "hta-times",
          title: "How long an assessment takes: about seven months to a year",
          plain:
            "The State Expert Centre publishes each application and conclusion with dates, so its timing can be read. For three cancer medicines assessed in 2025 and 2026 the conclusion came between about seven months and a year after the application. A conclusion is only one step: the purchase still depends on the budget and a contract.",
          detail:
            "The Centre's list of applications and conclusions dates the trastuzumab deruxtecan application 1 August 2025 and the conclusion 27 February 2026; pembrolizumab for high-risk early triple-negative breast cancer, 30 June 2025 and 1 June 2026; and daratumumab with bortezomib and dexamethasone for myeloma after at least one earlier treatment, 19 June 2025 and 18 June 2026. Pembrolizumab for PD-L1-positive persistent, recurrent or metastatic cervical cancer was applied for on 9 April 2025; the list gives its conclusion no date, and the conclusion file on the Centre's server was last modified on 27 January 2026. An application for enfortumab vedotin in urothelial cancer dated 10 September 2025 was left without consideration under point 17 of the procedure, on a date the list does not give, and a new application is dated 20 October 2026. These are individual cases read from the list, not an official average, and the time from a conclusion to the medicine reaching patients is not published; it is named under gaps.",
          links: [
            { label: "State Expert Centre: HTA applications and conclusions", url: DEC_HTA_DOSSIERS },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: fast recognition of trusted approvals, and a new law from 2027",
      aside: { label: "State Expert Centre", url: DEC_ABOUT },
      cards: [
        {
          id: "sra-route",
          title: "A medicine approved in the US, the EU or a few other countries can be registered without a fresh review",
          plain:
            "The Ministry of Health registers medicines on the advice of the State Expert Centre. A medicine already approved by the regulators of the United States, Switzerland, Japan, Australia, Canada or the European Union can be registered without a fresh scientific review: the materials are reviewed in at most ten working days and the decision is due within seven working days.",
          detail:
            "Article 9 of the Law \"On Medicinal Products\" of 4 April 1996, in its text of 5 February 2023, lets a medicine registered by the competent authority of the United States, Switzerland, Japan, Australia or Canada, or by the European Union through the centralised procedure, be registered on its dossier, quality control methods, labelling and instructions without an expert review of the dossier submitted to the regulator that approved it. The review of the materials may not exceed ten working days and the decision is due within seven working days; refusal is limited to missing or inconsistent documents or a mismatch with the original approval. A similar fast route applies to medicines bought through international procurement organisations. The State Expert Centre now publishes lists of medicines registered by the competent authorities of the United States, the United Kingdom, Switzerland, Japan, Australia, Canada and the European Union. The Centre describes itself as the Ministry's authorised expert organisation for clinical trials, registration and pharmacovigilance; registration itself is a Ministry decision.",
          links: [
            { label: "Law of Ukraine \"On Medicinal Products\", article 9, text of 5 February 2023 (Internet Archive copy)", url: LAW_1996 },
            { label: "State Expert Centre: lists of medicines registered by competent authorities", url: DEC_SRA },
            { label: "State Expert Centre: about the enterprise", url: DEC_ABOUT },
          ],
        },
        {
          id: "new-law",
          title: "A new medicines law takes effect on 1 January 2027",
          plain:
            "A new law on medicines, No. 2469-IX, takes effect on 1 January 2027 and replaces the 1996 law. It creates a dedicated medicines regulator, sets a 210-day standard for registration and 30 days for cancer medicines approved by trusted regulators.",
          detail:
            "Law No. 2469-IX \"On Medicinal Products\" enters into force on 1 January 2027, under its final provisions as amended in February 2025, with some articles from 2028, and repeals the 1996 law. It assigns regulation to a body of state control, defined as a central executive body with special status for the market entry, quality, safety and efficacy of medicines. Article 26 gives that body 210 calendar days to decide on registration, with the clock stopped while deficiencies are corrected. Article 27 requires a decision within 30 days for orphan, innovative and advanced therapy medicines and for medicines for HIV, haemophilia and cancer, and vaccines, that are registered by a stringent regulatory authority or the European Medicines Agency. The law defines stringent regulators as countries whose agencies were members or observers of the International Council for Harmonisation before 23 October 2015, or that have mutual recognition or conformity agreements with Ukraine or the European Union. For international phase II to III trials already approved in such countries, it sets a 25-calendar-day limit for the decision.",
          links: [
            { label: "Law of Ukraine No. 2469-IX \"On Medicinal Products\", articles 2, 26 and 27 and final provisions (Internet Archive copy)", url: LAW_2027 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and HPV vaccination",
      aside: { label: "Ministry of Health order No. 1368 of 5 August 2024 (PDF)", url: SCREEN_ORDER },
      cards: [
        {
          id: "screening-order",
          title: "Three screening programmes run through family doctors since January 2025",
          plain:
            "Since 1 January 2025 a Ministry order sets national screening for three cancers, organised by family doctors. Women aged 50 to 69 are sent for a mammogram every two years; women from 30 for a smear or HPV test, repeated every ten years to 55; and people aged 50 to 75 for a stool test for hidden blood every two years.",
          detail:
            "The Ministry of Health's order No. 1368 of 5 August 2024, registered with the Ministry of Justice and in force from 1 January 2025, approves three procedures and cites the National Security and Defence Council's decision of 22 December 2023 on cancer. Breast: population screening for women aged 50 to 69 and risk-group screening from 40, with examination and referral for mammography every two years. Cervix: population screening from age 30, a Pap or PCR test at least at 30 to 35 and then every ten years until 55, and every five years from 25 for women living with HIV. Bowel: a faecal occult blood test or faecal immunochemical test every two years for people aged 50 to 75, yearly for risk groups, with colonoscopy after a positive result. The order sets targets for family practices, such as at least 70% of people aged 50 to 75 tested every two years. The 2026 Programme of Medical Guarantees has the NHSU assess family practices each year on screening coverage for the three cancers. In 2024, 12.9% of new cancers were found at preventive examinations (16.6% in women, 8.8% in men).",
          links: [
            { label: "Ministry of Health order No. 1368 (PDF)", url: SCREEN_ORDER },
            { label: "Order No. 1368, breast cancer procedure (PDF)", url: SCREEN_BREAST },
            { label: "Order No. 1368, cervical cancer procedure (PDF)", url: SCREEN_CERVIX },
            { label: "Order No. 1368, colorectal cancer procedure (PDF)", url: SCREEN_BOWEL },
            { label: "NCRU: Table 1, general indicators for 2024 (PDF)", url: NCRU_T1 },
          ],
        },
        {
          id: "hpv-vaccine-ua",
          title: "Free HPV vaccination for girls of 12 and 13 from January 2026",
          plain:
            "From 1 January 2026 Ukraine's vaccination calendar offers a single dose of HPV vaccine to girls aged 12 to 13, free of charge, to prevent cervical cancer. The state bought the vaccine through a managed entry agreement. The 2026 to 2028 action plan aims to vaccinate at least 30% of the target age groups.",
          detail:
            "Writing in Bulletin No. 27, V. O. Zub, member of parliament and head of the parliamentary health committee's subcommittee on cancer, reports that the updated vaccination calendar in force from 1 January 2026 provides one dose of HPV vaccine for girls aged 12 to 13, using a 9-valent vaccine. The Ministry of Health's announcement of 22 October 2025 says the vaccine was bought under a managed entry agreement, and Medical Procurement of Ukraine said in February 2026, as reported by Interfax-Ukraine, that it first bought HPV vaccine in 2025. The government's action plan for 2026 to 2028 sets the indicator as coverage of at least 30% of the target age groups nationally, under the vaccination calendar of the Ministry's order No. 595 of 16 September 2011, and asks regions to adopt programmes for groups the state budget does not cover. Coverage achieved in 2026 had not been published in a form that could be read; it is named under gaps.",
          links: [
            { label: "V. Zub: implementing the National Cancer Control Strategy, Bulletin No. 27 (PDF)", url: NCRU_ZUB },
            { label: "Action plan 2026 to 2028, order No. 165-r of 18 February 2026, task 5 (Internet Archive copy)", url: PLAN_2026 },
            { label: "Ministry of Health: managed entry agreements (22 October 2025)", url: MOZ_MEA },
            { label: "Interfax-Ukraine: MPU on cancer purchases (4 February 2026)", url: IFX_MPU },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Ukraine does",
      title: "What Ukraine does: cancer care under war",
      cards: [
        {
          id: "security-strategy",
          title: "Cancer declared a matter of national security, with a strategy to 2030",
          plain:
            "In December 2023 Ukraine's National Security and Defence Council adopted a decision on cancer prevention, diagnosis and treatment, enacted by presidential decree. A national cancer control strategy to 2030 followed in August 2024, with targets such as cutting cancer deaths by 2% a year, and a new action plan for 2026 to 2028.",
          detail:
            "The Ministry's screening order cites the Council's decision of 22 December 2023, \"On prevention, early diagnosis and treatment of malignant neoplasms\", enacted by presidential decree No. 842/2023; V. O. Zub writes in the registry's bulletin that the decision identified cancer as a factor of national risk. Cabinet order No. 730-r of 2 August 2024 approved the National Cancer Control Strategy to 2030 with seven strategic goals and indicators that include a 2% yearly fall in cancer mortality and a 1% yearly rise in the detection of cancers at an early stage. Its diagnosis records that early-stage cancers fell from 51.2% of new cases in 2018 to 45.7% in 2022, and late-stage cancers rose from 21.1% to 27.1%. Order No. 165-r of 18 February 2026 approved the action plan for 2026 to 2028, including an analysis of patient routes between hospitals by the end of 2026, reference centres for molecular genetic testing, workload standards for pathologists, monitoring of wartime carcinogenic exposures, and simpler rules for academic clinical trials.",
          links: [
            { label: "National Cancer Control Strategy, order No. 730-r (Internet Archive copy)", url: STRATEGY },
            { label: "Action plan 2026 to 2028, order No. 165-r (Internet Archive copy)", url: PLAN_2026 },
            { label: "Ministry of Health order No. 1368 (PDF)", url: SCREEN_ORDER },
            { label: "V. Zub: implementing the National Cancer Control Strategy, Bulletin No. 27 (PDF)", url: NCRU_ZUB },
          ],
        },
        {
          id: "stage-shift",
          title: "The registry measured how much later cancers are found since 2020",
          plain:
            "The national registry compared the stage at which cancers were found in 2015 to 2019 with 2020 to 2024, the years of the pandemic and the full-scale war. Late diagnosis rose in 31 of 32 cancer groups, peaking in 2022. Late-stage cervical cancer rose by half, and more cancers were left without any recorded stage.",
          detail:
            "In a thematic article in Bulletin No. 27, the registry compared average stage distributions for 32 cancer groups between the two five-year periods, testing differences at the 95% level. For solid cancers other than non-melanoma skin cancer, the share found late rose from 26.1% to 30.9% in men and from 14.6% to 16.8% in women, and the share found at stage I or II fell by 4.4 to 4.6 points. Late cervical cancer rose 1.5 times (by 11.1 points), breast cancer 1.2 times and uterine cancer 1.4 times; in men, laryngeal cancer rose 1.6 times. The only significant fall was in thyroid cancer in women. The registry saw sharp rises in late diagnosis in April and May 2020, during lockdown, and in March and April 2022, during occupation and mass displacement, and a partial fall in 2023 and 2024. For newly found cancers in 2025 the operational share diagnosed late was 20.1%, the same as the year before. Separately, 21.0% of people diagnosed in 2024 died within a year, a figure the registry says is distorted by the undercount of deaths.",
          links: [
            { label: "NCRU: Bulletin No. 27, full issue, thematic article on late-stage diagnosis (PDF)", url: NCRU_FULL },
            { label: "NCRU: analytical review, Bulletin No. 27 (PDF)", url: NCRU_REVIEW },
          ],
        },
        {
          id: "medevac",
          title: "Patients evacuated for treatment abroad, and equipment rebuilt at home",
          plain:
            "After the full-scale invasion, a programme called MedEvac sent Ukrainian cancer patients to hospitals in the European Union for treatment; 281 of the 339 cases studied in its first year were evacuated. At home, the state has bought linear accelerators for radiotherapy, and the National Cancer Institute opened its third in July 2026.",
          detail:
            "A study in JCO Global Oncology analysed the Ministry of Health's MedEvac records for April 2022 to April 2023: of 639 applications, 339 had enough data, and 281 of those patients (82.9%) were evacuated to EU hospitals, mostly newly diagnosed and mostly for systemic therapy. Patients in good general condition were much more likely to go, and patients with head and neck cancer much less. Medical Procurement of Ukraine said in February 2026, as reported by Interfax-Ukraine, that it bought 21 linear accelerators in 2023 and 2024 and, in 2025, equipment for nuclear medicine centres at the National Cancer Institute in Kyiv and in Lviv, due in 2027. The National Cancer Institute announced on 28 July 2026 that a third linear accelerator had gone into use, and credited the support of the Ministry and the agency. The 2026 payment rules pay radiotherapy on a linear accelerator 1.5 times the base rate and on older units 0.753 times. A 2025 pilot in Zaporizhzhia region, which the authors describe as war-affected, showed that HPV self-testing for cervical screening could run during active war, with 572 of 593 women offered a kit returning a sample.",
          links: [
            { label: "Huivaniuk et al., MedEvac for Ukrainian patients with cancer, JCO Glob Oncol 2024", url: "https://doi.org/10.1200/go-24-00363" },
            { label: "Interfax-Ukraine: MPU on cancer purchases (4 February 2026)", url: IFX_MPU },
            { label: "National Cancer Institute: third linear accelerator (28 July 2026)", url: NCI_LINAC },
            { label: "Kovalyov et al., HPV self-sampling during wartime, BMJ Glob Health 2026", url: "https://doi.org/10.1136/bmjgh-2026-023478" },
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
          id: "trials-in-ukraine",
          title: "Cancer trials opening in Ukraine fell from 45 in 2021 to 8 in 2022",
          plain:
            "Ukraine took part in many international cancer trials before 2022. On ClinicalTrials.gov, 45 interventional cancer studies with a Ukrainian site started in 2021 and 8 in 2022, the year of the full-scale invasion, with 17 in 2025. In OnCo's records 172 trials list Ukraine, most of them phase 3 trials run by international companies.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 4 November 2026: 172 trials list Ukraine among their countries, 145 of them phase 3; the registry shows 88 active but not recruiting, 52 completed, 25 recruiting and 7 terminated. ClinicalTrials.gov names Merck Sharp & Dohme as lead sponsor of 36, Hoffmann-La Roche of 22 and AstraZeneca of 14, and non-small cell lung cancer is the first-listed cancer for 30. By the start dates in OnCo's records, 28 began in 2020, 20 in 2021, 3 in 2022, 4 in 2023, 4 in 2024 and 10 in 2025. A direct count on ClinicalTrials.gov the same day, of interventional studies with the condition cancer and a location in Ukraine, gives 36 starting in 2018, 43 in 2019, 43 in 2020, 45 in 2021, 8 in 2022, 6 in 2023, 8 in 2024 and 17 in 2025; 44 cancer studies listing Ukraine were recruiting. The trial in OnCo's records with Ukraine as its only country is a phase 1/2 study of KLS-1 sponsored by Vector Vitale LLC. OpenAlex counts between 202 and 262 oncology papers a year with an author in Ukraine from 2021 to 2025, 1,120 in all.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Ukraine", url: CTGOV_UA },
            { label: "OpenAlex: oncology works by country", url: "https://openalex.org" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "survival-and-rates",
      title: "No survival figures, no rates per 100,000 and no full death count",
      plain:
        "This page gives counts, not rates, because Ukraine's registry has no population figures for 2024 and 2025 and says it cannot calculate rates. It also says it cannot reliably measure survival or deaths, because registries lost access to death records and many patients cannot be followed. No five-year survival figure is quoted.",
      detail:
        "Bulletin No. 27 states that, without demographic data from the State Statistics Service for 2024 and 2025, rates relative to the population cannot be calculated, and that because the registry cannot establish whether patients are alive it cannot reliably report mortality, one-year fatality, survival or prevalence. Of the 403,090 people diagnosed in 2021 to 2025 and still on its books, between 42.2% and 49.6% of each year's patients diagnosed in 2021 to 2024 were last seen in the year of diagnosis. Survival estimates for Ukraine in international studies were not read for this page. The number of people living after a cancer diagnosis, 1,164,449 at the end of 2025 excluding four regions, is likely to be an overestimate by the registry's own account.",
      links: [
        { label: "NCRU: analytical review and conclusions, Bulletin No. 27 (PDF)", url: NCRU_REVIEW },
        { label: "NCRU: definitions, Bulletin No. 27 (PDF)", url: NCRU_OPYS },
      ],
    },
    {
      id: "money-and-access-time",
      title: "Budgets, contract counts and time to treatment could not be read",
      plain:
        "The NHSU's own website did not answer when this page was written, so the money it spends on cancer packages, the number of hospitals contracted and patients treated are not given. No official figure was found for the time from a medicine's approval or assessment to its reaching Ukrainian patients.",
      detail:
        "nszu.gov.ua refused scripted requests on 4 November 2026, and the Internet Archive limited requests, so the NHSU's package statistics and budgets were not read; the 2026 payment rates come from the Cabinet resolution itself, read through an Internet Archive copy of zakon.rada.gov.ua because the legislation portal did not answer directly. Medical Procurement of Ukraine's website answers only to a browser, so its figures are quoted from the Ministry's announcement and from Interfax-Ukraine's report of the agency's statement. The prices agreed in managed entry agreements are confidential. Health technology assessment times are individual cases read from the State Expert Centre's list, not an average, and the cost-effectiveness scale it applies was read only as cited in one conclusion.",
      links: [
        { label: "Cabinet resolution No. 1808 (Internet Archive copy)", url: PMG_2026 },
        { label: "State Expert Centre: HTA applications and conclusions", url: DEC_HTA_DOSSIERS },
      ],
    },
    {
      id: "unreachable",
      title: "Sources and figures that could not be read on 4 November 2026",
      plain:
        "Some official figures were looked for and not found: how many people are screened under the 2025 order and how many girls received HPV vaccine in 2026, how many cancer trials the regulator authorises each year, and how cancer care is delivered in occupied territories.",
      detail:
        "No national figure for screening coverage or uptake under order No. 1368 was located, and the order's annexes were read as published in 2024, not checked for later amendments. HPV vaccination coverage for 2026 was not found. The State Expert Centre publishes clinical trial documents but no annual count of cancer trial authorisations was read. The current consolidated text of the 1996 medicines law was not readable, so its fast registration route is described from the February 2023 text and the Centre's current lists, which add the United Kingdom. Nothing about cancer care in the occupied territories could be sourced, and the registry does not count them.",
      links: [
        { label: "State Expert Centre", url: "https://www.dec.gov.ua" },
        { label: "Ministry of Health order No. 1368 (PDF)", url: SCREEN_ORDER },
      ],
    },
  ],
  institutions: ["nci-ukraine", "kavetsky-institute-kyiv", "ncru-ukraine", "nhsu", "dec-ukraine", "medical-procurement-ukraine", "ema", "oeci"],
  companies: [],
  drugs: ["palbociclib", "inotuzumab-ozogamicin", "gemtuzumab-ozogamicin", "atezolizumab", "pembrolizumab", "trastuzumab-deruxtecan", "letrozole", "tamoxifen", "exemestane"],
  trials: [
    "nct06506643", "nct07480356", "nct07221734", "nct07736937", "nct03459534", "astrum-005", "keynote-a18", "keynote-826", "flaura", "adaura",
    "alina", "impower150", "keynote-671", "mariposa", "magnitude", "nct06966700", "nct06841354", "nct07190248", "nct06452277", "nct05951179",
    "nct06788756", "latitude", "himalaya", "ember-3",
  ],
  papers: ["paper-huivaniuk-medevac-ukraine-cancer-2024", "paper-kovalyov-hpv-self-sampling-zaporizhzhia-2026"],
  people: ["olena-yefimenko", "vasyl-f-chekhun"],
  how:
    "Every card was written from Ukrainian sources read in Ukrainian from their raw text: the National Cancer Registry of Ukraine's Bulletin No. 27 on 2024 and 2025, the Cabinet of Ministers' resolution on the 2026 Programme of Medical Guarantees, the National Cancer Control Strategy and its 2026 to 2028 action plan, the 1996 and 2022 laws on medicinal products (read through Internet Archive copies of the legislation portal), the Ministry of Health's screening order and its annexes, the State Expert Centre's pages and its assessment of trastuzumab deruxtecan, and pages of the Ministry and the National Cancer Institute. Two figures from Medical Procurement of Ukraine are quoted as Interfax-Ukraine reported them. Trial counts come from OnCo's ClinicalTrials.gov records and a direct ClinicalTrials.gov count on 4 November 2026. The new records added for this page are the registry, the NHSU, the State Expert Centre, Medical Procurement of Ukraine and two papers.",
  verify:
    "The registry's figures undercount deaths and cases from occupied areas, as it says itself. Payment rates and the reimbursement list are set each year and the 2026 resolution has been amended several times. The medicines law changes on 1 January 2027. Before relying on whether a medicine is supplied free, ask the treating cancer centre, which receives centrally bought medicines.",
  verifyLinks: [
    { label: "NCRU: Bulletin No. 27", url: NCRU_B27 },
    { label: "Cabinet resolution No. 1808 (Internet Archive copy)", url: PMG_2026 },
    { label: "State Expert Centre", url: "https://www.dec.gov.ua" },
    { label: "Ministry of Health", url: "https://moz.gov.ua" },
  ],
};

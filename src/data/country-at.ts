import type { CountryDive } from "@/data/country-dive";

/**
 * Austria deep dive: the hand-written cards for /countries/at/. Austrian sources were read in German, from the raw text
 * of each page or file (pdftotext, the ODS spreadsheets' XML, or the HTML), not from a summary of it: Statistik
 * Austria's cancer statistics page, its press releases of 13 and 29 January 2026 and its incidence and mortality
 * spreadsheets from 1983 to 2024 (registry data of 12 January 2026); the health ministry's National Cancer Framework
 * Programme 2026 to 2035 and its Bewertungsboard page with the board's published decisions; section 351c of the
 * General Social Insurance Act on the Erstattungskodex (JUSLINE's consolidated text, because the federal legal
 * information system answered 503); the ÖSG 2023 table volume with the large equipment plan (Gesundheit Österreich's
 * repository); the BASG's own description; the breast screening programme's site; Upper Austria's HPV page; the
 * Vienna Chamber of Labour's page on prescription charges; MedAustron's and the Krebshilfe's own pages. The OECD and
 * European Commission's Country Cancer Profile Austria 2025 was read raw in English. Every figure below is quoted from
 * one of those; where a figure could not be read it is named under `gaps`.
 */
const SA = "https://www.statistik.at/statistiken/bevoelkerung-und-soziales/gesundheit/krebserkrankungen";
const SA_PM_2026 = "https://www.statistik.at/fileadmin/announcement/2026/01/20260129Krebsstatistik.pdf";
const SA_PROGNOSE = "https://www.statistik.at/fileadmin/announcement/2026/01/20260113Krebsprognose.pdf";
const SA_KI = "https://www.statistik.at/fileadmin/pages/396/1_1_KI_ab1983_2024.ods";
const SA_KM = "https://www.statistik.at/fileadmin/pages/396/1_2_KM_ab1983_2024.ods";
const CCP_2025 = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-at-2024-1658-en.pdf";
const KRP_2026 = "https://broschuerenservice.sozialministerium.gv.at/Home/Download?publicationId=929&attachmentName=Nationales_Krebsrahmenprogramm_2026_bis_2035.pdf";
const KRP_PAGE = "https://www.sozialministerium.gv.at/Themen/Gesundheit/Nicht-uebertragbare-Krankheiten/Krebs/Nationales-Krebsrahmenprogramm.html";
const BB = "https://www.sozialministerium.gv.at/Themen/Gesundheit/Gesundheitssystem/Bewertungsboard.html";
const BB_TV = "https://www.sozialministerium.gv.at/dam/jcr:38c9f72f-f461-46fc-8415-8edf173be52b/Beschluss%20Tisotumab%20vedotin%2024.06.2026.pdf";
const BB_OBECEL = "https://www.sozialministerium.gv.at/dam/jcr:ac75a7ef-9b01-4313-9f84-79aad56b3435/Beschluss%20Obe-cel%2019.11.2025.pdf";
const BB_LIFI = "https://www.sozialministerium.gv.at/dam/jcr:135c35fa-4923-48bb-bc00-a142e916f58b/Beschluss%20zur%20Beendigung%20des%20Bewertungsboardverfahrens%20zu%20Lifileucel%20(AMTAGVI%C2%AE)%2010.09.2025.pdf";
const ASVG_351C = "https://www.jusline.at/gesetz/asvg/paragraf/351c";
const ASVG_30B = "https://www.jusline.at/gesetz/asvg/paragraf/30b";
const OEGK = "https://www.gesundheitskasse.at/cdscontent/?contentid=10007.867331&portal=oegkportal";
const AK_RG = "https://wien.arbeiterkammer.at/beratung/arbeitundrecht/krankheitundpflege/krankheit/Befreiung_von_der_Rezeptgebuehr.html";
const BASG = "https://www.basg.gv.at/ueber-uns";
const FE = "https://www.frueh-erkennen.at/brustkrebs-frueherkennungsprogramm/";
const HPV_OOE = "https://www.land-oberoesterreich.gv.at/129779.htm";
const OESG_TAB = "https://jasmin.goeg.at/id/eprint/3636/";
const MA = "https://www.medaustron.at/en/about-us/";
const MA_INS = "https://www.medaustron.at/en/insurance/";
const MA_TC = "https://www.medaustron.at/en/therapy-center/";
const KH = "https://www.krebshilfe.net/ueber-uns/geschichte";

export const AT_DIVE: CountryDive = {
  iso2: "AT",
  iso3: "AUT",
  name: "Austria",
  flag: "🇦🇹",
  asOf: "2026-11-11",
  title: "Cancer in Austria",
  description:
    "Cancer in Austria from Austrian sources: 48,360 new cancers and 21,345 cancer deaths counted by the national cancer registry in 2024, a new cancer framework programme for 2026 to 2035, near-universal social health insurance, an outpatient reimbursement list and a national board for costly hospital medicines, one nationwide screening programme (breast), opportunistic bowel and cervical screening, and an ion therapy centre in Wiener Neustadt.",
  lede:
    "Austria has counted every cancer diagnosed or treated in its hospitals for more than 40 years: 48,360 new cancers in 2024 and 21,345 cancer deaths. The age-standardised risk of getting cancer has hardly changed over ten years, while the risk of dying from it has fallen, so more people live with cancer each year, about 409,000 at the start of 2025.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Austria is 46,684 new cancers and 22,559 deaths in 2024. Its fact sheet names the source as Austria's national registry, with national rates projected forward to 2024 from past trends, and WHO mortality data projected the same way; non-melanoma skin cancer adds nothing to the incidence total and 177 deaths. Statistik Austria has since counted the year itself: 48,360 new malignant cancers (C00 to C97 without C44, including cases known only from a death certificate), about 3.6% more than the estimate, and 21,345 cancer deaths, about 5.4% fewer. The gap is widest for prostate cancer (8,152 registered against 6,661 estimated) and breast cancer in women (6,959 registered against 5,623). Neither source explains the difference, so it is stated here rather than explained. Statistik Austria's death count links the registry with the cause-of-death statistics under the rules of the International Association of Cancer Registries, so it differs slightly from the cause-of-death statistics alone. Rates in the national tables use the 2013 European standard population, IARC's use the world standard, so the rates are not comparable; only the counts are.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Austria",
      aside: { label: "Statistik Austria: Krebserkrankungen", url: SA },
      cards: [
        {
          id: "shape",
          title: "48,360 new cancers in 2024, and lung cancer the commonest cause of cancer death",
          plain:
            "In 2024, 22,363 women and 25,997 men in Austria were told they had cancer. Breast cancer was the commonest in women and prostate cancer in men, followed by lung and bowel cancer. Lung cancer caused the most cancer deaths, about one in five in both sexes.",
          detail:
            "Statistik Austria's press release of 29 January 2026, from the Austrian National Cancer Registry with data of 12 January 2026, counts 48,360 new cancers in 2024, up from 41,529 in 2014, while the age-standardised incidence rate stayed nearly unchanged (500.8 against 497.4 per 100,000). Breast cancer accounted for about 31% of new cancers in women (6,959) and 18% of their cancer deaths (1,755); prostate cancer for 31% of new cancers in men (8,152) and 12% of their cancer deaths. Lung cancer was second in both sexes, 2,513 cases in women and 3,020 in men, and caused 18% of women's cancer deaths (1,761) and 21% of men's (2,463). Bowel cancer was third, 2,169 cases in women and 2,600 in men. The mortality spreadsheet shows the age-standardised cancer death rate falling from 247.2 per 100,000 in 2014 to 218.8 in 2024. Five-year relative survival for all cancers diagnosed in 2016 to 2020 was 63.7%.",
          links: [
            { label: "Statistik Austria: press release 14 099-018/26, 29 January 2026 (PDF)", url: SA_PM_2026 },
            { label: "Statistik Austria: incidence by site and sex from 1983 (ODS)", url: SA_KI },
            { label: "Statistik Austria: mortality by site and sex from 1983 (ODS)", url: SA_KM },
          ],
        },
        {
          id: "prognosis-2045",
          title: "More cancers by 2045 because the population is ageing, not because the risk is rising",
          plain:
            "A forecast made for the health ministry expects about 56,500 new cancers a year by 2045, a fifth more than in 2023, mainly because there will be more older people. The age-adjusted risk of getting cancer is expected to fall slightly, and the risk of dying from it by almost a fifth. Lung cancer is expected to become more common in women than in men around 2035.",
          detail:
            "Statistik Austria's forecast for the ministry, published on 13 January 2026, projects in its trend variant 56,546 new cancers in 2045 against 46,518 in 2023 (+21.6%), 25,277 cancer deaths against 20,906 (+20.9%), and 607,654 people living after a cancer diagnosis against 395,067 (+53.8%). Over the same period the age-standardised incidence rate is expected to fall by 3.9% to 469.6 per 100,000 and the death rate by 18.9% to 177.5. Prostate cancer diagnoses are projected to rise from 7,485 to 11,891 and breast cancer from 6,902 to 8,269. The age-standardised lung cancer rate was 66.9 per 100,000 men and 45.8 per 100,000 women in 2023; the forecast has the two crossing around 2035 and reaching 46.5 in men and 65.5 in women by 2045. People aged 65 and over are expected to number more than 2.5 million in 2045, about 27% of the population, against about 1.8 million (20%) in 2024.",
          links: [{ label: "Statistik Austria: press release on the cancer forecast to 2045, 13 January 2026 (PDF)", url: SA_PROGNOSE }],
        },
      ],
      tables: [
        {
          id: "registry-2024",
          title: "New cancers, five-year survival and deaths in Austria, by site",
          caption: "Austrian National Cancer Registry (data of 12 January 2026) and cause-of-death statistics. New cancers and deaths in 2024; five-year relative survival for cancers diagnosed in 2016 to 2020, follow-up to 15 December 2025.",
          columns: [
            { key: "site", label: "Site (ICD-10)" },
            { key: "cases", label: "New cancers 2024", numeric: true },
            { key: "surv", label: "5-year relative survival, %", numeric: true },
            { key: "deaths", label: "Deaths 2024", numeric: true },
          ],
          rows: [
            { site: "All cancers (C00-C97 without C44)", cases: 48360, surv: 63.7, deaths: 21345 },
            { site: "Prostate (C61)", cases: 8152, surv: 95.3, deaths: 1434 },
            { site: "Breast (C50)", cases: 7041, surv: 88.2, deaths: 1775 },
            { site: "Lung (C33-C34)", cases: 5533, surv: 26.2, deaths: 4224 },
            { site: "Colon and rectum (C18-C21)", cases: 4769, surv: 63.4, deaths: 2073 },
            { site: "Pancreas (C25)", cases: 2039, surv: 12.5, deaths: 2057 },
            { site: "Melanoma (C43)", cases: 2015, surv: 84.1, deaths: 419 },
            { site: "Non-Hodgkin lymphoma (C82-C86, C96, B21.2)", cases: 1634, surv: 68.9, deaths: 629 },
            { site: "Kidney (C64)", cases: 1575, surv: 80.2, deaths: 428 },
            { site: "Bladder (C67)", cases: 1384, surv: 64.8, deaths: 530 },
            { site: "Stomach (C16)", cases: 1347, surv: 37.9, deaths: 694 },
            { site: "Leukaemia (C91-C95)", cases: 1258, surv: 56.0, deaths: 823 },
            { site: "Head and neck (C00-C14)", cases: 1242, surv: 56.3, deaths: 548 },
            { site: "Liver (C22)", cases: 999, surv: 18.3, deaths: 848 },
            { site: "Ovary (C56)", cases: 706, surv: 47.3, deaths: 506 },
            { site: "Brain (C70-C72)", cases: 650, surv: 29.2, deaths: 608 },
            { site: "Cervix (C53)", cases: 380, surv: 69.8, deaths: 138 },
          ],
          note: "Counts are malignant invasive tumours including cases known only from a death certificate; a person with two primary cancers is counted twice. Breast counts both sexes (6,959 in women). Survival is relative survival, which compares patients with people of the same age and sex in the general population.",
          sources: [{ label: "Statistik Austria: press release 14 099-018/26, table, 29 January 2026 (PDF)", url: SA_PM_2026 }],
        },
        {
          id: "registry-trend",
          title: "New cancers and cancer deaths in Austria, 2014 to 2024",
          caption: "All malignant cancers (C00-C97 without C44), both sexes. Age-standardised rates per 100,000, European standard population 2013. Statistik Austria spreadsheets created 14 January 2026.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "incAsr", label: "Incidence rate", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
            { key: "mortAsr", label: "Death rate", numeric: true },
          ],
          rows: [
            { year: "2014", cases: 41529, incAsr: 497.4, deaths: 20392, mortAsr: 247.2 },
            { year: "2016", cases: 42764, incAsr: 497.7, deaths: 20060, mortAsr: 235.2 },
            { year: "2018", cases: 42798, incAsr: 483.1, deaths: 20431, mortAsr: 231.8 },
            { year: "2020", cases: 44520, incAsr: 488.3, deaths: 20816, mortAsr: 227.8 },
            { year: "2022", cases: 46031, incAsr: 491.1, deaths: 21005, mortAsr: 223.4 },
            { year: "2023", cases: 46797, incAsr: 491.6, deaths: 20906, mortAsr: 218.8 },
            { year: "2024", cases: 48360, incAsr: 500.8, deaths: 21345, mortAsr: 218.8 },
          ],
          note: "Counts rise as the population ages while the age-adjusted incidence rate stays near 490 to 500 and the death rate falls. Later registry updates can change a year's count: the January 2026 forecast quotes 46,518 new cancers for 2023, from earlier data.",
          sources: [
            { label: "Statistik Austria: incidence from 1983 (ODS)", url: SA_KI },
            { label: "Statistik Austria: mortality from 1983 (ODS)", url: SA_KM },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry run by the statistics office",
      aside: { label: "Statistik Austria: Krebserkrankungen", url: SA },
      cards: [
        {
          id: "krebsregister",
          title: "A legal duty on every hospital to report, since the Cancer Statistics Act of 1969",
          plain:
            "Every Austrian hospital must report each cancer it diagnoses or treats, and each cancer death, to the national cancer registry kept by Statistik Austria. Since 2019 and 2020 the registry no longer holds names: each person is identified by a pseudonym that lets the statisticians link records without knowing who they are.",
          detail:
            "Statistik Austria's page describes the Österreichisches Nationales Krebsregister as recording cases diagnosed or treated in hospitals, with a duty to report every case and every cancer death under the Krebsstatistikgesetz 1969 and the Krebsstatistikverordnung 2019; figures are published every year before World Cancer Day on 4 February. The January 2026 press release explains that in 2019 and 2020 names, addresses and social insurance numbers were fully replaced with a sector-specific pseudonym for official statistics (bPK-AS), which allows a person's reports to be joined and linked with population statistics from the central residence register. That linkage now removes people who do not live in Austria, which lowered total prevalence across all years since 2002 by more than 20,000 people; since the data of 12 January 2026 the five-year prevalence by person counts the most recent tumour rather than the first. The National Cancer Framework Programme 2026 to 2035 adds that the 2019 regulation made reporting digital only. The OECD's 2025 profile notes that the registry holds stage, treatment and survival but no screening, genetic or patient-reported data.",
          links: [
            { label: "Statistik Austria: Krebserkrankungen", url: SA },
            { label: "Statistik Austria: press release, 29 January 2026, methods (PDF)", url: SA_PM_2026 },
            { label: "OECD/EC: Country Cancer Profile Austria 2025, section 5.2 (PDF)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: social health insurance, with hospitals funded separately",
      aside: { label: "OECD/EC: Country Cancer Profile Austria 2025 (PDF)", url: CCP_2025 },
      cards: [
        {
          id: "shi",
          title: "Near-universal insurance, and five funds instead of 21 since 2020",
          plain:
            "Almost everyone in Austria has social health insurance; about 0.1% of people had none in 2021. People are assigned to a fund by their occupation, and since 2020 there are five funds instead of 21, the largest covering more than 80% of insured people. Federal government, states and insurance bodies share responsibility for care.",
          detail:
            "The OECD and European Commission's 2025 profile describes the Austrian system as structurally and financially fragmented, with governance divided between the federal government, the states and corporatist bodies, social health insurance covering all but about 0.1% of the population in 2021, and assignment to funds by occupation. The 2020 mergers cut the number of funds from 21 to 5, and the largest now covers more than 80% of the insured; the ÖGK's own page says it is the largest, formed on 1 January 2020 from the nine former regional funds, and insures 7.6 million people, about 82% of those living in Austria. But benefits still differ because the merger left the legal framework for negotiating contracts between the funds and state-level representations of healthcare providers unchanged. Health spending per person reached EUR 4,745 in purchasing power terms in 2022, against an EU average of EUR 3,533, about 11% of GDP. Most private spending is out of pocket, mainly for doctors without insurance contracts and for co-payments. The profile also notes that the system remains centred on hospitals, and that outpatient cancer medicine prices sit around the EU median while inpatient prices are among the highest in the EU, which it attributes to the lack of price regulation for hospital medicines.",
          links: [
            { label: "OECD/EC: Country Cancer Profile Austria 2025, sections 5.1 and 5.3 (PDF)", url: CCP_2025 },
            { label: "ÖGK: Über die ÖGK", url: OEGK },
          ],
        },
        {
          id: "prescription-charge",
          title: "A prescription charge of 7.55 euros, capped at 2% of yearly net income",
          plain:
            "For each prescription filled at a pharmacy, an insured person pays a flat charge of 7.55 euros in 2026. Once these charges reach 2% of a person's yearly net income, no more are due that year. People on low incomes can ask the ÖGK to be exempted, and some groups are exempt automatically.",
          detail:
            "The Vienna Chamber of Labour's page, with values for 2026, gives the prescription charge as 7.55 euros, unchanged from 2025. Recipients of the pension equalisation supplement, people insured through social assistance, people with a notifiable communicable disease, civilian service workers and asylum seekers in basic care are exempt without applying. Others can apply to the ÖGK if their income is below 1,308.39 euros (2,064.12 euros for a couple living together), or 1,504.65 and 2,373.74 euros where illness causes above-average costs; the page does not say over what period the limits are counted. Those not exempt stop paying once their charges, together with prescribed reimbursable medicines that cost less than the charge, reach 2% of yearly net income; the page says this percentage will fall step by step to 1.5% in 2030. The page cites the 2008 guidelines on exemption as the legal basis. How much a cancer patient pays in total, including hospital day charges, was not found in one source.",
          links: [{ label: "Arbeiterkammer Wien: Befreiung von der Rezeptgebühr (values for 2026)", url: AK_RG }],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Austria decides which cancer medicines are paid for",
      aside: { label: "BMASGPK: Bewertungsboard", url: BB },
      cards: [
        {
          id: "eko",
          title: "Outpatient medicines: the Erstattungskodex and its red, yellow and green boxes",
          plain:
            "A medicine prescribed outside hospital is paid for by social insurance only if it is listed in the Erstattungskodex, run by the umbrella body of the social insurance funds. A company applies, the medicine sits in a temporary red box while it is assessed, and the umbrella body then decides whether to list it in the yellow box, which needs approval from the insurer's medical service, or the green box, which does not.",
          detail:
            "Section 351c of the General Social Insurance Act (ASVG), in the consolidated text read on 11 November 2026, provides that the marketing authorisation holder applies to the Dachverband for inclusion in the yellow or green area of the Erstattungskodex; once a complete application with the authorisation number, a price, confirmation of supply and the patent expiry date arrives, the medicine is placed temporarily in the red area. If within 90 days (180 days where a price is also decided) the Dachverband finds it should not be listed in yellow or green, it is removed from red. The applicant must submit pharmacological, medical-therapeutic and health-economic evidence, in particular on whether there is a substantial therapeutic benefit or innovation. For the red and yellow areas, the pricing commission determines an EU average price from prices in member states, taking account of their statutory rebates. Section 30b of the same Act defines the areas: medicines in the red and yellow areas need approval from the insurers' chief and control medical service, while green-area medicines can be dispensed on a prescription without it. The health ministry's Bewertungsboard page says the Erstattungskodex procedure has long included a check of added benefit for medicines used outside hospital.",
          links: [
            { label: "§ 351c ASVG, Erstattungskodex (JUSLINE consolidated text)", url: ASVG_351C },
            { label: "§ 30b ASVG, red, yellow and green areas (JUSLINE consolidated text)", url: ASVG_30B },
            { label: "BMASGPK: Bewertungsboard, background", url: BB },
          ],
        },
        {
          id: "bewertungsboard",
          title: "Costly hospital medicines: a national board since 2024, and its cancer decisions",
          plain:
            "The health ministry says that because Austria's system is fragmented, access to new medicines has not always been the same across the country. Since the 2023 health reform, a national board assesses selected expensive medicines used in hospitals and recommends whether and how to use them. It recommended tisotumab vedotin for advanced cervical cancer in June 2026 under conditions, and did not recommend the CAR-T therapy obe-cel for adults over 25 with relapsed B-cell leukaemia in November 2025.",
          detail:
            "The ministry's page describes the Bewertungsboard, set up under section 62d and following of the federal Hospitals Act as part of the reform agreed at the end of 2023, to give fair and fast access to selected high-priced specialised medicines and uniform use across Austria; it first met on 11 September 2024. Its members are nominated by the states, social insurance, the minister, the universities' conference and the patient advocates, over 85% with a medical or scientific background. Its recommendations are expert opinions, and the treatment decision stays with the treating doctor; the ministry says that because the system is fragmented, access to new medicines has not always been uniform. Its decision of 24 June 2026 recommends tisotumab vedotin for recurrent or metastatic cervical cancer progressing after systemic therapy for patients who meet the innovaTV 301 trial's criteria, rates the added benefit as moderate against non-platinum chemotherapy, asks for indication by a tumour board, outpatient treatment in a specialised gynaecological oncology centre and data collection in a single register, and plans a re-evaluation between the last quarter of 2030 and the second quarter of 2031. On 19 November 2025 it did not recommend obe-cel for adults aged 26 and over with relapsed or refractory B-cell acute lymphoblastic leukaemia, finding the added benefit over allogeneic transplant not fully quantifiable from a single-arm phase 1b/2 study. On 10 September 2025 it closed its assessment of lifileucel for melanoma without a recommendation, because the company had withdrawn its EU application.",
          links: [
            { label: "BMASGPK: Bewertungsboard für ausgewählte Arzneimittel", url: BB },
            { label: "Bewertungsboard: decision on tisotumab vedotin, 24 June 2026 (PDF)", url: BB_TV },
            { label: "Bewertungsboard: decision on obe-cel, 19 November 2025 (PDF)", url: BB_OBECEL },
            { label: "Bewertungsboard: closure of the lifileucel procedure, 10 September 2025 (PDF)", url: BB_LIFI },
          ],
        },
        {
          id: "access-speed",
          title: "83 days from EU authorisation to coverage, with more restrictions than its peers",
          plain:
            "In an OECD comparison of new breast and lung cancer medicines, Austria paid for 77% of the indications sampled, more than the EU average of 59%, and took 83 days on average from European approval to national coverage, the second-shortest wait after Germany. But it limited 30% of the newer indications to fewer patients than the European approval allows.",
          detail:
            "The OECD and European Commission's 2025 profile, citing Hofmarcher, Berchet and Dedet (2024), reports that 77% of a sample of 13 indications of 10 new breast and lung cancer medicines with high clinical benefit were on Austria's public reimbursement list on 1 April 2023, against an EU average of 59% and 75% among Austria's economic peers, and that 84% of 19 biosimilars of bevacizumab, rituximab and trastuzumab were covered, against 63% among its peers. The average time between European Medicines Agency authorisation and national coverage was 83 days, second only to Germany at 20 days. However, 30% of indications of newer cancer medicines carried restrictions on the eligible population beyond the EMA approval, the highest share among its economic peers, for example limiting coverage to the patients most likely to benefit where effectiveness is uncertain. Austria uses financial managed entry agreements and conditional reimbursement with later reassessment and price renegotiation, and takes part in the Beneluxa Initiative on health technology assessment with Belgium, the Netherlands, Luxembourg and Ireland.",
          links: [{ label: "OECD/EC: Country Cancer Profile Austria 2025, section 5.1 and figure 13 (PDF)", url: CCP_2025 }],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: BASG and AGES, inside the European system",
      aside: { label: "BASG: Über uns", url: BASG },
      cards: [
        {
          id: "basg-card",
          title: "A federal office whose staff come from the AGES medicines agency",
          plain:
            "New cancer medicines are authorised once for the whole European Union through the European Medicines Agency, so they are legally available in Austria at the same time as in other member states. Austria's own medicines authority, the BASG, approves national applications and clinical trials, monitors side effects and inspects manufacturers. Its work is done by staff of the AGES medicines market surveillance division.",
          detail:
            "The BASG's own description says the Bundesamt für Sicherheit im Gesundheitswesen began work on 2 January 2006, together with the medicines market surveillance division of the Austrian Agency for Health and Food Safety (AGES MEA, called AGES PharmMed until 1 January 2012), as the national authority for medicines, medical devices, blood and tissues, after the tasks were moved out of the health ministry. It is responsible for which medicines are newly authorised in Austria, for authorising clinical trials of medicines and medical devices, for pharmacovigilance and device vigilance, and for inspections, and it monitors medicines on the market nationally and with its European sister agencies. The BASG is an authority under the ministry, made up of three members appointed by the minister, one from the ministry and two from AGES MEA; AGES provides its services, staff and buildings, and AGES MEA staff act in the BASG's name. Its legal basis is the Health and Food Safety Act. Medicines authorised through the EU centralised procedure are then priced and assessed for reimbursement in Austria as described above.",
          links: [
            { label: "BASG: Über uns", url: BASG },
            { label: "EMA: authorisation of medicines, the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination: one national programme, and two still opportunistic",
      aside: { label: "Österreichisches Brustkrebs-Früherkennungsprogramm", url: FE },
      cards: [
        {
          id: "breast-screening",
          title: "Breast screening since 2014: the e-card opens a mammogram every two years from 45 to 74",
          plain:
            "Austria's breast screening programme started in 2014. For women aged 45 to 74, the insurance card is automatically activated for a screening mammogram every two years, without a referral; women aged 40 to 44 or over 74 can sign up. About 41% of eligible women took part in 2022, and participation varied from 12% to 51% between regions in 2020 and 2021.",
          detail:
            "The programme's site, früh erkennen, describes it as a joint initiative of the federal government, social insurance, the states and the Austrian Medical Chamber, started in 2014, with the e-card of women aged 45 to 74 automatically activated for an early detection mammogram every two years and women of 40 to 44 or over 74 able to join voluntarily after talking to their doctor. It tells women that about 30 in 1,000 get an abnormal result, and that in about 24 of these 30 further tests show no breast cancer. The OECD's 2025 profile reports participation of 41% in 2022, among the lower rates in the EU, a gap of 12 percentage points by education, and regional participation from 12% to 51% in 2020 to 2021. Citing the fourth evaluation report by Gesundheit Österreich, it records 614,835 women aged 45 to 69 screened in 2020 and 2021, 40% of those eligible, with a 13% fall in 2020 during COVID-19 and a rebound in 2021. Since 2023 GPs and gynaecologists are paid for a consultation about the programme. The National Cancer Framework Programme 2026 to 2035 calls it the only nationwide organised cancer screening programme in Austria.",
          links: [
            { label: "früh erkennen: über das Programm", url: FE },
            { label: "OECD/EC: Country Cancer Profile Austria 2025, section 4 and box 2 (PDF)", url: CCP_2025 },
            { label: "Nationales Krebsrahmenprogramm 2026 bis 2035, screening chapter (PDF)", url: KRP_2026 },
          ],
        },
        {
          id: "bowel-cervix",
          title: "Bowel and cervical screening: widely used, but not yet organised programmes",
          plain:
            "Bowel cancer screening in Austria is offered when people ask their doctor, from age 45 since 2023, by colonoscopy every ten years or a stool test every two years. A national screening committee recommended an organised programme in 2023, and pilots are planned. Cervical screening is also opportunistic, but 85% of women aged 20 to 69 said in 2019 that they had been tested in the past three years.",
          detail:
            "The OECD's 2025 profile records that in January 2023 the recommended starting age for bowel screening was lowered to 45, with a target range of 45 to 75, colonoscopy every ten years or a faecal immunochemical test every two years followed by colonoscopy if positive, and that the stool test is not covered uniformly across the country. Self-reported participation among people aged 50 to 74 rose from 59% in 2014 to 64% in 2019, with 52% of men and 62% of women, one of the largest gaps between the sexes in the EU. The National Cancer Framework Programme 2026 to 2035 says the National Screening Committee for Cancer, founded in 2021, has made a recommendation for an organised bowel programme that the federal steering commission has taken note of, that a national quality standard exists, and that pilots in several regions and a national roll-out are envisaged; a recommendation on cervical screening is planned. For cervical screening the profile reports self-reported coverage of 85% in 2019, up from 82% in 2006, while five-year survival after cervical cancer stayed at about 66%, similar to the late 1990s; it suggests an HPV-based, quality-assured national programme.",
          links: [
            { label: "Nationales Krebsrahmenprogramm 2026 bis 2035, screening chapter (PDF)", url: KRP_2026 },
            { label: "OECD/EC: Country Cancer Profile Austria 2025, section 4 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "hpv-hbv",
          title: "HPV vaccination free from 9 to 21, with about half of 15-year-olds fully vaccinated",
          plain:
            "HPV vaccination is free for girls and boys from their 9th to their 21st birthday, at public vaccination centres and at participating doctors with a voucher. A temporary offer let people aged 21 to 29 start free vaccination until the end of 2025. About 53% of 15-year-olds had both doses in 2021, which the OECD places in the bottom third of EU countries.",
          detail:
            "The Upper Austrian state government's HPV page states that the vaccine is free up to the 21st birthday at public vaccination centres and at participating practices with a voucher, that later doses stay free if the first dose was given before the 21st birthday, and that a two-dose schedule is used up to 30 and three doses from 30. The OECD's 2025 profile describes free vaccination from age 9 for all genders, extended to 21, with people aged 21 to 29 eligible from 1 July 2024 to 31 December 2025, registration in the electronic vaccination record, and vaccination in schools, public centres, practices and during military service; it gives about 53% of 15-year-old boys and girls with both doses in 2021, citing the WHO, and quotes Waser, Heiss and Borena (2022) that rates remain too low for herd immunity. It also gives hepatitis B coverage among one-year-olds of 84%, the lowest in the EU, against an EU average of 92%. Current national HPV coverage was not found in a source that could be read.",
          links: [
            { label: "Land Oberösterreich: HPV-Impfung", url: HPV_OOE },
            { label: "OECD/EC: Country Cancer Profile Austria 2025, section 3 (PDF)", url: CCP_2025 },
          ],
        },
      ],
    },
    {
      id: "radiotherapy",
      nav: "Radiotherapy",
      title: "Radiotherapy and workforce: fewer machines than planned, many doctors",
      aside: { label: "ÖSG 2023 Tabellenband inklusive Großgeräteplan (GÖG)", url: OESG_TAB },
      cards: [
        {
          id: "linacs",
          title: "46 radiotherapy machines counted against 57 planned, and none in Burgenland",
          plain:
            "Austria's federal health structure plan sets how many large medical machines each state may have. Its 2023 equipment plan provides for 57 radiotherapy machines across Austria and counts 46 installed, with none planned or installed in Burgenland. The OECD puts Austria at 6 radiotherapy units per million people, 27% below the EU average.",
          detail:
            "The large equipment plan in annex 10 of the Austrian Structural Plan for Health 2023 (table volume of 15 December 2023), agreed by the federal steering commission, lists for Austria as a whole 46 radiotherapy devices (STR) in its count of installed equipment against 57 in the plan: 45 against 56 in publicly funded hospitals and 1 against 1 outside hospitals, the outside one being MedAustron, which the plan records as one facility rather than by device. By state the installed and planned figures are Vienna 12 and 15, Lower Austria 7 and 10, Upper Austria 7 and 7, Styria 6 and 9, Tyrol 5 and 5, Carinthia 3 and 4, Salzburg 3 and 4, Vorarlberg 3 and 3, and Burgenland 0 and 0. The plan's legend dates the installed count to 31 December 2018, while a footnote records a third linear accelerator at Klinik Hietzing in Vienna removed in 2020, so the count mixes dates and is older than the plan. The OECD's 2025 profile gives 6 units per million people, 27% below the EU average of 8 and 34% below Austria's economic peers, an 18% increase since 2012, and about half the equipment under ten years old.",
          links: [
            { label: "ÖSG 2023 Tabellenband, annex 10 Großgeräteplan, Österreich (GÖG repository)", url: OESG_TAB },
            { label: "OECD/EC: Country Cancer Profile Austria 2025, section 5.1 and figure 14 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "workforce",
          title: "Many doctors and nurses per new cancer, but shortages in radiation therapists and rural care",
          plain:
            "Austria has 1,091 doctors and 2,170 nurses for every 1,000 new cancer cases, far above the EU averages, and 8 oncologists per 100,000 people. But the OECD records shortages of GPs, radiation therapists and oncology nurses, especially in rural areas, and there is no official specialisation for cancer nursing.",
          detail:
            "The OECD and European Commission's 2025 profile, from OECD Health Statistics 2024, gives 1,091 physicians and 2,170 nurses per 1,000 new cancer cases, against EU averages of 679 and 1,376, and 8 oncologists per 100,000 people, but reports that Austria, with Czechia, Hungary and Italy, has an inadequate geographical distribution of oncologists. Its 2023 policy survey found shortages of GPs and family doctors, radiation therapists, inpatient oncology nurses and community nurses, most acute in rural regions, and the profile cites a projected shortfall of about 75,000 nurses by 2030. There is no official cancer nursing specialisation; courses can be as short as four weeks. The profile also describes a tiered system of comprehensive centres meant to be reachable within 120 minutes for a catchment of at least 500,000 people, specialist centres within 60 minutes for at least 300,000, and associated centres, with rare cancers centralised at reference centres and referral abroad where needed. It counts 2.5 PET scanners, 26 MRI units and 28 CT scanners per million people, each above the EU average.",
          links: [{ label: "OECD/EC: Country Cancer Profile Austria 2025, sections 5.1 and 5.2 (PDF)", url: CCP_2025 }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Austria does",
      title: "What Austria does that others do not",
      cards: [
        {
          id: "medaustron-card",
          title: "Protons and carbon ions in Wiener Neustadt, paid for by insurance on an agreed list",
          plain:
            "MedAustron in Wiener Neustadt, about 50 km south of Vienna, treats cancer with beams of protons and carbon ions from a particle accelerator developed with CERN. It is the only such centre in Austria, by its own account. Austrian social insurance pays when the cancer is on a list agreed with the insurers' umbrella body, or after individual approval following a tumour board decision.",
          detail:
            "MedAustron describes itself as a cancer treatment and research centre run as a limited company indirectly owned by the State of Lower Austria, working as an independent outpatient clinic with more than 250 staff, and as the teaching and research site of Karl Landsteiner University of Health Sciences for radiation oncology and medical physics. It says its accelerator is unique in Austria, that comparable facilities exist at five other centres worldwide, and that it uses three treatment rooms. Its insurance page states that patients insured in Austria are generally covered if the indication matches the list agreed with the Federation of Austrian Social Insurance Institutions; for other indications the centre applies for individual approval, which requires a tumour board to have judged ion therapy the most suitable treatment. Privately paying patients resident in Austria pay the full cost in advance. Patients insured in another EU country can apply to their own insurer. The equipment plan counts MedAustron as the one radiotherapy facility outside hospitals.",
          links: [
            { label: "MedAustron: about us", url: MA },
            { label: "MedAustron: therapy center", url: MA_TC },
            { label: "MedAustron: insurance", url: MA_INS },
          ],
        },
        {
          id: "framework-2026",
          title: "A second cancer framework programme, for 2026 to 2035",
          plain:
            "Austria's first National Cancer Framework Programme ran from 2014 to 2025. The health ministry published a second one for 2026 to 2035, written as an expert paper that sets goals, measures and indicators across the whole path from prevention to palliative care, but deliberately names no one responsible and no deadlines.",
          detail:
            "The ministry's page describes the Nationales Krebsrahmenprogramm 2026 to 2035 as a strategic, public health expert paper building on the 2014 programme and on Europe's Beating Cancer Plan and the EU Cancer Mission, with six cross-cutting themes: participation of the public and stakeholders, equity, health literacy, the health workforce, data and digitalisation, and research and innovation. The document itself states that it sets no responsibilities or milestones; the oncology advisory board, a commission under the Federal Ministries Act, chooses priorities each year according to what can be financed. It lists among the first programme's results the National Screening Committee for Cancer in 2021, a model rulebook for tumour boards in 2015, a national information point and online platform on cancer trials at gesundheit.gv.at in 2017, digital-only reporting to the registry under the 2019 regulation, the survivorship passport for childhood cancer survivors in the electronic health record, and the smoking ban in restaurants and bars from 2019. The OECD's 2025 profile records that Austria had not enacted a right to be forgotten for cancer survivors and lacks dedicated fertility preservation programmes for them.",
          links: [
            { label: "BMASGPK: Nationales Krebsrahmenprogramm", url: KRP_PAGE },
            { label: "Nationales Krebsrahmenprogramm 2026 bis 2035, chapter 1 (PDF)", url: KRP_2026 },
            { label: "OECD/EC: Country Cancer Profile Austria 2025, section 5.4 (PDF)", url: CCP_2025 },
          ],
        },
        {
          id: "krebshilfe-card",
          title: "A cancer charity founded in 1910, with 63 counselling centres",
          plain:
            "The Austrian Cancer Aid (Österreichische Krebshilfe) began as a society for research into cancer and its control, founded in Vienna in 1910. It now runs 63 counselling centres across the country and gives emergency financial help to patients whom cancer has put in financial difficulty.",
          detail:
            "The Krebshilfe's history page traces it to a letter of 1909 from the surgeon Julius Hochenegg to Anton von Eiselsberg about the hardship of cancer patients, and to the founding meeting of the Society for the Research and Control of Cancer on 17 December 1910, with Eiselsberg as president; the society was registered with the Vienna police on 20 December 1910, which the Krebshilfe counts as its founding. In its early years the society gave small sums to patients in need or paid for radium treatment, published advice in newspapers in 1914 urging people not to wait for severe symptoms before seeing a doctor, and set up a chemical research laboratory decided in 1912. The page says it now provides immediate financial help across Austria to patients in need because of cancer and has 63 counselling centres, and that its campaigns have included calls for HPV vaccination and breast screening and the Don't smoke petition. With the Austrian Society for Haematology and Medical Oncology it publishes the Austrian cancer report, which the OECD's 2025 profile and the 2026 framework programme cite.",
          links: [
            { label: "Österreichische Krebshilfe: Geschichte", url: KH },
            { label: "OECD/EC: Country Cancer Profile Austria 2025, references (PDF)", url: CCP_2025 },
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
          id: "trials-in-austria",
          title: "482 cancer trials in OnCo's records have a site in Austria, eight led from Austria",
          plain:
            "Of the cancer trials OnCo holds, 482 list a site in Austria on ClinicalTrials.gov, and 123 were recruiting when last read. Most are international phase 3 trials led by companies. Eight are led by Austrian sponsors: universities in Vienna, Graz and Innsbruck, a hospital in Linz, St. Anna Children's Cancer Research and AOP Orphan Pharmaceuticals.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 482 trials list Austria among their countries, 391 of them phase 3, 54 phase 2, 21 phase 2/3 and 16 phase 1/2. ClinicalTrials.gov gives 189 as active but not recruiting, 146 completed, 123 recruiting and 19 terminated. AstraZeneca leads 40, Bristol-Myers Squibb 38, Merck Sharp & Dohme and Hoffmann-La Roche 28 each, and Novartis 24; non-small cell lung cancer is the first-listed cancer for 69. The Austrian-led trials include TUXEDO-1 and a phase 2 trial of datopotamab deruxtecan for brain metastases from triple-negative breast cancer at the Medical University of Vienna, neoadjuvant pembrolizumab with lenvatinib in lung cancer at the Medical University Innsbruck, a phase 3 trial of ctDNA-guided treatment of localised pancreatic cancer at the Elisabethinen hospital, PUVA maintenance in mycosis fungoides at the Medical University of Graz, and the SIOPEN HR-NBL1 neuroblastoma trial led by St. Anna. The OECD's 2025 profile, citing the Krebshilfe and OeGHO, says oncology makes up 52% of clinical research in Austria; it also reports that 61 of 436 European trials enrolling children and young people with cancer from 2010 to 2022 ran in Austria.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Austria", url: "https://clinicaltrials.gov/search?cond=Cancer&country=Austria" },
            { label: "OECD/EC: Country Cancer Profile Austria 2025, box 3 and section 6 (PDF)", url: CCP_2025 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "unread-sources",
      title: "Sources that could not be read directly on 11 November 2026",
      plain:
        "Some official sources could not be read: the federal legal information system did not answer, the national HPV vaccination page had moved, and the main health insurance fund's pages on cancer benefits were not read. Where a page was read through a copy or a secondary official source, the link says so.",
      detail:
        "ris.bka.gv.at returned an error (HTTP 503), so section 351c ASVG was read in the consolidated text on JUSLINE, and the Cancer Statistics Act 1969, the Cancer Statistics Regulation 2019 and section 62d of the Hospitals Act were known only through Statistik Austria, the ministry and the Bewertungsboard's own documents. The ministry's HPV page returned 404, so the free vaccination rules were read on the Upper Austrian state government's page, and the end of the 21 to 29 catch-up offer is taken from the OECD profile. The ÖGK's page about itself was read on a second attempt during the accuracy check; its pages on cancer benefits were not read. The fourth evaluation report of the breast screening programme by Gesundheit Österreich and the Austrian cancer report of the Krebshilfe and OeGHO were known only through the OECD profile. IAEA DIRAC figures for Austria were not read.",
      links: [
        { label: "§ 351c ASVG (JUSLINE consolidated text)", url: ASVG_351C },
        { label: "Land Oberösterreich: HPV-Impfung", url: HPV_OOE },
      ],
    },
    {
      id: "figures-missing",
      title: "Figures looked for and not found",
      plain:
        "Some figures a patient would want were looked for and not found: current HPV vaccination coverage, waiting times from diagnosis to treatment, what a cancer patient pays out of pocket in total, the number of cancer medicines in the Erstattungskodex, and an installed count of radiotherapy machines newer than the equipment plan's.",
      detail:
        "The newest HPV coverage figure read is about 53% of 15-year-olds with two doses in 2021, from the OECD profile; no national figure for 2024 or 2025 was found. No national waiting-time figure for cancer diagnosis or treatment was found; the OECD profile describes fast-track pathways after a positive screen but gives no times. The prescription charge and its cap are documented, but hospital day charges and other co-payments for cancer care were not found in one source. The equipment plan's installed count of 46 radiotherapy devices is dated by its own legend to the end of 2018, and a current count was not found. How many Bewertungsboard procedures concern cancer medicines in total was not counted; its list of medicines under assessment is a spreadsheet updated monthly and was not read.",
      links: [
        { label: "BMASGPK: Bewertungsboard", url: BB },
        { label: "OECD/EC: Country Cancer Profile Austria 2025 (PDF)", url: CCP_2025 },
      ],
    },
  ],
  institutions: [
    "statistik-austria-cancer-registry", "bmasgpk-austria", "dachverband-sozialversicherung", "oegk-austria", "basg-austria", "medaustron",
    "oesterreichische-krebshilfe", "ccc-vienna", "st-anna-ccri-vienna", "ema", "iaea", "eanm", "bbmri-eric",
  ],
  companies: ["abcsg", "aop-health", "pharmaand", "hookipa-pharma", "proxygen"],
  drugs: ["tisotumab-vedotin", "obecabtagene-autoleucel", "lifileucel"],
  trials: [
    "tuxedo-1", "nct05866432", "nct04875585", "nct06391892", "nct01686594", "hr-nbl1", "nct01423500", "proud-pv", "pallas-penelope-b",
    "innovatv-301", "keynote-a18", "natalee", "monarche", "aphinity", "olympia", "katherine", "destiny-breast06", "serena-6", "alina",
    "checkmate-227", "psmafore", "mosaic", "cll14", "cartitude-5", "napoli-3", "ef-14", "compete",
  ],
  papers: [
    "paper-oberaigner-tyrol-mammography-advanced-breast-cancer-2017", "paper-geiger-gritsch-tyrol-mammography-ultrasound-2018",
    "paper-waser-hpv-vaccination-parents-tyrol-2022",
  ],
  people: ["shahrokh-f-shariat", "nicole-concin", "michael-gnant"],
  how:
    "Every card was written from sources read raw: in German, Statistik Austria's cancer statistics page, two press releases of January 2026 and its incidence and mortality spreadsheets; the health ministry's National Cancer Framework Programme 2026 to 2035 and its Bewertungsboard page and decisions; section 351c ASVG; the ÖSG 2023 equipment plan; the BASG's description of itself; the breast screening programme's site; Upper Austria's HPV page; the Vienna Chamber of Labour's page on prescription charges; and the Krebshilfe's history page; in English, the OECD and European Commission's Country Cancer Profile Austria 2025 and MedAustron's pages. Trial counts come from OnCo's own ClinicalTrials.gov records. The new records added for this page are the national cancer registry, the health ministry, the social insurance umbrella body, the ÖGK, the BASG, MedAustron and the Krebshilfe, with three papers from Tyrol on breast screening and HPV vaccination.",
  verify:
    "Reimbursement changes during the year: before relying on whether a medicine is paid for, ask the treating oncologist and check the current Erstattungskodex for outpatient medicines or the Bewertungsboard's decisions for hospital ones. Bowel and cervical screening are being reorganised, so what is offered locally may differ from what is described here, and the free HPV vaccination age limits have changed more than once.",
  verifyLinks: [
    { label: "Statistik Austria: Krebserkrankungen", url: SA },
    { label: "BMASGPK: Bewertungsboard", url: BB },
    { label: "Nationales Krebsrahmenprogramm 2026 bis 2035 (PDF)", url: KRP_2026 },
    { label: "OECD/EC: Country Cancer Profile Austria 2025 (PDF)", url: CCP_2025 },
  ],
};

/**
 * Netherlands deep dive: the hand-written cards and tables for /countries/nl/. Plain English first, detail second,
 * every card with its sources. Entity lists are pulled from the graph on the page by id so they stay in step with the
 * corpus. Figures are quoted only where the linked source states them.
 *
 * This page was written from Dutch primary sources rather than from the corpus: IKNL's own releases from the
 * Netherlands Cancer Registry (Nederlandse Kankerregistratie, NKR), the Zorginstituut's cost-effectiveness framework,
 * its pages on the expensive-medicines lock and its 2026 package advice, the CBG's 2025 annual report, RIVM's pages on
 * the three screening programmes, the SONCOS standards report version 14 (2026), the Princess Máxima Center's own
 * account of itself, Oncode's history page and KWF's 2025 annual report. Numbers were read from the raw page text or
 * from pdftotext output of the PDF, not from a summary of it.
 *
 * Counting conventions worth holding in mind while reading the numbers below:
 *  - incidence  NKR, diagnoses in 2025, preliminary, released 4 February 2026. Includes squamous cell carcinoma of
 *               the skin (ranked first) and, from this release, low-grade central nervous system tumours; excludes
 *               basal cell carcinoma of the skin.
 *  - deaths     "ruim 46.000 in 2024" as quoted by IKNL in its October 2026 projections release.
 *  - survival   NKR relative survival by stage for diagnoses in 2020-2024, released 30 June 2026.
 *  - GLOBOCAN   the table on the page is the modelled GLOBOCAN 2024 estimate used across the site, for comparison
 *               with other countries; it is not the registry's count.
 */
export type CountryCard = { id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> };

export const NL_ASOF = "2026-11-03";

/** Sources used more than once. */
const IKNL_WKD = { label: "IKNL: 135,000 new cancer diagnoses in 2025 (Dutch, 4 February 2026)", url: "https://iknl.nl/nieuws/2026/wereldkankerdag-2026" };
const IKNL_SURV = { label: "IKNL: cancer survival rises again, largest gain in stage III (Dutch, 30 June 2026)", url: "https://iknl.nl/nieuws/2026/overleving-kanker-stijgt-verder" };
const IKNL_2045 = { label: "IKNL: diagnoses rise to almost 170,000 a year by 2045 (Dutch, 7 October 2026)", url: "https://iknl.nl/nieuws/2026/kanker-in-2045" };
const NKR_ABOUT = { label: "IKNL: questions about the Netherlands Cancer Registry (Dutch)", url: "https://iknl.nl/nkr/over-nkr" };
const NKR_EXPLAIN = { label: "IKNL: how to read NKR figures (Dutch)", url: "https://iknl.nl/nkr/uitleg-nkr-cijfers" };
const NKR_CIJFERS = { label: "NKR Cijfers: the registry's interactive figures", url: "https://nkr-cijfers.iknl.nl/" };
const ZIN_KADER = { label: "Zorginstituut: framework for cost-effectiveness, 26 November 2024 (Dutch, PDF)", url: "https://www.zorginstituutnederland.nl/site/binaries/site-content/collections/documents/2024/11/26/beoordelingskader-kosteneffectiviteit-van-zorg/Beoordelingskader+kosteneffectiviteit+van+zorg.pdf" };
const ZIN_SLUIS = { label: "Zorginstituut: the lock for expensive medicines (Dutch)", url: "https://www.zorginstituutnederland.nl/wat-wij-doen/programmas-en-samenwerkingsverbanden/horizonscan-geneesmiddelen/sluis-voor-dure-geneesmiddelen" };
const ZIN_SLUIS_LIST = { label: "Zorginstituut: medicines currently in the lock (Dutch)", url: "https://www.zorginstituutnederland.nl/wat-wij-doen/programmas-en-samenwerkingsverbanden/horizonscan-geneesmiddelen/sluis-voor-dure-geneesmiddelen/overzicht-geneesmiddelen-in-de-sluis" };
const ZIN_TIL = { label: "Zorginstituut: position on TIL therapy, lapsed in 2026 (Dutch)", url: "https://www.zorginstituutnederland.nl/documenten/2022/12/13/standpunt-tumorinfiltrerende-lymfocyten-til" };
const CBG_JV = { label: "CBG: annual report 2025 (Dutch, PDF)", url: "https://www.cbg-meb.nl/site/binaries/site-content/collections/documents/2026/04/16/jaarverslag-2025-werken-aan-vertrouwen-in-medicijnen/260416-cbg-jaarverslag-2025.pdf" };
const SONCOS14 = { label: "SONCOS standards report, version 14 (2026) (Dutch, PDF)", url: "https://demedischspecialist.nl/sites/default/files/2026-02/soncos_normeringsrapport_versie_14_2026.pdf" };

export const NL_PROFILE: CountryCard[] = [
  {
    id: "shape",
    title: "About 135,000 new cancers a year, with skin cancer counted first",
    plain: "In 2025, 134,800 people in the Netherlands were told they had cancer, about the same as the year before. The most common was squamous cell skin cancer, then prostate, breast, lung and bowel. Around 46,000 people died of cancer in 2024, and about a million people alive today had a cancer diagnosis in the previous twenty years.",
    detail: "IKNL's World Cancer Day release gives 134,800 diagnoses in 2025 (72,100 men and 62,700 women) against 134,700 in 2024, marked as preliminary. Squamous cell carcinoma of the skin was the commonest diagnosis, followed by prostate, breast, lung and bowel; IKNL's head of registration, Otto Visser, attributes the steep rise in prostate cancer mainly to an ageing population and partly to changes in how it is detected, and the rise in skin squamous cell carcinoma to the growing number of people over 75. The total is higher than in earlier releases because low-grade tumours of the central nervous system, which the World Health Organization now classes as malignant, are counted for the first time; basal cell carcinoma of the skin is left out, as is usual. The same release says about one million people are alive who were diagnosed in the previous twenty years. IKNL's projections, published in October 2026, put deaths from cancer at 'ruim 46.000' (just over 46,000) in 2024, and expect diagnoses to rise from just over 136,000 in 2025 to almost 170,000 in 2045 (about 23 per cent) and deaths by 24 per cent to just over 57,000, mainly because the population is ageing; once growth and ageing are allowed for, the average risk of a diagnosis stays roughly level. Note the two releases give slightly different 2025 totals (134,800 preliminary in February, 'ruim 136.000' in October); the page quotes each as its source does.",
    links: [IKNL_WKD, IKNL_2045, NKR_CIJFERS],
  },
  {
    id: "bowel",
    title: "Bowel cancer is falling, which IKNL links to screening",
    plain: "Bowel cancer diagnoses have fallen since national screening started in 2014, even though an older population should have pushed them up. Cancers that had already spread at diagnosis fell the most.",
    detail: "Diagnoses of bowel cancer fell from 13,000 in 2013, the year before screening began, to 11,300 in 2025 (6,000 men and 5,300 women). Cancers that had already reached the lymph nodes, liver or other organs at diagnosis fell from 7,200 in 2013 to 5,900 in 2024; the 2025 figure was not yet available. IKNL describes a rise in 2014 and 2015 as screening was phased in, then a fall, interrupted during the COVID-19 period, with the full target group of 55 to 75 year olds reached in 2019. A February 2026 OECD and European Commission comparison, as summarised by IKNL, put the Netherlands among the leaders in bowel screening participation, above the European target, but noted that breast and cervical screening participation had fallen since COVID-19 and that death within 30 days of emergency bowel cancer surgery is much higher than after planned surgery.",
    links: [IKNL_WKD, { label: "IKNL on the OECD/EU high-value cancer care report (Dutch, 19 February 2026)", url: "https://iknl.nl/nieuws/2026/oecd-rapport-2026" }, { label: "RIVM: bowel cancer screening (Dutch)", url: "https://www.rivm.nl/bevolkingsonderzoek-darmkanker" }],
  },
  {
    id: "survival",
    title: "Seven in ten alive five years on, with the biggest gains in stage III",
    plain: "Average five-year survival after a cancer diagnosis is now 71 per cent, against 48 per cent thirty years ago. The biggest improvement over three decades has been in stage III cancers; over the last ten years it has been in stage IV.",
    detail: "IKNL's June 2026 release gives five-year relative survival of 71 per cent, up from 48 per cent thirty years earlier, rising by 0.5 to 1 per cent a year. For tumours with a TNM stage diagnosed in 2020 to 2024 (excluding lymphoma), five-year survival was 93 per cent at stage I (80 per cent in 1990 to 1994), 80 per cent at stage II (70), 56 per cent at stage III (30) and 22 per cent at stage IV (13). The release's own text later gives stage III as 57 per cent in 2020 to 2024 and stage IV as rising from 18 per cent in 2010 to 2014 to 25 per cent in 2020 to 2024, a different grouping; OnCo quotes the bullet list in the table below and notes the discrepancy rather than choosing. For lymphoma, staged by Ann Arbor, survival was 87, 88, 77 and 66 per cent at stages I to IV. Survival above 90 per cent includes melanoma and squamous cell carcinoma of the skin, testicular cancer and tumours of the meninges, cranial nerves and pituitary; below 10 per cent includes pancreatic cancer and cancer of unknown primary. IKNL warns that better detection of spread over the decades moves patients into higher stages and can make survival per stage look better than it is.",
    links: [IKNL_SURV, NKR_CIJFERS],
  },
];

/** NKR five-year relative survival by stage, solid tumours with a TNM stage (excluding lymphoma), from IKNL's 30 June 2026 release. */
export const NL_STAGE_SURVIVAL: Array<{ id: string; stage: string; then: number; now: number }> = [
  { id: "i", stage: "Stage I", then: 80, now: 93 },
  { id: "ii", stage: "Stage II", then: 70, now: 80 },
  { id: "iii", stage: "Stage III", then: 30, now: 56 },
  { id: "iv", stage: "Stage IV", then: 13, now: 22 },
];

export const NL_REGISTRY: CountryCard[] = [
  {
    id: "what-it-is",
    title: "What the Netherlands Cancer Registry is: every patient, read from the hospital record since 1989",
    plain: "The Netherlands Cancer Registry has covered the whole country since 1989. It is not filled in by doctors: IKNL's own registration staff, authorised by each hospital, read the medical record there. It records the diagnosis, the stage, how the cancer was found and the treatment, and links to death records.",
    detail: "IKNL describes the registry as population-based and clinical-epidemiological, following every person with cancer from diagnosis to death regardless of hospital or treatment. Hospitals give authorised IKNL staff access to the record and the staff register the hospital, the tumour and its stage, how it was diagnosed, treatment, date of birth and sex; name and address are replaced by a code after registration and are kept only to link records across hospitals and to deaths in the national population register (BRP). There is also a link to Palga, the national pathology archive. The legal basis is scientific research and statistics in the public interest, so individual consent is not asked, but patients may object and have their data removed. IKNL stresses that the registry is not a quality registry: it does not rate hospitals against indicators, which is what the clinical audits do. Data from 1989 onward are national; survival data for 1961 to 1988 come from a growing number of hospitals around Eindhoven and, in the 1980s, from the north-west and south-east. IKNL is a non-profit foundation funded by a subsidy from the Ministry of Health, Welfare and Sport.",
    links: [NKR_ABOUT, NKR_EXPLAIN, { label: "IKNL: Netherlands Cancer Registry (English)", url: "https://iknl.nl/en/ncr" }],
  },
  {
    id: "conventions",
    title: "Three counting choices to know before comparing Dutch figures with anyone else's",
    plain: "Dutch totals include squamous cell skin cancer but not basal cell skin cancer, now include low-grade brain and spinal tumours, and the latest year is always provisional. GLOBOCAN's estimate of new cases for 2024 is close to the registry's count but is a model, not a count.",
    detail: "First, squamous cell carcinoma of the skin is counted and is the commonest cancer in the 2025 release, while basal cell carcinoma, which IKNL calls a very common skin cancer that is almost never life-threatening, is excluded from the totals; IKNL publishes basal cell figures separately from 2017. Second, from the February 2026 release IKNL counts low-grade tumours of the central nervous system, which the WHO reclassified as malignant, so totals rose relative to earlier releases for a reason that is not a change in disease. Third, the most recent year is preliminary: the 2025 total of 134,800 is marked as such. Stage is recorded under the TNM edition in force at the time (from the 4th edition in 1989 to the 8th from 2017), so stage-specific trends cross edition changes. GLOBOCAN 2024, which the table on this page uses for comparison with other countries, estimates 131,204 new cancers and 51,051 deaths in the Netherlands for 2024, against the registry's 134,700 diagnoses for that year; GLOBOCAN's all-cancers total includes non-melanoma skin cancer (18,377 of the cases). Read it as a modelled estimate on its own conventions, not as the registry.",
    links: [IKNL_WKD, NKR_EXPLAIN, { label: "GLOBOCAN 2024: the Netherlands fact sheet (IARC)", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/528-the-netherlands-fact-sheet.pdf" }],
  },
  {
    id: "dica-iknl",
    title: "The registry and the clinical audits are merging, and the trial bureau is leaving",
    plain: "IKNL, which keeps the registry, merged its management with the Dutch Institute for Clinical Auditing on 1 January 2026, with a legal merger planned for 2027. IKNL's trial bureau, which manages data for cancer trials in Dutch hospitals, is moving to a new independent organisation under the university medical centres from 2027.",
    detail: "IKNL's May 2026 release says the administrative merger of DICA and IKNL took effect on 1 January 2026 with the legal merger planned for 2027, and that Ernst Kuipers, a physician and former Minister of Health, Welfare and Sport, became chair of the board of DICA-IKNL on 1 May 2026. In a release of 1 June 2026 IKNL said that the federation of university medical centres, UMCNL, and IKNL had that week signed agreements to move IKNL's trial bureau into a new, independent organisation for local data management, to be operational from 1 January 2027 and intended as the basis for a broader national trial bureau. In October 2026 IKNL also moved its long-range projections from a periodic report into NKR Cijfers, to be updated every year looking twenty years ahead.",
    links: [{ label: "IKNL: Ernst Kuipers starts as chair of DICA-IKNL (Dutch, 20 May 2026)", url: "https://iknl.nl/nieuws/2026/ernst-kuipers-gestart" }, { label: "IKNL: next step towards a new national trial bureau (Dutch, 1 June 2026)", url: "https://iknl.nl/nieuws/2026/volgende-stap-naar-een-nieuw-landelijk-trialbureau" }, IKNL_2045],
  },
];

export const NL_PAYING: CountryCard[] = [
  {
    id: "insurance",
    title: "Compulsory private insurance with one basic package, and a €385 deductible",
    plain: "Everyone who lives or works in the Netherlands must buy health insurance, and every policy covers the same basic package, which the government sets on advice from the Zorginstituut. Adults pay the first €385 of covered care each year themselves; hospital cancer care counts towards it, a GP visit does not.",
    detail: "The Zorginstituut describes its most important task as making sure that the basic package reimburses only treatments established to work and to suit what the patient needs; it advises the Minister of Health, Welfare and Sport, who takes the final decision on what the package contains. The compulsory deductible (verplicht eigen risico) for 2026 is €385 for everyone aged 18 and over, payable once the insured person uses care from the basic package; care from the GP, maternity care, chain care and care for children under 18 are among the exceptions. A patient starting cancer treatment therefore usually reaches the deductible soon after treatment starts, after which the insurer pays for basic-package care for the rest of that calendar year. Where a separate personal contribution (eigen bijdrage) applies, it is paid on top. Expensive medicines given in hospital are paid as 'add-on' medicines, declared separately from the hospital's treatment tariff: IKNL defines them as hospital medicines costing on average more than €1,000 per patient per year.",
    links: [{ label: "Zorginstituut: compulsory deductible (Dutch)", url: "https://www.zorginstituutnederland.nl/verzekerde-zorg/e/eigen-risico-zvw" }, { label: "IKNL: key figures on expensive medicines (Dutch)", url: "https://iknl.nl/dure-geneesmiddelen/kerncijfers" }],
  },
  {
    id: "thresholds",
    title: "Three prices for a year of healthy life: €20,000, €50,000 or €80,000, by how severe the disease is",
    plain: "The Zorginstituut does not use one threshold. The most it considers reasonable to pay for a year of life in full health depends on how much health the illness takes away: up to €20,000, €50,000 or €80,000. The Zorginstituut calls this a ceiling, not a target.",
    detail: "The 2024 framework for cost-effectiveness, which updates the practice the Zorginstituut has followed since it introduced reference values in 2015, sets the maximum extra cost per quality-adjusted life year by disease burden measured by proportional shortfall, the share of a person's remaining health that the illness takes away, from 0 to 1: a burden of 0.10 to 0.40 has a reference value of up to €20,000, 0.41 to 0.70 up to €50,000 and 0.71 to 1.00 up to €80,000. The framework says the value is an upper bound, 'not a target value', and that a manufacturer pricing a medicine exactly at the reference value would capture all of the surplus that society could otherwise share through a lower price. It also says that when a manufacturer already has several indications reimbursed, or a patent has been extended by a change with little clinical value, it may be better to start from an estimate of the manufacturer's costs than from the reference values, a question it records as unresolved. Reimbursement rests on four package criteria: necessity, effectiveness, cost-effectiveness and feasibility, with the Scientific Advisory Board (WAR) judging the evidence and the Package Advisory Committee (ACP) weighing it against other patients' claims and all premium payers.",
    links: [ZIN_KADER, ZIN_SLUIS],
  },
  {
    id: "sluis",
    title: "The lock: an approved cancer drug can wait outside the package until its price comes down",
    plain: "A new hospital drug that is expensive enough can be held out of the basic package after European approval, in what the Dutch call the 'sluis' (the lock), until the Zorginstituut has assessed it and the ministry has negotiated a lower price, usually in confidence. Many recent cancer drugs have waited there.",
    detail: "Under rules set in law, a hospital medicine becomes a candidate for the lock if it is expected to cost €20 million or more a year across its new indications, or €10 million or more a year for one indication at €50,000 or more per patient per year. The lock was introduced in 2015 in response to expensive new hospital medicines straining hospital budgets. After the Zorginstituut's advice, the ministry's Bureau Financiële Arrangementen Geneesmiddelen (BFAG) may negotiate the price, and the minister decides; the medicine leaves the lock only once the price is agreed and there are agreements on appropriate use. In 2026 the Zorginstituut advised that durvalumab with platinum and etoposide for extensive-stage small-cell lung cancer could be reimbursed only after a price cut of at least 60 per cent; after an agreement with the supplier it has been reimbursed since 29 August 2026. In September 2026 it advised that trastuzumab deruxtecan for HER2-mutant non-small-cell lung cancer needed a cut of at least 53 per cent. The list of medicines in the lock on the day this page was checked included, among others, abemaciclib, acalabrutinib for mantle cell lymphoma, amivantamab, axicabtagene ciloleucel, belzutifan, brexucabtagene autoleucel, capivasertib, carfilzomib, ciltacabtagene autoleucel, darolutamide with docetaxel, datopotamab deruxtecan for cervical cancer, durvalumab in several indications and epcoritamab. IKNL notes that the spending figures it publishes are at prices that exclude confidential discount agreements.",
    links: [ZIN_SLUIS, ZIN_SLUIS_LIST, ZIN_KADER, { label: "Zorginstituut advice: durvalumab in small-cell lung cancer (Dutch, 12 May 2026)", url: "https://www.zorginstituutnederland.nl/documenten/2026/05/12/pakketadvies-sluisgeneesmiddel-durvalumab-imfinzi-in-combinatie-met-carboplatine-of-cisplatine-en-etoposide-voor-kleincellige-longkanker" }, { label: "Zorginstituut advice: trastuzumab deruxtecan in HER2-mutant lung cancer (Dutch, 22 September 2026)", url: "https://www.zorginstituutnederland.nl/documenten/2026/09/22/pakketadvies-sluisgeneesmiddel-trastuzumab-deruxtecan-enhertu-voor-de-behandeling-van-niet-kleincellige-longkanker-met-her2-mutatie" }],
  },
  {
    id: "spending",
    title: "What the expensive cancer drugs cost: spending doubled in four years",
    plain: "Spending on immunotherapy and targeted cancer drugs in Dutch hospitals doubled between 2017 and 2021, to €1.35 billion at list prices. Lung cancer and myeloma account for the largest sums.",
    detail: "IKNL's key figures on expensive medicines, built from the Zorginstituut's GIP database of insurers' claims for add-on medicines and last updated in July 2024, show that use of immunotherapy and targeted therapy rose by 77 per cent between 2017 and 2022 and that spending on them doubled from €652 million in 2017 to €1.35 billion in 2021, then did not rise further in 2022 even though use did. Spending for non-small-cell lung cancer rose by almost 116 per cent from 2018 to more than €372 million in 2022; multiple myeloma was next at more than €251 million in 2022, 45 per cent above 2018. Haematological spending fell in 2022 because the patent on lenalidomide expired. All of these figures are at list price, excluding confidential discounts. Separately, IKNL found in June 2026 that after gene-expression tests such as MammaPrint and Oncotype DX became fully reimbursed for early breast cancer in October 2023, use among eligible patients rose from 9 to 37 per cent, so that about two in three eligible patients still did not have one; 52 per cent of eligible patients without a test received chemotherapy.",
    links: [{ label: "IKNL: key figures on expensive medicines (Dutch)", url: "https://iknl.nl/dure-geneesmiddelen/kerncijfers" }, { label: "IKNL: one in three eligible breast cancer patients gets the reimbursed gene test (Dutch, 12 June 2026)", url: "https://iknl.nl/nieuws/2026/een-op-drie-borstkankerpatienten-genprofieltest" }, { label: "Meijer et al., Int J Cancer: impact of reimbursement on gene expression profile use", url: "https://doi.org/10.1002/ijc.70571" }],
  },
];

/** Zorginstituut reference values, Table 1 of the 2024 cost-effectiveness framework. */
export const NL_REFERENCE_VALUES: Array<{ id: string; burden: string; max: string }> = [
  { id: "low", burden: "0.10 to 0.40", max: "up to €20,000" },
  { id: "mid", burden: "0.41 to 0.70", max: "up to €50,000" },
  { id: "high", burden: "0.71 to 1.00", max: "up to €80,000" },
];

export const NL_REGULATOR: CountryCard[] = [
  {
    id: "ema-cbg",
    title: "Licensed in Amsterdam for all of Europe, with the Dutch regulator often doing the assessment",
    plain: "New cancer drugs are licensed for the whole European Union through the European Medicines Agency, which is based in Amsterdam. The Dutch regulator, the CBG, is one of the agencies most often chosen to lead the scientific assessment: third in the EU in 2025.",
    detail: "The CBG's 2025 annual report explains that the centralised procedure is compulsory for new cancer medicines: the company files with the EMA, the CHMP gives an opinion and the European Commission takes the binding decision. Each member state has one CHMP member and an alternate, and for each medicine the committee appoints a rapporteur and co-rapporteur, who follow it for its whole life. The Netherlands was assigned 20 rapporteurships and 3 co-rapporteurships in 2025 (21 and 2 in 2021, 17 and 5 in 2022, 10 and 8 in 2023, 12 and 11 in 2024). Its 23 combined placed it third that year behind Germany (32) and Sweden (24), ahead of France (21) and Austria (20). It also took 15 pharmacovigilance rapporteurships. The report counts 104 new medicines approved through the EMA in 2025. National authorisation by the CBG still applies to medicines outside the compulsory centralised scope.",
    links: [CBG_JV, { label: "CBG: cooperation in Europe (Dutch)", url: "https://www.cbg-meb.nl/onderwerpen/over-ons-ons-werk/over-cbg-samenwerking-in-europa" }],
  },
  {
    id: "two-clocks",
    title: "Two clocks: European approval, then Dutch reimbursement",
    plain: "European approval lets a medicine be sold; it does not make Dutch insurance pay for it. For an expensive hospital drug the second clock, the Zorginstituut's assessment and the price negotiation, starts only after the first.",
    detail: "The CBG's October 2026 news on daraxonrasib, the first targeted medicine for pancreatic cancer to receive a positive CHMP opinion, illustrates the sequence: the opinion followed a new phased review in which data are submitted in parts, it goes to the European Commission for the marketing authorisation, and then, in the CBG's words (translated), 'it is up to the Zorginstituut in the Netherlands to advise the minister on the extent to which the medicine will be reimbursed'. The opinion is for adults with metastatic pancreatic cancer who have already been treated. The CBG reports that in a trial of 500 patients those given the drug lived on average 12.4 months against 6.7 months on chemotherapy, and 7.2 against 3.6 months without the disease getting worse; the CBG's text says 'gemiddeld' (on average) and does not say whether these are medians. OnCo did not find a Dutch official figure for the average time between European approval and reimbursement for cancer medicines, so none is given here.",
    links: [{ label: "CBG: positive opinion for the first targeted medicine against pancreatic cancer (Dutch, 15 October 2026)", url: "https://www.cbg-meb.nl/actueel/nieuws/2026/10/15/positief-advies-voor-eerste-gerichte-medicijn-tegen-alvleesklierkanker" }, ZIN_SLUIS],
  },
  {
    id: "til",
    title: "An academic cell therapy that was paid for, then stopped: TIL for melanoma",
    plain: "Dutch academic hospitals led by the Netherlands Cancer Institute developed TIL therapy, in which a patient's own immune cells are grown from a tumour and given back. It was reimbursed from 2023 under a hospital exemption. When the exemption was not renewed in January 2026 treatment had to stop, and the EU refused the institute's application for a licence in September 2026.",
    detail: "The Zorginstituut admitted TIL therapy for advanced melanoma to the package conditionally in 2015, until the end of 2022, on condition that its effectiveness was studied; the randomised trial against ipilimumab followed, and in December 2022 the Zorginstituut judged it at least as effective as ipilimumab, with better results but more severe side effects, and reimbursed it from 15 January 2023 for an expected 50 patients a year. Because the treatment had no marketing authorisation, it could be given only under a hospital exemption granted each year by the Health and Youth Care Inspectorate (IGJ), with the cells made in the Netherlands by the Netherlands Cancer Institute or Sanquin. The Netherlands Cancer Institute applied to the EMA in early 2025. No new hospital exemption was granted from 15 January 2026, so the treatment could no longer be given in the Netherlands and reimbursement stopped; the CHMP gave a negative opinion in June 2026 and, according to the Zorginstituut, the EU refused the authorisation on 14 September 2026. The Zorginstituut expects this to remain the case in the near future.",
    links: [ZIN_TIL, { label: "Zorginstituut: reimburse TIL therapy for metastatic melanoma (Dutch, 21 December 2022)", url: "https://www.zorginstituutnederland.nl/actueel/nieuws/2022/12/21/til-therapie" }, { label: "EMA: Tacquell", url: "https://www.ema.europa.eu/en/medicines/human/EPAR/tacquell" }],
  },
];

export const NL_DOING: CountryCard[] = [
  {
    id: "drup",
    title: "Off-label use as a national trial: DRUP and the Drug Access Protocol",
    plain: "Instead of letting doctors prescribe a drug outside its licence case by case, the Netherlands runs it as a national trial. In DRUP, patients with no standard options left whose tumour carries a targetable change get an approved drug, and every result is recorded and shared to inform later decisions. The Drug Access Protocol extends the idea to drugs that are licensed but not yet reimbursed.",
    detail: "The Drug Rediscovery Protocol (NCT02925234), led by the Netherlands Cancer Institute since August 2016, matches patients through a molecular tumour board to commercially available targeted drugs and immunotherapies contributed by companies, in cohorts defined by drug, tumour type and variant, with a fresh biopsy taken before treatment for sequencing; its first report in Nature in 2019 found clinical benefit in 34 per cent of 215 treated patients and 63 per cent in a cohort of microsatellite-unstable tumours given nivolumab. The Drug Access Protocol, described in a 2026 Acta Oncologica study as a programme developed by oncologists, insurers and the Zorginstituut, links access to tumour-agnostic precision medicines authorised by the EMA on single-arm evidence to the collection of real-world outcomes; companies interviewed cited patient access and real-world data as reasons to take part and a lack of transparency among the challenges.",
    links: [{ label: "ClinicalTrials.gov NCT02925234 (DRUP)", url: "https://clinicaltrials.gov/study/NCT02925234" }, { label: "van der Velden et al., Nature 2019", url: "https://doi.org/10.1038/s41586-019-1600-x" }, { label: "Leopold et al., Acta Oncol 2026: the Drug Access Protocol", url: "https://doi.org/10.2340/1651-226X.2026.45000" }],
  },
  {
    id: "wgs",
    title: "Whole-genome sequencing of metastatic cancer, pooled in one national database",
    plain: "The Hartwig Medical Foundation in Amsterdam sequences the whole genome of tumour and blood from Dutch patients with metastatic cancer, keeps the results with the clinical outcomes, and gives the anonymised data to researchers free of charge.",
    detail: "Hartwig's own page describes the Hartwig Medical Database as holding the genetic and clinical data of thousands of Dutch patients with metastatic cancer, the genetic data generated by its OncoAct whole-genome test and the clinical data, including treatment outcomes, supplied by the treating hospitals, and calls it the largest database of its kind in the world; the same page says it holds the whole-genome data of over 8,000 patients. Its 2019 Nature analysis of 2,520 metastatic tumour and normal pairs found whole-genome duplication in 56 per cent, 96 per cent of driver mutations clonal, and a variant that could direct treatment to an approved or trial drug in 62 per cent of patients. Hartwig Medical Foundation is among the affiliations of the authors of DRUP's 2019 report. OnCo could not confirm from a Dutch official source whether, or for which patients, whole-genome sequencing is now reimbursed as routine care.",
    links: [{ label: "Hartwig Medical Foundation: the database", url: "https://www.hartwigmedicalfoundation.nl/en/data/database/" }, { label: "Priestley et al., Nature 2019", url: "https://doi.org/10.1038/s41586-019-1689-y" }],
  },
  {
    id: "centralise",
    title: "Concentrating care: every child in one hospital, and minimum volumes for adults",
    plain: "Every child in the Netherlands with cancer is treated at one hospital, the Princess Máxima Center in Utrecht, which opened in 2018. For adults, the specialists' own standards set minimum numbers: a hospital that operates on oesophageal and stomach cancer must do at least 75 such operations a year, and one that operates on pancreatic cancer at least 50 pancreatic resections.",
    detail: "The Princess Máxima Center says about 600 children in the Netherlands are diagnosed with cancer each year, that all of them receive their treatment there, that it opened in 2018, and that more than 600 researchers and 900 care professionals work there, making it the largest paediatric cancer centre in Europe; diagnosis and treatment are paid by health insurers with additional support from the health ministry, and research relies on donors. For adults, SONCOS, the oncology platform that is part of the Federatie Medisch Specialisten (the federation of medical specialists), has revised its standards report every year since 2012; version 14 (2026) requires, per location per year, at least 75 oncological oesophageal and gastric resections and at least 50 pancreatic resections, and at least 200 and 150 new patients discussed in the respective multidisciplinary meetings of a reference centre. For rare tumours, defined as fewer than 6 new cases per 100,000 people a year (fewer than about 1,000 a year in the Netherlands), patients are to be discussed with or referred to a reference centre for diagnosis, the treatment plan and any trial, though part of the treatment may be given in the referring hospital.",
    links: [{ label: "Princess Máxima Center: our story", url: "https://www.prinsesmaximacentrum.nl/en/about-us/our-story/" }, SONCOS14, { label: "Federatie Medisch Specialisten: SONCOS standards report (Dutch)", url: "https://demedischspecialist.nl/normeringsrapport-van-soncos" }],
  },
  {
    id: "screening",
    title: "Three national screening programmes, with a home test for cervical screening",
    plain: "The Netherlands invites people for bowel, breast and cervical screening. Cervical screening tests for HPV and can be done at home with a self-sampling kit. Breast screening is meant to be every two years, but a staff shortage means the gap can currently be up to about three years.",
    detail: "RIVM's programme pages describe them as follows; the breast page says the screening itself is carried out by Bevolkingsonderzoek Nederland on behalf of the government. Bowel: everyone aged 55 to 75 is invited every two years and sent a home stool test; about 12,000 people a year get bowel cancer and about 4,500 die of it. Breast: women aged 50 to 75 are invited every two years, usually to a mobile unit, with two X-rays of each breast read by two doctors; because of staff shortages there can currently be up to about three years between invitations. Cervical: people aged 30 to 60 are invited at 30, 35, 40, 50 and 60, and in some cases also at 45, 55 or 65, for an HPV test taken either by the GP or with a self-sampling kit at home; RIVM says more frequent testing is not needed because cervical cancer usually takes 10 to 15 years to develop; about 900 people a year get cervical cancer and about 200 die of it. RIVM lists three national cancer screening programmes, for cervical, breast and bowel cancer, so there is none for prostate or lung cancer; IKNL describes the Dutch policy on PSA testing as restrained, which the OECD and European Commission comparison counted as a strength against overdiagnosis.",
    links: [{ label: "RIVM: bowel cancer screening (Dutch)", url: "https://www.rivm.nl/bevolkingsonderzoek-darmkanker" }, { label: "RIVM: breast cancer screening (Dutch)", url: "https://www.rivm.nl/bevolkingsonderzoek-borstkanker" }, { label: "RIVM: cervical cancer screening (Dutch)", url: "https://www.rivm.nl/bevolkingsonderzoek-baarmoederhalskanker" }, { label: "RIVM: population screening programmes (Dutch)", url: "https://www.rivm.nl/bevolkingsonderzoeken-en-screeningen" }, { label: "IKNL on the OECD/EU high-value cancer care report (Dutch)", url: "https://iknl.nl/nieuws/2026/oecd-rapport-2026" }],
  },
  {
    id: "research",
    title: "Research paid for by a charity and an institute without walls",
    plain: "KWF, the Dutch cancer charity, raised €200.2 million in 2025 and spent €189.6 million on its aims. Oncode Institute, set up in 2017 with KWF and three ministries, connects more than 750 researchers across 13 partner institutes without moving them into one building.",
    detail: "KWF's 2025 annual report gives total income of €200.2 million, of which €70.2 million came from legacies and €50 million from donors, €189.6 million spent on its objectives and 784 projects funded, including 62 research projects worth €80.9 million through open calls and €52 million for themed funding. Oncode's own history page says it launched in early 2017 with KWF, the Ministries of Economic Affairs and Climate, Health, and Education, ZonMw and the Topsector Life Sciences & Health as founding partners, was opened by Queen Máxima on 5 February 2018, and had its funding renewed in 2023; its home page describes it as uniting more than 750 researchers across 13 partner institutes. Several of the Dutch trials listed below name KWF or ZonMw among their sponsors on their records, among them CROSS and PREOPANC-2.",
    links: [{ label: "KWF: annual report 2025 (Dutch)", url: "https://www.kwf.nl/jaarverslag" }, { label: "Oncode Institute: our history", url: "https://www.oncodeinstitute.nl/about/our-history" }, { label: "Oncode Institute: home page", url: "https://www.oncodeinstitute.nl" }],
  },
];

export const NL_GAPS: CountryCard[] = [
  {
    id: "unsourced",
    title: "What could not be sourced",
    plain: "Some things a reader would want are not on this page because OnCo could not read them from a Dutch official source: the time from European approval to Dutch reimbursement, the negotiated prices, waiting times for cancer treatment, and whether whole-genome sequencing is now routine reimbursed care.",
    detail: "Not found from a Dutch official source in this round: an average time from EMA authorisation to reimbursement for cancer medicines; any negotiated price, because the ministry's agreements are confidential by design; current waiting times against the national norms for cancer diagnosis and treatment; and the reimbursement status of whole-genome sequencing in routine care. The NKR's interactive tool (nkr-cijfers.iknl.nl) is a JavaScript application that a script cannot read, so per-site counts for 2025 are given only where an IKNL release states them; the table on this page uses GLOBOCAN 2024 for sites. The Zorginstituut's own pages were used for insurance and expensive medicines rather than the Rijksoverheid (central government) pages; an earlier version of this card said those could not be read by script, but the Rijksoverheid page on the deductible was read on 17 November 2026 and gives the same €385. OnCo found no published analysis of how much of Dutch cancer trial funding comes from KWF, ZonMw or industry.",
    links: [NKR_CIJFERS, ZIN_SLUIS, { label: "Rijksoverheid: when do I pay the deductible? (Dutch)", url: "https://www.rijksoverheid.nl/onderwerpen/zorgverzekering/vraag-en-antwoord/eigen-risico-zorgverzekering" }],
  },
  {
    id: "corpus",
    title: "Records that should be in this corpus and are not",
    plain: "OnCo still lacks several Dutch people and institutions that matter: Hans Clevers and the Hubrecht Institute, whose organoid work started at Utrecht; Piet Borst; and the Dutch clinical audits run by DICA. Before this page it also lacked the Zorginstituut, the CBG, Oncode and the DRUP trial, which are now added.",
    detail: "Added with this page: Zorginstituut Nederland, the CBG-MEB and Oncode Institute as institutions; the DRUP trial; and the first DRUP report and the Hartwig metastatic whole-genome paper as papers. Not yet added, for want of a sourced record in this round: Hans Clevers and the Hubrecht Institute (the Lgr5 organoid paper in the corpus is linked only to UMC Utrecht); Piet Borst and the history of the Netherlands Cancer Institute's research division; the Dutch Institute for Clinical Auditing and its cancer audits; the Dutch Colorectal Cancer Group and BOOG as organisations, which appear only as sponsor names on trial records; Sanquin, which made TIL cells; and the national cancer networks (oncologienetwerken). Corrections made while writing: the IKNL record now says how the registry is collected, how it is funded and that IKNL merged with DICA in 2026; Ernst Kuipers's record now gives his 2026 appointment as chair of DICA-IKNL; and the TIL trial paper no longer implies that Dutch reimbursement of TIL continues, since it ended on 15 January 2026.",
    links: [{ label: "IKNL: about the registry (Dutch)", url: "https://iknl.nl/nkr/over-nkr" }],
  },
];

/** Screening programmes as RIVM describes them, checked on the date above. */
export const NL_SCREENING: Array<{ id: string; programme: string; who: string; interval: string; test: string }> = [
  { id: "bowel", programme: "Bowel", who: "Everyone aged 55 to 75", interval: "Every 2 years", test: "Home stool test sent by post" },
  { id: "breast", programme: "Breast", who: "Women aged 50 to 75", interval: "Every 2 years; currently up to about 3 because of staff shortages", test: "Mammogram, two views of each breast, read by two doctors" },
  { id: "cervix", programme: "Cervix", who: "Aged 30 to 60", interval: "At 30, 35, 40, 50 and 60; also 45, 55 or 65 in some cases", test: "HPV test by GP smear or home self-sampling kit" },
];

export const NL_INSTITUTIONS = ["nki", "amsterdam-umc", "erasmus-mc", "umc-utrecht", "princess-maxima", "lumc-leiden", "radboudumc", "umcg-groningen", "maastricht-umc", "oncozon", "rijnstate-arnhem", "iknl", "kwf", "zorginstituut-nederland", "cbg-meb", "oncode-institute", "ema", "eha", "hartwig-medical-foundation"];
export const NL_COMPANIES = ["merus", "agendia", "byondis", "synaffix", "screenpoint-medical", "hub-organoids", "neogene-therapeutics", "nec-bio", "tagworks-pharmaceuticals", "mytomorrows", "qiagen", "philips", "hovon", "dpcg", "european-myeloma-network", "forbion"];
export const NL_DRUGS = ["mammaprint", "zenocutuzumab", "petosemtamab", "trastuzumab-duocarmazine", "tacquell", "transpara", "thromboseq"];
export const NL_TRIALS = ["drup", "dutch-tme-trial", "cross", "rapido", "portec-2", "portec-3", "nlst-nelson", "preopanc", "preopanc-2", "preopanc-3", "niche-2", "nadina", "cairo3", "cairo5", "train-2", "ovhipec-1", "netherlands-hipec", "colopec", "horrad", "dutch-bone-metastasis-study", "rainbo", "crest-thoracic-rt", "mohs-versus-excision-facial-bcc", "tesla-rct"];
export const NL_PAPERS = ["paper-drup-van-der-velden-nature-2019", "paper-priestley-hartwig-metastatic-wgs-nature-2019", "paper-kapiteijn-dutch-tme-preoperative-radiotherapy-nejm-2001", "paper-bahadoer-rapido-short-course-radiotherapy-lancet-oncol-2021", "paper-preopanc-preoperative-chemoradiotherapy-jco-2020", "paper-niche-2-nejm-2024", "paper-nadina-nejm-2024", "paper-rohaas-til-vs-ipilimumab-nejm-2022", "paper-nelson-nejm-2020", "paper-portec-2-lancet-2010", "paper-portec-3-molecular-leon-castillo-jco-2020", "paper-verwaal-cytoreduction-hipec-peritoneal-colorectal-jco-2003", "paper-schaapveld-second-cancer-risk-40-years-hodgkin-nejm-2015", "paper-bakker-n-engl-j-med", "paper-sato-lgr5-organoids-nature-2009"];
export const NL_PEOPLE = ["emile-voest", "rene-bernards", "ton-schumacher", "john-haanen", "christian-blank", "myriam-chalabi", "cornelis-van-de-velde", "carien-creutzberg", "jan-van-lanschot", "harry-de-koning", "marc-besselink", "pieter-sonneveld", "rob-pieters", "martin-van-den-bent", "winette-van-der-graaf", "bas-raaymakers", "ernst-j-kuipers", "carla-van-gils"];

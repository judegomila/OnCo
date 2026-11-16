import type { TermInput } from "@/lib/schema";

/**
 * Laws and policies gap fill, November 2026 (docs/proposals/gap-census-2026-11.md, type `laws-policies`).
 *
 * Every statute below was read on 4 November 2026 as raw text from the official legislation site linked in its
 * record: the Boletín Oficial del Estado (Spain), Normattiva (Italy), officielebekendmakingen.nl (the Netherlands),
 * the Irish Statute Book, the eCFR (US regulations), govinfo.gov (US public laws), the Korean National Law Information
 * Center (law.go.kr) and Japan's e-Gov law database. The Medicare negotiation records rest on CMS's own data file of
 * 2 November 2026, read as CSV. The European right-to-be-forgotten overview rests on a 2025 ESMO Open review
 * (DOI 10.1016/j.esmoop.2025.105767, PMID 41320341), resolved through Europe PMC.
 *
 * What could not be read, and so is not stated as statute here: Légifrance (France) served a bot challenge; the
 * Belgian Moniteur (ejustice.just.fgov.be) served a bot challenge and the Chamber's search did not answer; Portugal's law
 * was read from the Diário da República PDF reached through its ELI address (data.dre.pt); legislatie.just.ro (Romania) did not answer over HTTPS or plain HTTP, and the Chamber of Deputies (cdep.ro) did not answer; the Slovenian
 * PIS register is a JavaScript application, the National Assembly site did not answer and the Uradni list search could
 * not be driven without a browser; the Cyprus House of Representatives site answered 403; Luxembourg's instrument is a convention
 * between government and industry rather than a statute. Those countries appear in the overview with the review as
 * the only source.
 *
 * Quotations from statutes keep their original language; English renderings are labelled as translations.
 */

const asOf = "2026-11-04";
type T = Omit<TermInput, "kind" | "asOf" | "category">;
const t = (x: T): TermInput => ({
  kind: "term", asOf, category: "Regulation & policy",
  ...x,
  tags: ["law", ...(x.tags ?? [])],
});

const ESMO_RTBF = { label: "André et al., Promoting equitable access to financial services to end financial discrimination against cancer survivors in Europe, ESMO Open 2025 (PMID 41320341)", url: "https://doi.org/10.1016/j.esmoop.2025.105767" };
const CMS_FILE = { label: "CMS: Negotiation Program selected drug list and maximum fair price data file, 2 November 2026 (ZIP)", url: "https://www.cms.gov/files/zip/cms-negotiation-program-selected-drug-list-maximum-fair-price-data-file-20261102.zip" };
const CMS_PROGRAM = { label: "CMS: Medicare Drug Price Negotiation Program", url: "https://www.cms.gov/initiatives/medicare-prescription-drug-affordability/overview/medicare-drug-price-negotiation-program" };

const RTBF_STATUTES = ["spain-rdl-5-2023-oncological-oblivion", "italy-law-193-2023-oncological-oblivion", "netherlands-ex-cancer-patients-insurance-decree", "portugal-law-75-2021-right-to-be-forgotten"];
const IRA_CYCLES = ["medicare-negotiation-2026-cancer-drug", "medicare-negotiation-2027-cancer-drugs", "medicare-negotiation-2028-cancer-drugs"];

export const termsLawGaps2026: TermInput[] = [
  t({
    id: "right-to-be-forgotten-cancer-europe", name: "Right-to-be-forgotten laws for cancer survivors in Europe",
    aka: ["right to be forgotten (cancer)", "RTBF cancer survivors", "droit à l'oubli", "diritto all'oblio oncologico", "derecho al olvido oncológico", "schone-lei-regeling", "direito ao esquecimento", "oncological oblivion"],
    tldr: "Ten European countries have rules that let a person who has had cancer stop declaring it when applying for insurance or a loan once a set time has passed without the cancer coming back: five years in some countries, ten in others, and five everywhere for a cancer diagnosed in childhood.",
    summary: "The problem these laws address: long after treatment has ended, an application for life insurance, a mortgage or a business loan asks whether the applicant has ever had cancer, and a yes can mean refusal, a higher premium or an exclusion. A right-to-be-forgotten law sets a period after which the question may not be asked, or the answer may not be used.\n\nA 2025 review in ESMO Open (André et al.) tabulates the European countries with such a measure in force, with the instrument and the standard waiting period as the review states them: France, Loi Lemoine 2022, 5 years; Belgium, Royal Decree 2025, 5 years; Luxembourg, government-industry convention 2020, 10 years; the Netherlands, Insurance Examinations Decree 2021, 10 years; Italy, Law 193/2023 with a health ministry grid of 22 March 2024, 10 years; Portugal, law of 1 January 2022, 10 years; Spain, Royal Decree-Law 5/2023, 5 years; Romania, law of 7 July 2022, 7 years; Cyprus, law of 23 November 2023, 10 years; Slovenia, law of November 2024 in force 2025, 7 years. The review notes that for a diagnosis before 18 (21 in Italy and the Netherlands) the period is 5 years in every jurisdiction listed, and that several countries set shorter periods for cancers with a very good outlook, such as ductal carcinoma in situ and melanoma in situ (1 year in France, Luxembourg and the Netherlands). ESMO's position in the same paper is a common European law based on a standard 5-year period.\n\nOnCo has read four of these instruments in their official text: Spain's Royal Decree-Law 5/2023, Italy's Law 193 of 7 December 2023, the Dutch decree of 2 November 2020 and Portugal's Law 75/2021 of 18 November 2021, which is broader than cancer and covers any aggravated health risk or disability. Each has its own record. France's rule is described on OnCo's France country page from INCa's guidance; the French statute itself could not be read from Légifrance, which refused a script. The Belgian, Romanian, Cypriot and Slovenian texts could not be read from their official sites in this round, and Luxembourg's instrument is a convention rather than a statute, so for those five countries the review above is the only source here.",
    links: [ESMO_RTBF],
    terms: RTBF_STATUTES,
    technologies: ["rejuv-life-insurance-loans-and-the-right-to-be-forgotten"],
    related: ["financial-toxicity"],
    bottlenecks: ["b-survivorship"],
    tags: ["eu"],
    notes: [
      "The waiting periods and instrument names in the second paragraph are the review's Table 1, not the statutes; where OnCo read a statute, its own record gives the statute's wording.",
      "The review's Table 1 lists the Dutch instrument as an 'Insurance Examinations Decree 2021'. The decree in the Staatsblad is dated 2 November 2020 and came into force on 1 January 2021.",
      "Sources that refused or could not be read on 4 November 2026: legifrance.gouv.fr (bot challenge), ejustice.just.fgov.be (bot challenge), lachambre.be (search not answering), legislatie.just.ro and cdep.ro (no response), pisrs.si (JavaScript only), dz-rs.si (no response), parliament.cy (403). Portugal's text was read from the PDF at its ELI address after the diariodarepublica.pt HTML page returned only JavaScript.",
    ],
  }),

  t({
    id: "spain-rdl-5-2023-oncological-oblivion", name: "Spain: Royal Decree-Law 5/2023 and the right to be forgotten after cancer",
    aka: ["Real Decreto-ley 5/2023", "RDL 5/2023", "derecho al olvido oncológico", "BOE-A-2023-15135", "Spain right to be forgotten cancer"],
    tldr: "Since 2023 Spanish law says that five years after cancer treatment ends with no relapse, a person does not have to declare the cancer when taking out life insurance, and an insurer or other business may not refuse them or charge them more because of it.",
    summary: "Spain, Real Decreto-ley 5/2023, de 28 de junio (BOE-A-2023-15135). Chapter II of the decree-law, headed \"Disposiciones para hacer efectivo el derecho al olvido oncológico\", amends two laws.\n\nArticle 209 amends the Insurance Contract Law (Ley 50/1980). Article 10 now ends: \"El tomador de un seguro sobre la vida no está obligado a declarar si él o el asegurado han padecido cáncer una vez hayan transcurridos cinco años desde la finalización del tratamiento radical sin recaída posterior.\" (Translation: the policyholder of a life insurance policy is not obliged to declare whether they or the insured person have had cancer once five years have passed since the end of radical treatment with no later relapse.) After that period the insurer may not take the cancer history into account, and any discrimination or restriction on that ground is prohibited. A new fifth additional provision forbids refusing cover, using different procedures or imposing more onerous conditions on a person for having had cancer once the same five years have passed.\n\nArticle 210 amends the consumer protection law (Real Decreto Legislativo 1/2007): clauses that exclude a party for having had cancer before signing are void once five years have passed since the end of radical treatment without relapse, and before any consumer contract, in any sector, the consumer may not be asked for cancer information after that point. In both laws the Government may change the periods by royal decree, together or for specific cancers, as the scientific evidence develops. The preamble ties the measure to the European Parliament resolution of 16 February 2022 on strengthening Europe in the fight against cancer.",
    links: [{ label: "BOE: Real Decreto-ley 5/2023, de 28 de junio (consolidated text)", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-15135" }, ESMO_RTBF],
    terms: ["right-to-be-forgotten-cancer-europe"],
    related: ["rejuv-life-insurance-loans-and-the-right-to-be-forgotten"],
    tags: ["es"],
    notes: ["The decree-law is an omnibus measure (its title begins with responses to the war in Ukraine); only Chapter II, Articles 209 and 210, concerns cancer. Read from the BOE consolidated text on 4 November 2026.", "Whether a royal decree has since shortened the five-year period for particular cancers was not checked."],
  }),

  t({
    id: "italy-law-193-2023-oncological-oblivion", name: "Italy: Law 193 of 7 December 2023 on the right to be forgotten after cancer",
    aka: ["Legge 7 dicembre 2023, n. 193", "Legge 193/2023", "diritto all'oblio oncologico", "Italy right to be forgotten cancer"],
    tldr: "Since 2 January 2024 Italian law forbids banks, insurers and other businesses from asking about a cancer whose active treatment ended more than ten years earlier without relapse, or five years if the cancer began before age 21.",
    summary: "Italy, Legge 7 dicembre 2023, n. 193, \"Disposizioni per la prevenzione delle discriminazioni e la tutela dei diritti delle persone che sono state affette da malattie oncologiche\" (Gazzetta Ufficiale n. 294 of 18 December 2023; in force 2 January 2024, per Normattiva). Article 1 defines the right: \"il diritto delle persone guarite da una patologia oncologica di non fornire informazioni né subire indagini in merito alla propria pregressa condizione patologica\" (translation: the right of people cured of a cancer not to give information about, or be investigated over, their past illness).\n\nArticle 2 covers banking, financial, investment and insurance services and any other contract, including between private parties. No information may be requested about a cancer whose active treatment ended, without recurrence, more than ten years before the request; the period is halved where the disease arose before the age of 21. The information may not be obtained from other sources either, and if the provider already holds it, it may not be used to set the terms. Providers must tell applicants about the right on their forms, may not apply extra limits, costs or different treatment, and may not require medical examinations in these cases. The law's later articles, not summarised here, deal with adoption and employment.",
    links: [{ label: "Normattiva: Legge 7 dicembre 2023, n. 193", url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2023-12-07;193" }, { label: "Normattiva: Legge 193/2023, article 2", url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2023-12-07;193~art2" }, ESMO_RTBF],
    terms: ["right-to-be-forgotten-cancer-europe"],
    related: ["rejuv-life-insurance-loans-and-the-right-to-be-forgotten"],
    tags: ["it"],
    notes: ["The ESMO Open review adds a health ministry grid of 22 March 2024 with shorter periods for some cancers; that grid was not read from the ministry's own text and its periods are not stated here.", "Articles 3 to 5 were not read in full on 4 November 2026."],
  }),

  t({
    id: "netherlands-ex-cancer-patients-insurance-decree", name: "Netherlands: the 2020 decree on insurance examinations of former cancer patients",
    aka: ["Besluit verzekeringskeuringen ex-kankerpatiënten", "schone-lei-regeling", "clean slate scheme", "Staatsblad 2020, 453", "Netherlands right to be forgotten cancer"],
    tldr: "Since 1 January 2021 Dutch insurers may not ask whether someone has had cancer when they apply for term life or funeral insurance, once ten years have passed in full remission with no recurrence, or five years if the cancer was diagnosed before age 21.",
    summary: "The Netherlands, Besluit van 2 november 2020, houdende regels voor verzekeringskeuringen van ex-kankerpatiënten (Besluit verzekeringskeuringen ex-kankerpatiënten), Staatsblad 2020, 453, made under article 14(3) of the Medical Examinations Act (Wet op de medische keuringen) and in force from 1 January 2021 (article 4).\n\nScope (article 1): examinations for term life insurance (overlijdensrisicoverzekering) with a sum insured up to the statutory question limit and a term ending before the insured person turns 71, and funeral insurance taken out before age 61. Rule (article 2): asking whether cancer was diagnosed in the past is a disproportionate intrusion on privacy if the treating clinician judged there to be complete remission and no recurrence has been diagnosed for an uninterrupted ten years from that point; five years if the person was under 21 at diagnosis. Article 3 allows shorter periods for specific cancers where the risk of recurrence falls early, set by agreement between representative patient and insurer organisations.\n\nIn an answer to parliamentary questions published on 26 May 2026, the Minister of Finance said that skin, thyroid and testicular cancers already have shorter periods than ten years under the scheme; that the periods are agreed between the Dutch Federation of Cancer Patient Organisations (NFK) and the Dutch Association of Insurers, reviewed in principle every three years; and that doctors, researchers, patient organisations and insurers were discussing whether new evidence justifies changing them.",
    links: [{ label: "Staatsblad 2020, 453: Besluit verzekeringskeuringen ex-kankerpatiënten", url: "https://zoek.officielebekendmakingen.nl/stb-2020-453.html" }, { label: "Aanhangsel van de Handelingen 2025-2026, nr. 2018: answers to questions on former cancer patients and life insurance (26 May 2026)", url: "https://zoek.officielebekendmakingen.nl/ah-tk-20252026-2018.html" }, ESMO_RTBF],
    terms: ["right-to-be-forgotten-cancer-europe"],
    related: ["rejuv-life-insurance-loans-and-the-right-to-be-forgotten"],
    tags: ["nl"],
    notes: ["The decree covers term life and funeral insurance only, within the limits in article 1; it does not reach other insurance or credit.", "The shorter periods for specific cancers live in the patient-insurer agreement, which was not read; none is stated here."],
  }),

  t({
    id: "portugal-law-75-2021-right-to-be-forgotten", name: "Portugal: Law 75/2021 and the right to be forgotten in credit and insurance",
    aka: ["Lei n.º 75/2021", "Lei 75/2021, de 18 de novembro", "direito ao esquecimento", "Portugal right to be forgotten cancer"],
    tldr: "Since 1 January 2022 Portuguese law stops banks and insurers from collecting health information about a serious illness, cancer included, once ten years have passed since the end of treatment, or five years if the illness occurred before age 21, when someone applies for a mortgage, consumer credit or the insurance tied to it.",
    summary: "Portugal, Lei n.º 75/2021, de 18 de novembro (Diário da República, 1.ª série, n.º 224, 18 November 2021), approved by the Assembly of the Republic on 22 October 2021 and in force from 1 January 2022 (article 8). Its summary: \"Reforça o acesso ao crédito e contratos de seguros por pessoas que tenham superado ou mitigado situações de risco agravado de saúde ou de deficiência, proibindo práticas discriminatórias e consagrando o direito ao esquecimento\" (translation: strengthens access to credit and insurance contracts for people who have overcome or mitigated situations of aggravated health risk or disability, prohibiting discriminatory practices and establishing the right to be forgotten). The law is not specific to cancer: it covers any long-lasting, potentially disabling illness that may shorten life expectancy, as defined in the amended Law 46/2006.\n\nArticle 3 gives such people, as consumers, the right to be forgotten when taking out housing credit, consumer credit and the compulsory or optional insurance linked to them: no higher premium or exclusion of cover, and no collection of health information about the condition before the contract. That information may not be collected once, without interruption, 10 years have passed since the end of the treatment protocol for an overcome condition; 5 years where the condition occurred before the age of 21; or 2 years of continuous and effective treatment where the condition is mitigated. Later articles amend Law 46/2006 and the insurance contract regime, including an agreement that must set a public reference grid of terms and periods for each condition, updated every two years, which may be more favourable to the consumer than the periods in article 3.",
    links: [{ label: "Diário da República: Lei n.º 75/2021, de 18 de novembro (PDF via ELI)", url: "https://data.dre.pt/eli/lei/75/2021/11/18/p/dre/pt/pdf" }, ESMO_RTBF],
    terms: ["right-to-be-forgotten-cancer-europe"],
    related: ["rejuv-life-insurance-loans-and-the-right-to-be-forgotten"],
    tags: ["pt"],
    notes: ["Read from the Diário da República PDF (files.diariodarepublica.pt, reached through the ELI address) on 4 November 2026. The ESMO Open review lists Portugal's instrument as a 'Law 1 Jan 2022', which is this law's date of entry into force.", "The reference grid itself, and whether it sets shorter periods for particular cancers, was not read."],
  }),

  t({
    id: "medicare-negotiation-2026-cancer-drug", name: "Medicare negotiated price for ibrutinib (Imbruvica), first cycle",
    aka: ["IPAY 2026", "first cycle of Medicare drug price negotiation", "Imbruvica maximum fair price"],
    tldr: "The first ten drugs with a Medicare-negotiated price, in effect from 1 January 2026, included one cancer medicine, ibrutinib (Imbruvica). Its price is set per 30-day supply and rose with inflation from 2027.",
    summary: "United States, under the Inflation Reduction Act's Medicare Drug Price Negotiation Program. CMS's data file of 2 November 2026 lists ten selected drugs for initial price applicability year (IPAY) 2026. Ibrutinib (Imbruvica) is the one cancer medicine among them.\n\nThe file gives Imbruvica a single maximum fair price of $9,319.00 per 30-day equivalent supply for 1 January to 31 December 2026, and $9,571.07 from 1 January 2027 after the inflation adjustment recorded on 25 November 2025. The file also gives a per-unit price for each package (NDC).",
    links: [CMS_FILE, CMS_PROGRAM],
    drugs: ["ibrutinib"],
    terms: ["inflation-reduction-act"],
    related: IRA_CYCLES.filter((x) => x !== "medicare-negotiation-2026-cancer-drug"),
    bottlenecks: ["b-drug-pricing"],
    tags: ["us"],
    notes: ["Figures copied from the 'Single MFP per 30 DES' column of the CMS CSV dated 2 November 2026; the dollar amounts are as CMS wrote them."],
  }),

  t({
    id: "medicare-negotiation-2027-cancer-drugs", name: "Medicare negotiated prices from 2027: enzalutamide, pomalidomide, palbociclib and acalabrutinib",
    aka: ["IPAY 2027", "second cycle of Medicare drug price negotiation", "Xtandi maximum fair price", "Pomalyst maximum fair price", "Ibrance maximum fair price", "Calquence maximum fair price"],
    tldr: "Of the fifteen drugs whose Medicare-negotiated prices start on 1 January 2027, four are cancer medicines: Xtandi (enzalutamide), Pomalyst (pomalidomide), Ibrance (palbociclib) and Calquence (acalabrutinib).",
    summary: "United States, Medicare Drug Price Negotiation Program, second cycle. CMS's data file of 2 November 2026 lists fifteen selected drugs for initial price applicability year 2027, with maximum fair prices effective 1 January 2027. The four cancer medicines and their single maximum fair price per 30-day equivalent supply, as the file gives them:\n\n- Xtandi (enzalutamide): $7,004.00\n- Pomalyst (pomalidomide): $8,650.00\n- Ibrance (palbociclib): $7,871.00\n- Calquence (acalabrutinib): $8,600.00",
    links: [CMS_FILE, CMS_PROGRAM],
    drugs: ["enzalutamide", "pomalidomide", "palbociclib", "acalabrutinib"],
    terms: ["inflation-reduction-act"],
    related: IRA_CYCLES.filter((x) => x !== "medicare-negotiation-2027-cancer-drugs"),
    bottlenecks: ["b-drug-pricing"],
    tags: ["us"],
    notes: ["Figures copied from the CMS CSV dated 2 November 2026 (rows dated 25 November 2025, type 'New IPAY')."],
  }),

  t({
    id: "medicare-negotiation-2028-cancer-drugs", name: "Medicare drug price negotiation for 2028: apalutamide, ribociclib, abemaciclib and lenvatinib",
    aka: ["IPAY 2028", "third cycle of Medicare drug price negotiation", "Erleada negotiation", "Kisqali negotiation", "Verzenio negotiation", "Lenvima negotiation"],
    tldr: "Four cancer medicines are among the drugs selected for the third round of Medicare price negotiation, with prices due from 1 January 2028: Erleada (apalutamide), Kisqali (ribociclib), Verzenio (abemaciclib) and Lenvima (lenvatinib). The negotiated prices had not been published in CMS's data file by November 2026.",
    summary: "United States, Medicare Drug Price Negotiation Program, third cycle. CMS's data file of 2 November 2026 lists fourteen drugs for initial price applicability year 2028, each with an effective date of 1 January 2028. Four are cancer medicines: Erleada (apalutamide), Kisqali (ribociclib), Verzenio (abemaciclib) and Lenvima (lenvatinib). The file gives no maximum fair price for any 2028 drug yet; the price columns are blank.",
    links: [CMS_FILE, CMS_PROGRAM],
    drugs: ["apalutamide", "ribociclib", "abemaciclib", "lenvatinib"],
    terms: ["inflation-reduction-act"],
    related: IRA_CYCLES.filter((x) => x !== "medicare-negotiation-2028-cancer-drugs"),
    bottlenecks: ["b-drug-pricing"],
    tags: ["us"],
    notes: ["The census counted 15 drugs for 2028 from a CMS fact sheet; the data file of 2 November 2026 lists 14. The record states what the file shows.", "No 2028 price was in the file on 4 November 2026; none is stated."],
  }),

  t({
    id: "ireland-alcohol-act-cancer-warning", name: "Ireland: Public Health (Alcohol) Act 2018, section 12, and the cancer warning on alcohol",
    aka: ["Public Health (Alcohol) Act 2018", "Act No. 24 of 2018", "Public Health (Alcohol) (Labelling) Regulations 2023", "S.I. No. 249/2023", "Ireland alcohol cancer warning label"],
    tldr: "Ireland's 2018 alcohol law will require alcohol containers, pubs and online sellers to carry a warning about the direct link between alcohol and fatal cancers; in 2025 the start was put back to 2028. The labelling rules made under it set the wording \"There is a direct link between alcohol and fatal cancers\".",
    summary: "Ireland, Public Health (Alcohol) Act 2018 (No. 24 of 2018), section 12. It makes it an offence to sell an alcohol product whose container does not bear, in the prescribed form, a general health warning, a warning about drinking in pregnancy, \"a warning that is intended to inform the public of the direct link between alcohol and fatal cancers\", the grams of alcohol, the energy value and a public health website. Licensed premises must display the same warnings inside, in English and Irish, and online sellers must show them on their websites.\n\nThe Public Health (Alcohol) (Labelling) Regulations 2023 (S.I. No. 249 of 2023) prescribe the cancer warning as \"There is a direct link between alcohol and fatal cancers\" and set its minimum size (the warning panel at least 45 by 10 millimetres). As made, regulation 2 said they would come into operation on 22 May 2026; on 3 September 2025 S.I. No. 423 of 2025 replaced that date, and S.I. No. 422 of 2025 brings section 12 into operation three years after that order, so the warning is not required before 2028.",
    links: [{ label: "Irish Statute Book: Public Health (Alcohol) Act 2018, section 12", url: "https://www.irishstatutebook.ie/eli/2018/act/24/section/12/enacted/en/html" }, { label: "Irish Statute Book: S.I. No. 249/2023, Public Health (Alcohol) (Labelling) Regulations 2023", url: "https://www.irishstatutebook.ie/eli/2023/si/249/made/en/html" }, { label: "Irish Statute Book: S.I. No. 422/2025, commencement order", url: "https://www.irishstatutebook.ie/eli/2025/si/422/made/en/html" }, { label: "Irish Statute Book: S.I. No. 423/2025, amending the labelling regulations", url: "https://www.irishstatutebook.ie/eli/2025/si/423/made/en/html" }],
    terms: ["alcohol-attributable-cancer"],
    technologies: ["alcohol-reduction-labelling"],
    related: ["idea-prev-alcohol-cancer-warning-labels"],
    tags: ["ie"],
    notes: ["The commencement date is the regulations as made. The Irish Statute Book's amendment list could not be read on 4 November 2026, so whether a later instrument changed the date was not checked; OnCo does not state that the labels are in use.", "Checked 11 November 2026: S.I. No. 422/2025 brings section 12 into operation three years after that order was made (3 September 2025), and S.I. No. 423/2025 replaced the 22 May 2026 date in the labelling regulations, so the requirement is not in force before 2028."],
  }),

  t({
    id: "mqsa-breast-density-notice", name: "Mammography Quality Standards Act (MQSA) and the breast density notice",
    aka: ["MQSA", "Mammography Quality Standards Act", "42 U.S.C. 263b", "21 CFR 900", "breast density notification", "dense breast notification"],
    tldr: "A US federal law sets quality standards for mammography facilities. Its rules require each woman's results letter to say in plain words whether her breast tissue is dense, because dense tissue makes cancer harder to see on a mammogram and raises the risk of breast cancer.",
    summary: "United States, the Mammography Quality Standards Act (42 U.S.C. 263b), implemented by FDA regulations in 21 CFR part 900, which set the standards a facility must meet to perform screening or diagnostic mammography and the system of accreditation bodies that check them.\n\nUnder 21 CFR 900.12(c), each mammography report must give an overall assessment of breast density in one of four categories, from \"The breasts are almost entirely fatty\" to \"The breasts are extremely dense, which lowers the sensitivity of mammography\". The facility must send the patient a lay summary within 30 calendar days. Where the tissue is heterogeneously or extremely dense, the summary must say: \"Breast tissue can be either dense or not dense. Dense tissue makes it harder to find breast cancer on a mammogram and also raises the risk of developing breast cancer. Your breast tissue is dense. In some people with dense tissue, other imaging tests in addition to a mammogram may help find cancers. Talk to your healthcare provider about breast density, risks for breast cancer, and your individual situation.\" Where it is not dense, a matching statement says so.",
    links: [{ label: "eCFR: 21 CFR 900.12, quality standards (current text)", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-I/part-900/subpart-B/section-900.12" }, { label: "eCFR: 21 CFR part 900, mammography", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-I/part-900" }],
    technologies: ["mammography"],
    institutions: ["fda-oce"],
    tags: ["us"],
    notes: ["Read from the eCFR versioner API (text current to 1 October 2026). The date the density notice took effect and the Act's year of enactment were not stated in the text read and are left out."],
  }),

  t({
    id: "pact-act-2022-cancer-presumptions", name: "PACT Act 2022: cancers presumed service-connected for US veterans exposed to burn pits and other toxins",
    aka: ["PACT Act", "Honoring our PACT Act of 2022", "Sergeant First Class Heath Robinson Honoring our Promise to Address Comprehensive Toxics Act of 2022", "Public Law 117-168", "38 U.S.C. 1120", "burn pit presumptive cancers"],
    tldr: "A 2022 US law means a veteran who served where burn pits and other toxins were used, and later develops one of a listed set of cancers, does not have to prove the service caused it to receive veterans' benefits. The list covers head, neck, respiratory, digestive, reproductive, kidney and brain cancers, lymphomas, melanoma, pancreatic cancer and glioblastoma.",
    summary: "United States, Public Law 117-168, approved 10 August 2022, cited as the Sergeant First Class Heath Robinson Honoring our Promise to Address Comprehensive Toxics Act of 2022, or the Honoring our PACT Act. Section 406 adds 38 U.S.C. 1120: a listed disease becoming manifest in a covered veteran is treated as incurred or aggravated during service, \"notwithstanding that there is no record of evidence of such disease during the period of such service.\"\n\nThe cancers listed in section 1120(b)(2): head cancer of any type; neck cancer of any type; respiratory cancer of any type; gastrointestinal cancer of any type; reproductive cancer of any type; lymphoma cancer of any type; lymphomatic cancer of any type; kidney cancer; brain cancer; melanoma; pancreatic cancer. Glioblastoma is listed separately at (b)(14). The Act phased the presumptions in: respiratory and brain cancers and glioblastoma from enactment; head, neck, gastrointestinal, reproductive, lymphoma and pancreatic cancers from 1 October 2024; kidney cancer and melanoma from 1 October 2025; with all of them available from enactment for veterans who were terminally ill, homeless, in extreme financial hardship, over 85, or showing other sufficient cause.",
    links: [{ label: "govinfo: Public Law 117-168 (PACT Act), full text", url: "https://www.govinfo.gov/content/pkg/PLAW-117publ168/html/PLAW-117publ168.htm" }],
    cancers: ["head-and-neck", "glioblastoma", "melanoma", "pancreatic", "rcc"],
    terms: ["risk-factor"],
    tags: ["us"],
    notes: ["Which veterans count as 'covered' is defined in 38 U.S.C. 1119(c), by place and period of service; that definition is not reproduced here.", "Congress.gov refused a script; the text was read from govinfo.gov."],
  }),

  t({
    id: "wtc-health-program-covered-cancers", name: "World Trade Center Health Program and the cancers it covers (Zadroga Act)",
    aka: ["WTC Health Program", "James Zadroga 9/11 Health and Compensation Act of 2010", "Zadroga Act", "Public Law 111-347", "42 CFR 88.15", "List of WTC-Related Health Conditions"],
    tldr: "Responders and survivors of the 11 September 2001 attacks in New York who later develop one of a long list of cancers can have their care paid for by a US federal programme. The list covers most solid cancers and all blood cancers, plus any cancer in someone under 20 and any rare cancer.",
    summary: "United States, the James Zadroga 9/11 Health and Compensation Act of 2010 (Public Law 111-347, approved 2 January 2011) created the World Trade Center Health Program (42 U.S.C. 300mm to 300mm-64), run under regulations in 42 CFR part 88.\n\nThe List of WTC-Related Health Conditions (42 CFR 88.15(d)) names the covered cancers: cancers of the mouth, throat and pharynx; nasopharynx; nose, sinuses and middle ear; larynx; oesophagus; stomach; colon and rectum; liver and intrahepatic bile duct; retroperitoneum and peritoneum; trachea, bronchus, lung, heart, mediastinum and pleura; mesothelioma; peripheral nerves and soft tissue; skin (melanoma and non-melanoma); female breast; uterus; ovary; prostate; bladder; kidney; renal pelvis and ureter; eye and orbit; thyroid; blood and lymphoid tissues, including lymphoma, leukaemia and myeloma. It also covers \"Childhood cancers: any type of cancer diagnosed in a person less than 20 years of age\" and \"Rare cancers: any type of cancer that occurs in less than 15 cases per 100,000 persons per year in the United States\", based on 2005-2009 incidence. Any interested party may petition the programme's Administrator to add a condition (42 CFR 88.16).",
    links: [{ label: "eCFR: 42 CFR part 88, World Trade Center Health Program", url: "https://www.ecfr.gov/current/title-42/chapter-I/subchapter-G/part-88" }, { label: "govinfo: Public Law 111-347, James Zadroga 9/11 Health and Compensation Act of 2010", url: "https://www.govinfo.gov/content/pkg/PLAW-111publ347/html/PLAW-111publ347.htm" }],
    cancers: ["mesothelioma", "thyroid", "prostate"],
    terms: ["risk-factor"],
    tags: ["us"],
    notes: ["The CDC's programme pages refused a script; the list is read from the eCFR (text current to 1 October 2026, last amended 18 January 2023 per the regulation's own history line).", "The cancers are paraphrased from the regulation's ICD-style list; the two category definitions in quotation marks are the regulation's words."],
  }),

  t({
    id: "korea-cancer-control-act", name: "Cancer Control Act (Republic of Korea)",
    aka: ["암관리법", "Korean Cancer Control Act", "Cancer Management Act (Korea)"],
    tldr: "South Korea's national cancer law, passed in 2003, obliges the government to run cancer screening, a cancer registry, home care and survivorship programmes, to help poorer patients with treatment costs, and it is the legal basis of the National Cancer Center.",
    summary: "Republic of Korea, 암관리법 (Cancer Control Act). A 2008 review of Korean cancer control (Yoo, Jpn J Clin Oncol 2008) records that the act was legislated in 2003. The current text on the Korean National Law Information Center is Act No. 21262, partly amended on 30 December 2025 and in force from 31 March 2026, administered by the Ministry of Health and Welfare with the Korea Disease Control and Prevention Agency for article 16.\n\nWhat it requires, from the current text: the Minister of Health and Welfare draws up a comprehensive cancer control plan every five years after review by a National Cancer Control Committee (articles 5 to 8); runs a cancer research programme, which may be delegated to the National Cancer Center (article 9); must run a cancer screening programme, with the cancers, ages and intervals set by presidential decree in light of incidence, survival and mortality statistics, and may pay all or part of the cost for medical-aid recipients and some insured people (article 11); must run home care for cancer patients, including pain control and palliative care visits (article 12), and an integrated support programme for survivors' health and return to school and work (article 12-2); may fund treatment costs according to the patient's ability to pay (article 13); and must run a cancer registration and statistics programme producing screening, incidence, survival and mortality figures, drawing on hospitals, the National Health Insurance Service and the Health Insurance Review and Assessment Service (article 14). Article 27 establishes the National Cancer Center as a legal entity. Article 4 makes 21 March Cancer Prevention Day.",
    links: [{ label: "National Law Information Center (law.go.kr): 암관리법, current text", url: "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%95%94%EA%B4%80%EB%A6%AC%EB%B2%95" }, { label: "Yoo, Cancer control activities in the Republic of Korea, Jpn J Clin Oncol 2008 (PMID 18407932)", url: "https://doi.org/10.1093/jjco/hyn026" }],
    institutions: ["ncc-korea", "nhis-korea"],
    technologies: ["cancer-registries-surveillance"],
    tags: ["kr"],
    notes: ["Read in Korean from law.go.kr on 4 November 2026; the summary is OnCo's English paraphrase, not an official translation.", "The 2003 date rests on the 2008 review's abstract; the enactment entry in the law's history was not read."],
  }),

  t({
    id: "japan-cancer-registry-promotion-act", name: "Japan: Act on the Promotion of Cancer Registries (Act No. 111 of 2013)",
    aka: ["がん登録等の推進に関する法律", "がん登録推進法", "Cancer Registry Promotion Act", "Act on Promotion of Cancer Registries", "National Cancer Registry (Japan)", "全国がん登録"],
    tldr: "A 2013 Japanese law created a single national cancer registry: every hospital, and clinics designated by the prefecture, must report each newly diagnosed cancer, with its stage and treatment, to the prefectural governor.",
    summary: "Japan, がん登録等の推進に関する法律 (Act No. 111 of 2013, promulgated 13 December 2013, per Japan's e-Gov law database; last amended with effect from 1 October 2026). Article 1 places it under the Cancer Control Act (がん対策基本法, Act No. 98 of 2006) and sets its purpose: running a national cancer registry, governing the use, provision and protection of its information, promoting hospital-based registries, and using registry information to advance research and cancer control.\n\nArticle 2 distinguishes the national cancer registry (全国がん登録), a database kept by the state for use by the state and prefectures, from hospital-based cancer registries (院内がん登録) kept by hospitals that treat cancer. Article 6 requires the manager of every hospital, and of clinics designated by the prefectural governor, to report each primary cancer at its first diagnosis in that hospital (including at metastasis or recurrence) to the governor within the period set by ministry ordinance, with the patient's name, sex, date of birth and address, the diagnosis date, cancer type, stage, how it was found, the treatment given and, where known, the date of death. Chapters on use and provision, information protection and penalties follow.",
    links: [{ label: "e-Gov 法令検索: がん登録等の推進に関する法律 (Act No. 111 of 2013)", url: "https://laws.e-gov.go.jp/law/425AC0100000111" }],
    technologies: ["cancer-registries-surveillance"],
    institutions: ["ncc-japan"],
    tags: ["jp"],
    notes: ["Read in Japanese through the e-Gov law API on 4 November 2026; the summary is OnCo's paraphrase. The census lists the act as enacted on 6 December 2013; e-Gov gives the promulgation date, 13 December 2013, which is the date used here.", "The supplementary provisions set commencement by cabinet order within three years of promulgation; the commencement date itself was not read and is not stated.", "The National Cancer Center is linked as Japan's national cancer body; the article text read does not name it."],
  }),
];

/** Existing records that should link to the new ones (for the parent to wire into the owning files). */
export const lawBacklinks: Record<string, string[]> = {
  "inflation-reduction-act": IRA_CYCLES,
  ibrutinib: ["medicare-negotiation-2026-cancer-drug"],
  enzalutamide: ["medicare-negotiation-2027-cancer-drugs"],
  pomalidomide: ["medicare-negotiation-2027-cancer-drugs"],
  palbociclib: ["medicare-negotiation-2027-cancer-drugs"],
  acalabrutinib: ["medicare-negotiation-2027-cancer-drugs"],
  apalutamide: ["medicare-negotiation-2028-cancer-drugs"],
  ribociclib: ["medicare-negotiation-2028-cancer-drugs"],
  abemaciclib: ["medicare-negotiation-2028-cancer-drugs"],
  lenvatinib: ["medicare-negotiation-2028-cancer-drugs"],
  "rejuv-life-insurance-loans-and-the-right-to-be-forgotten": ["right-to-be-forgotten-cancer-europe", ...RTBF_STATUTES],
  "alcohol-reduction-labelling": ["ireland-alcohol-act-cancer-warning"],
  mammography: ["mqsa-breast-density-notice"],
  "inova-burn-pit-screening": ["pact-act-2022-cancer-presumptions"],
  "pact-act-2022-cancer-presumptions": ["wtc-health-program-covered-cancers"],
  "cancer-registries-surveillance": ["korea-cancer-control-act", "japan-cancer-registry-promotion-act"],
  "ncc-korea": ["korea-cancer-control-act"],
};

import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Finland: the public bodies behind /countries/fi/ (wave 8) that the corpus did not hold, written from their own pages
 * read raw on 11 November 2026: the Finnish Cancer Registry's Cancer in Finland 2024 report (HTML, read through the
 * Internet Archive's capture of 19 September 2026 because the registry's report host answered a plain request with a
 * bot check) and its screening pages; Kela's pages on reimbursement for medicine costs; and Fimea's "About us" page
 * (Internet Archive capture of 15 February 2025, as fimea.fi refused a plain request). FICAN, the Cancer Society of
 * Finland, HUS and the university hospitals already exist and are reused. Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const CIF_2024_WB = "https://web.archive.org/web/20260919081400/https://syoparekisteri.fi/assets/themes/ssy3/factsheets/cancer_in_finland_2024.html";
const CIF_PAGE = "https://cancerregistry.fi/reports-and-publications/annual-report-on-cancer-in-finland/";
const KELA_MED = "https://www.kela.fi/medicine-expenses";
const KELA_MAX = "https://www.kela.fi/medicine-expenses-annual-maximum-limit-on-out-of-pocket-costs";
const FIMEA_WB = "https://web.archive.org/web/20250215204011/https://fimea.fi/en/about_us";

const institutions: InstitutionInput[] = [
  i({ id: "finnish-cancer-registry", name: "Finnish Cancer Registry", aka: ["Suomen Syöpärekisteri", "Syöpärekisteri", "Finska cancerregistret"],
    city: "Helsinki", country: "FI", lat: 60.19, lng: 24.95, institutionType: "research-institute", website: "https://cancerregistry.fi",
    tldr: "Finland's national cancer registry, founded in 1953 and run by the Cancer Society of Finland for the Finnish Institute for Health and Welfare. It counted 38,853 new cancers and 13,490 cancer deaths in 2024 and keeps the registers of the cervical, breast and bowel screening programmes.",
    summary: "The Finnish Cancer Registry describes itself as a research institute under the Cancer Society of Finland that maintains a national registry of all diagnosed cancer cases and a registry of cervical, breast and colorectal cancer screening. The Finnish Institute for Health and Welfare (THL) is the registry's controller and has an agreement with the Cancer Society for its technical maintenance. Its statistics go back to 1953, the year it was founded; its data come from healthcare providers and pathology laboratories, and it notes that cases with no tissue or cell sample and haematological cancers may go unreported. The coordinates are an approximate Helsinki city point.\n\nIts report Cancer in Finland 2024, dated 15 June 2026, counts 38,853 new cancers in 2024 (18,667 in women and 20,186 in men), 13,490 cancer deaths, 343,041 people alive after a cancer diagnosis at the end of 2024, and five-year relative survival of 72% for patients followed in 2022 to 2024. Official statistics for 2024 and preliminary figures for 2025 were published on 24 April 2026; the preliminary count of 35,870 cases for 2025 is about 10% short of the final figure the registry expects. Stage at diagnosis was recorded for 42% of solid tumours in 2024. The registry plans and supports the screening programmes, including the national bowel screening programme launched in 2022.",
    programs: ["National cancer registration (since 1953)", "Cancer in Finland annual report", "Registers of the cervical, breast and colorectal screening programmes", "Cancer quality registry reporting"],
    institutions: ["cancer-society-of-finland", "fican", "helsinki-hus", "iarc"],
    cancers: ["breast-cancer", "prostate", "colorectal", "lung-cancer", "cervical"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Finnish Cancer Registry: annual report on cancer in Finland", url: CIF_PAGE },
      { label: "Cancer in Finland 2024 (HTML report; Internet Archive copy, 19 September 2026)", url: CIF_2024_WB },
      { label: "Finnish Cancer Registry: colorectal cancer screening", url: "https://cancerregistry.fi/screening/colorectal-cancer-screening/" },
    ] }),

  i({ id: "kela-finland", name: "Kela, the Social Insurance Institution of Finland", aka: ["Kela", "Kansaneläkelaitos", "FPA", "Folkpensionsanstalten", "Social Insurance Institution of Finland"],
    city: "Helsinki", country: "FI", lat: 60.18, lng: 24.92, institutionType: "government", website: "https://www.kela.fi",
    tldr: "Finland's social insurance institution. It reimburses prescription medicines bought at pharmacies at 40%, 65% or 100%, and caps what a person pays for reimbursable medicines at EUR 636.12 in 2026.",
    summary: "Kela reimburses the cost of medicines, clinical nutrition products and emollient creams prescribed to treat an illness. A person pays the full price until an initial deductible of EUR 70.33 a calendar year; after that the basic rate of reimbursement is 40% of the sales or reference price, the lower special rate 65% and the higher special rate 100%, with a copayment of EUR 4.50 for each purchase at the 100% rate. Special rates need a right to reimbursement granted by Kela.\n\nThe annual maximum on out-of-pocket costs for reimbursable medicines, which includes the initial deductible, is EUR 636.12 in 2026. Beyond it a person pays a copayment of EUR 2.50 for each prescription medicine for the rest of the year, plus any amount above the reference price if they decline a cheaper substitute. Kela can lend the annual maximum to people on low incomes. The coordinates are an approximate Helsinki city point.",
    programs: ["Reimbursement of medicine costs (40%, 65%, 100%)", "Annual maximum on out-of-pocket medicine costs", "Direct reimbursement at pharmacies", "Reimbursement for private medical care"],
    institutions: ["fimea-finland", "finnish-cancer-registry"],
    links: [
      { label: "Kela: reimbursements for medicine costs", url: KELA_MED },
      { label: "Kela: annual maximum limit on out-of-pocket medicine costs (2026)", url: KELA_MAX },
      { label: "Kela: how much reimbursement can you get for medicine costs", url: "https://www.kela.fi/how-much-reimbursement-can-you-get-for-medicine-costs" },
    ] }),

  i({ id: "fimea-finland", name: "Finnish Medicines Agency (Fimea)", aka: ["Fimea", "Lääkealan turvallisuus- ja kehittämiskeskus"],
    city: "Helsinki", country: "FI", lat: 60.2, lng: 24.93, institutionType: "government", website: "https://fimea.fi/en",
    tldr: "Finland's medicines regulator, a central agency under the Ministry of Social Affairs and Health. New cancer medicines reach Finland mainly through the European Medicines Agency's central route, in which Fimea can act as a rapporteur.",
    summary: "The Finnish Medicines Agency Fimea describes itself as the national competent authority for regulating pharmaceuticals, a central administrative agency operating under the Ministry of Social Affairs and Health that regulates medicinal products, medical devices, blood and tissue products and biobanks, and develops the pharmaceuticals sector. Its pages describe Finland acting as rapporteur in the EU centralised marketing authorisation procedure and as reference member state in the mutual recognition procedure. The European Medicines Agency states that the centralised procedure is compulsory for medicines with a new active substance to treat cancer. The coordinates are an approximate Helsinki city point.",
    programs: ["Marketing authorisation (national and EU procedures)", "Rapporteur in the EU centralised procedure", "Pharmacovigilance", "Regulation of biobanks"],
    institutions: ["ema", "kela-finland"],
    links: [
      { label: "Fimea: about us (Internet Archive copy, 15 February 2025)", url: FIMEA_WB },
      { label: "European Medicines Agency: authorisation of medicines, the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
    ] }),
];

/** Records behind /countries/fi/ (wave 8). */
export const recordsFI: EntityInput[] = [...institutions];

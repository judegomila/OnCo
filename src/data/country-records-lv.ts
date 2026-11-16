import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Latvia: the public bodies behind /countries/lv/ (wave 12) that the corpus did not hold. Each was written from primary
 * sources read raw on 11 November 2026: SPKC's statistics database (table ONKO021) and its 2026 presentation on the
 * cancer patient card, the National Health Service's English site, SPKC's 2025 screening notice and the OECD and
 * European Commission's EU Country Cancer Profile Latvia 2025 (Internet Archive copy). Riga East University Hospital
 * and Pauls Stradiņš Clinical University Hospital already exist and are reused. Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const CCP_2025 = "https://web.archive.org/web/20260519061152/https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-lv-2024-1675-en.pdf";
const SPKC_STATS = "https://statistika.spkc.gov.lv/pxweb/lv/Health/";

const institutions: InstitutionInput[] = [
  i({ id: "spkc-latvia", name: "Centre for Disease Prevention and Control of Latvia (SPKC)", aka: ["SPKC", "Slimību profilakses un kontroles centrs", "CDPC Latvia", "Latvian Cancer Registry"],
    city: "Riga", country: "LV", lat: 56.95, lng: 24.11, institutionType: "government", website: "https://www.spkc.gov.lv",
    tldr: "Latvia's public health agency. It has held the national Cancer Registry since 2009, publishes cancer counts by year, site and region in an open statistics database, and runs HPV vaccination information campaigns.",
    summary: "The Slimību profilakses un kontroles centrs (Centre for Disease Prevention and Control) is the holder of Latvia's register of patients with certain diseases under Cabinet Regulation No. 746 of 2008, including the Cancer Registry, which the OECD and European Commission's 2025 Country Cancer Profile says it has managed since 2009. Doctors report each cancer through a cancer patient card in the national e-health system, which since 1 January 2024 codes tumours to ICD-O 3.2. Its statistics table ONKO021 gives 11,198 newly registered malignant tumours in 2024 and 11,584 in 2025. The profile notes that the registry holds incidence, stage, treatment, survival and mortality data but not screening, genetic or patient-reported data, and cites the State Audit Office's 2023 finding that data quality and completeness need improving.",
    programs: ["Latvian Cancer Registry (from 2009)", "Cancer patient card in the e-health system", "HPV vaccination information campaigns (since 2017)", "Open health statistics database"],
    institutions: ["nvd-latvia", "riga-east-university-hospital", "pauls-stradins-clinical-university-hospital"],
    cancers: ["prostate", "breast-cancer", "colorectal", "lung-cancer"],
    links: [
      { label: "SPKC statistics database: table ONKO021, newly registered malignant tumours", url: SPKC_STATS },
      { label: "SPKC: the role of family doctors in reporting to the cancer patient card (26 March 2026, PDF, in Latvian)", url: "https://www.spkc.gov.lv/lv/media/25316/download" },
      { label: "EU Country Cancer Profile Latvia 2025, section 5 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),

  i({ id: "nvd-latvia", name: "National Health Service of Latvia (NVD)", aka: ["NVD", "Nacionālais veselības dienests", "NHS Latvia"],
    city: "Riga", country: "LV", lat: 56.95, lng: 24.11, institutionType: "government", website: "https://www.vmnvd.gov.lv",
    tldr: "The state body that pays for publicly funded health care in Latvia. It sends invitations for breast and cervical cancer screening, funds prostate screening and runs the national e-health system.",
    summary: "The Nacionālais veselības dienests administers Latvia's state-funded health care and, according to SPKC's reporting instructions, is the controller of the national e-health system. The OECD and European Commission's 2025 Country Cancer Profile describes it sending invitation letters for breast screening (women aged 50 to 69 every two years) and cervical screening (cytology at 25 and 28, primary HPV testing from 30 to 67), and sets out the copayments patients pay for cancer care: EUR 7 a day in hospital and EUR 0.71 per prescription for cancer drugs, with exemptions for children, low-income patients and palliative care. Its own site describes prostate screening as fully funded by the state; SPKC's notice describes it as a PSA blood test, and the profile gives it as every two years for men aged 50 to 75. SPKC's 2025 notice gives its 2023 screening uptake: 55.2% cervical, 36.1% breast, 25.8% bowel and 80% prostate.",
    programs: ["State-funded health care", "Breast and cervical cancer screening invitations", "Prostate cancer screening", "E-health system"],
    institutions: ["spkc-latvia"],
    links: [
      { label: "National Health Service of Latvia (English)", url: "https://www.vmnvd.gov.lv/en" },
      { label: "SPKC: instructions for reporting patients with cancer in the e-health system (from 1 January 2024, PDF, in Latvian)", url: "https://spkc.gov.lv/lv/media/19977/download" },
      { label: "SPKC: World Cancer Day 2025 notice (LV portāls)", url: "https://lvportals.lv/dienaskartiba/372369-pasaules-pretveza-diena-spkc-aicina-rupeties-par-savu-un-lidzcilveku-veselibu-2025" },
      { label: "EU Country Cancer Profile Latvia 2025, sections 4 and 5 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),
];

/** Records behind /countries/lv/ (wave 12). */
export const recordsLV: EntityInput[] = [...institutions];

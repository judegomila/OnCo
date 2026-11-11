import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Armenia: the body behind /countries/am/ (wave 12) that the corpus did not hold, written from the National Center of
 * Oncology's home page, read raw in Armenian on 11 November 2026. Coordinates are an approximate city point for Yerevan.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const institutions: InstitutionInput[] = [
  i({ id: "national-center-of-oncology-armenia", name: "National Center of Oncology named after V. A. Fanarjyan", aka: ["Fanarjyan National Center of Oncology", "National Oncology Center of Armenia", "Վ. Ա. Ֆանարջյանի անվան ուռուցքաբանության ազգային կենտրոն"],
    city: "Yerevan", country: "AM", lat: 40.18, lng: 44.51, institutionType: "cancer-center", website: "https://www.oncology.am",
    tldr: "Armenia's national oncology centre, at 76 Fanarjyan Street in Yerevan, with departments for cancer surgery, medical oncology, external beam radiotherapy, brachytherapy, palliative care and free psychosocial support.",
    summary: "The National Center of Oncology named after V. A. Fanarjyan is in Yerevan. Its home page, read in Armenian on 11 November 2026, names Karen Tsarukyan as director and lists departments of oncological urology, gynaecology, musculoskeletal oncology, abdominal and endoscopic surgery, intracavitary and interstitial radiotherapy (which it describes as the first and only in Armenia), neuro-oncology (formed in October 1983), mammology, external beam radiotherapy, medical oncology for almost all sites except leukaemias, general and paediatric oncology and reconstructive surgery, thoracic surgery and interventional pulmonology, and vascular surgery (created on 12 September 2023), with a palliative care clinic whose psychosocial service is free to patients and families. Its home page advertises the Armenian Oncology Congress 2027.",
    programs: ["Cancer surgery", "Medical oncology", "External beam radiotherapy", "Brachytherapy", "Palliative care", "Psychosocial service"],
    institutions: ["armenian-psycho-oncology-association"], people: ["karen-tsarukyan"],
    cancers: ["breast-cancer", "lung-cancer", "colorectal", "prostate"],
    links: [{ label: "National Center of Oncology named after V. A. Fanarjyan: home page (in Armenian)", url: "https://www.oncology.am/" }] }),
];

/** Records behind /countries/am/ (wave 12). */
export const recordsAM: EntityInput[] = [...institutions];

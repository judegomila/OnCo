import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Norway: the public bodies behind /countries/no/ (wave 8) that the corpus did not hold. Each was written from its own
 * pages, read raw on 11 November 2026: the Cancer Registry of Norway's report Cancer in Norway 2024 (PDF text, NIPH,
 * May 2025) and its publication page, the Nye metoder English page (last updated 29 November 2024), the Norwegian
 * Institute of Public Health's page on its role in Nye metoder, and the Norwegian Medical Products Agency's English
 * "About us" page. Oslo University Hospital's Radium Hospital, Haukeland, Akershus and the Norwegian Cancer Society
 * already exist and are reused. Coordinates are approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const CIN_2024 = "https://www.fhi.no/en/publ/2025/cancer-in-norway-2024/";
const CIN_2024_PDF = "https://www.fhi.no/contentassets/1d3cf9facb9747a1b9148cb23a7f7c54/cin_report_erratum.pdf";
const NM_EN = "https://www.nyemetoder.no/english";
const FHI_NM = "https://www.fhi.no/ku/kunnskaps-og-beslutningsstotte/systemet-nye-metoder/";
const NOMA_ABOUT = "https://www.dmp.no/en/about-us";

const institutions: InstitutionInput[] = [
  i({ id: "cancer-registry-of-norway", name: "Cancer Registry of Norway", aka: ["Kreftregisteret", "Cancer Registry of Norway at NIPH"],
    city: "Oslo", country: "NO", lat: 59.93, lng: 10.72, institutionType: "government", website: "https://www.fhi.no/kreft/kreftregisteret/",
    tldr: "Norway's national population-based cancer registry, running since 1952 and now part of the Norwegian Institute of Public Health. It publishes Cancer in Norway each year, and its report describes the national breast, cervical and bowel screening programmes.",
    summary: "The Cancer Registry of Norway has been operational since 1952, its 2024 report says, and publishes its annual report Cancer in Norway as the Cancer Registry of Norway at the Norwegian Institute of Public Health (NIPH). Cancer in Norway 2024, published on 14 May 2025, counted 38,811 new cancer cases in 2024 (20,623 in males and 18,188 in females), 11,452 cancer deaths taken from the Cause of Death Registry (preliminary data), and 347,867 people alive at the end of 2024 after at least one cancer diagnosis. It notes that a further 1 to 2% of cases for a year typically reach the registry after publication. Five-year relative survival for all sites in 2020 to 2024 was 77.9% in males and 77.7% in females.\n\nThe Institute's screening pages say the bowel screening programme invites men and women at 55, started in 2022 and will include everyone aged 55 to 65 from 2030. The 2024 report describes the breast screening programme (biennial mammography for women aged 50 to 69, nationwide by 2005) and the cervical programme for women aged 25 to 69, nationwide from 1995, which moved to primary HPV testing between 2015 and 2023. The coordinates are an approximate Oslo city point.",
    programs: ["Cancer in Norway annual report", "Population-based cancer registration (since 1952)", "BreastScreen Norway (Mammografiprogrammet)", "Cervical cancer screening programme", "Bowel cancer screening programme (Tarmscreeningprogrammet, from 2022)"],
    institutions: ["oslo-radium-hospital", "haukeland-university-hospital", "akershus-university-hospital", "norwegian-cancer-society", "nye-metoder-norway", "iarc"],
    cancers: ["breast-cancer", "cervical", "colorectal", "prostate", "lung-cancer"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "NIPH: Cancer in Norway 2024 (published 14 May 2025)", url: CIN_2024 },
      { label: "Cancer in Norway 2024, full report with erratum (PDF)", url: CIN_2024_PDF },
      { label: "NIPH: bowel screening programme, who is invited", url: "https://www.fhi.no/kreft/kreftscreening/tarmscreening/nar-kommer-invitasjonen/" },
    ] }),

  i({ id: "nye-metoder-norway", name: "Nye metoder (the New Methods system), Norway", aka: ["Nye metoder", "New Methods Norway", "Beslutningsforum for nye metoder", "Decision Forum (Norway)"],
    city: "Oslo", country: "NO", lat: 59.91, lng: 10.75, institutionType: "government", website: "https://www.nyemetoder.no",
    tldr: "Norway's national system, launched in 2013, for deciding which new treatments public hospitals may use. Under it, as a rule, a new hospital cancer medicine or indication cannot be prescribed until its Decision Forum, the four regional health authorities' chief executives, says yes.",
    summary: "Nye metoder is the national system of managed introduction of new methods in Norway's specialist health care service, launched in 2013, and the four regional health authorities (South-Eastern, Western, Northern and Central Norway) are responsible for it. Its English page explains that, as a general rule, new medicinal products and indications cannot be prescribed in the specialist health services until the Decision Forum (Beslutningsforum) has made a positive decision; once an assessment has been commissioned, a medicine may be used under an exemption scheme if specific requirements are met.\n\nAn Ordering Forum of the four regional medical directors and two delegates from the Directorate of Health decides which assessments to commission. The Norwegian Medical Products Agency assesses medicines and medical devices and the Norwegian Institute of Public Health assesses procedures and other interventions; the Institute says national assessments carry no direct recommendation, and the priority criteria used in Norway are benefit, resource use and severity. After a single technology assessment, the Norwegian Hospital Procurement Trust (Sykehusinnkjøp) negotiates the price, and the Decision Forum, the four regional chief executives, decides. Hospitals also run local mini-HTAs. Its secretariat's contact address is at the South-Eastern Norway Regional Health Authority; the coordinates are an approximate Oslo city point.",
    programs: ["Decision Forum (Beslutningsforum)", "Ordering Forum (Bestillerforum)", "Single technology assessments of hospital medicines", "Exemption scheme for medicines under assessment", "Hospital mini-HTA"],
    institutions: ["noma-norway", "cancer-registry-of-norway", "oslo-radium-hospital", "haukeland-university-hospital"],
    links: [
      { label: "Nye metoder: information in English (last updated 29 November 2024)", url: NM_EN },
      { label: "Nye metoder: for suppliers, information in English", url: "https://nyemetoder.no/no/english/for-suppliers" },
      { label: "Norwegian Institute of Public Health: its role in the Nye metoder system (in Norwegian)", url: FHI_NM },
    ] }),

  i({ id: "noma-norway", name: "Norwegian Medical Products Agency (NOMA)", aka: ["NOMA", "DMP", "Direktoratet for medisinske produkter", "Statens legemiddelverk", "Norwegian Medicines Agency"],
    city: "Oslo", country: "NO", lat: 59.92, lng: 10.76, institutionType: "government", website: "https://www.dmp.no/en",
    tldr: "Norway's regulator for medicines and medical devices. NOMA assesses the cost-effectiveness of medicines, including for Nye metoder, and sets maximum prices.",
    summary: "The Norwegian Medical Products Agency (in Norwegian Direktoratet for medisinske produkter, DMP) describes itself as responsible for ensuring that people and animals have access to safe medicines and medical devices, and for facilitating research and innovation in medical products. Nye metoder's English page, last updated in November 2024, still names it by its earlier name, the Norwegian Medicines Agency (Statens legemiddelverk).\n\nIn the Nye metoder system the Agency carries out the assessments of medicines and medical devices, while the Norwegian Institute of Public Health assesses procedures. Its public funding and pricing page says it is responsible for assessing the cost-effectiveness of prescription-only medicines and for setting maximum prices. The coordinates are an approximate Oslo city point.",
    programs: ["Marketing authorisation (national and EEA)", "Single technology assessments for Nye metoder", "Maximum prices for prescription medicines", "Pharmacovigilance", "Clinical trial applications under the EU Clinical Trials Regulation"],
    institutions: ["ema", "nye-metoder-norway"],
    links: [
      { label: "Norwegian Medical Products Agency: about us", url: NOMA_ABOUT },
      { label: "Norwegian Medical Products Agency: public funding and pricing of medicines", url: "https://dmp.no/en/public-funding-and-pricing-of-medicines" },
      { label: "Nye metoder: information in English", url: NM_EN },
      { label: "Norwegian Institute of Public Health: its role in Nye metoder (in Norwegian)", url: FHI_NM },
    ] }),
];

/** Records behind /countries/no/ (wave 8). */
export const recordsNO: EntityInput[] = [...institutions];

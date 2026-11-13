import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Croatia: the public bodies behind /countries/hr/ (wave 9) that the corpus did not hold, each written from its own
 * pages read as raw text in Croatian on 11 November 2026: the Croatian Institute of Public Health's pages on cancer
 * incidence in 2022 and 2023, its report Rak u Hrvatskoj 2023./2024. (PDF text) and its page on the national early
 * detection programmes, and the Croatian Health Insurance Fund's page on the right to medicines. The University Hospital
 * for Tumors at Sestre milosrdnice already exists and is reused. Coordinates are approximate Zagreb points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const HZJZ_2023 = "https://www.hzjz.hr/aktualnosti/incidencija-raka-u-hrvatskoj-u-2023-godini/";
const HZJZ_BILTEN = "https://www.hzjz.hr/wp-content/uploads/2026/02/Bilten-2023.pdf";
const HZZO_LIJEKOVI = "https://hzzo.hr/zdravstvena-zastita/lijekovi/pravo-na-koristenje-lijekova";

const institutions: InstitutionInput[] = [
  i({ id: "hzjz-croatia", name: "Croatian Institute of Public Health", aka: ["Hrvatski zavod za javno zdravstvo", "HZJZ"],
    city: "Zagreb", country: "HR", lat: 45.81, lng: 15.98, institutionType: "government", website: "https://www.hzjz.hr",
    tldr: "Croatia's national public health institute. It runs the Croatian National Cancer Registry, counting cancer since 1959, and publishes information on the national early detection programmes for breast, bowel and cervical cancer.",
    summary: "The Croatian Institute of Public Health (Hrvatski zavod za javno zdravstvo) runs the national population-based cancer registry, which it says has operated since 1959, produced its first report for 1968, and since 2015 has been part of the National Public Health Information System. The registry recorded 26,736 new cancers in 2023, excluding non-melanoma skin cancer. In February 2026 it published Rak u Hrvatskoj 2023./2024., the first of its reports to add survival and prevalence to incidence and mortality. Its pages describe the national early detection programmes adopted by the Government: breast cancer (adopted by the Government in June 2006), colorectal cancer (2007) and cervical cancer (July 2010). The coordinates on this record are an approximate Zagreb point.",
    programs: ["Croatian National Cancer Registry (from 1959)", "National breast cancer early detection programme (2006)", "National colorectal cancer early detection programme (2007)", "National cervical cancer early detection programme (2010)"],
    institutions: ["hzzo-croatia", "sestre-milosrdnice-tumors", "iarc"], related: ["cancer-registries-surveillance"],
    cancers: ["breast-cancer", "colorectal", "cervical", "prostate"],
    links: [
      { label: "HZJZ: Incidencija raka u Hrvatskoj u 2023. godini", url: HZJZ_2023 },
      { label: "HZJZ: Rak u Hrvatskoj 2023./2024. (PDF)", url: HZJZ_BILTEN },
      { label: "HZJZ: Nacionalni programi ranog otkrivanja raka", url: "https://www.hzjz.hr/sluzba-epidemiologija-prevencija-nezaraznih-bolesti/nacionalni-programi-ranog-otkrivanja-raka/" },
    ] }),

  i({ id: "hzzo-croatia", name: "Croatian Health Insurance Fund", aka: ["Hrvatski zavod za zdravstveno osiguranje", "HZZO"],
    city: "Zagreb", country: "HR", lat: 45.81, lng: 15.97, institutionType: "government", website: "https://hzzo.hr",
    tldr: "Croatia's compulsory health insurer. Insured people are entitled to the medicines on its basic list in full and those on its supplementary list with a co-payment; a hospital's medicines committee can approve one that is not, at the hospital's expense.",
    summary: "The Croatian Health Insurance Fund (Hrvatski zavod za zdravstveno osiguranje) runs compulsory health insurance. Its page on the right to medicines says an insured person is entitled to the medicines set by its Basic List (Osnovna lista lijekova), paid in full by compulsory insurance, and Supplementary List (Dopunska lista lijekova), for which the patient pays a share directly or through supplementary insurance. Exceptionally, where treatment is not possible with listed medicines for medical reasons, a person can receive an unlisted medicine, or a listed one outside its listed indications, if the medicines committee of the treating hospital approves it on a specialist's proposal, paid for from the hospital's own funds. The coordinates on this record are an approximate Zagreb point.",
    programs: ["Compulsory health insurance", "Basic and Supplementary Lists of medicines", "Hospital medicines committee exceptions"],
    institutions: ["hzjz-croatia", "halmed-croatia"],
    links: [{ label: "HZZO: Pravo na korištenje lijekova", url: HZZO_LIJEKOVI }] }),

  i({ id: "halmed-croatia", name: "Agency for Medicinal Products and Medical Devices of Croatia", aka: ["HALMED", "Agencija za lijekove i medicinske proizvode"],
    city: "Zagreb", country: "HR", lat: 45.80, lng: 15.97, institutionType: "government", website: "https://www.halmed.hr",
    tldr: "Croatia's national medicines regulator. New cancer medicines reach Croatia mostly through the EU's centralised procedure; HALMED handles national authorisations and safety monitoring.",
    summary: "HALMED, the Agency for Medicinal Products and Medical Devices (Agencija za lijekove i medicinske proizvode), regulates medicines and medical devices in Croatia, including authorisation, inspection and pharmacovigilance, as its website's sections show. As an EU member, Croatia receives medicines with a new active substance for cancer through the European Medicines Agency's centralised procedure, which the EMA says is compulsory for them and valid in every member state; whether the Croatian Health Insurance Fund pays for them is a separate national decision. The coordinates on this record are an approximate Zagreb point.",
    programs: ["National authorisations", "Pharmacovigilance", "Inspection"],
    institutions: ["hzzo-croatia"],
    links: [
      { label: "HALMED: about HALMED", url: "https://www.halmed.hr/O-HALMED-u/" },
      { label: "EMA: authorisation of medicines", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
    ] }),
];

/** Records behind /countries/hr/ (wave 9). */
export const recordsHR: EntityInput[] = [...institutions];

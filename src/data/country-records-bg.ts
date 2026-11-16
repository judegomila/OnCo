import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Bulgaria: the public bodies behind /countries/bg/ (wave 8) that the corpus did not hold, written from their own
 * Bulgarian-language pages read raw on 11 November 2026: the history and "about" pages of the University Specialised
 * Hospital for Active Treatment in Oncology in Sofia (USBALO), which houses the National Cancer Registry; the National
 * Health Insurance Fund's pages on hospital medicines and expensive medicines; the Bulgarian Drug Agency's history page;
 * and the National Council on Prices and Reimbursement's home page. The Heart and Brain Hospital in Pleven already
 * exists and is reused. Coordinates are approximate city or district points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const USBALO_HIST = "https://www.sbaloncology.bg/За-болницата/История/s2";
const USBALO_ABOUT = "https://www.sbaloncology.bg/За-болницата/За-болницата/s1";
const NHIF_HOSP = "https://www.nhif.bg/bg/medicine_food/hospital-drugs";
const NHIF_EXP = "https://www.nhif.bg/bg/administrative-services/expensive-drugs";
const BDA_HIST = "https://www.bda.bg/bg/за-иал/история";
const NCPR = "https://www.ncpr.bg/bg/";

const institutions: InstitutionInput[] = [
  i({ id: "usbalo-sofia", name: "University Specialised Hospital for Active Treatment in Oncology \"Prof. Ivan Chernozemski\", Sofia (USBALO)", aka: ["USBALO", "УСБАЛО", "СБАЛО", "SBALO Sofia", "Bulgarian National Cancer Registry"],
    city: "Sofia", country: "BG", lat: 42.66, lng: 23.37, institutionType: "cancer-center", website: "https://www.sbaloncology.bg",
    tldr: "Bulgaria's specialised oncology hospital in Sofia, whose history begins with a 50-bed anti-cancer centre in 1936. It houses the National Cancer Registry, which began as a section of its research institute in 1952.",
    summary: "The hospital's history page traces it to 1936, when the first anti-cancer centre, with 50 beds, was set up at the X-ray institute of the medical faculty in Sofia and radium treatment began. On that base the Research Oncology Institute was created in 1950, and in 1952 it opened a scientific organisational and methodological section, which the hospital says is now the National Cancer Registry (Национален раков регистър). The institute moved to the Darvenitsa district in 1957 with a 265-bed clinical ward. The coordinates are an approximate point for that district.\n\nToday's hospital has clinics of surgery, gynaecology, urology, medical oncology, radiotherapy, nuclear medicine and pathology, among others, and takes part in the European joint actions JANE-2 and CraNE and the EUnetCCC network of comprehensive cancer centres. It describes its radiotherapy clinic as having the only helical tomotherapy unit in the country; OnCo has not checked that claim against another source.",
    programs: ["National Cancer Registry", "Radiotherapy and brachytherapy", "Nuclear medicine", "Medical oncology", "EUnetCCC, JANE-2 and CraNE European joint actions"],
    institutions: ["nhif-bulgaria", "iarc"],
    cancers: ["colorectal", "lung-cancer", "breast-cancer", "prostate"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "USBALO: history (in Bulgarian)", url: USBALO_HIST },
      { label: "USBALO: about the hospital (in Bulgarian)", url: USBALO_ABOUT },
    ] }),

  i({ id: "nhif-bulgaria", name: "National Health Insurance Fund (NHIF), Bulgaria", aka: ["NHIF", "НЗОК", "Национална здравноосигурителна каса", "NZOK"],
    city: "Sofia", country: "BG", lat: 42.69, lng: 23.32, institutionType: "government", website: "https://www.nhif.bg",
    tldr: "Bulgaria's public health insurer. It pays hospitals by clinical pathway and pays separately, outside the pathway price, for medicines used in hospital care, including cancer medicines, and grants expensive medicines after an expert assessment.",
    summary: "The National Health Insurance Fund (Национална здравноосигурителна каса, НЗОК) publishes lists of the medicines it pays for, including medicinal products used in hospital care, and reports on hospital medicines paid outside the value of clinical pathways and outpatient procedures (извън стойността на КП/АПр), by region, hospital, diagnosis code and ATC code. It publishes a list of medicines for oncological and onco-haematological diseases for which forming a remainder is allowed. Expensive medicines are granted after expert assessment under Article 78, point 2, of the Health Insurance Act, with requirements set out per disease, and prescriptions for home treatment are tracked through electronic protocols. The coordinates are an approximate Sofia city point.",
    programs: ["Hospital medicines paid outside clinical pathway prices", "Expert assessment for expensive medicines (Health Insurance Act, art. 78)", "Electronic protocols for home treatment medicines", "Positive Drug List reimbursement"],
    institutions: ["usbalo-sofia", "bda-bulgaria", "ncpr-bulgaria"],
    links: [
      { label: "NHIF: medicinal products used in hospital care (in Bulgarian)", url: NHIF_HOSP },
      { label: "NHIF: expert assessments for expensive medicines (in Bulgarian)", url: NHIF_EXP },
    ] }),

  i({ id: "bda-bulgaria", name: "Bulgarian Drug Agency (BDA)", aka: ["BDA", "ИАЛ", "Изпълнителна агенция по лекарствата", "Executive Agency for Medicines"],
    city: "Sofia", country: "BG", lat: 42.68, lng: 23.31, institutionType: "government", website: "https://www.bda.bg",
    tldr: "Bulgaria's medicines regulator, an executive agency of the Ministry of Health. It dates drug regulation in Bulgaria from a decree of 31 October 1904; new cancer medicines reach Bulgaria through the European Medicines Agency's centralised procedure.",
    summary: "The Bulgarian Drug Agency (Изпълнителна агенция по лекарствата) is the executive agency for medicines under the Ministry of Health. Its history page dates Bulgarian drug regulation from 31 October 1904, when Decree 44 created a chemical laboratory under the public health directorate, and traces the line through the State Institute for the Control of Medicines formed in 1954, a drug safety centre created in 1974 that joined WHO's drug monitoring programme in 1975, and the adoption of the European Pharmacopoeia as official in Bulgaria in 1995. In 1997 Sofia hosted the first official meeting aimed at setting up CADREAC, the collaboration of medicines regulators in countries then associated with the EU. As an EU member, Bulgaria receives new cancer medicines through the European Medicines Agency's centralised procedure. The coordinates are an approximate Sofia city point.",
    programs: ["Marketing authorisation (national and EU procedures)", "Pharmacovigilance", "Clinical trial authorisation"],
    institutions: ["ema", "ncpr-bulgaria"],
    links: [
      { label: "Bulgarian Drug Agency: history (in Bulgarian)", url: BDA_HIST },
      { label: "European Medicines Agency: authorisation of medicines, the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
    ] }),

  i({ id: "ncpr-bulgaria", name: "National Council on Prices and Reimbursement of Medicinal Products, Bulgaria", aka: ["NCPR", "НСЦРЛП", "Национален съвет по цени и реимбурсиране на лекарствените продукти"],
    city: "Sofia", country: "BG", lat: 42.69, lng: 23.33, institutionType: "government", website: "https://www.ncpr.bg",
    tldr: "The Bulgarian body that sets medicine prices and decides which medicines enter the Positive Drug List that the health insurance fund can pay for. It publishes summaries of the health technology assessment reports behind its decisions.",
    summary: "The National Council on Prices and Reimbursement of Medicinal Products (Национален съвет по цени и реимбурсиране на лекарствените продукти) publishes its procedures, its decisions on keeping medicines' reimbursement status, health technology assessment summaries behind decisions on the Positive Drug List, including for listed medicines proposed by the Ministry of Health, the insurance fund or the marketing-authorisation holder, the rules for appealing its acts, and an archive of assessment summaries held at the National Centre of Public Health and Analyses. It lists its participation in the Heads of HTA Agencies group. The coordinates are an approximate Sofia city point.",
    programs: ["Positive Drug List", "Medicine pricing", "Health technology assessment summaries"],
    institutions: ["nhif-bulgaria", "bda-bulgaria"],
    links: [{ label: "National Council on Prices and Reimbursement: home page (in Bulgarian)", url: NCPR }] }),
];

/** Records behind /countries/bg/ (wave 8). */
export const recordsBG: EntityInput[] = [...institutions];

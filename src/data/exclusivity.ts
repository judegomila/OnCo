/**
 * Patent and regulatory exclusivity expiry per product, with biosimilar and generic entrants.
 *
 * Rules: `patent` rows are the expiry year of the key compound or composition patent as the marketing
 * company discloses it in its annual report or Form 10-K (supplementary protection certificates and patent
 * term extensions included where the company states them). `regulatory` rows are computed from the first
 * approval date: US biologics get 12 years of reference-product exclusivity (BPCIA), US new chemical
 * entities 5 years (Hatch-Waxman), EU products 8 years of data plus 2 years of market protection. Regulatory
 * dates are therefore deterministic and can be checked against the FDA Purple Book, the Orange Book and
 * the EMA product page linked from each row. Entrant dates are as reported by the entrant or regulator.
 * Later-expiring secondary patents (formulation, method of use) often extend practical exclusivity; the
 * rows here are floors, not forecasts. Where a figure is not public the row is omitted.
 */
export type ExRegion = "US" | "EU" | "JP";
export type ExclusivityRow = { region: ExRegion; kind: "patent" | "regulatory"; year: number; note?: string; source: string };
export type Entrant = { name: string; type: "biosimilar" | "generic"; region: ExRegion; date: string; status: "launched" | "approved" | "filed" | "phase-3" | "settled"; source?: string; note?: string };
export type DrugExclusivity = { drugId: string; rows: ExclusivityRow[]; entrants: Entrant[]; note?: string };

export const PURPLE_BOOK = "https://purplebooksearch.fda.gov/";
export const ORANGE_BOOK = "https://www.accessdata.fda.gov/scripts/cder/ob/index.cfm";
const edgar = (cik: string) => `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=10-K&dateb=&owner=include&count=40`;
const epar = (slug: string) => `https://www.ema.europa.eu/en/medicines/human/EPAR/${slug}`;

const MERCK = edgar("0000310158"), BMS = edgar("0000014272"), PFIZER = edgar("0000078003"), INCYTE = edgar("0000879169"), EXELIXIS = edgar("0000939767");
const AZ = "https://www.astrazeneca.com/investor-relations/annual-reports.html";
const ROCHE = "https://www.roche.com/investors/annual-reports";
const ASTELLAS = "https://www.astellas.com/en/investors";

export const exclusivity: DrugExclusivity[] = [
  { drugId: "pembrolizumab",
    rows: [
      { region: "US", kind: "patent", year: 2028, note: "Key composition patents per Merck's 10-K", source: MERCK },
      { region: "EU", kind: "patent", year: 2030, note: "With supplementary protection certificate", source: MERCK },
      { region: "US", kind: "regulatory", year: 2026, note: "12-year BPCIA exclusivity from the September 2014 approval", source: PURPLE_BOOK },
      { region: "EU", kind: "regulatory", year: 2025, note: "8+2 years from the July 2015 authorisation", source: epar("keytruda") },
    ],
    entrants: [
      { name: "Amgen ABP 234", type: "biosimilar", region: "US", date: "2028", status: "phase-3", note: "Comparative phase 3 in NSCLC; launch cannot precede patent expiry" },
      { name: "Samsung Bioepis SB27", type: "biosimilar", region: "US", date: "2028", status: "phase-3" },
      { name: "Celltrion CT-P51", type: "biosimilar", region: "US", date: "2028", status: "phase-3" },
      { name: "Bio-Thera BAT3306", type: "biosimilar", region: "US", date: "2028", status: "phase-3" },
    ],
    note: "The largest loss of exclusivity in oncology history by revenue. Merck's subcutaneous formulation and new indications are the life-cycle defence." },
  { drugId: "nivolumab",
    rows: [
      { region: "US", kind: "patent", year: 2028, note: "Composition patent per BMS's 10-K", source: BMS },
      { region: "EU", kind: "patent", year: 2030, note: "With supplementary protection certificate", source: BMS },
      { region: "US", kind: "regulatory", year: 2026, note: "12-year BPCIA exclusivity from the December 2014 approval", source: PURPLE_BOOK },
    ],
    entrants: [] },
  { drugId: "ipilimumab",
    rows: [
      { region: "US", kind: "patent", year: 2025, note: "Composition patent per BMS's 10-K", source: BMS },
      { region: "EU", kind: "patent", year: 2026, source: BMS },
    ],
    entrants: [] },
  { drugId: "atezolizumab",
    rows: [{ region: "US", kind: "regulatory", year: 2028, note: "12-year BPCIA exclusivity from the May 2016 approval", source: PURPLE_BOOK }],
    entrants: [] },
  { drugId: "durvalumab",
    rows: [{ region: "US", kind: "regulatory", year: 2029, note: "12-year BPCIA exclusivity from the May 2017 approval", source: PURPLE_BOOK }],
    entrants: [] },
  { drugId: "trastuzumab-deruxtecan",
    rows: [
      { region: "US", kind: "regulatory", year: 2031, note: "12-year BPCIA exclusivity from the December 2019 approval", source: PURPLE_BOOK },
      { region: "EU", kind: "regulatory", year: 2031, note: "8+2 years from the January 2021 authorisation", source: epar("enhertu") },
    ],
    entrants: [] },
  { drugId: "sacituzumab-govitecan",
    rows: [
      { region: "US", kind: "regulatory", year: 2032, note: "12-year BPCIA exclusivity from the April 2020 approval", source: PURPLE_BOOK },
      { region: "EU", kind: "regulatory", year: 2031, note: "8+2 years from the November 2021 authorisation", source: epar("trodelvy") },
    ],
    entrants: [] },
  { drugId: "enfortumab-vedotin",
    rows: [{ region: "US", kind: "regulatory", year: 2031, note: "12-year BPCIA exclusivity from the December 2019 approval", source: PURPLE_BOOK }],
    entrants: [] },
  { drugId: "tisagenlecleucel",
    rows: [{ region: "US", kind: "regulatory", year: 2029, note: "12-year BPCIA exclusivity from the August 2017 approval", source: PURPLE_BOOK }],
    entrants: [] },
  { drugId: "axicabtagene-ciloleucel",
    rows: [{ region: "US", kind: "regulatory", year: 2029, note: "12-year BPCIA exclusivity from the October 2017 approval", source: PURPLE_BOOK }],
    entrants: [] },
  { drugId: "pluvicto",
    rows: [{ region: "US", kind: "regulatory", year: 2027, note: "5-year new chemical entity exclusivity from the March 2022 approval; patents run later", source: ORANGE_BOOK }],
    entrants: [] },
  { drugId: "osimertinib",
    rows: [
      { region: "US", kind: "patent", year: 2032, note: "Compound patent per AstraZeneca's annual report", source: AZ },
      { region: "EU", kind: "patent", year: 2032, source: AZ },
      { region: "JP", kind: "patent", year: 2032, source: AZ },
    ],
    entrants: [] },
  { drugId: "palbociclib",
    rows: [
      { region: "US", kind: "patent", year: 2027, note: "Basic product patent per Pfizer's 10-K", source: PFIZER },
      { region: "EU", kind: "patent", year: 2028, source: PFIZER },
      { region: "JP", kind: "patent", year: 2028, source: PFIZER },
    ],
    entrants: [] },
  { drugId: "enzalutamide",
    rows: [{ region: "US", kind: "patent", year: 2027, note: "Composition patent with patent term extension, per Astellas and Pfizer disclosures", source: ASTELLAS }],
    entrants: [] },
  { drugId: "ruxolitinib",
    rows: [{ region: "US", kind: "patent", year: 2028, note: "Composition patent with patent term extension per Incyte's 10-K", source: INCYTE }],
    entrants: [] },
  { drugId: "cabozantinib",
    rows: [{ region: "US", kind: "patent", year: 2030, note: "Exelixis discloses settlement-based generic entry dates rather than a single expiry", source: EXELIXIS }],
    entrants: [{ name: "MSN Laboratories (settlement)", type: "generic", region: "US", date: "2031-01", status: "settled", note: "Licensed entry from 1 January 2031 under the Exelixis settlement", source: EXELIXIS }] },
  { drugId: "lenalidomide",
    rows: [{ region: "US", kind: "patent", year: 2027, note: "Composition patent; settlements allowed earlier volume-limited generic entry", source: BMS }],
    entrants: [
      { name: "Teva, Natco and others (volume-limited)", type: "generic", region: "US", date: "2022-03", status: "launched", note: "Volume-limited entry under settlements" },
      { name: "Unrestricted generic entry", type: "generic", region: "US", date: "2026-01", status: "launched", note: "Volume limits ended 31 January 2026" },
      { name: "Generic lenalidomide", type: "generic", region: "EU", date: "2022-02", status: "launched" },
    ] },
  { drugId: "pomalidomide",
    rows: [],
    entrants: [{ name: "Generic pomalidomide", type: "generic", region: "US", date: "2026-Q1", status: "launched", note: "Settlement-based entry, per BMS guidance" }] },
  { drugId: "imatinib",
    rows: [],
    entrants: [{ name: "Sun Pharma and others", type: "generic", region: "US", date: "2016-02", status: "launched" }] },
  { drugId: "abiraterone",
    rows: [],
    entrants: [{ name: "Multiple generics", type: "generic", region: "US", date: "2018-11", status: "launched", note: "After the key method-of-use patent was invalidated" }] },
  { drugId: "bortezomib",
    rows: [],
    entrants: [{ name: "Fresenius Kabi and others", type: "generic", region: "US", date: "2022-05", status: "launched" }] },
  { drugId: "pemetrexed",
    rows: [],
    entrants: [{ name: "Multiple generics", type: "generic", region: "US", date: "2022", status: "launched" }] },
  { drugId: "sunitinib",
    rows: [],
    entrants: [{ name: "Multiple generics", type: "generic", region: "US", date: "2021-08", status: "launched" }] },
  { drugId: "trastuzumab",
    rows: [
      { region: "US", kind: "patent", year: 2019, note: "Key patents expired June 2019", source: ROCHE },
      { region: "EU", kind: "patent", year: 2014, source: ROCHE },
    ],
    entrants: [
      { name: "Kanjinti (Amgen)", type: "biosimilar", region: "US", date: "2019-07", status: "launched", source: PURPLE_BOOK },
      { name: "Ogivri (Biocon and Viatris)", type: "biosimilar", region: "US", date: "2019-12", status: "launched", source: PURPLE_BOOK },
      { name: "Trazimera (Pfizer), Herzuma (Celltrion), Ontruzant (Samsung Bioepis)", type: "biosimilar", region: "US", date: "2020", status: "launched", source: PURPLE_BOOK },
      { name: "Ontruzant, Herzuma, Kanjinti", type: "biosimilar", region: "EU", date: "2018", status: "launched", source: epar("ontruzant") },
    ],
    note: "The template for oncology biosimilar competition: five US entrants within a year." },
  { drugId: "bevacizumab",
    rows: [
      { region: "US", kind: "patent", year: 2019, source: ROCHE },
      { region: "EU", kind: "patent", year: 2022, note: "With supplementary protection certificate", source: ROCHE },
    ],
    entrants: [
      { name: "Mvasi (Amgen)", type: "biosimilar", region: "US", date: "2019-07", status: "launched", source: PURPLE_BOOK },
      { name: "Zirabev (Pfizer)", type: "biosimilar", region: "US", date: "2019-12", status: "launched", source: PURPLE_BOOK },
      { name: "Mvasi (Amgen)", type: "biosimilar", region: "EU", date: "2018-01", status: "approved", source: epar("mvasi") },
    ] },
  { drugId: "rituximab",
    rows: [
      { region: "US", kind: "patent", year: 2016, note: "Composition patent; later patents ran to 2018", source: ROCHE },
      { region: "EU", kind: "patent", year: 2013, source: ROCHE },
    ],
    entrants: [
      { name: "Truxima (Celltrion and Teva)", type: "biosimilar", region: "US", date: "2019-11", status: "launched", source: PURPLE_BOOK },
      { name: "Ruxience (Pfizer)", type: "biosimilar", region: "US", date: "2020-01", status: "launched", source: PURPLE_BOOK },
      { name: "Riabni (Amgen)", type: "biosimilar", region: "US", date: "2021-01", status: "launched", source: PURPLE_BOOK },
      { name: "Truxima, Rixathon", type: "biosimilar", region: "EU", date: "2017", status: "launched", source: epar("truxima") },
    ] },
];

export const exclusivityFor = (drugId: string) => exclusivity.find((e) => e.drugId === drugId);

/** Earliest exclusivity end across all rows for a product, or undefined when only entrants are recorded. */
export function earliestExpiry(e: DrugExclusivity): number | undefined {
  return e.rows.length ? Math.min(...e.rows.map((r) => r.year)) : undefined;
}

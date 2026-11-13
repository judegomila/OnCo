/**
 * Country codes for the automatic country pages (/countries/<iso2>/, src/app/countries/[iso]/page.tsx).
 *
 * GLOBOCAN keys its countries by ISO 3166-1 alpha-3 and its numeric code; the corpus keys institutions and companies
 * by alpha-2, and the URL is alpha-2 as the deep dives are. Read on 11 November 2026 and kept as data so a page never
 * guesses a code:
 *
 * - ISO3_TO_ISO2: every country in public/globocan/countries.json. The alpha-2 code for each alpha-3 was read from
 *   the World Bank country API (https://api.worldbank.org/v2/country?format=json&per_page=400, fields `id` and
 *   `iso2Code`) and from the ISO 3166 table at https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes
 *   (all/all.json), and GLOBOCAN's own numeric code (`isonum`) matched that table's numeric code for every one.
 *   The two sources agree on all 182 countries the World Bank lists. French Guiana (GF), Guadeloupe (GP),
 *   Martinique (MQ) and La Réunion (RE), which IARC reports apart from metropolitan France and the World Bank does
 *   not list, rest on the ISO table with GLOBOCAN's numeric code agreeing (254, 312, 474, 638).
 *   src/lib/country-pages.test.ts fails if GLOBOCAN gains a country that is not here.
 * - CTGOV_COUNTRY: the country names ClinicalTrials.gov writes in a study's locations, as captured in
 *   src/data/trial-participation.ts, to alpha-2. The test fails on any captured name that has no entry, so a new
 *   fetch cannot silently drop a country's trials.
 * - EU_MEMBERS: the 27 member states listed at https://european-union.europa.eu/principles-countries-history/eu-countries_en
 *   (read 11 November 2026). An EU centralised authorisation covers each of them, which is what the approvals
 *   sentence on an automatic page relies on.
 * - PART_OF: GLOBOCAN entries that do not get a page of their own. The owner decided on 11 November 2026 that France's
 *   overseas departments, which IARC reports apart from metropolitan France, belong on the France deep dive
 *   (/countries/fr/#overseas) rather than on four automatic pages.
 * - DISPLAY_NAME: a shorter reading name where IARC's name is the formal or inverted form ("Iran, Islamic Republic
 *   of"). The GLOBOCAN name is still printed beside the figures it labels.
 */
export const ISO3_TO_ISO2: Record<string, string> = {
  AFG: "AF", AGO: "AO", ALB: "AL", ARE: "AE", ARG: "AR", ARM: "AM", AUS: "AU", AUT: "AT", AZE: "AZ", BDI: "BI",
  BEL: "BE", BEN: "BJ", BFA: "BF", BGD: "BD", BGR: "BG", BHR: "BH", BHS: "BS", BIH: "BA", BLR: "BY", BLZ: "BZ",
  BOL: "BO", BRA: "BR", BRB: "BB", BRN: "BN", BTN: "BT", BWA: "BW", CAF: "CF", CAN: "CA", CHE: "CH", CHL: "CL",
  CHN: "CN", CIV: "CI", CMR: "CM", COD: "CD", COG: "CG", COL: "CO", COM: "KM", CPV: "CV", CRI: "CR", CUB: "CU",
  CUW: "CW", CYP: "CY", CZE: "CZ", DEU: "DE", DJI: "DJ", DNK: "DK", DOM: "DO", DZA: "DZ", ECU: "EC", EGY: "EG",
  ERI: "ER", ESP: "ES", EST: "EE", ETH: "ET", FIN: "FI", FJI: "FJ", FRA: "FR", GAB: "GA", GBR: "GB", GEO: "GE",
  GHA: "GH", GIN: "GN", GLP: "GP", GMB: "GM", GNB: "GW", GNQ: "GQ", GRC: "GR", GTM: "GT", GUF: "GF", GUM: "GU",
  GUY: "GY", HND: "HN", HRV: "HR", HTI: "HT", HUN: "HU", IDN: "ID", IND: "IN", IRL: "IE", IRN: "IR", IRQ: "IQ",
  ISL: "IS", ISR: "IL", ITA: "IT", JAM: "JM", JOR: "JO", JPN: "JP", KAZ: "KZ", KEN: "KE", KGZ: "KG", KHM: "KH",
  KOR: "KR", KWT: "KW", LAO: "LA", LBN: "LB", LBR: "LR", LBY: "LY", LCA: "LC", LKA: "LK", LSO: "LS", LTU: "LT",
  LUX: "LU", LVA: "LV", MAR: "MA", MDA: "MD", MDG: "MG", MDV: "MV", MEX: "MX", MKD: "MK", MLI: "ML", MLT: "MT",
  MMR: "MM", MNE: "ME", MNG: "MN", MOZ: "MZ", MRT: "MR", MTQ: "MQ", MUS: "MU", MWI: "MW", MYS: "MY", NAM: "NA",
  NCL: "NC", NER: "NE", NGA: "NG", NIC: "NI", NLD: "NL", NOR: "NO", NPL: "NP", NZL: "NZ", OMN: "OM", PAK: "PK",
  PAN: "PA", PER: "PE", PHL: "PH", PNG: "PG", POL: "PL", PRI: "PR", PRK: "KP", PRT: "PT", PRY: "PY", PSE: "PS",
  PYF: "PF", QAT: "QA", REU: "RE", ROU: "RO", RUS: "RU", RWA: "RW", SAU: "SA", SDN: "SD", SEN: "SN", SGP: "SG",
  SLB: "SB", SLE: "SL", SLV: "SV", SOM: "SO", SRB: "RS", SSD: "SS", STP: "ST", SUR: "SR", SVK: "SK", SVN: "SI",
  SWE: "SE", SWZ: "SZ", SYR: "SY", TCD: "TD", TGO: "TG", THA: "TH", TJK: "TJ", TKM: "TM", TLS: "TL", TTO: "TT",
  TUN: "TN", TUR: "TR", TZA: "TZ", UGA: "UG", UKR: "UA", URY: "UY", USA: "US", UZB: "UZ", VEN: "VE", VNM: "VN",
  VUT: "VU", WSM: "WS", YEM: "YE", ZAF: "ZA", ZMB: "ZM", ZWE: "ZW",
};

export const CTGOV_COUNTRY: Record<string, string> = {
  "Argentina": "AR", "Armenia": "AM", "Australia": "AU", "Austria": "AT", "Barbados": "BB", "Belarus": "BY", "Belgium": "BE",
  "Bosnia and Herzegovina": "BA", "Brazil": "BR", "Bulgaria": "BG", "Canada": "CA", "Chile": "CL", "China": "CN", "Colombia": "CO",
  "Costa Rica": "CR", "Côte d’Ivoire": "CI", "Croatia": "HR", "Cyprus": "CY", "Czechia": "CZ", "Denmark": "DK", "Ecuador": "EC",
  "Egypt": "EG", "El Salvador": "SV", "Estonia": "EE", "Finland": "FI", "France": "FR", "Georgia": "GE", "Germany": "DE",
  "Ghana": "GH", "Greece": "GR", "Guam": "GU", "Guatemala": "GT", "Hong Kong": "HK", "Hungary": "HU", "Iceland": "IS",
  "India": "IN", "Indonesia": "ID", "Iran": "IR", "Ireland": "IE", "Israel": "IL", "Italy": "IT", "Jamaica": "JM", "Japan": "JP",
  "Jordan": "JO", "Kazakhstan": "KZ", "Kenya": "KE", "Latvia": "LV", "Lebanon": "LB", "Lithuania": "LT", "Luxembourg": "LU",
  "Malawi": "MW", "Malaysia": "MY", "Malta": "MT", "Mexico": "MX", "Moldova": "MD", "Monaco": "MC", "Morocco": "MA",
  "Netherlands": "NL", "New Zealand": "NZ", "Nigeria": "NG", "North Macedonia": "MK", "Norway": "NO", "Oman": "OM",
  "Pakistan": "PK", "Panama": "PA", "Peru": "PE", "Philippines": "PH", "Poland": "PL", "Portugal": "PT", "Puerto Rico": "PR",
  "Qatar": "QA", "Romania": "RO", "Russia": "RU", "Saudi Arabia": "SA", "Serbia": "RS", "Singapore": "SG", "Slovakia": "SK",
  "Slovenia": "SI", "South Africa": "ZA", "South Korea": "KR", "Spain": "ES", "Sweden": "SE", "Switzerland": "CH", "Taiwan": "TW",
  "Thailand": "TH", "Tunisia": "TN", "Turkey (Türkiye)": "TR", "Uganda": "UG", "Ukraine": "UA", "United Arab Emirates": "AE",
  "United Kingdom": "GB", "United States": "US", "Venezuela": "VE", "Vietnam": "VN", "Zimbabwe": "ZW",
};

export const EU_MEMBERS: ReadonlySet<string> = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL",
  "PT", "RO", "SK", "SI", "ES", "SE",
]);

export const PART_OF: Record<string, string> = { GF: "FR", GP: "FR", MQ: "FR", RE: "FR" };

export const DISPLAY_NAME: Record<string, string> = {
  BA: "Bosnia and Herzegovina", BO: "Bolivia", BN: "Brunei", CD: "Democratic Republic of the Congo", CG: "Republic of the Congo",
  FR: "France", GF: "French Guiana", GM: "The Gambia", GP: "Guadeloupe", IR: "Iran", KP: "Democratic People's Republic of Korea",
  KR: "South Korea", LA: "Laos", MD: "Moldova", MQ: "Martinique", NL: "The Netherlands", RE: "La Réunion", RU: "Russia",
  SY: "Syria", TZ: "Tanzania", US: "United States",
};

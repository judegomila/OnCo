/** Country and facet-value decorations for filters: flag emoji from ISO-2 codes and a few common names. */
const NAMES: Record<string, string> = { "united states": "US", usa: "US", "united kingdom": "GB", uk: "GB", britain: "GB", england: "GB", germany: "DE", france: "FR", china: "CN", japan: "JP", switzerland: "CH", australia: "AU", canada: "CA", netherlands: "NL", italy: "IT", india: "IN", belgium: "BE", spain: "ES", "south korea": "KR", korea: "KR", israel: "IL", sweden: "SE", brazil: "BR", austria: "AT", taiwan: "TW", denmark: "DK", portugal: "PT", thailand: "TH", finland: "FI", ireland: "IE", "hong kong": "HK", "south africa": "ZA", egypt: "EG", "united arab emirates": "AE", mexico: "MX", czechia: "CZ", "czech republic": "CZ", turkey: "TR", vietnam: "VN", singapore: "SG", hungary: "HU", "new zealand": "NZ", rwanda: "RW", iran: "IR", indonesia: "ID", luxembourg: "LU", chile: "CL", qatar: "QA", morocco: "MA", tunisia: "TN", slovenia: "SI", argentina: "AR", colombia: "CO", peru: "PE", kenya: "KE", "saudi arabia": "SA", jordan: "JO", ghana: "GH", nigeria: "NG", poland: "PL", tanzania: "TZ", norway: "NO", philippines: "PH", uganda: "UG", malaysia: "MY", "european union": "EU", europe: "EU" };

/** "US" → 🇺🇸; accepts ISO-2 codes (UK is mapped to GB) and common English country names. Returns "" when unknown. */
export function flagFor(country?: string): string {
  if (!country) return "";
  let code = country.trim();
  if (code.length !== 2) code = NAMES[code.toLowerCase()] ?? "";
  if (code.toUpperCase() === "UK") code = "GB";
  if (!/^[A-Za-z]{2}$/.test(code)) return "";
  const cc = code.toUpperCase();
  return String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

/** Facet keys whose values are countries. */
export const COUNTRY_FACETS = new Set(["country", "hq", "region", "countries"]);

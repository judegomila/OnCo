/** Regions used to place the parties of a deal on the /deals/ chord. Shared by server pages and the client chart. */
export const DEAL_REGIONS = ["United States", "Europe", "China", "Japan", "Other"] as const;
export type DealRegion = (typeof DEAL_REGIONS)[number];

export type DealFlowItem = { id: string; year: number; from: DealRegion; to: DealRegion; type: string; label: string };

export const DEAL_REGION_COLOR: Record<DealRegion, string> = { "United States": "#0ea5e9", Europe: "#8b5cf6", China: "#ef4444", Japan: "#f59e0b", Other: "#64748b" };

export function regionForCountry(iso2?: string): DealRegion {
  switch ((iso2 ?? "").toUpperCase()) {
    case "US": return "United States";
    case "CN": case "HK": case "TW": case "MO": return "China";
    case "JP": return "Japan";
    case "GB": case "DE": case "FR": case "CH": case "NL": case "DK": case "BE": case "SE": case "ES": case "IT": case "IE": case "AT": case "NO": case "FI": case "PT": case "PL": case "CZ": case "HU": return "Europe";
    default: return "Other";
  }
}

/**
 * The seven regulatory regions and their regulators: the small part of src/data/regional-approvals.ts that the
 * header's country switcher (src/lib/region.tsx) needs. It lives apart so the root layout, which ships with every
 * page, does not reach the approvals table itself (about 94 KB of source and growing with each data round).
 * src/data/regional-approvals.ts re-exports these, so existing imports from there are unchanged.
 */
export type Region = "US" | "EU" | "UK" | "JP" | "CN" | "AU" | "IN";
export const REGIONS: Region[] = ["US", "EU", "UK", "JP", "CN", "AU", "IN"];
export const REGION_META: Record<Region, { label: string; regulator: string; url: string; flag: string }> = {
  US: { label: "United States", regulator: "FDA", url: "https://www.fda.gov/drugs/cancer-approvals/oncology-cancerhematologic-malignancies-approval-notifications", flag: "🇺🇸" },
  EU: { label: "European Union", regulator: "EMA / European Commission", url: "https://www.ema.europa.eu/en/medicines", flag: "🇪🇺" },
  UK: { label: "United Kingdom", regulator: "MHRA (NICE for reimbursement)", url: "https://products.mhra.gov.uk/", flag: "🇬🇧" },
  JP: { label: "Japan", regulator: "PMDA / MHLW", url: "https://www.pmda.go.jp/english/review-services/reviews/approved-information/drugs/0002.html", flag: "🇯🇵" },
  CN: { label: "China", regulator: "NMPA", url: "https://english.nmpa.gov.cn/", flag: "🇨🇳" },
  AU: { label: "Australia", regulator: "TGA (PBS for reimbursement)", url: "https://www.tga.gov.au/resources/artg", flag: "🇦🇺" },
  IN: { label: "India", regulator: "CDSCO (DCGI)", url: "https://cdsco.gov.in/opencms/opencms/en/Approval_new/Approved-New-Drugs/", flag: "🇮🇳" },
};

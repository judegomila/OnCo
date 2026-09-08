import globocan from "../../public/globocan/countries.json";
import { GLOBOCAN_MAP } from "@/data/globocan-map";
import { rowsForCancerIn, type Globocan } from "./globocan-core";

export * from "./globocan-core";

/** Full GLOBOCAN 2022 dataset, for server components and build-time code only. */
export const GLOBOCAN = globocan as unknown as Globocan;

export const rowsForCancer = (cancerId: string | null) => rowsForCancerIn(GLOBOCAN, cancerId);

/** Gaps to disclose: cancers with no direct estimate, cancers sharing a site total, countries that failed to fetch. */
export function gaps(): { noEstimate: string[]; shared: string[]; failedCountries: string[] } {
  const noEstimate = Object.entries(GLOBOCAN_MAP).filter(([, m]) => !m.codes.length).map(([id]) => id);
  const shared = Object.entries(GLOBOCAN_MAP).filter(([, m]) => m.shared).map(([id]) => id);
  return { noEstimate, shared, failedCountries: GLOBOCAN.failed };
}

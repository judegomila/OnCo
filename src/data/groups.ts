import type { InstitutionInput } from "@/lib/schema";

const asOf = "2026-09-06";
type I = Omit<InstitutionInput, "kind" | "asOf" | "institutionType">;
const grp = (x: I): InstitutionInput => ({ kind: "institution", asOf, institutionType: "consortium", ...x });

/**
 * Guideline bodies with institution records of type consortium. The cooperative trial groups this file
 * held (SWOG, NRG Oncology, Alliance, ECOG-ACRIN, COG, CCTG, BIG, GBG, JCOG, UNICANCER) moved on
 * 25 September 2026 to company records of type cooperative-group in
 * src/data/companies-cooperative-groups-migrated.ts (docs/IMPROVEMENTS-100.md row 251), since their
 * defining role is sponsoring trials. Integrate by spreading into ALL_INPUTS (see src/data/index.ts).
 */
export const groups: InstitutionInput[] = [
  grp({ id: "nccn-org", name: "National Comprehensive Cancer Network (NCCN)", city: "Plymouth Meeting, PA", country: "US", lat: 40.102, lng: -75.274, website: "https://www.nccn.org",
    tldr: "The NCCN is an alliance of 33 US cancer centres whose guidelines decide, in practice, what US oncologists do and what insurers pay for.",
    summary: "The National Comprehensive Cancer Network, based in Plymouth Meeting, Pennsylvania, is an alliance of thirty-three US cancer centres founded in 1995, including Memorial Sloan Kettering, MD Anderson and Dana-Farber, whose guidelines decide in practice what US oncologists do and what insurers pay for. It publishes the NCCN Clinical Practice Guidelines in Oncology, more than eighty guidelines updated continuously, alongside patient guidelines and the Oncology Research Program; the guidelines have a separate OnCo record. OnCo connects it to the standard of care term and to bottlenecks on fragmented care, slow translation and prices, and to the idea of living guidelines published as computable rules. Whether guidelines written by centres can stay independent of the drugs those centres test is the fair question. Its programmes are listed below.",
    programs: ["NCCN Guidelines", "Patient guidelines", "Oncology Research Program"],
    related: ["nccn"], terms: ["standard-of-care"], institutions: ["mskcc", "md-anderson", "dana-farber"], links: [{ label: "Official website", url: "https://www.nccn.org" }] }),
];

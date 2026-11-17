import type { RegulatoryClaim } from "@/lib/scoped-evidence";

const sources = [{ label: "FDA: authorized companion diagnostic devices, PD-L1 IHC 22C3 pharmDx rows", url: "https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools" }];

/** Shared by the canonical test product and the assay registry; uses are not interchangeable. */
export const ASSAY_REGULATORY_CLAIMS: Record<string, RegulatoryClaim[]> = {
  "dako-pd-l1-22c3-pharmdx": [{
    subject: { type: "product", name: "PD-L1 IHC 22C3 pharmDx" },
    claimType: "marketing-authorization", authority: "FDA", jurisdiction: "United States",
    scope: "The listed tissue companion-diagnostic use in non-small-cell lung cancer for pembrolizumab. The corresponding treatment label retains the complete clinical setting and eligibility requirements.",
    intendedUse: { diseaseIds: ["nsclc"], therapyIds: ["pembrolizumab"], specimen: "Tissue", decisionRule: "PD-L1 Tumor Proportion Score at least 1%" },
    statement: "FDA's companion-diagnostic list identifies the specified assay/use under P150013, updated by P150013/S012. This does not establish laboratory certification or individual benefit.",
    sources, checkedOn: "2026-11-08", sourceVersion: "P150013/S012",
  }, {
    subject: { type: "product", name: "PD-L1 IHC 22C3 pharmDx" },
    claimType: "marketing-authorization", authority: "FDA", jurisdiction: "United States",
    scope: "The separately listed tissue companion-diagnostic use in non-small-cell lung cancer for cemiplimab. The corresponding treatment label retains the complete clinical setting and eligibility requirements.",
    intendedUse: { diseaseIds: ["nsclc"], therapyIds: ["cemiplimab"], specimen: "Tissue", decisionRule: "PD-L1 Tumor Proportion Score at least 50%" },
    statement: "FDA's companion-diagnostic list identifies this use under P150013/S021. Sharing the assay does not make its treatment-specific decision rule interchangeable with the pembrolizumab rule.",
    sources, checkedOn: "2026-11-08", sourceVersion: "P150013/S021",
  }],
};

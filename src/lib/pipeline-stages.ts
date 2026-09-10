// Stage vocabulary for the pipeline funnel. Kept free of graph imports so client components can use it.
export type Stage = "approved" | "phase-3" | "phase-2" | "phase-1" | "preclinical" | "stopped" | "other";
export const STAGES: Stage[] = ["approved", "phase-3", "phase-2", "phase-1", "preclinical", "stopped"];
export const STAGE_LABEL: Record<Stage, string> = { approved: "Approved", "phase-3": "Phase 3", "phase-2": "Phase 2", "phase-1": "Phase 1", preclinical: "Preclinical", stopped: "Stopped", other: "Other" };

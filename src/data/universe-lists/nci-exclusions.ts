/**
 * NCI A to Z entries with no corpus record, each with the reason. Keyed by NCI page slug.
 * Regimen acronyms (ABVD, FOLFOX ...) are excluded automatically by scripts/fetch-nci-drugs.ts.
 */
export const NCI_EXCLUSIONS: Record<string, string> = {};

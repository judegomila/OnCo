/**
 * The measures the cancer map can be coloured by. Kept apart from src/lib/cancer-dag.ts, which imports the corpus
 * graph: CancerMapBy is a client component and needs only this list, and importing it from cancer-dag put the whole
 * corpus in the browser bundle of /cancers/map/, a 51 MB script (measured 22 October 2026).
 */
export const METRICS = ["trials", "drugs", "approvals", "ideas"] as const;
export type Metric = (typeof METRICS)[number];

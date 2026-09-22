/**
 * Trial to key-paper links written by scripts/fetch-trial-papers.ts (wave 1 of docs/CONTENT-ROADMAP.md). Each entry
 * names the paper records, in src/data/papers-trials-wave1.ts or elsewhere in the corpus, that a trial's page should
 * list as its key papers: the primary publication first, a later report second. src/data/index.ts merges them into
 * the trial's `keyPapers`. TRIAL_PAPER_SKIP lists trials the script will not retry because the Europe PMC match
 * was ambiguous, with the reason; clear an entry to try again. Do not edit by hand; re-run the script.
 */
export const trialKeyPapersWave1: Record<string, string[]> = {
};

export const TRIAL_PAPER_SKIP: Record<string, string> = {
};

/**
 * Company to drug links written by scripts/fetch-company-drugs.ts (wave 6 of docs/CONTENT-ROADMAP.md). A company gains a
 * drug only when ClinicalTrials.gov names the company, by its exact name or alias, as lead sponsor of a corpus trial whose
 * registry intervention list names the drug, and the drug is that trial's studied agent, is not approved, has no maker on
 * record and is tested by no other sponsor. trialCompaniesWave6 adds the sponsor to the same trials' `companies`.
 * src/data/index.ts merges both. COMPANY_DRUG_SKIP lists companies the script will not retry, with the reason; clear an
 * entry to try again. Do not edit by hand; re-run the script.
 */
export const companyDrugsWave6: Record<string, string[]> = {
  "impact-therapeutics": ["imp4927"],
  "r-pharm": ["rph-051"],
};

export const trialCompaniesWave6: Record<string, string[]> = {
  "nct04169997": ["impact-therapeutics"],
  "nct07386938": ["r-pharm"],
};

export const COMPANY_DRUG_SKIP: Record<string, string> = {

};

import { pageRows } from "@/lib/static-tables";
import { AUTHORSHIP_DERIVED_ON, trialsAuthoredBy, unconfirmedTrialCount } from "@/lib/person-trials";
import { PERSON_TRIAL_REPORT_COLUMNS, PERSON_TRIAL_REPORTS_PAGE, personTrialReportRows, personTrialReportsTableId } from "@/lib/tables/person-trial-reports";
import { StaticTable } from "./filters/StaticTable";

/**
 * A person's "Trial reports authored": the trials with a paper record that reports them and lists this person as an
 * author, confirmed by ORCID or by first name and affiliation (src/lib/person-trials.ts). Derived from Europe PMC
 * author lists, so nobody types the link on either record; a name that could not be confirmed is counted, not listed.
 */
export function PersonTrialReports({ id, name }: { id: string; name: string }) {
  const list = trialsAuthoredBy(id);
  if (!list.length) return null;
  const tables = pageRows(personTrialReportsTableId(id), personTrialReportRows(list), PERSON_TRIAL_REPORTS_PAGE);
  const unconfirmed = unconfirmedTrialCount(id);
  return (
    <>
      <StaticTable rows={tables.rows} more={tables.more} columns={PERSON_TRIAL_REPORT_COLUMNS} noun="trials" />
      <p className="mt-3 text-xs text-muted">
        Trial records in OnCo with a published report that lists {name} as an author. Author lists were read from Europe PMC and matched on {AUTHORSHIP_DERIVED_ON}.
        {" "}An author is taken to be {name} only when the ORCID on the paper is the one on this record, or the first name matches in full and the author&apos;s affiliation on that paper names an institution on this record. Being an author of a report is not the same as leading the trial.
        {unconfirmed > 0 && <> {unconfirmed === 1 ? "One more trial has" : `${unconfirmed} more trials have`} a report with a matching name that could not be confirmed this way, and {unconfirmed === 1 ? "is" : "are"} not listed.</>}
      </p>
    </>
  );
}

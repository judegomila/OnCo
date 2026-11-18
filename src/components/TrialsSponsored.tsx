import { pageRows } from "@/lib/static-tables";
import { filedUnder, sponsoredBy } from "@/lib/trials-sponsored";
import { INSTITUTION_SPONSORED_COLUMNS, INSTITUTION_SPONSORED_PAGE, institutionSponsoredRows, institutionSponsoredTableId } from "@/lib/tables/institution-sponsored";
import { StaticTable } from "./filters/StaticTable";

/**
 * An institution's "Trials it sponsors or funds": the trial records whose registry lead sponsor, own sponsor line or
 * ISRCTN sponsor and funder lists name this institution (src/lib/trials-sponsored.ts). Derived, so a funder reaches
 * its trials without anyone typing them on either record.
 */
export function InstitutionTrialsSponsored({ id, name }: { id: string; name: string }) {
  const list = sponsoredBy(id);
  if (!list.length) return null;
  const tables = pageRows(institutionSponsoredTableId(id), institutionSponsoredRows(list), INSTITUTION_SPONSORED_PAGE);
  const other = filedUnder(id);
  const otherTrials = other.reduce((n, o) => n + o.trials, 0);
  return (
    <>
      <StaticTable rows={tables.rows} more={tables.more} columns={INSTITUTION_SPONSORED_COLUMNS} noun="trials" />
      <p className="mt-3 text-xs text-muted">
        Trial records in OnCo that name {name} as a sponsor or funder: in the lead sponsor field of the ClinicalTrials.gov entry, in the sponsor and funder lists of an ISRCTN entry, or in the record&apos;s own sponsor line. &ldquo;Named as&rdquo; shows the source&apos;s words.
        {" "}Only trials with a record here are listed, so this is not everything {name} pays for, and a trial it supports through a grant to another sponsor is not shown.
        {otherTrials > 0 && <> {otherTrials === 1 ? "One more trial record names" : `${otherTrials} more trial records name`} a sponsor written as {other.map((o) => `“${o.name}”`).join(", ")}, which may be this institution or a related one and is not listed.</>}
      </p>
    </>
  );
}

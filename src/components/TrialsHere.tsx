import { pageRows } from "@/lib/static-tables";
import { countryName } from "@/lib/country-pages";
import { capturedRange, recruitingAt, recruitingIn } from "@/lib/trials-here";
import { COUNTRY_TRIAL_COLUMNS, COUNTRY_TRIALS_PAGE, countryTrialRows, countryTrials, countryTrialsTableId } from "@/lib/tables/country-trials";
import { INSTITUTION_TRIAL_COLUMNS, INSTITUTION_TRIALS_PAGE, institutionTrialRows, institutionTrialsTableId } from "@/lib/tables/institution-trials";
import { StaticTable } from "./filters/StaticTable";
import { Section } from "./ui";

const n = (x: number) => x.toLocaleString("en-GB");

/** The count line beside a country's "Trials recruiting here" heading. */
export function countryTrialsAside(iso2: string): string | null {
  const all = countryTrials(iso2);
  if (!all.length) return null;
  const here = recruitingIn(iso2).length;
  return `${n(here)} recruiting here · ${n(all.length)} with a site here`;
}

/**
 * The body of a country's "Trials recruiting here": the table and what it is read from. Every country page renders
 * it, the automatic ones inside their own heading (src/components/CountryAuto.tsx), the deep dives through
 * CountryTrialsSection below. City filters are in the table (`?here.cities=Lyon`), which is where a city-level view
 * lives: OnCo has no city pages.
 */
export function CountryTrialsBody({ iso2 }: { iso2: string }) {
  const name = countryName(iso2.toUpperCase());
  const list = countryTrials(iso2);
  if (!list.length) {
    return <p className="text-sm">No trial record in OnCo lists a site in {name}. OnCo reads sites from ClinicalTrials.gov; studies registered only elsewhere are searchable through the <a href="https://trialsearch.who.int/" className="underline" rel="noopener">WHO International Clinical Trials Registry Platform</a>.</p>;
  }
  const here = recruitingIn(iso2);
  const tables = pageRows(countryTrialsTableId(iso2), countryTrialRows(list), COUNTRY_TRIALS_PAGE);
  const range = capturedRange(here);
  return (
    <>
      <StaticTable rows={tables.rows} more={tables.more} columns={COUNTRY_TRIAL_COLUMNS} noun="trials" url urlScope="here" />
      <p className="mt-3 text-xs text-muted">
        Trial records in OnCo whose ClinicalTrials.gov entry lists a site in {name}. A trial counts as recruiting here when one of those sites has the status Recruiting in the entry as captured{range ? `, ${range[0]} to ${range[1]}` : ""}; the rest follow, most recently updated first.
        {" "}Sites open and close between captures, so confirm on the registry page, under Contacts and Locations, before contacting one.
      </p>
    </>
  );
}

/** The section on a deep-dive country page. */
export function CountryTrialsSection({ iso2 }: { iso2: string }) {
  const aside = countryTrialsAside(iso2);
  return (
    <Section id="recruiting" title="Trials recruiting here" aside={aside ? <span className="text-sm text-muted">{aside}</span> : undefined}>
      <CountryTrialsBody iso2={iso2} />
    </Section>
  );
}

/** An institution's "Trials recruiting here": the trials with a recruiting site the registry names as this institution. */
export function InstitutionTrialsHere({ id, name }: { id: string; name: string }) {
  const list = recruitingAt(id);
  if (!list.length) return null;
  const range = capturedRange(list);
  const tables = pageRows(institutionTrialsTableId(id), institutionTrialRows(list), INSTITUTION_TRIALS_PAGE);
  return (
    <>
      <StaticTable rows={tables.rows} more={tables.more} columns={INSTITUTION_TRIAL_COLUMNS} noun="trials" />
      <p className="mt-3 text-xs text-muted">
        Trial records in OnCo with a site at {name} that has the status Recruiting in the ClinicalTrials.gov entry as captured{range ? `, ${range[0]} to ${range[1]}` : ""}.
        {" "}A site counts as this institution when the registry gives it the institution&apos;s name or a name its record lists, in the same city; &ldquo;Listed as&rdquo; shows the registry&apos;s own words. Confirm on the registry page before contacting the site.
      </p>
    </>
  );
}

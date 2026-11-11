import type { Trial } from "@/lib/schema";
import { statusClass } from "@/lib/text";
import { ObservationSources } from "./ScopedEvidence";

/**
 * What the registry says about joining a trial: who it is open to, how many sites and where, and when the
 * registry last changed its mind. The source is ClinicalTrials.gov, read on a date, with the SHA-256 of the
 * study as it was retrieved carried on the block so the claim can be checked against the registry record.
 *
 * The inclusion and exclusion text itself is not here. It is a quarter of a 390 MB capture and belongs on the
 * registry page, which is linked; what a reader needs first is whether the trial is open, to whom, and near
 * where. src/lib/schema.ts explains the division.
 */
const AGES = (min?: string, max?: string) =>
  min && max ? `${min} to ${max}` : min ? `${min} and over` : max ? `up to ${max}` : undefined;

const SEX = (s?: string) => (s === "ALL" ? "any sex" : s === "FEMALE" ? "female" : s === "MALE" ? "male" : s?.toLowerCase());

function Row({ label, children }: { label: string; children?: React.ReactNode }) {
  if (children === undefined || children === null || children === false) return null;
  return <div className="flex flex-wrap gap-x-2 gap-y-0.5"><dt className="text-muted min-w-32">{label}</dt><dd className="min-w-0">{children}</dd></div>;
}

export function TrialParticipation({ t }: { t: Trial }) {
  const entries = t.participation ?? [];
  const other = t.alternateParticipation ?? [];
  if (!entries.length && !other.length) return null;
  return (
    <div className="space-y-4">
      {entries.map((p) => {
        const ages = AGES(p.minimumAge, p.maximumAge);
        const sex = SEX(p.sex);
        const open = [ages, sex].filter(Boolean).join(", ");
        return (
          <div key={p.nct} className="card p-4 text-sm space-y-2" data-participation={p.nct} data-study-sha256={p.studySha256}>
            <div className="flex flex-wrap items-center gap-2">
              <a className="underline font-medium" href={p.source} rel="noopener">{p.nct}</a>
              {p.overallStatus && <span className={`chip ${statusClass(p.overallStatus === "RECRUITING" ? "established" : p.overallStatus === "TERMINATED" || p.overallStatus === "WITHDRAWN" ? "negative" : "emerging")}`}>{p.overallStatus.toLowerCase().replace(/_/g, " ")}</span>}
              {p.noLongerReturnedAt && <span className="chip bg-foreground/5">no longer returned by the registry</span>}
            </div>
            <dl className="space-y-1">
              <Row label="Run by">{p.leadSponsor}{p.collaboratorCount > 0 && <span className="text-muted"> with {p.collaboratorCount} {p.collaboratorCount === 1 ? "collaborator" : "collaborators"}</span>}</Row>
              <Row label="Open to">{open || undefined}{p.healthyVolunteers === true && <span className="text-muted">, healthy volunteers accepted</span>}</Row>
              <Row label="Enrolment">{p.enrolment !== undefined && <>{p.enrolment.toLocaleString("en-GB")}{p.enrolmentType === "ESTIMATED" && <span className="text-muted"> (estimated)</span>}</>}</Row>
              <Row label="Sites">{p.siteCount > 0 && <>{p.siteCount.toLocaleString("en-GB")}{p.recruitingSiteCount > 0 && <span className="text-muted">, {p.recruitingSiteCount.toLocaleString("en-GB")} recruiting</span>}</>}</Row>
              <Row label="Countries">{p.countries?.length ? p.countries.join(", ") : undefined}</Row>
              <Row label="Stopped because">{p.whyStopped}</Row>
              <Row label="Registry updated">{p.lastUpdatePosted}</Row>
            </dl>
            {p.facilities !== undefined && <details>
              <summary className="cursor-pointer min-h-11 py-3 underline">Named facilities in this registry capture ({p.facilities.length})</summary>
              {p.facilities.length ? <ul className="space-y-2">{p.facilities.map((f, i) => <li key={i}>
                <span className="font-medium">{f.facility ?? "Facility name not stated"}</span>
                {[f.city, f.state, f.country].filter(Boolean).length > 0 && <span> · {[f.city, f.state, f.country].filter(Boolean).join(", ")}</span>}
                <p>Facility status: {f.status ? f.status.toLowerCase().replaceAll("_", " ") : "not stated"}.</p>
              </li>)}</ul> : <p>No facilities were returned in this capture.</p>}
              <p className="text-xs text-muted">From the registry record read {p.fetchedAt.slice(0, 10)}. A facility status does not establish cohort or slot availability.</p>
            </details>}
            {!!p.cohortObservations?.length && <section className="space-y-3">
              <h3 className="font-medium">Separately reported cohort availability</h3>
              {p.cohortObservations.map((c, i) => <div key={i}>
                <p>{c.facility} · {c.cohort}: {c.availability.replaceAll("-", " ")}. {c.availableSlots === undefined ? "Slots not stated." : `${c.availableSlots} slots reported.`}</p>
                {c.note && <p>{c.note}</p>}<ObservationSources observation={c} />
              </div>)}
            </section>}
            <p className="text-xs text-muted">
              {p.hasEligibility ? <>The full inclusion and exclusion criteria are on the <a className="underline" href={p.source} rel="noopener">registry record</a>.</> : <>The registry record carries no eligibility criteria.</>}
              {" "}Read {p.fetchedAt.slice(0, 10)}. Recruiting overall does not mean a particular site is open; ask the study team.
            </p>
          </div>
        );
      })}
      {other.map((p) => (
        <div key={p.registryId} className="card p-4 text-sm space-y-2" data-participation={p.registryId}>
          <div className="flex flex-wrap items-center gap-2"><a className="underline font-medium" href={p.source} rel="noopener">{p.registryId}</a><span className="chip bg-foreground/5">{p.registry}</span></div>
          <dl className="space-y-1">
            <Row label="Run by">{p.sponsors.length ? p.sponsors.join(", ") : undefined}</Row>
            <Row label="Sites">{p.siteCount > 0 ? p.siteCount.toLocaleString("en-GB") : undefined}</Row>
            <Row label="Registry updated">{p.lastUpdated}</Row>
          </dl>
          <p className="text-xs text-muted">{p.hasEligibility ? <>Criteria as posted are in the <a className="underline" href={p.snapshot} rel="noopener">stored snapshot</a>.</> : <>The registry record carries no eligibility criteria.</>} Read {p.fetchedAt.slice(0, 10)}.</p>
        </div>
      ))}
      <p className="text-xs text-muted">ClinicalTrials.gov data courtesy of the US National Library of Medicine.</p>
    </div>
  );
}

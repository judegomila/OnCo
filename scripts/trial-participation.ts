import { createHash } from "node:crypto";
import type { TrialParticipation } from "../src/lib/schema";

/** Only public study metadata. Contact names, email addresses, phone numbers and investigators are not requested. */
export const PARTICIPATION_FIELDS = [
  "NCTId", "BriefTitle", "OfficialTitle", "Acronym",
  "protocolSection.statusModule", "protocolSection.descriptionModule", "protocolSection.conditionsModule",
  "protocolSection.sponsorCollaboratorsModule.leadSponsor", "protocolSection.sponsorCollaboratorsModule.collaborators",
  "protocolSection.designModule", "protocolSection.armsInterventionsModule", "protocolSection.outcomesModule",
  "protocolSection.eligibilityModule", "LocationFacility", "LocationStatus", "LocationCity", "LocationState",
  "LocationZip", "LocationCountry", "LocationGeoPoint",
].join(",");

type Sponsor = { name?: string; class?: string };
type DateStruct = { date?: string; type?: string };
export type ParticipationStudy = {
  protocolSection: {
    identificationModule: { nctId: string; briefTitle?: string; officialTitle?: string; acronym?: string };
    statusModule?: { overallStatus?: string; whyStopped?: string; statusVerifiedDate?: string; lastUpdatePostDateStruct?: DateStruct; startDateStruct?: DateStruct; primaryCompletionDateStruct?: DateStruct; completionDateStruct?: DateStruct; [key: string]: unknown };
    sponsorCollaboratorsModule?: { leadSponsor?: Sponsor; collaborators?: Sponsor[] };
    eligibilityModule?: { eligibilityCriteria?: string; minimumAge?: string; maximumAge?: string; sex?: string; healthyVolunteers?: boolean; [key: string]: unknown };
    contactsLocationsModule?: { locations?: Array<{ facility?: string; status?: string; city?: string; state?: string; zip?: string; country?: string; geoPoint?: { lat?: number; lon?: number } }> };
    descriptionModule?: { briefSummary?: string; detailedDescription?: string };
    conditionsModule?: { conditions?: string[]; keywords?: string[] };
    designModule?: Record<string, unknown>;
    armsInterventionsModule?: Record<string, unknown>;
    outcomesModule?: Record<string, unknown>;
  };
};
export type ParticipationSnapshot = {
  schemaVersion: 1;
  nct: string;
  source: string;
  apiSource: string;
  attribution: string;
  fetchedAt: string;
  studySha256: string;
  /** Structured response before facility-contact redaction; absent from older captures. */
  responseStudySha256?: string;
  study: ParticipationStudy;
};

export function studyHash(study: ParticipationStudy): string {
  return createHash("sha256").update(JSON.stringify(study)).digest("hex");
}

/**
 * Cross-references another registry declares that were read against ClinicalTrials.gov and are wrong: the NCT number
 * names a different study. Without this list the fetcher attaches that study's sites, sponsor and status to the record.
 * Keyed by record id, then by NCT number, with what was checked.
 */
export const REJECTED_CROSS_REFERENCES: Record<string, Record<string, string>> = {
  "espac-4": {
    NCT00058201: "ISRCTN96397434 (ESPAC-4) lists NCT00058201 as a secondary number, but ClinicalTrials.gov NCT00058201 is ESPAC-3 version 2 (secondary id RLUH-NCRI-ESPAC-3V2; observation or fluorouracil or gemcitabine, from July 2001). Read 16 November 2026.",
  },
  foxtrot: {
    NCT06293625: "ISRCTN83842641 lists NCT06293625, but ClinicalTrials.gov NCT06293625 is FOxTROT2France (acronym as registered), sponsored by Centre Hospitalier Universitaire Dijon, 150 estimated participants aged 70 or more, recruiting; it has its own record, nct06293625. The record `foxtrot` is the 1,053-patient trial reported in 2023. Read 17 November 2026.",
  },
  "start-b": {
    NCT00005588: "ISRCTN59368779 covers START trials A and B and lists NCT00005588, but ClinicalTrials.gov NCT00005588 is Trial A only (official title 'Standardization of Breast Radiotherapy: Trial A', secondary id STMG-STARTA, three arms of 50, 41.6 and 39 Gy). Trial B is NCT00005587 (secondary id STMG-STARTB), which the record now links. Read 17 November 2026.",
  },
};
/** The cross-references a record may be fetched by: every declared one except those REJECTED_CROSS_REFERENCES names. */
export function acceptedCrossReferences<T extends { nct: string }>(id: string, refs: T[] | undefined): T[] {
  return (refs ?? []).filter((r) => !REJECTED_CROSS_REFERENCES[id]?.[r.nct]);
}

/** Explicit registry identifiers only, including multiple studies named by a combined record. No title matching. */
export function registryIds(t: { nct?: string; links: Array<{ url: string }> }): string[] {
  const ids = new Set(t.nct?.toUpperCase().match(/\bNCT\d{8}\b/g) ?? []);
  for (const { url } of t.links) {
    try {
      const u = new URL(url);
      if (u.hostname === "clinicaltrials.gov" || u.hostname === "www.clinicaltrials.gov") {
        for (const id of u.pathname.toUpperCase().match(/\bNCT\d{8}\b/g) ?? []) ids.add(id);
      }
    } catch { /* An invalid link is handled by the corpus validator. */ }
  }
  return [...ids].sort();
}

/**
 * The registrations that are a record's own. A ClinicalTrials.gov link is usually the record's registration, but a
 * record also links a study it only cites: MOUNTAINEER links its phase 3 successor, and an ivermectin trial cites the
 * ICONIC registry entry for a safety statement. Read as registrations, those links attached the other study's sites,
 * sponsor and recruiting status to the wrong page. So: when a record names an NCT number in its own `nct` field, a
 * linked NCT number that it does not name there and that another record does name in its `nct` field is a citation.
 * A record registered elsewhere (an ISRCTN in `nct`, or no `nct` at all) keeps every linked number, because the link
 * is then the only place its ClinicalTrials.gov registration is written.
 */
export function ownRegistryIds<T extends { id: string; nct?: string; links: Array<{ url: string }> }>(trials: T[]): Map<string, string[]> {
  const inField = (t: T) => t.nct?.toUpperCase().match(/\bNCT\d{8}\b/g) ?? [];
  const owners = new Map<string, Set<string>>();
  for (const t of trials) for (const nct of inField(t)) owners.set(nct, (owners.get(nct) ?? new Set()).add(t.id));
  return new Map(trials.map((t) => {
    const own = new Set(inField(t));
    return [t.id, registryIds(t).filter((nct) => own.has(nct) || !own.size || !owners.has(nct))];
  }));
}

/**
 * One registration that two records are meant to share. Anything else attached to two records is a fault, and the
 * fetcher stops on it: it is how MOUNTAINEER came to show MOUNTAINEER-03's 366 sites.
 */
export const SHARED_REGISTRATIONS: Record<string, { records: string[]; why: string }> = {
  NCT02034110: { records: ["roar", "roar-atc"], why: "Two cohorts of one basket trial, biliary tract and anaplastic thyroid, with different results and approvals (docs/DUPLICATE-RECORDS.md)." },
  NCT01042379: { records: ["i-spy-2", "i-spy-2-2"], why: "I-SPY 2.2 is a protocol version running under the I-SPY 2 registration (docs/DUPLICATE-RECORDS.md)." },
  NCT00541047: { records: ["radicals-hd", "radicals-rt"], why: "RADICALS is one registration with two randomisations, radiotherapy timing and hormone duration, reported separately." },
  NCT02945566: { records: ["nct02945566", "star-trec"], why: "One study held twice: a registry ingest and the curated STAR-TREC record (ISRCTN14240288, which declares this number). To be merged into star-trec; the redirect that needs waits for the owner." },
};
/** Registrations attached to more than one record that SHARED_REGISTRATIONS does not name with exactly those records. */
export function unexpectedSharedRegistrations(rows: Array<{ id: string; ncts: string[] }>): Array<{ nct: string; records: string[] }> {
  const by = new Map<string, string[]>();
  for (const row of rows) for (const nct of row.ncts) by.set(nct, [...(by.get(nct) ?? []), row.id]);
  return [...by].filter(([nct, ids]) => ids.length > 1 && [...ids].sort().join() !== [...(SHARED_REGISTRATIONS[nct]?.records ?? [])].sort().join())
    .map(([nct, ids]) => ({ nct, records: [...ids].sort() }));
}

/** Fail closed if the API ever widens a field projection to include personal study contacts. */
export function assertNoContacts(value: unknown): void {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (/^(centralContacts|overallOfficials|contacts|responsibleParty|email|phone|phoneExt)$/i.test(key)) {
      throw new Error(`Unexpected contact field: ${key}`);
    }
    assertNoContacts(child);
  }
}

/** A site's facility names a place, but three registry entries typed a coordinator's phone, fax or email address into
 * it ("… Basilicata +39 0972 … e-mail: p.musto@…"). Labelled numbers, international numbers and addresses are removed. */
const FACILITY_CONTACT = /(?:\s*[,;-]?\s*(?:tel(?:ephone)?|phone|fax|e-?mail)\.?\s*:?\s*(?:[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+?\(?\d[\d\s().\/-]{6,}\d))+|\s*[,;]?\s*(?:[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+\d[\d\s().\/-]{7,}\d)/gi;

export function withoutFacilityContacts(study: ParticipationStudy): ParticipationStudy {
  const sites = study.protocolSection.contactsLocationsModule;
  if (!sites?.locations?.some((l) => l.facility && l.facility.replace(FACILITY_CONTACT, "") !== l.facility)) return study;
  const locations = sites.locations.map((location) => {
    if (!location.facility || location.facility.replace(FACILITY_CONTACT, "") === location.facility) return location;
    const facility = location.facility.replace(FACILITY_CONTACT, "").trim();
    if (facility) return { ...location, facility };
    // A site name that was only an email address leaves the site unnamed.
    return Object.fromEntries(Object.entries(location).filter(([key]) => key !== "facility"));
  });
  return { ...study, protocolSection: { ...study.protocolSection, contactsLocationsModule: { ...sites, locations } } };
}

/** Fail closed on a stored snapshot whose site names still carry contact details. */
export function assertNoFacilityContacts(study: ParticipationStudy): void {
  for (const { facility } of study.protocolSection.contactsLocationsModule?.locations ?? []) {
    if (facility && facility.replace(FACILITY_CONTACT, "") !== facility) throw new Error(`Contact details in a site name: ${study.protocolSection.identificationModule.nctId}`);
  }
}

export function makeSnapshot(response: ParticipationStudy, fetchedAt: string): ParticipationSnapshot {
  const study = withoutFacilityContacts(response);
  const nct = study.protocolSection?.identificationModule?.nctId;
  if (!/^NCT\d{8}$/.test(nct ?? "")) throw new Error("Invalid registry identifier in response");
  assertNoContacts(study);
  assertNoFacilityContacts(study);
  return { schemaVersion: 1, nct, source: `https://clinicaltrials.gov/study/${nct}`,
    apiSource: `https://clinicaltrials.gov/api/v2/studies/${nct}`,
    attribution: "Courtesy of the National Library of Medicine", fetchedAt, studySha256: studyHash(study), responseStudySha256: studyHash(response), study };
}

/** Only facility metadata; no contacts and no inferred recruitment/cohort availability. */
export function facilityObservations(snapshot: ParticipationSnapshot) {
  if (snapshot.study.protocolSection.identificationModule.nctId !== snapshot.nct || studyHash(snapshot.study) !== snapshot.studySha256) throw new Error("Facility source identity/hash mismatch");
  assertNoContacts(snapshot.study);
  assertNoFacilityContacts(snapshot.study);
  return (snapshot.study.protocolSection.contactsLocationsModule?.locations ?? []).map(location =>
    Object.fromEntries(["facility", "status", "city", "state", "country"].flatMap(key => {
      const value = location[key as keyof typeof location];
      return typeof value === "string" && value.trim() ? [[key, value]] : [];
    })) as { facility?: string; status?: string; city?: string; state?: string; country?: string }
  );
}

/** Collect all pages before accepting omissions; reject unexpected identities and repeated cursors. */
export async function readParticipationPages(ids: string[], load: (token?: string) => Promise<{ studies: ParticipationStudy[]; nextPageToken?: string }>): Promise<ParticipationStudy[]> {
  const studies: ParticipationStudy[] = [];
  const got = new Set<string>();
  const seenTokens = new Set<string>();
  let next: string | undefined;
  do {
    const body = await load(next);
    if (!Array.isArray(body.studies)) throw new Error("Invalid batch response");
    for (const study of body.studies) {
      const id = study.protocolSection?.identificationModule?.nctId;
      if (!ids.includes(id) || got.has(id)) throw new Error(`Unexpected or duplicate identifier: ${id}`);
      assertNoContacts(study);
      got.add(id);
      studies.push(study);
    }
    next = body.nextPageToken;
    if (next && seenTokens.has(next)) throw new Error("Repeated pagination cursor");
    if (next) seenTokens.add(next);
  } while (next);
  return studies;
}

export function participationSummary(snapshot: ParticipationSnapshot) {
  const p = snapshot.study.protocolSection;
  const e = p.eligibilityModule;
  const sites = p.contactsLocationsModule?.locations ?? [];
  const gaps: string[] = [];
  if (!e?.eligibilityCriteria?.trim()) gaps.push("eligibility-not-posted");
  if (!p.sponsorCollaboratorsModule?.leadSponsor?.name) gaps.push("lead-sponsor-not-posted");
  if (!sites.length) gaps.push("locations-not-posted");
  if (sites.length && sites.some((s) => !s.status)) gaps.push("some-site-statuses-not-posted");
  if (!p.statusModule?.lastUpdatePostDateStruct?.date) gaps.push("last-update-not-posted");
  const design = p.designModule as { enrollmentInfo?: { count?: number; type?: string } } | undefined;
  return {
    nct: snapshot.nct, source: snapshot.source, fetchedAt: snapshot.fetchedAt,
    // No `snapshot` path: the complete capture is not published. The hash is of the study as retrieved, so a
    // reader or an agent can check these fields against the registry record named by `source`.
    studySha256: snapshot.studySha256,
    overallStatus: p.statusModule?.overallStatus,
    lastUpdatePosted: p.statusModule?.lastUpdatePostDateStruct?.date,
    whyStopped: p.statusModule?.whyStopped,
    leadSponsor: p.sponsorCollaboratorsModule?.leadSponsor?.name,
    collaboratorCount: p.sponsorCollaboratorsModule?.collaborators?.length ?? 0,
    minimumAge: e?.minimumAge, maximumAge: e?.maximumAge, sex: e?.sex,
    healthyVolunteers: e?.healthyVolunteers, hasEligibility: Boolean(e?.eligibilityCriteria?.trim()),
    enrolment: design?.enrollmentInfo?.count, enrolmentType: design?.enrollmentInfo?.type,
    siteCount: sites.length, recruitingSiteCount: sites.filter((s) => s.status === "RECRUITING").length,
    countries: [...new Set(sites.flatMap((s) => s.country ? [s.country] : []))].sort(), gaps,
  };
}

/** Refresh registry fields while retaining independently sourced cohort observations. */
export function participationReference(snapshot: ParticipationSnapshot, options: { facilities?: boolean; previous?: TrialParticipation[] } = {}): TrialParticipation {
  const summary = participationSummary(snapshot);
  const previous = (options.previous ?? []).filter(row => row.nct === snapshot.nct);
  const keepFacilities = options.facilities || previous.some(row => row.facilities !== undefined);
  const cohortObservations = [...new Map(previous.flatMap(row => row.cohortObservations ?? []).map(row => [JSON.stringify(row), row])).values()];
  const ref: TrialParticipation & { gaps?: string[] } = {
    ...summary,
    ...(snapshot.responseStudySha256 ? { responseStudySha256: snapshot.responseStudySha256 } : {}),
    ...(keepFacilities ? { facilities: facilityObservations(snapshot) } : {}),
    ...(cohortObservations.length ? { cohortObservations } : {}),
  };
  delete ref.gaps;
  for (const key of Object.keys(ref) as Array<keyof TrialParticipation>) {
    const value = ref[key];
    if (value === undefined || value === "" || (key !== "facilities" && Array.isArray(value) && !value.length)) delete ref[key];
  }
  return ref;
}

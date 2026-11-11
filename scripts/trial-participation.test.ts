import { describe, expect, it } from "vitest";
import { assertNoFacilityContacts, facilityObservations, makeSnapshot, participationReference, participationSummary, readParticipationPages, registryIds, studyHash, type ParticipationStudy } from "./trial-participation";

const study: ParticipationStudy = { protocolSection: {
  identificationModule: { nctId: "NCT01578239" },
  statusModule: { overallStatus: "RECRUITING", lastUpdatePostDateStruct: { date: "2026-10-01", type: "ACTUAL" } },
  sponsorCollaboratorsModule: { leadSponsor: { name: "Public sponsor" }, collaborators: [{ name: "Public collaborator" }] },
  eligibilityModule: { eligibilityCriteria: "Inclusion Criteria:\n* Must have biomarker X\n\nExclusion Criteria:\n* Prior Y", healthyVolunteers: false, minimumAge: "18 Years" },
  contactsLocationsModule: { locations: [{ facility: "Centre A", country: "United States", status: "RECRUITING" }, { facility: "Centre B", country: "United States" }, { facility: "Centre C", country: "France", status: "COMPLETED" }] },
} };

describe("registry participation custody", () => {
  it("retains missing facility status without converting overall recruitment to local availability", () => {
    const snapshot = makeSnapshot(study, "2026-11-08T12:00:00.000Z");
    const ref = participationReference(snapshot, { facilities: true });
    expect(ref.facilities?.[0].status).toBe("RECRUITING");
    expect(ref.facilities?.[1]).not.toHaveProperty("status");
    expect(ref).not.toHaveProperty("cohortObservations");
    const changed = structuredClone(snapshot); changed.study.protocolSection.contactsLocationsModule!.locations![0].status = "COMPLETED";
    expect(() => facilityObservations(changed)).toThrow(/hash mismatch/);
  });

  it("preserves opted-in facility capture and separately sourced cohort notes on refresh", () => {
    const snapshot = makeSnapshot(study, "2026-11-08T12:00:00.000Z");
    const previous = participationReference(snapshot, { facilities: true });
    previous.cohortObservations = [{ facility: "Centre A", cohort: "Fictional cohort", availability: "not-stated", checkedOn: "2026-11-08", sources: [{ label: "Example source", url: "https://example.org/cohort" }] }];
    const refreshed = participationReference(snapshot, { previous: [previous] });
    expect(refreshed.facilities).toEqual(previous.facilities);
    expect(refreshed.cohortObservations).toEqual(previous.cohortObservations);
    expect(refreshed.cohortObservations?.[0]).not.toHaveProperty("availableSlots");
  });
  it("keeps exact eligibility wording, false values and a verifiable stored-study hash", () => {
    const snapshot = makeSnapshot(study, "2026-10-07T12:00:00.000Z");
    expect(snapshot.study.protocolSection.eligibilityModule?.eligibilityCriteria).toBe(study.protocolSection.eligibilityModule?.eligibilityCriteria);
    expect(participationSummary(snapshot).healthyVolunteers).toBe(false);
    expect(studyHash(JSON.parse(JSON.stringify(snapshot.study)))).toBe(snapshot.studySha256);
    const changed = structuredClone(study);
    changed.protocolSection.eligibilityModule!.eligibilityCriteria += " changed";
    expect(studyHash(changed)).not.toBe(snapshot.studySha256);
  });

  it("does not infer site recruitment from overall recruitment or count countries as sites", () => {
    const summary = participationSummary(makeSnapshot(study, "2026-10-07T12:00:00.000Z"));
    expect(summary.siteCount).toBe(3);
    expect(summary.recruitingSiteCount).toBe(1);
    expect(summary.countries).toEqual(["France", "United States"]);
    expect(summary.gaps).toContain("some-site-statuses-not-posted");
  });

  it("names absent eligibility, sponsors and sites without inventing defaults", () => {
    const minimal: ParticipationStudy = { protocolSection: { identificationModule: { nctId: "NCT01578239" } } };
    const summary = participationSummary(makeSnapshot(minimal, "2026-10-07T12:00:00.000Z"));
    expect(summary.gaps).toEqual(["eligibility-not-posted", "lead-sponsor-not-posted", "locations-not-posted", "last-update-not-posted"]);
    expect(summary.leadSponsor).toBeUndefined();
    expect(summary.hasEligibility).toBe(false);
  });

  it("removes phone numbers and email addresses typed into a site's name, and nothing else", () => {
    const typed = structuredClone(study);
    typed.protocolSection.contactsLocationsModule!.locations = [
      { facility: "Centro di Riferimento Oncologico di Basilicata +39 0972 726729 Fax +30 0972 726217 e-mail: p.musto@example.it", country: "Italy" },
      { facility: "via Roma, 55 - 56100 Pisa Tel. 050-2218690 - Fax. 050-2218685", country: "Italy" },
      { facility: "Coordinator.Name@example.fr", city: "Dijon", country: "France" },
      { facility: "Tel Aviv Sourasky Medical Center, 6 Weizmann St", country: "Israel" },
      { facility: "H.U. 12 de Octubre,", country: "Spain" },
    ];
    const snapshot = makeSnapshot(typed, "2026-10-07T12:00:00.000Z");
    expect(snapshot.study.protocolSection.contactsLocationsModule!.locations).toEqual([
      { facility: "Centro di Riferimento Oncologico di Basilicata", country: "Italy" },
      { facility: "via Roma, 55 - 56100 Pisa", country: "Italy" },
      { city: "Dijon", country: "France" },
      { facility: "Tel Aviv Sourasky Medical Center, 6 Weizmann St", country: "Israel" },
      { facility: "H.U. 12 de Octubre,", country: "Spain" },
    ]);
    expect(studyHash(snapshot.study)).toBe(snapshot.studySha256);
    expect(() => assertNoFacilityContacts(typed)).toThrow(/site name/);
  });

  it("rejects contact fields even if they arrive under a location", () => {
    const widened = structuredClone(study);
    Object.assign(widened.protocolSection.contactsLocationsModule!.locations![0], { contacts: [{ email: "person@example.org" }] });
    expect(() => makeSnapshot(widened, "2026-10-07T12:00:00.000Z")).toThrow("Unexpected contact field");
  });

  it("collects multiple explicit identifiers and ignores identifiers in unrelated links", () => {
    expect(registryIds({ nct: "NCT01578239", links: [
      { url: "https://clinicaltrials.gov/study/NCT00840749" },
      { url: "https://clinicaltrials.gov/ct2/show/NCT00687986" },
      { url: "https://clinicaltrials.gov/study/NCT01578239" },
      { url: "https://example.org/NCT99999999" },
    ] })).toEqual(["NCT00687986", "NCT00840749", "NCT01578239"]);
    expect(registryIds({ nct: "ISRCTN26715889", links: [] })).toEqual([]);
  });

  it("follows a cursor even after every requested study has arrived", async () => {
    const tokens: Array<string | undefined> = [];
    const studies = await readParticipationPages(["NCT01578239"], async (token) => {
      tokens.push(token);
      return token ? { studies: [] } : { studies: [study], nextPageToken: "final-empty-page" };
    });
    expect(studies).toEqual([study]);
    expect(tokens).toEqual([undefined, "final-empty-page"]);
  });

  it("does not turn a failed continuation into a registry omission", async () => {
    await expect(readParticipationPages(["NCT01578239", "NCT00840749"], async (token) => {
      if (token) throw new Error("HTTP 503");
      return { studies: [study], nextPageToken: "more" };
    })).rejects.toThrow("HTTP 503");
  });

  it("rejects unrelated studies, duplicate identifiers and repeated cursors", async () => {
    await expect(readParticipationPages(["NCT00840749"], async () => ({ studies: [study] }))).rejects.toThrow("Unexpected or duplicate");
    await expect(readParticipationPages(["NCT01578239"], async () => ({ studies: [study, study] }))).rejects.toThrow("Unexpected or duplicate");
    await expect(readParticipationPages([], async () => ({ studies: [], nextPageToken: "loop" }))).rejects.toThrow("Repeated pagination cursor");
  });
});

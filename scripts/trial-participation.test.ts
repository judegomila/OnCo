import { describe, expect, it } from "vitest";
import { acceptedCrossReferences, assertNoFacilityContacts, facilityObservations, makeSnapshot, ownRegistryIds, participationReference, participationSummary, readParticipationPages, registryIds, studyHash, unexpectedSharedRegistrations, type ParticipationStudy } from "./trial-participation";

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

  it("drops a cross-reference that names a different study, and keeps the rest", () => {
    // ISRCTN's ESPAC-4 record lists NCT00058201, which ClinicalTrials.gov holds as ESPAC-3.
    expect(acceptedCrossReferences("espac-4", [{ nct: "NCT00058201" }])).toEqual([]);
    expect(acceptedCrossReferences("espac-3", [{ nct: "NCT00058201" }])).toEqual([{ nct: "NCT00058201" }]);
    expect(acceptedCrossReferences("espac-4", [{ nct: "NCT99999999" }])).toEqual([{ nct: "NCT99999999" }]);
    expect(acceptedCrossReferences("anything", undefined)).toEqual([]);
  });

  it("reads a link to another record's registration as a citation, not as the record's own", () => {
    const ct = (nct: string) => ({ url: `https://clinicaltrials.gov/study/${nct}` });
    const own = ownRegistryIds([
      // MOUNTAINEER links its phase 3 successor, which has a record of its own.
      { id: "mountaineer", nct: "NCT03043313", links: [ct("NCT03043313"), ct("NCT05253651")] },
      { id: "mountaineer-03", nct: "NCT05253651", links: [ct("NCT05253651")] },
      // A record registered on ISRCTN keeps the ClinicalTrials.gov number it links, even where another record names it.
      { id: "radicals-hd", nct: "ISRCTN40814031", links: [ct("NCT00541047")] },
      { id: "radicals-rt", nct: "NCT00541047", links: [ct("NCT00541047")] },
      // A second registration that no other record owns stays with the record that links it.
      { id: "combined", nct: "NCT00000001", links: [ct("NCT00000001"), ct("NCT00000002")] },
    ]);
    expect(own.get("mountaineer")).toEqual(["NCT03043313"]);
    expect(own.get("mountaineer-03")).toEqual(["NCT05253651"]);
    expect(own.get("radicals-hd")).toEqual(["NCT00541047"]);
    expect(own.get("combined")).toEqual(["NCT00000001", "NCT00000002"]);
  });

  it("drops the two cross-references that name a different study from the record", () => {
    // ISRCTN83842641 lists FOxTROT2France's number; ISRCTN59368779 covers START A and B but lists only Trial A's.
    expect(acceptedCrossReferences("foxtrot", [{ nct: "NCT06293625" }])).toEqual([]);
    expect(acceptedCrossReferences("start-b", [{ nct: "NCT00005588" }])).toEqual([]);
    expect(acceptedCrossReferences("start-a", [{ nct: "NCT00005588" }])).toEqual([{ nct: "NCT00005588" }]);
  });

  it("reports a registration attached to two records unless the pair is a recorded one", () => {
    expect(unexpectedSharedRegistrations([{ id: "roar", ncts: ["NCT02034110"] }, { id: "roar-atc", ncts: ["NCT02034110"] }])).toEqual([]);
    expect(unexpectedSharedRegistrations([{ id: "mountaineer", ncts: ["NCT03043313", "NCT05253651"] }, { id: "mountaineer-03", ncts: ["NCT05253651"] }]))
      .toEqual([{ nct: "NCT05253651", records: ["mountaineer", "mountaineer-03"] }]);
    // A recorded pair does not cover a third record.
    expect(unexpectedSharedRegistrations([{ id: "roar", ncts: ["NCT02034110"] }, { id: "roar-atc", ncts: ["NCT02034110"] }, { id: "other", ncts: ["NCT02034110"] }]))
      .toEqual([{ nct: "NCT02034110", records: ["other", "roar", "roar-atc"] }]);
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

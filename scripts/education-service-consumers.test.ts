import { describe, expect, it } from "vitest";
import { serviceSnapshot } from "./education-service-consumers";
import { type FreeService } from "../src/data/free-wave";
import { fieldHash, reviewProblems } from "./education-coverage";

const service: FreeService = { id: "example", group: "trials", name: "Public information", who: "Readers", where: "US", what: "Information is free; treatment may have costs.", url: "https://example.org/", entityIds: ["expanded-access"] };

describe("directory consumer audit snapshots", () => {
  it("retains the actual directory fields and keeps its namespace separate from graph evidence", () => {
    const snapshot = serviceSnapshot([service], ["example"], "source-hash");
    expect(snapshot.records).toEqual([{ ...service, kind: "service-directory-entry" }]);
    expect(snapshot.source.sha256).toBe("source-hash");
    const review = { status: "reviewed" as const, auditor: "agent", checkedAt: "2026-11-09", rationale: "Read the actual directory output.", points: [{ id: "cost", requirement: "Retain cost limits.", status: "covered-draft" as const, remaining: [], evidence: [{ version: snapshot.version, recordId: "example", field: "what", fieldSha256: fieldHash(service.what), explanation: "States the cost boundary." }] }] };
    const graphOnly = new Map([["proposal-access:example", { id: "example", kind: "term", name: "Example", what: service.what }]]);
    expect(reviewProblems({ sourceType: "adjacent-concept", review }, graphOnly)).toContain("cost: missing owner/version proposal-service-directory:example");
    graphOnly.set(`${snapshot.version}:example`, snapshot.records[0]);
    expect(reviewProblems({ sourceType: "adjacent-concept", review }, graphOnly)).toEqual([]);
    graphOnly.set(`${snapshot.version}:example`, { ...snapshot.records[0], what: "Treatment is always free." });
    expect(reviewProblems({ sourceType: "adjacent-concept", review }, graphOnly)).toContain("cost: evidence field changed");
  });

  it("refuses absent, ambiguous or duplicate owners instead of silently dropping them", () => {
    expect(() => serviceSnapshot([service], [], "hash")).toThrow("at least one");
    expect(() => serviceSnapshot([service], ["missing"], "hash")).toThrow("found 0");
    expect(() => serviceSnapshot([service, service], ["example"], "hash")).toThrow("found 2");
    expect(() => serviceSnapshot([service], ["example", "example"], "hash")).toThrow("Duplicate");
  });
});

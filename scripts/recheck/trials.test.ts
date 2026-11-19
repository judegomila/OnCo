import { describe, expect, it } from "vitest";
import { Net } from "./lib";
import { fakeFetch } from "./test-helpers";
import { type RegistryStudy, type TrialView, compareTrial, corpusPhase, parseStudy, readRegistry, runningWords, sharedRegistrationFindings } from "./trials";

const trial = (over: Partial<TrialView> = {}): TrialView => ({ id: "t1", status: "recruiting", phase: "2", sponsor: "Acme Oncology", enrolled: 100, enrolledBasis: "registry", asOf: "2026-09-10", ingest: true, text: "A phase 2 trial, now recruiting.", outcomes: 0, ...over });
const study = (over: Partial<RegistryStudy> = {}): RegistryStudy => ({ nct: "NCT00000001", overallStatus: "RECRUITING", hasResults: false, phases: ["PHASE2"], enrolment: 100, enrolmentType: "ESTIMATED", leadSponsor: "Acme Oncology", lastUpdate: "2026-11-10", ...over });
const types = (t: TrialView, s: RegistryStudy | undefined, prior?: Parameters<typeof compareTrial>[3]) => compareTrial(t, "NCT00000001", s, prior).map((f) => `${f.type}:${f.severity}`);

describe("parseStudy", () => {
  it("reads the fields the v2 API returns", () => {
    const s = parseStudy({ protocolSection: { identificationModule: { nctId: "NCT02034110" }, statusModule: { overallStatus: "COMPLETED", whyStopped: " Sponsor  decision ", primaryCompletionDateStruct: { date: "2021-12-10", type: "ACTUAL" }, resultsFirstPostDateStruct: { date: "2023-08-21" }, lastUpdatePostDateStruct: { date: "2023-08-21" } }, sponsorCollaboratorsModule: { leadSponsor: { name: "Novartis Pharmaceuticals" } }, designModule: { phases: ["PHASE2"], enrollmentInfo: { count: 206, type: "ACTUAL" } } }, hasResults: true });
    expect(s).toEqual({ nct: "NCT02034110", overallStatus: "COMPLETED", whyStopped: "Sponsor decision", primaryCompletion: "2021-12-10", primaryCompletionType: "ACTUAL", lastUpdate: "2023-08-21", resultsFirstPosted: "2023-08-21", hasResults: true, phases: ["PHASE2"], enrolment: 206, enrolmentType: "ACTUAL", leadSponsor: "Novartis Pharmaceuticals" });
    expect(parseStudy({})).toBeUndefined();
  });
  it("writes registry phases the way the corpus does", () => {
    expect(corpusPhase(["PHASE1", "PHASE2"])).toBe("1/2");
    expect(corpusPhase(["PHASE2", "PHASE3"])).toBe("2/3");
    expect(corpusPhase(["EARLY_PHASE1"])).toBe("1");
    expect(corpusPhase(["NA"])).toBeUndefined();
    expect(corpusPhase([])).toBeUndefined();
  });
});

describe("runningWords", () => {
  it("finds words that say a trial is still running", () => {
    expect(runningWords("Results are awaited in 2027.")).toBe("awaited");
    expect(runningWords("The trial is now recruiting in 40 centres.")).toBe("recruiting");
    expect(runningWords("due to reach its primary completion in 2027-01")).toBe("due to reach its primary completion");
  });
  it("matches whole words only, and not a negated one", () => {
    expect(runningWords("The prerecruiting phase and the songoing choir.")).toBeUndefined();
    expect(runningWords("Active, not recruiting; it is no longer recruiting.")).toBeUndefined();
    expect(runningWords("Completed in 2021 with a positive result.")).toBeUndefined();
  });
});

describe("compareTrial", () => {
  it("says nothing when the registry agrees", () => {
    expect(compareTrial(trial(), "NCT00000001", study(), { overallStatus: "RECRUITING", leadSponsor: "Acme Oncology" })).toEqual([]);
  });

  it("lists a study that has closed since OnCo last read the registry, with the words that may now be wrong", () => {
    const [f] = compareTrial(trial(), "NCT00000001", study({ overallStatus: "TERMINATED", whyStopped: "Slow accrual" }), { overallStatus: "RECRUITING" });
    expect(f).toMatchObject({ type: "status-moved-to-closed", severity: "high", recordId: "t1", url: "https://clinicaltrials.gov/study/NCT00000001", date: "2026-11-10", source: "Terminated: Slow accrual" });
    expect(f.onco).toContain("registry last read as Recruiting");
    expect(f.onco).toContain("text says \"recruiting\"");
  });

  it("is quieter when the text makes no claim and the status already agrees", () => {
    expect(types(trial({ status: "completed", text: "A phase 2 trial." }), study({ overallStatus: "COMPLETED" }), { overallStatus: "ACTIVE_NOT_RECRUITING" })).toEqual(["status-moved-to-closed:low"]);
    expect(types(trial({ status: "active", text: "A phase 2 trial." }), study({ overallStatus: "COMPLETED" }), { overallStatus: "ACTIVE_NOT_RECRUITING" })).toEqual(["status-moved-to-closed:medium"]);
    expect(types(trial({ status: "active", text: "A phase 2 trial." }), study({ overallStatus: "WITHDRAWN" }), { overallStatus: "ACTIVE_NOT_RECRUITING" })).toEqual(["status-moved-to-closed:high"]);
  });

  it("lists a move that is not a closure as a low row, and nothing when the last reading already had it", () => {
    expect(types(trial(), study({ overallStatus: "ACTIVE_NOT_RECRUITING" }), { overallStatus: "RECRUITING" })).toEqual(["status-moved:low"]);
    expect(types(trial({ status: "active", text: "x" }), study({ overallStatus: "ACTIVE_NOT_RECRUITING" }), { overallStatus: "ACTIVE_NOT_RECRUITING" })).toEqual([]);
    expect(types(trial(), study({ overallStatus: "SUSPENDED" }), { overallStatus: "RECRUITING" })).toEqual(["status-moved:medium"]);
  });

  it("falls back to the record's own status where there is no earlier registry reading", () => {
    expect(types(trial({ status: "planned", text: "x" }), study({ overallStatus: "RECRUITING" }))).toEqual(["status-moved:low"]);
    expect(types(trial({ status: "recruiting", text: "x" }), study({ overallStatus: "RECRUITING" }))).toEqual([]);
  });

  it("keeps the historic label: silent when the registry agrees the study is over, a hand check when it calls it open", () => {
    const historic = trial({ status: "historic", text: "A stopped programme." });
    expect(types(historic, study({ overallStatus: "TERMINATED" }), { overallStatus: "RECRUITING" })).toEqual([]);
    expect(types(historic, study({ overallStatus: "COMPLETED" }))).toEqual([]);
    const [open] = compareTrial(historic, "NCT00000001", study({ overallStatus: "RECRUITING" }));
    expect(open).toMatchObject({ type: "historic-but-open", severity: "medium" });
    expect(open.note).toContain("The historic label is kept");
  });

  it("does not ask for a result status to be replaced", () => {
    const [f] = compareTrial(trial({ status: "positive", text: "Met its primary endpoint.", outcomes: 2 }), "NCT00000001", study({ overallStatus: "COMPLETED" }), { overallStatus: "ACTIVE_NOT_RECRUITING" });
    expect(f.type).toBe("status-moved-to-closed");
    expect(f.note).toContain("result status is kept");
    expect(types(trial({ status: "positive", text: "x", outcomes: 2 }), study({ overallStatus: "COMPLETED" }))).toEqual([]);
  });

  it("lists results posted after the record was last checked, and not ones it has already been read against", () => {
    const posted = study({ overallStatus: "ACTIVE_NOT_RECRUITING", hasResults: true, resultsFirstPosted: "2026-10-21" });
    const [f] = compareTrial(trial({ status: "active", text: "Results are awaited." }), "NCT00000001", posted, { overallStatus: "ACTIVE_NOT_RECRUITING" });
    expect(f).toMatchObject({ type: "results-posted", severity: "high", date: "2026-10-21" });
    expect(f.onco).toContain("text says \"awaited\"");
    expect(types(trial({ status: "active", text: "x", asOf: "2026-10-22" }), posted, { overallStatus: "ACTIVE_NOT_RECRUITING" })).toEqual([]);
    expect(types(trial({ status: "positive", text: "x", outcomes: 3 }), { ...posted, overallStatus: "COMPLETED" }, { overallStatus: "COMPLETED" })).toEqual(["results-posted:low"]);
  });

  it("compares phase only where both sides name a numbered phase", () => {
    expect(types(trial({ text: "x" }), study({ phases: ["PHASE3"] }), { overallStatus: "RECRUITING" })).toEqual(["phase:medium"]);
    expect(types(trial({ text: "x", phase: "observational" }), study({ phases: ["PHASE3"] }), { overallStatus: "RECRUITING" })).toEqual([]);
    expect(types(trial({ text: "x" }), study({ phases: ["NA"] }), { overallStatus: "RECRUITING" })).toEqual([]);
  });

  it("compares enrolment only where the record's figure is the registry's", () => {
    expect(types(trial({ text: "x" }), study({ enrolment: 104 }), { overallStatus: "RECRUITING" })).toEqual(["enrolment:low"]);
    expect(types(trial({ text: "x" }), study({ enrolment: 40, enrolmentType: "ACTUAL" }), { overallStatus: "RECRUITING", enrolmentType: "ESTIMATED" })).toEqual(["enrolment:medium"]);
    expect(types(trial({ text: "x", enrolledBasis: "randomised" }), study({ enrolment: 40 }), { overallStatus: "RECRUITING" })).toEqual([]);
  });

  it("compares the primary completion date a registry-written summary states", () => {
    const t = trial({ text: "started 2025-10-27 and due to reach its primary completion in 2027-06-30." });
    const [f] = compareTrial(t, "NCT00000001", study({ primaryCompletion: "2026-10-29", primaryCompletionType: "ACTUAL" }), { overallStatus: "RECRUITING" });
    expect(f).toMatchObject({ type: "primary-completion", severity: "medium", onco: "text gives primary completion 2027-06-30", source: "2026-10-29 (actual)" });
    expect(types(t, study({ primaryCompletion: "2027-06-30", primaryCompletionType: "ESTIMATED" }), { overallStatus: "RECRUITING" })).toEqual([]);
    expect(types(trial({ status: "active", text: "A hand-written summary." }), study({ overallStatus: "ACTIVE_NOT_RECRUITING", primaryCompletion: "2026-10", primaryCompletionType: "ACTUAL" }), { overallStatus: "ACTIVE_NOT_RECRUITING" })).toEqual(["primary-completion-reached:medium"]);
  });

  it("reports a sponsor that changed on the registry, not a shorter name a person wrote", () => {
    const [f] = compareTrial(trial({ text: "x", sponsor: "Merus B.V." }), "NCT00000001", study({ leadSponsor: "Genmab" }), { overallStatus: "RECRUITING", leadSponsor: "Merus B.V." });
    expect(f).toMatchObject({ type: "sponsor", source: "Genmab" });
    // Hand-written "Merck" beside a registry that has said "Merck Sharp & Dohme LLC" all along is not drift.
    expect(types(trial({ text: "x", ingest: false, sponsor: "Merck" }), study({ leadSponsor: "Merck Sharp & Dohme LLC" }), { overallStatus: "RECRUITING", leadSponsor: "Merck Sharp & Dohme LLC" })).toEqual([]);
    // The record already names the new sponsor.
    expect(types(trial({ text: "x", sponsor: "Genmab" }), study({ leadSponsor: "Genmab" }), { overallStatus: "RECRUITING", leadSponsor: "Merus B.V." })).toEqual([]);
    expect(types(trial({ text: "x", sponsor: "Old Name Ltd" }), study({ leadSponsor: "New Name Ltd" }))).toEqual(["sponsor:medium"]);
  });

  it("does not compare phase or enrolment for a record that stands for several registrations", () => {
    expect(types(trial({ text: "x", registrations: 2 }), study({ phases: ["PHASE3"], enrolment: 900 }), { overallStatus: "RECRUITING" })).toEqual([]);
  });

  it("names a registration the registry did not return", () => {
    expect(compareTrial(trial(), "NCT00000001", undefined)).toMatchObject([{ type: "not-returned", severity: "medium" }]);
  });
});

describe("sharedRegistrationFindings", () => {
  it("reports a registration two records carry, and not a pair that is meant to share one", () => {
    const out = sharedRegistrationFindings([{ id: "nct00000007", ncts: ["NCT00000007"] }, { id: "curated-twin", ncts: ["NCT00000007"] }, { id: "roar", ncts: ["NCT02034110"] }, { id: "roar-atc", ncts: ["NCT02034110"] }, { id: "alone", ncts: ["NCT00000009"] }]);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ type: "shared-registration", severity: "high", recordId: "curated-twin", url: "https://clinicaltrials.gov/study/NCT00000007", onco: "2 records carry NCT00000007: curated-twin, nct00000007" });
  });
});

describe("readRegistry", () => {
  const ids = Array.from({ length: 150 }, (_, i) => `NCT${String(i + 1).padStart(8, "0")}`);
  const page = (list: string[], next?: string) => new Response(JSON.stringify({ studies: list.map((nctId) => ({ protocolSection: { identificationModule: { nctId } } })), ...(next ? { nextPageToken: next } : {}) }));

  it("asks for 100 numbers a request, follows a page token, and names what was not returned", async () => {
    const f = fakeFetch((url) => {
      const u = new URL(url);
      const batch = u.searchParams.get("filter.ids")!.split(",");
      if (batch.length === 100 && !u.searchParams.get("pageToken")) return page(batch.slice(0, 60), "next");
      if (batch.length === 100) return page(batch.slice(60));
      return page(batch.slice(1));
    });
    const net = new Net({ fetchImpl: f.impl, sleep: async () => undefined });
    const r = await readRegistry(ids, net);
    expect(net.requests).toBe(3);
    expect(r.studies.size).toBe(149);
    expect(r.notReturned).toEqual(["NCT00000101"]);
    expect(r.failed).toEqual([]);
    expect(new URL(f.calls[0].url).hostname).toBe("clinicaltrials.gov");
  });

  it("names a failed batch as failed, never as not returned", async () => {
    const f = fakeFetch((url) => (new URL(url).searchParams.get("filter.ids")!.split(",").length === 100 ? new Response("down", { status: 503 }) : page(ids.slice(100))));
    const r = await readRegistry(ids, new Net({ fetchImpl: f.impl, sleep: async () => undefined }));
    expect(r.failed).toHaveLength(100);
    expect(r.notReturned).toEqual([]);
    expect(r.studies.size).toBe(50);
  });
});

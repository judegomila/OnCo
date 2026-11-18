import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { graph } from "./graph";
import { REL_FIELDS } from "./kinds";
import { peopleWithAuthoredTrials, trialsAuthoredBy, unconfirmedTrialCount } from "./person-trials";
import { withAuthoredTrials } from "@/data/cross-links-derived";
import generated from "@/data/person-trial-links.generated.json";
import type { EntityInput } from "./schema";
import { PersonTrialReports } from "@/components/PersonTrialReports";

/**
 * A person reaches the trials they wrote up through the author lists of the trial reports. These hold the page and
 * the graph to the derived file: every confirmed pair is a link both pages show, nothing unconfirmed is, and the
 * table says how each row was confirmed.
 */
const SLOW = Number(process.env.SLOW_TEST_MS ?? 120_000);
const file = generated as unknown as { links: Record<string, Array<{ trialId: string; paperId: string; evidence: string; name: string }>>; ambiguous: Array<{ personId: string; trialId: string }> };

describe("person to trial, derived from authorship", () => {
  const g = graph();
  const people = peopleWithAuthoredTrials();

  it("links every confirmed pair in the graph, so the trial page lists the person too", () => {
    const oneWay: string[] = [];
    for (const id of people) {
      const p = g.must(id);
      for (const a of trialsAuthoredBy(id)) if (!REL_FIELDS.some((f) => p[f].includes(a.trial.id) || a.trial[f].includes(id))) oneWay.push(`${id} -> ${a.trial.id}`);
    }
    expect(oneWay).toEqual([]);
  }, SLOW);

  it("links nobody on initials and an affiliation, or on a name alone", () => {
    for (const [id, links] of Object.entries(file.links)) for (const l of links) {
      expect(["orcid", "affiliation"], `${id} -> ${l.trialId}`).toContain(l.evidence);
      if (l.evidence === "affiliation") expect(l.name, `${id} -> ${l.trialId} was linked on initials`).toBe("full");
    }
  });

  it("does not add a link from an unconfirmed name", () => {
    const linked = new Set(Object.entries(file.links).flatMap(([id, ls]) => ls.map((l) => `${id}|${l.trialId}`)));
    for (const a of file.ambiguous) expect(linked.has(`${a.personId}|${a.trialId}`), `${a.personId} -> ${a.trialId} is both linked and ambiguous`).toBe(false);
  });

  it("reaches the people the census named, in number", () => {
    // Measured 16 Nov 2026: 436 people and 1,251 person-trial pairs confirmed; 234 pairs were linked before by a
    // record field. Initials with an affiliation (68 pairs) and names alone are counted on the page, not linked.
    expect(people.length).toBeGreaterThanOrEqual(420);
    expect(people.reduce((n, id) => n + trialsAuthoredBy(id).length, 0)).toBeGreaterThanOrEqual(1200);
    expect(trialsAuthoredBy("enriqueta-felip").length).toBeGreaterThan(0);
  });

  it("adds only missing pairs, only to people, and skips an id that is not a trial", () => {
    const rec = (id: string, kind: string, extra: Record<string, unknown> = {}) => ({ id, kind, name: id, tldr: "t", summary: "s", asOf: "2026-11-16", ...extra }) as unknown as EntityInput;
    const out = withAuthoredTrials([
      rec("p-a", "person", { trials: ["t-1"] }),
      rec("p-b", "person"),
      rec("t-1", "trial"),
      rec("t-2", "trial", { people: ["p-b"] }),
      rec("t-3", "trial"),
      rec("d-1", "drug"),
    ], { "p-a": [{ trialId: "t-1" }, { trialId: "t-3" }, { trialId: "t-3" }, { trialId: "d-1" }, { trialId: "gone" }], "p-b": [{ trialId: "t-2" }], "t-1": [{ trialId: "t-3" }] });
    const by = Object.fromEntries(out.map((e) => [e.id, e]));
    expect(by["p-a"].trials).toEqual(["t-1", "t-3"]);
    expect(by["p-b"].trials ?? []).toEqual([]);
    expect(by["t-1"].trials ?? []).toEqual([]);
  });

  it("says on the page how many matching names were left out", () => {
    const id = people.find((p) => unconfirmedTrialCount(p) > 1)!;
    const html = renderToStaticMarkup(createElement(PersonTrialReports, { id, name: "This person" }));
    expect(html).toContain(`${unconfirmedTrialCount(id)} more trials have a report with a matching name that could not be confirmed`);
    expect(html).toContain("Being an author of a report is not the same as leading the trial.");
  });

  it("stays inside its markup budget on every person page", () => {
    const kb = (id: string) => Buffer.byteLength(renderToStaticMarkup(createElement(PersonTrialReports, { id, name: id })), "utf8") / 1024;
    const sizes = people.map((id) => [id, kb(id)] as const).sort((a, b) => b[1] - a[1]);
    // Measured 16 Nov 2026: 19.2 KB at the heaviest (fifteen rows, each with its report's title); the budget is
    // that plus the 15 per cent margin src/app/heavy-pages.test.ts uses.
    expect(sizes[0][1], `${sizes[0][0]} is the heaviest at ${sizes[0][1].toFixed(1)} KB`).toBeLessThan(22);
  }, SLOW);
});

import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { REL_FIELDS } from "@/lib/kinds";
import type { Entity, EntityInput } from "@/lib/schema";
import { withReciprocalIdeaBottlenecks } from "./cross-links-derived";
import { openQuestions, questionsNaming, questionsThrough } from "./open-questions";

const names = (a: Entity, b: string) => REL_FIELDS.some((f) => a[f].includes(b));

describe("idea and bottleneck links run both ways", () => {
  const g = graph();

  it("no idea names a bottleneck that does not name it back", () => {
    const oneWay: string[] = [];
    for (const i of g.kind("idea")) for (const f of REL_FIELDS) for (const to of i[f]) {
      const b = g.get(to);
      if (b?.kind === "bottleneck" && !names(b, i.id)) oneWay.push(`${i.id} -> ${b.id}`);
    }
    expect(oneWay).toEqual([]);
  });

  it("no bottleneck names an idea that does not name it back, in the field the idea page reads", () => {
    const oneWay: string[] = [];
    for (const b of g.kind("bottleneck")) for (const f of REL_FIELDS) for (const to of b[f]) {
      const i = g.get(to);
      if (i?.kind === "idea" && !names(i, b.id)) oneWay.push(`${b.id} -> ${i.id}`);
    }
    expect(oneWay).toEqual([]);
  });

  it("the links are there in number, so the rule is not passing on an empty graph", () => {
    let n = 0;
    for (const i of g.kind("idea")) n += i.bottlenecks.filter((b) => g.get(b)?.kind === "bottleneck").length;
    expect(n).toBeGreaterThan(2400);
  });

  it("adds only what is missing and leaves other kinds alone", () => {
    const rec = (id: string, kind: string, extra: Record<string, unknown> = {}) => ({ id, kind, name: id, tldr: "t", summary: "s", asOf: "2026-11-16", ...extra }) as unknown as EntityInput;
    const out = withReciprocalIdeaBottlenecks([
      rec("idea-a", "idea", { bottlenecks: ["b-x"] }),
      rec("idea-b", "idea", { related: ["drug-z"] }),
      rec("b-x", "bottleneck", { related: ["idea-a", "idea-b"] }),
      rec("b-y", "bottleneck"),
      rec("drug-z", "drug", { related: ["idea-a", "b-x"] }),
    ]);
    const by = Object.fromEntries(out.map((e) => [e.id, e]));
    expect(by["idea-a"].bottlenecks).toEqual(["b-x"]);
    expect(by["idea-b"].bottlenecks).toEqual(["b-x"]);
    expect(by["b-x"].related).toEqual(["idea-a", "idea-b"]);
    expect(by["b-y"].related ?? []).toEqual([]);
    expect(by["drug-z"].related).toEqual(["idea-a", "b-x"]);
  });
});

describe("an open question is reachable from every record it names", () => {
  const g = graph();

  it("every ref is a record, so the reverse lookup has a page to show it on", () => {
    const stray = openQuestions.flatMap((q) => q.refs.filter((r) => !g.get(r)).map((r) => `${q.id} -> ${r}`));
    expect(stray).toEqual([]);
  });

  it("each idea a question names gets that question back", () => {
    const oneWay: string[] = [];
    for (const q of openQuestions) for (const r of q.refs) if (g.get(r)?.kind === "idea" && !questionsNaming(r).some((x) => x.id === q.id)) oneWay.push(`${q.id} -> ${r}`);
    expect(oneWay).toEqual([]);
    expect(openQuestions.flatMap((q) => q.refs).filter((r) => g.get(r)?.kind === "idea").length).toBeGreaterThan(80);
  });

  it("each question reaches every bottleneck that an idea it names attacks", () => {
    let reached = 0;
    const missing: string[] = [];
    for (const b of g.kind("bottleneck")) {
      const ideas = (g.incoming(b.id).get("idea") ?? []).map((i) => i.id);
      const shown = new Set(questionsThrough(ideas).map((x) => x.question.id));
      for (const q of openQuestions) if (q.refs.some((r) => ideas.includes(r))) { reached++; if (!shown.has(q.id)) missing.push(`${q.id} -> ${b.id}`); }
      for (const x of questionsThrough(ideas)) expect(ideas, `${x.question.id} on ${b.id}`).toContain(x.via);
    }
    expect(missing).toEqual([]);
    // Measured 16 Nov 2026; before this no question reached any bottleneck page.
    expect(reached).toBeGreaterThanOrEqual(QUESTION_BOTTLENECK_PAIRS);
  });
});

const QUESTION_BOTTLENECK_PAIRS = 113;

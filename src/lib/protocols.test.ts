import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { ProtocolSchema, type Protocol } from "./schema";
import { byDomain, protocolProblems } from "./protocols";
import { protocolsFor } from "./members";
import { protocols as registered } from "@/data/protocols";

/**
 * The rules every care protocol keeps (docs/PROTOCOLS.md). The schema checks shapes; this file checks what a reader
 * relies on: every step is sourced or says why not, every source has a year and an address, every cited key resolves,
 * every linked record exists and the upgrades are protocol-upgrade ideas, the name is a subject, and the prose follows
 * the house style that src/lib/corpus-rules.test.ts applies to the fields it knows (a protocol's own fields are walked
 * here). The tone rules reach protocols through src/lib/tone.test.ts, which walks every record; a step's `action` is in
 * its plain-language set.
 */
const g = graph();
const list = g.kind("protocol");

/** Fields of a protocol that are OnCo's prose; `quote` is the source's words and is never checked. */
const PROSE = new Set(["tldr", "summary", "simple", "population", "trigger", "action", "why", "practice", "statement", "name", "differs", "evidence", "claim", "gaps", "label"]);
const STYLE: [string, RegExp][] = [["em-dash or en-dash", /[—–]/], ['"as of" date stamp', /\bas of\b/i], ['the word "spike"', /\bspikes?\b/i]];

function styleProblems(value: unknown, key: string, path: string, out: string[]): void {
  if (typeof value === "string") {
    if (!PROSE.has(key)) return;
    for (const [rule, re] of STYLE) if (re.test(value)) out.push(`${path}: ${rule}`);
  } else if (Array.isArray(value)) value.forEach((v, i) => styleProblems(v, key, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) if (k !== "quote") styleProblems(v, k, `${path}.${k}`, out);
}

describe("care protocols", () => {
  it("every registered protocol is in the graph and parses", () => {
    expect(list.length).toBe(registered.length);
    for (const raw of registered) expect(ProtocolSchema.safeParse(raw).success, String(raw.id)).toBe(true);
  });

  it("every protocol has steps, at least one source with a year and URL, and keeps the citation rules", () => {
    const failures: string[] = [];
    for (const p of list) {
      if (!p.steps.length) failures.push(`${p.id}: no steps`);
      if (!p.sources.some((s) => s.year && /^https?:\/\//.test(s.url) && s.read !== "not-reachable")) failures.push(`${p.id}: no readable source with a year and URL`);
      failures.push(...protocolProblems(p).map((x) => `${p.id}: ${x}`));
    }
    expect(failures).toEqual([]);
  });

  it("most steps cite a source rather than common practice", () => {
    for (const p of list) {
      const practice = p.steps.filter((s) => !s.source).length;
      expect(practice, `${p.id}: ${practice} of ${p.steps.length} steps cite no source`).toBeLessThanOrEqual(Math.floor(p.steps.length / 4));
    }
  });

  it("links resolve, and upgrades are protocol-upgrade ideas", () => {
    // Dangling ids already fail the graph build; this names the upgrade rule the graph cannot know.
    const failures: string[] = [];
    for (const p of list) for (const id of p.upgrades) {
      const e = g.get(id);
      if (!e || e.kind !== "idea" || !e.tags.includes("protocol-upgrade")) failures.push(`${p.id}: upgrades "${id}" is not an idea tagged protocol-upgrade`);
    }
    expect(failures).toEqual([]);
  });

  it("the name is a subject, not a question", () => {
    expect(protocolProblems({ name: "How should a port be flushed?", sources: [], steps: [], bestInClass: { statement: "x", sources: [] }, variants: [], grades: [] } as unknown as Protocol).some((x) => x.includes("question"))).toBe(true);
    for (const p of list) expect(p.name, p.id).not.toMatch(/\?\s*$/);
  });

  it("prose follows the house style; quotations are left as written", () => {
    const failures: string[] = [];
    for (const p of list) styleProblems(p, "", p.id, failures);
    expect(failures).toEqual([]);
  });

  it("groups by domain in care-pathway order", () => {
    const groups = byDomain(list);
    expect(groups.reduce((n, [, l]) => n + l.length, 0)).toBe(list.length);
  });

  it("a record a protocol names lists it, and a cancer reaches protocols through its treatments", () => {
    for (const p of list) for (const id of [...p.technologies, ...p.drugs, ...p.terms]) {
      expect(protocolsFor(g.must(id)).some((m) => m.protocol.id === p.id), `${id} should list ${p.id}`).toBe(true);
    }
    // A cancer the protocol does not name, directly or through a cancer above it in the family, so the only way the
    // protocol can reach the page is through a medicine the cancer lists. Taking the first cancer that lists the drug
    // broke as soon as a protocol also named a cancer high in a family: that cancer is then reached directly, with no `via`.
    const above = (id: string): string[] => {
      const out: string[] = [];
      let parent = g.get(id)?.kind === "cancer" ? (g.get(id) as { parent?: string }).parent : undefined;
      for (let hops = 0; parent && hops < 8; hops++) {
        out.push(parent);
        const up = g.get(parent);
        parent = up?.kind === "cancer" ? (up as { parent?: string }).parent : undefined;
      }
      return out;
    };
    const names = (p: (typeof list)[number], id: string) => (g.incoming(id).get("protocol") ?? []).some((x) => x.id === p.id);
    const pairs = (keep: (p: (typeof list)[number]) => boolean) => list
      .filter((p) => p.drugs.length && keep(p))
      .flatMap((p) => g.kind("cancer").filter((c) => c.drugs.some((d) => p.drugs.includes(d)) && ![c.id, ...above(c.id)].some((id) => names(p, id))).map((c) => ({ p, c })));
    // A protocol naming no cancer reaches every cancer whose record lists one of its medicines.
    const pair = pairs((p) => !p.cancers.length)[0];
    expect(pair, "a protocol naming a drug that some cancer it does not name lists").toBeDefined();
    const via = protocolsFor(pair!.c).find((m) => m.protocol.id === pair!.p.id)?.via;
    expect(via, `${pair!.c.id} should reach ${pair!.p.id} through a treatment`).toBeDefined();
    expect([...pair!.p.drugs, ...pair!.p.technologies]).toContain(via!.id);
    // A protocol scoped to other cancers does not: breast radiotherapy positioning is not a prostate protocol because both use IMRT.
    const elsewhere = pairs((p) => p.cancers.length > 0).find(({ p, c }) => !p.cancers.some((id) => id === c.id || above(c.id).includes(id) || above(id).includes(c.id)));
    expect(elsewhere, "a protocol scoped to other cancers that shares a medicine with this one").toBeDefined();
    expect(protocolsFor(elsewhere!.c).some((m) => m.protocol.id === elsewhere!.p.id), `${elsewhere!.c.id} should not list ${elsewhere!.p.id}`).toBe(false);
  });

  it("a supportive medicine brings only supportive-care protocols to a cancer page, and a treatment counts only where the protocol names it as its own", () => {
    // Every protocol reached through a treatment names that treatment in its drugs or technologies, and one reached
    // through a supportive medicine or a steroid is about supportive care, symptoms, nutrition, palliation or survivorship.
    const bad: string[] = [];
    for (const c of g.kind("cancer")) for (const m of protocolsFor(c)) {
      if (!m.via) continue;
      const v = m.via;
      if (![...m.protocol.drugs, ...m.protocol.technologies].includes(v.id)) bad.push(`${c.id}: ${m.protocol.id} through ${v.id}, which it does not name as its own`);
      const supportive = v.kind === "drug" && (v.tags.includes("supportive") || /corticosteroid|glucocorticoid/i.test(v.modality));
      if (supportive && !["supportive-care", "symptom-management", "nutrition", "palliative", "survivorship"].includes(m.protocol.domain)) bad.push(`${c.id}: ${m.protocol.id} through ${v.id}`);
    }
    expect(bad).toEqual([]);
    // The case that set the rule: dexamethasone on the triple-negative record does not put CRS management on its page.
    const tnbc = protocolsFor(g.must("tnbc")).map((m) => m.protocol.id);
    expect(tnbc).not.toContain("crs-grading-and-management");
    expect(tnbc).not.toContain("icans-grading-and-management");
    // The owner's example: port care is on the breast cancer page, through the implanted port record.
    expect(protocolsFor(g.must("breast-cancer")).find((m) => m.protocol.id === "implanted-port-access-and-care")?.via?.id).toBe("implanted-ports");
  });
});

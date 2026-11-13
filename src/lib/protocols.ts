import { PROTOCOL_DOMAINS, type ProtocolDomain } from "./kinds";
import type { Protocol } from "./schema";

/**
 * The rules a protocol record must keep that zod cannot express, shared by src/lib/protocols.test.ts and
 * scripts/check-protocol.ts so a fill agent and the gate apply the same ones. Each returned string names one problem.
 *
 * - Every cited key (a step's `source`, a variant's or the best-in-class block's `sources`, a grade row's
 *   `source`) is a key the record's own `sources` defines, and every source key is unique.
 * - A step cites a source or says in `practice` why none does. A quote or a grade without a source is unattributed.
 * - No step rests only on a source marked `not-reachable`: a source nobody could read cannot carry a step.
 * - The name is the protocol's subject, not a question (AGENTS.md: a question-shaped name competes with the Ask
 *   benchmark questions).
 */
export function protocolProblems(p: Protocol): string[] {
  const out: string[] = [];
  const keys = new Map(p.sources.map((s) => [s.key, s]));
  if (keys.size !== p.sources.length) out.push("sources: duplicate key");
  const cite = (where: string, key: string | undefined) => {
    if (key && !keys.has(key)) out.push(`${where}: cites "${key}", which is not in sources`);
  };
  p.steps.forEach((s, i) => {
    const where = `steps[${i}]`;
    if (!s.source && !s.practice) out.push(`${where}: no source and no practice note`);
    if (!s.source && (s.quote || s.grade)) out.push(`${where}: a quote or grade with no source`);
    cite(where, s.source);
    if (s.source && keys.get(s.source)?.read === "not-reachable") out.push(`${where}: rests on a source that could not be read`);
  });
  p.bestInClass.sources.forEach((k) => cite("bestInClass", k));
  p.variants.forEach((v, i) => v.sources.forEach((k) => cite(`variants[${i}]`, k)));
  p.grades.forEach((e, i) => cite(`grades[${i}]`, e.source));
  if (/\?\s*$/.test(p.name) || /^(how|what|when|why|which|who|should|can|do|does|is|are)\b/i.test(p.name)) out.push(`name "${p.name}" reads as a question; name the subject`);
  return out;
}

/** Protocols grouped by domain, in PROTOCOL_DOMAINS order, empty domains left out. */
export function byDomain<P extends { domain: ProtocolDomain; name: string }>(list: readonly P[]): Array<[ProtocolDomain, P[]]> {
  return PROTOCOL_DOMAINS.map((d) => [d, list.filter((p) => p.domain === d).sort((a, b) => a.name.localeCompare(b.name))] as [ProtocolDomain, P[]]).filter(([, l]) => l.length > 0);
}

/**
 * Duplicate-person finder: flags person records that are probably the same human under two ids.
 *   npx tsx scripts/people-duplicates.ts            print candidate pairs for hand review
 *   npx tsx scripts/people-duplicates.ts --json     machine-readable
 *
 * Two records are candidates when
 *   - their `orcid` values match, or
 *   - their normalised names match on surname + first initial (accents, punctuation, middle names, initials
 *     and suffixes such as Jr./III/MD stripped), in either word order (so "Zhou Caicun" meets "Caicun Zhou").
 * Every candidate is then reviewed by hand: same field and same institution (or a plausible career move)
 * before it is merged. The script only lists; merging is done by hand with whole-line edits of the record.
 */
import { graph } from "../src/lib/graph";

const SUFFIXES = new Set(["jr", "sr", "ii", "iii", "iv", "md", "phd", "frcp", "facp", "obe", "cbe", "kbe", "sir", "dame", "dr", "prof", "professor"]);

/** Lower-case, accent-free, punctuation-free word list without initials or honorific suffixes. */
export function nameWords(name: string): string[] {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’'`]/g, "")
    .replace(/[^a-zA-Z\s-]/g, " ")
    .toLowerCase()
    .split(/[\s-]+/)
    .filter((w) => w.length > 0 && !SUFFIXES.has(w));
}

/** Grouping keys: `forward` is surname + first initial; `reversed` is first word + last initial, so a
 *  surname-first spelling ("Zhou Caicun") meets a Western-order one ("Caicun Zhou"). Only forward-forward and
 *  forward-reversed matches count; reversed-reversed would pair every "Robert S." with every other. */
export function nameKeys(name: string): { forward: string[]; reversed: string[] } {
  const words = nameWords(name);
  const full = words.filter((w) => w.length > 1);
  if (full.length === 0) return { forward: [], reversed: [] };
  if (full.length === 1) return { forward: [full[0]], reversed: [] };
  const first = full[0];
  const last = full[full.length - 1];
  return { forward: [`${last}|${first[0]}`], reversed: [`${first}|${last[0]}`] };
}

type Person = Extract<ReturnType<typeof graph>["entities"][number], { kind: "person" }>;

export function candidatePairs() {
  const g = graph();
  const people = g.kind("person");
  // A record joins a group under its forward keys and its reversed keys, but two records that only share a
  // reversed key are dropped below (that would pair every "Robert S." with every other).
  const groups = new Map<string, Person[]>();
  const reversedOnly = new Map<string, Set<string>>();
  for (const p of people) {
    const fwd = new Set<string>();
    const rev = new Set<string>();
    for (const n of [p.name, ...p.aka]) {
      const k = nameKeys(n);
      k.forward.forEach((x) => fwd.add(x));
      k.reversed.forEach((x) => rev.add(x));
    }
    if (p.orcid) fwd.add(`orcid|${p.orcid.replace(/\s|https?:\/\/orcid\.org\//g, "")}`);
    // Same surname at the same institution, whatever the first name is written as ("H.M.W. Verheul" / "Henk Verheul").
    for (const n of [p.name, ...p.aka]) {
      const full = nameWords(n).filter((w) => w.length > 1);
      if (full.length) for (const inst of p.institutions) fwd.add(`${full[full.length - 1]}@${inst}`);
    }
    for (const k of fwd) groups.set(k, [...(groups.get(k) ?? []), p]);
    for (const k of rev) {
      if (fwd.has(k)) continue;
      groups.set(k, [...(groups.get(k) ?? []), p]);
      reversedOnly.set(k, new Set([...(reversedOnly.get(k) ?? []), p.id]));
    }
  }
  const pairs: Array<{ a: Person; b: Person; keys: string[] }> = [];
  for (const [k, list] of groups) {
    if (list.length < 2) continue;
    const revIds = reversedOnly.get(k) ?? new Set<string>();
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (revIds.has(list[i].id) && revIds.has(list[j].id)) continue;
        const [a, b] = [list[i], list[j]].sort((x, y) => x.id.localeCompare(y.id));
        const pk = `${a.id}|${b.id}`;
        const existing = pairs.find((p) => `${p.a.id}|${p.b.id}` === pk);
        if (existing) { existing.keys.push(k); continue; }
        pairs.push({ a, b, keys: [k] });
      }
    }
  }
  const inbound = (p: Person) => [...g.incoming(p.id).values()].reduce((n, l) => n + l.length, 0);
  const dois = (p: Person) => new Set(p.papers.map((x) => x.doi?.toLowerCase()).filter(Boolean));
  return pairs
    .map(({ a, b, keys }) => {
      const shared = [...dois(a)].filter((d) => dois(b).has(d));
      const sameInstitution = a.institutions.some((i) => b.institutions.includes(i)) || (a.institutionId !== undefined && a.institutionId === b.institutionId);
      const sharedTrials = a.trials.filter((t) => b.trials.includes(t));
      return {
        a: { id: a.id, name: a.name, role: a.role, institutions: a.institutions, specialisms: a.specialisms, inbound: inbound(a), orcid: a.orcid },
        b: { id: b.id, name: b.name, role: b.role, institutions: b.institutions, specialisms: b.specialisms, inbound: inbound(b), orcid: b.orcid },
        keys,
        signals: { sharedDois: shared.length, sharedTrials, sameInstitution, sameOrcid: Boolean(a.orcid && a.orcid === b.orcid), sameFullName: nameWords(a.name).filter((w) => w.length > 1).join(" ") === nameWords(b.name).filter((w) => w.length > 1).join(" ") },
      };
    })
    .sort((x, y) => Number(y.signals.sameOrcid) - Number(x.signals.sameOrcid) || y.signals.sharedDois - x.signals.sharedDois || Number(y.signals.sameInstitution) - Number(x.signals.sameInstitution));
}

/**
 * Second net: the OECI-representative wave added one person per member centre from a membership list, so a
 * representative often duplicates a director already on file under a differently spelled name. Lists every
 * representative beside the other people at the same institution, flagging shared name words (4+ letters).
 */
export function representativesBesideColleagues() {
  const g = graph();
  const people = g.kind("person");
  const out: Array<{ rep: string; repName: string; institution: string; colleague: string; colleagueName: string; sharedWords: string[] }> = [];
  for (const rep of people.filter((p) => p.tags.includes("oeci-representative"))) {
    const repWords = new Set(nameWords(rep.name).filter((w) => w.length >= 4));
    for (const inst of rep.institutions) {
      for (const other of people) {
        if (other.id === rep.id || !other.institutions.includes(inst)) continue;
        const shared = [other.name, ...other.aka].flatMap(nameWords).filter((w) => w.length >= 4 && repWords.has(w));
        out.push({ rep: rep.id, repName: rep.name, institution: inst, colleague: other.id, colleagueName: other.name, sharedWords: [...new Set(shared)] });
      }
    }
  }
  return out.sort((a, b) => b.sharedWords.length - a.sharedWords.length || a.rep.localeCompare(b.rep));
}

if (process.argv[1]?.endsWith("people-duplicates.ts") && process.argv.includes("--oeci")) {
  for (const r of representativesBesideColleagues()) console.log(`${r.sharedWords.length ? "SHARED " + r.sharedWords.join(",") : "-"}`.padEnd(24), r.rep.padEnd(34), r.institution.padEnd(28), r.colleague.padEnd(34), r.colleagueName);
} else if (process.argv[1]?.endsWith("people-duplicates.ts")) {
  const pairs = candidatePairs();
  if (process.argv.includes("--json")) console.log(JSON.stringify(pairs, null, 0));
  else {
    for (const p of pairs) {
      const flags = [p.signals.sameOrcid && "SAME-ORCID", p.signals.sharedDois && `${p.signals.sharedDois} shared DOI`, p.signals.sharedTrials.length && `shared trials ${p.signals.sharedTrials.join(",")}`, p.signals.sameInstitution && "same institution", p.signals.sameFullName && "same full name"].filter(Boolean);
      console.log(`\n${p.a.id}  <->  ${p.b.id}   [${p.keys.join(", ")}]  ${flags.join(" | ")}`);
      for (const r of [p.a, p.b]) console.log(`  ${r.id.padEnd(28)} ${r.name} | ${r.role.slice(0, 90)} | inst ${r.institutions.join(",") || "-"} | in ${r.inbound} | ${r.specialisms.slice(0, 3).join("; ")}`);
    }
    console.log(`\n${pairs.length} candidate pairs`);
  }
}

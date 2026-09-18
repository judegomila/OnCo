/**
 * Raises the "people-papers" health gauge from links already in the corpus (no network).
 * The gauge counts a person's own `papers` array, so every step adds entries there, built from key-paper records.
 *
 *   1. reciprocal: a paper record's `people` names the person, or the person's `keyPapers` names the paper,
 *      but the person's `papers` lacks it.
 *   2. author match: a paper's `authors` string carries the person's surname and first initial, the paper shares a
 *      cancer or trial with the person, the person has no papers yet and the surname is unique among people.
 *   3. trial lead: a trial links the person and has `keyPapers`; the person is first author of the paper or the trial
 *      summary names them as the lead.
 *
 * Run: npx tsx scripts/people-papers-links.ts            (report only)
 *      npx tsx scripts/people-papers-links.ts --apply    (edit person records in place)
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import type { Entity } from "../src/lib/schema";

type Person = Extract<Entity, { kind: "person" }>;
type Paper = Extract<Entity, { kind: "paper" }>;
type Trial = Extract<Entity, { kind: "trial" }>;
type Entry = { title: string; journal: string; year: number; doi?: string; url?: string };

const APPLY = process.argv.includes("--apply");
const ROOT = process.cwd();
const PERSON_FILES = [
  ...readdirSync(join(ROOT, "src/data/people")).filter((f) => f.endsWith(".ts") && f !== "index.ts").map((f) => join("src/data/people", f)),
  "src/data/people-investigators-wave.ts",
  "src/data/institution-networks-wave.ts",
];

const g = graph();
const people = g.kind("person");
const papers = g.kind("paper");
const trials = g.kind("trial");

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const surnameOf = (name: string) => {
  const parts = name.replace(/,.*$/, "").replace(/\b(Jr|Sr|II|III|MD|PhD|OBE|CBE|FRS)\.?$/g, "").trim().split(/\s+/);
  return parts[parts.length - 1].replace(/[^A-Za-z'-]/g, "");
};
const initialOf = (name: string) => name.trim()[0]?.toUpperCase() ?? "";

/** Does the person's own `papers` array already carry this paper (by DOI, then by title)? */
function has(person: Person, paper: Paper, extra: Entry[]): boolean {
  const all = [...person.papers, ...extra];
  const doi = paper.doi?.toLowerCase();
  const title = norm(paper.name);
  return all.some((e) => (doi && e.doi?.toLowerCase() === doi) || norm(e.title) === title);
}

function entry(paper: Paper): Entry {
  const e: Entry = { title: paper.name, journal: paper.journal, year: paper.year };
  if (paper.doi) { e.doi = paper.doi; e.url = `https://doi.org/${paper.doi}`; }
  else if (paper.links[0]?.url) e.url = paper.links[0].url;
  return e;
}

/** "Grossman HB, Natale RB, et al." -> [{ surname: "grossman", initials: "HB" }, ...] */
function authorsOf(paper: Paper) {
  return paper.authors.split(/,|;| and /).map((a) => a.trim()).filter((a) => a && !/^et al/i.test(a)).map((a) => {
    const parts = a.replace(/\.$/, "").split(/\s+/);
    if (parts.length < 2) return { surname: norm(a), initials: "" };
    const last = parts[parts.length - 1];
    const initialsLast = /^[A-Z][A-Za-z.-]*$/.test(last) && last.replace(/[.-]/g, "").length <= 3 && last === last.toUpperCase();
    return initialsLast ? { surname: norm(parts.slice(0, -1).join(" ")), initials: last.replace(/[.-]/g, "") } : { surname: norm(last), initials: parts[0][0]?.toUpperCase() ?? "" };
  });
}

const matchesAuthor = (person: Person, a: { surname: string; initials: string }) =>
  a.surname === norm(surnameOf(person.name)) && (a.initials === "" || a.initials[0] === initialOf(person.name));

const overlap = (a: string[], b: string[]) => a.some((x) => b.includes(x));

const gauge = () => { const n = people.filter((p) => p.papers.length > 0).length; return `${n}/${people.length} (${Math.round((n / people.length) * 1000) / 10}%)`; };

// ---------------------------------------------------------------- proposals
const proposed = new Map<string, Entry[]>(); // person id -> new entries
const stepCounts = { reciprocal: 0, author: 0, lead: 0 };
const add = (step: keyof typeof stepCounts, person: Person, paper: Paper, why: string) => {
  const list = proposed.get(person.id) ?? [];
  if (has(person, paper, list)) return;
  list.push(entry(paper));
  proposed.set(person.id, list);
  stepCounts[step]++;
  console.log(`  [${step}] ${person.id} <- ${paper.id}  (${why})`);
};

console.log(`Gauge before: ${gauge()}`);

console.log("\nStep 1: reciprocal links");
for (const paper of papers) for (const pid of paper.people) { const person = g.get(pid); if (person?.kind === "person") add("reciprocal", person, paper, "paper.people"); }
for (const person of people) for (const kp of person.keyPapers) { const paper = g.get(kp); if (paper?.kind === "paper") add("reciprocal", person, paper, "person.keyPapers"); }

console.log("\nStep 2: author-string matches (unique surname, shared cancer or trial, no papers yet)");
const surnameCount = new Map<string, number>();
for (const p of people) { const s = norm(surnameOf(p.name)); surnameCount.set(s, (surnameCount.get(s) ?? 0) + 1); }
const skippedAmbiguous: string[] = [];
for (const person of people) {
  if (person.papers.length > 0 || proposed.has(person.id)) continue;
  for (const paper of papers) {
    if (!(overlap(paper.cancers, person.cancers) || overlap(paper.trials, person.trials))) continue;
    const hit = authorsOf(paper).find((a) => matchesAuthor(person, a));
    if (!hit) continue;
    if ((surnameCount.get(norm(surnameOf(person.name))) ?? 0) !== 1) { skippedAmbiguous.push(`${person.id} ~ ${paper.id}`); continue; }
    add("author", person, paper, `authors "${paper.authors.slice(0, 40)}"`);
  }
}
if (skippedAmbiguous.length) console.log(`  skipped (surname not unique): ${skippedAmbiguous.join(", ")}`);

console.log("\nStep 3: trial leads");
const LEAD = /\b(led|lead|leads|leading|chaired|chair|chief investigator|principal investigator|steering committee chair|coordinating investigator|first author)\b/i;
const isLead = (person: Person, trial: Trial, paper: Paper) => {
  const first = authorsOf(paper)[0];
  if (first && matchesAuthor(person, first)) return "first author";
  const surname = surnameOf(person.name);
  const sentence = `${trial.summary ?? ""}\n${trial.tldr ?? ""}`.split(/(?<=[.!?])\s+/).find((s) => new RegExp(`\\b${surname}\\b`, "i").test(s) && LEAD.test(s));
  return sentence ? "trial summary" : null;
};
for (const trial of trials) {
  if (!trial.people.length || !trial.keyPapers.length) continue;
  for (const pid of trial.people) {
    const person = g.get(pid);
    if (person?.kind !== "person") continue;
    for (const kp of trial.keyPapers) {
      const paper = g.get(kp);
      if (paper?.kind !== "paper") continue;
      const why = isLead(person, trial, paper);
      if (why) add("lead", person, paper, `${trial.id}: ${why}`);
    }
  }
}

console.log(`\nLinks proposed: reciprocal ${stepCounts.reciprocal}, author ${stepCounts.author}, lead ${stepCounts.lead}; ${proposed.size} people touched`);
const gainers = [...proposed.keys()].filter((id) => (g.get(id) as Person).papers.length === 0).length;
const after = people.filter((p) => p.papers.length > 0).length + gainers;
console.log(`Gauge after (projected): ${after}/${people.length} (${Math.round((after / people.length) * 1000) / 10}%)`);

// ---------------------------------------------------------------- remainder by role
const remaining = people.filter((p) => p.papers.length === 0 && !proposed.has(p.id));
const roleBucket = (p: Person) => {
  const r = `${p.role} ${p.tags.join(" ")}`.toLowerCase();
  if (/\b(patient|survivor|hero|advocate|activist|campaigner|founder of .*(foundation|charity)|storyteller)\b/.test(r) && !/\b(professor|oncologist|scientist|researcher)\b/.test(r)) return "advocate/patient/hero";
  if (/\b(donor|philanthropist|benefactor)\b/.test(r)) return "donor";
  if (/\b(ceo|chief executive|president|chairman|chair of the board|executive|founder|managing director|minister|secretary|commissioner|head of|director[- ]general|entrepreneur|investor)\b/.test(r) && !/\b(professor|oncologist|scientist|researcher|investigator)\b/.test(r)) return "executive/leader";
  if (/\b(director|dean|chief|head|president|provost|vice-chancellor)\b/.test(r)) return "institution director (may publish)";
  return "researcher/clinician";
};
const buckets = new Map<string, Person[]>();
for (const p of remaining) { const b = roleBucket(p); buckets.set(b, [...(buckets.get(b) ?? []), p]); }
console.log(`\nPeople still without papers: ${remaining.length}`);
for (const [b, list] of [...buckets.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n  ${b}: ${list.length}`);
  for (const p of list) console.log(`    ${p.id} — ${p.role}`);
}

// ---------------------------------------------------------------- apply
if (!APPLY) { console.log("\n(dry run; pass --apply to edit records)"); process.exit(0); }

/** Scan source text skipping string literals; returns bracket depth changes per index. */
function scan(text: string, from: number, onToken: (ch: string, i: number, depth: number) => boolean | void) {
  let depth = 0; let i = from; let quote: string | null = null;
  while (i < text.length) {
    const ch = text[i];
    if (quote) { if (ch === "\\") { i += 2; continue; } if (ch === quote) quote = null; i++; continue; }
    if (ch === '"' || ch === "'" || ch === "`") { quote = ch; i++; continue; }
    if (ch === "/" && text[i + 1] === "/") { while (i < text.length && text[i] !== "\n") i++; continue; }
    if ("{[(".includes(ch)) depth++;
    if (onToken(ch, i, depth) === true) return i;
    if ("}])".includes(ch)) depth--;
    if (depth === 0 && "}])".includes(ch)) return i;
    i++;
  }
  return -1;
}

const fmt = (e: Entry) => `{ ${Object.entries(e).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(", ")} }`;

let edited = 0; const unplaced: string[] = [];
const sources = new Map(PERSON_FILES.map((f) => [f, readFileSync(join(ROOT, f), "utf8")]));
for (const [pid, entries] of proposed) {
  const file = PERSON_FILES.find((f) => new RegExp(`\\bid: "${pid}"`).test(sources.get(f)!));
  if (!file) { unplaced.push(pid); continue; }
  let text = sources.get(file)!;
  const idAt = text.search(new RegExp(`\\bid: "${pid}"`));
  // record start: the last "({" or "{" opening before the id on the same or a preceding line
  const start = text.lastIndexOf("{", idAt);
  // find record end (closing brace of the object) by depth
  let closeAt = -1;
  scan(text, start, (ch, i, depth) => { if (ch === "}" && depth === 1) { closeAt = i; return true; } });
  if (closeAt < 0) { unplaced.push(pid); continue; }
  const body = text.slice(start, closeAt);
  const papersAt = body.search(/\bpapers: \[/);
  if (papersAt >= 0) {
    const open = start + papersAt + "papers: ".length;
    let closeArr = -1;
    scan(text, open, (ch, i, depth) => { if (ch === "]" && depth === 1) { closeArr = i; return true; } });
    if (closeArr < 0) { unplaced.push(pid); continue; }
    const empty = text.slice(open + 1, closeArr).trim() === "";
    text = text.slice(0, closeArr) + (empty ? "" : ", ") + entries.map(fmt).join(", ") + text.slice(closeArr);
  } else {
    const lineStart = text.lastIndexOf("\n", closeAt) + 1;
    const ownLine = text.slice(lineStart, closeAt).trim() === "";
    if (ownLine) {
      // add a new line before the closing line; make sure the previous line ends with a comma
      const prevEnd = lineStart - 1; // the "\n"
      let k = prevEnd - 1; while (k >= 0 && /\s/.test(text[k])) k--;
      const needComma = text[k] !== "," && text[k] !== "{";
      const indent = text.slice(lineStart, closeAt).replace(/\S.*$/, "") || "    ";
      text = text.slice(0, k + 1) + (needComma ? "," : "") + text.slice(k + 1, prevEnd + 1) + `${indent}  papers: [${entries.map(fmt).join(", ")}],\n` + text.slice(prevEnd + 1);
    } else {
      let k = closeAt - 1; while (k >= 0 && /\s/.test(text[k])) k--;
      const needComma = text[k] !== "," && text[k] !== "{";
      text = text.slice(0, k + 1) + `${needComma ? "," : ""} papers: [${entries.map(fmt).join(", ")}]` + text.slice(k + 1);
    }
  }
  sources.set(file, text);
  edited++;
}
for (const [f, text] of sources) if (text !== readFileSync(join(ROOT, f), "utf8")) writeFileSync(join(ROOT, f), text);
console.log(`\nApplied to ${edited} person records${unplaced.length ? `; could not place: ${unplaced.join(", ")}` : ""}`);

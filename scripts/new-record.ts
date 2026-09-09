/**
 * Record scaffolder: write a schema-valid stub for a new object with every required field filled
 * with a placeholder and a TODO checklist in the header.
 *
 *   npm run new -- --kind drug --name "Sacituzumab tirumotecan"
 *   npx tsx scripts/new-record.ts --kind trial --name "TROPION-Lung12" --id tropion-lung12 --out src/data/drafts/tropion-lung12.ts
 *   npx tsx scripts/new-record.ts --kind person --name "A. Example" --stdout
 *
 * The stub is derived from the Zod schema itself: the script parses an empty record, reads which
 * fields are missing or malformed, fills them, and repeats until the schema accepts it, so it
 * cannot drift from src/lib/schema.ts. Placeholders start with "TODO" so they are easy to find and
 * so `npm run validate` still passes once the stub is wired in; replace every one before proposing
 * the record through the New object issue form.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import type { ZodType } from "zod";
import {
  BottleneckSchema, CancerSchema, CollectionSchema, CompanySchema, DrugSchema, EntitySchema, InstitutionSchema, IdeaSchema, JournalSchema,
  KINDS, PairingSchema, PaperSchema, PathwaySchema, PersonSchema, RoadmapSchema, SectionSchema, TargetSchema, TechnologySchema, TermSchema, TrialSchema,
  type Kind,
} from "../src/lib/schema";
import { ALL_INPUTS } from "../src/data";

const SCHEMAS: Record<Kind, ZodType> = {
  cancer: CancerSchema, section: SectionSchema, technology: TechnologySchema, target: TargetSchema, drug: DrugSchema, company: CompanySchema, institution: InstitutionSchema,
  pathway: PathwaySchema, term: TermSchema, trial: TrialSchema, pairing: PairingSchema, roadmap: RoadmapSchema, idea: IdeaSchema, collection: CollectionSchema,
  person: PersonSchema, bottleneck: BottleneckSchema, paper: PaperSchema, journal: JournalSchema,
};

const FILE_HINT: Record<Kind, string> = {
  cancer: "src/data/cancers.ts (and a spike under src/data/spikes/)", section: "src/data/sections.ts", technology: "src/data/technologies.ts", target: "src/data/targets.ts", drug: "src/data/drugs.ts",
  company: "src/data/companies.ts", institution: "src/data/institutions/*.ts", pathway: "src/data/pathways.ts", term: "src/data/terms.ts", trial: "src/data/trials.ts", pairing: "src/data/pairings.ts",
  roadmap: "src/data/roadmaps.ts", idea: "src/data/ideas.ts", collection: "src/data/collections.ts", person: "src/data/people/*.ts", bottleneck: "src/data/bottlenecks.ts", paper: "src/data/key-papers/*.ts", journal: "src/data/journals.ts",
};

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const flag = (name: string) => process.argv.includes(`--${name}`);

export const slug = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const today = () => new Date().toISOString().slice(0, 10);

type Issue = { code: string; path: PropertyKey[]; expected?: string; values?: unknown[]; format?: string; minimum?: number; maximum?: number; origin?: string; message: string };

function getAt(obj: Record<string, unknown>, path: PropertyKey[]): unknown {
  let cur: unknown = obj;
  for (const k of path) { if (cur === null || typeof cur !== "object") return undefined; cur = (cur as Record<string, unknown>)[String(k)]; }
  return cur;
}
function setAt(obj: Record<string, unknown>, path: PropertyKey[], value: unknown) {
  let cur: Record<string, unknown> = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const k = String(path[i]);
    if (cur[k] === null || typeof cur[k] !== "object") cur[k] = typeof path[i + 1] === "number" ? [] : {};
    cur = cur[k] as Record<string, unknown>;
  }
  cur[String(path[path.length - 1])] = value;
}

/** A placeholder for one schema issue, chosen from what the schema says it wanted. */
function placeholder(issue: Issue, key: string, ctx: { id: string; kind: Kind; name: string }): unknown {
  if (key === "id") return ctx.id;
  if (key === "kind") return ctx.kind;
  if (key === "name") return ctx.name;
  if (key === "asOf" || /date|On$/i.test(key)) return today();
  if (issue.code === "invalid_value" && issue.values?.length) return issue.values[0];
  // Length and range constraints: an exact-length string (ISO country code), a minimum count, a numeric bound.
  if (issue.code === "too_big" && typeof issue.maximum === "number") {
    if (issue.origin === "number" || issue.origin === "int") return issue.maximum;
    if (issue.origin === "array") return [];
    return key === "country" ? "XX" : "TODO".slice(0, issue.maximum).padEnd(Math.min(issue.maximum, 4), "X");
  }
  if (issue.code === "too_small" && typeof issue.minimum === "number") {
    if (issue.origin === "number" || issue.origin === "int") return issue.minimum;
    if (issue.origin === "array") return Array.from({ length: issue.minimum }, () => ({}));
    return "TODO".padEnd(issue.minimum, ".");
  }
  if (issue.code === "invalid_format" || issue.format) {
    if (issue.format === "url" || /url|website|wikipedia/i.test(key)) return "https://example.org/TODO-source";
    if (/^\d{4}/.test(String(issue.message)) || /YYYY/.test(issue.message)) return today();
    if (/kebab/.test(issue.message)) return slug(`todo-${key}`);
    return `TODO-${key}`;
  }
  switch (issue.expected) {
    case "string": return key === "tldr" ? `TODO: one or two plain-English sentences on ${ctx.name} for someone with no background.` : key === "summary" ? `TODO: technical summary of ${ctx.name} for a clinician or scientist. Paragraphs separated by blank lines.` : `TODO ${key}`;
    case "number": case "int": return 0;
    case "boolean": return false;
    case "array": return [];
    case "object": return {};
    case "tuple": return [0, 0];
    default: return `TODO ${key}`;
  }
}

/** Build the smallest record the kind's schema accepts, with TODO placeholders. */
export function scaffold(kind: Kind, name: string, id = slug(name)): { record: Record<string, unknown>; placeholders: string[] } {
  const schema = SCHEMAS[kind];
  const record: Record<string, unknown> = { id, kind, name };
  const placeholders = new Set<string>();
  for (let round = 0; round < 12; round++) {
    const r = schema.safeParse(record);
    if (r.success) break;
    let progressed = false;
    for (const raw of r.error.issues as unknown as Issue[]) {
      const path = raw.path.length ? raw.path : ["?"];
      const key = String(path[path.length - 1]);
      if (raw.code === "unrecognized_keys") continue;
      // Fill only what is missing or malformed; never overwrite a value the schema already accepted.
      const cur = getAt(record, path);
      const val = placeholder(raw, key, { id, kind, name });
      if (cur === val) continue;
      setAt(record, path, val);
      if (typeof val === "string" && val.startsWith("TODO") || (typeof val === "string" && val.includes("example.org"))) placeholders.add(path.join("."));
      else if (raw.code === "invalid_value") placeholders.add(`${path.join(".")} (chose "${String(val)}" from ${(raw.values ?? []).map(String).join(" | ")})`);
      progressed = true;
    }
    if (!progressed) break;
  }
  const final = EntitySchema.safeParse(record);
  if (!final.success) throw new Error(`could not build a valid ${kind} stub: ${final.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
  return { record, placeholders: [...placeholders].sort() };
}

/** TypeScript source for a stub file. */
export function render(kind: Kind, record: Record<string, unknown>, placeholders: string[]): string {
  const typeName = `${kind[0].toUpperCase()}${kind.slice(1)}Input`;
  const body = JSON.stringify(record, null, 2).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:");
  const checklist = [
    "Replace every TODO placeholder below (listed here so none is missed).",
    ...placeholders.map((p) => `  - ${p}`),
    "Cite it: at least one primary source in `links` (or `wikipedia`; trials also carry `nct`). Unknown beats guessed: drop a field rather than invent it.",
    "Link it: relationship arrays hold ids that already exist (`grep -rn 'id: \"<id>\"' src/data`). Declare each link once; the reverse is derived.",
    "Write `tldr` for someone with no background; `summary` for a clinician or scientist.",
    `Move the object into ${FILE_HINT[kind]} (delete this draft file) and run npm run validate && npm test.`,
    "Propose it through the New object issue form (https://onco.cc/suggest/); pull requests reference the triaged issue. Nothing is edited directly.",
  ];
  return `import type { ${typeName} } from "@/lib/schema";\n\n/**\n * Draft ${kind} record generated by scripts/new-record.ts on ${today()}. Schema-valid, not yet true.\n *\n * TODO checklist:\n${checklist.map((l) => ` * ${l}`).join("\n")}\n */\nexport const draft: ${typeName} = ${body};\n`;
}

const isMain = process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/new-record.ts");
if (isMain) {
  const kind = arg("kind") as Kind | undefined;
  const name = arg("name");
  if (!kind || !KINDS.includes(kind) || !name) {
    console.error(`usage: npm run new -- --kind <${KINDS.join("|")}> --name "<name>" [--id <kebab-id>] [--out <path>] [--stdout]`);
    process.exit(2);
  }
  const id = arg("id") ?? slug(name);
  const taken = new Set(ALL_INPUTS.map((e) => e.id));
  if (taken.has(id)) { console.error(`id "${id}" already exists in the corpus; pick another with --id`); process.exit(1); }
  const { record, placeholders } = scaffold(kind, name, id);
  const src = render(kind, record, placeholders);
  if (flag("stdout")) { process.stdout.write(src); }
  else {
    const out = arg("out") ?? join("src", "data", "drafts", `${id}.ts`);
    const abs = join(process.cwd(), out);
    if (existsSync(abs) && !flag("force")) { console.error(`${out} exists; use --force to overwrite or --out for another path`); process.exit(1); }
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, src);
    console.log(`wrote ${relative(process.cwd(), abs)} (${placeholders.length} placeholders to replace). Destination: ${FILE_HINT[kind]}`);
  }
}

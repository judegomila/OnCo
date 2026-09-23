/**
 * Build src/data/open-source.ts, the open-source oncology projects behind /open-source/.
 *
 * Reads the hand-curated list in scripts/open-source-curated.ts and, for each project, fetches the facts that change:
 *   - GitHub repositories: the repository record from the REST API (licence as declared, language, stars, created
 *     and last-push dates, description, archived flag) and the README (first DOI it names), through the
 *     authenticated `gh api` command so the rate limit is the account's, not the anonymous one.
 *   - Everything else (project sites, GitLab, CRAN, Bioconductor, Zenodo, Hugging Face): the page itself, checked
 *     to return 200 and to name the licence the curated entry claims; otherwise the licence is recorded "not stated".
 *
 * Every record carries `source`: the URL fetched, the status (always 200; anything else fails the record and lands
 * in the skipped list with the status) and the date. Responses are cached under /tmp/oss-cache so re-runs are free
 * and the live services see one request per project per day. Ids referenced in the curated list must exist in the
 * corpus; the run fails otherwise.
 *
 * Run: npx tsx scripts/fetch-open-source.ts          (needs `gh auth status` to pass)
 *      npx tsx scripts/fetch-open-source.ts --offline (cache only; a project with no cache is skipped with a note)
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { CURATED, SKIPPED } from "./open-source-curated";
import { OpenSourceProjectSchema, type OpenSourceProject } from "../src/lib/schema";
import { graph } from "../src/lib/graph";
import { DATA_SOURCES } from "../src/data/data-sources";

const CACHE = "/tmp/oss-cache";
const OUT = join(__dirname, "..", "src", "data", "open-source.ts");
const UA = "OnCo/1.0 (https://github.com/judegomila/OnCo; open-source projects page; contact via repository issues)";
const TODAY = new Date().toISOString().slice(0, 10);
const OFFLINE = process.argv.includes("--offline");
const DELAY_MS = 150;

mkdirSync(join(CACHE, "gh"), { recursive: true });
mkdirSync(join(CACHE, "readme"), { recursive: true });
mkdirSync(join(CACHE, "pages"), { recursive: true });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const slug = (s: string) => s.replace(/[^a-zA-Z0-9._-]+/g, "__");
const hash = (s: string) => createHash("sha1").update(s).digest("hex").slice(0, 16);

type Repo = {
  full_name: string; description: string | null; html_url: string; homepage: string | null;
  license: { spdx_id: string | null; name: string } | null; language: string | null; stargazers_count: number;
  created_at: string; pushed_at: string; archived: boolean; owner: { login: string };
};

/** `gh api` with a file cache; null on a non-2xx status (recorded by the caller). */
function ghApi(path: string, raw = false): { status: number; body: string } {
  const file = join(CACHE, raw ? "readme" : "gh", `${slug(path)}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  if (OFFLINE) return { status: 0, body: "" };
  let result: { status: number; body: string };
  try {
    const args = ["api", path, ...(raw ? ["-H", "Accept: application/vnd.github.raw+json"] : [])];
    const body = execFileSync("gh", args, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
    result = { status: 200, body };
  } catch (e) {
    const err = e as { stderr?: string; status?: number };
    const m = /HTTP (\d{3})/.exec(err.stderr ?? "");
    result = { status: m ? Number(m[1]) : 500, body: err.stderr ?? "" };
  }
  writeFileSync(file, JSON.stringify(result));
  return result;
}

async function fetchPage(url: string): Promise<{ status: number; body: string }> {
  const file = join(CACHE, "pages", `${hash(url)}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  if (OFFLINE) return { status: 0, body: "" };
  let result: { status: number; body: string };
  try {
    const r = await fetch(url, { headers: { "user-agent": UA, accept: "text/html,application/json;q=0.9,*/*;q=0.8" }, redirect: "follow" });
    result = { status: r.status, body: (await r.text()).slice(0, 2_000_000) };
  } catch (e) {
    result = { status: 0, body: String(e) };
  }
  writeFileSync(file, JSON.stringify(result));
  await sleep(1500);
  return result;
}

/** First DOI in a text that is not a Zenodo concept DOI, else the first DOI at all. */
function firstDoi(text: string): string | undefined {
  const all = [...text.matchAll(/\b(10\.\d{4,9}\/[^\s"'<>()\[\]{},;]+)/g)].map((m) => m[1].replace(/[.:]+$/, ""));
  if (!all.length) return undefined;
  return all.find((d) => !d.startsWith("10.5281/")) ?? all[0];
}

/** Does the page text name the licence the curated entry claims? */
const LICENCE_PATTERNS: Record<string, RegExp> = {
  "Apache-2.0": /apache/i,
  MIT: /\bMIT\b/,
  "GPL-2.0": /GPL/,
  "GPL-2.0-or-later": /GPL/,
  "GPL-3.0": /GPL/,
  "MPL-2.0": /Mozilla/i,
  "Artistic-2.0": /artistic/i,
  "CC0-1.0": /CC0|cc0-1\.0/i,
  "CC-BY-4.0": /CC[- ]BY(?![- ]NC)|Creative Commons Attribution(?! ?-?NonCommercial)|licenses\/by\/4\.0/i,
  "CC-BY-NC-ND-4.0": /BY-NC-ND|NonCommercial-NoDerivatives/i,
  "CC-BY-NC-SA-3.0": /BY-NC-SA|NonCommercial-ShareAlike/i,
  "CERN-OHL-S-2.0": /CERN Open Hardware Licence Version 2 - Strongly Reciprocal|CERN-OHL-S/i,
};

const LICENCE_LABEL: Record<string, string> = {};

function stripHtml(html: string): string {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
}

async function main() {
  if (!OFFLINE) {
    try { execFileSync("gh", ["auth", "status"], { stdio: "ignore" }); } catch { throw new Error("gh is not authenticated; run `gh auth login` or use --offline"); }
  }
  const g = graph();
  const dataSourceIds = new Set(DATA_SOURCES.map((s) => s.id));
  const problems: string[] = [];
  const skipped: Array<{ name: string; reason: string }> = [...SKIPPED];
  const seen = new Set<string>();
  const records: OpenSourceProject[] = [];

  for (const c of CURATED) {
    if (seen.has(c.id)) { problems.push(`${c.id}: duplicate id`); continue; }
    seen.add(c.id);
    if ((c.repo ? 1 : 0) + (c.url ? 1 : 0) !== 1) { problems.push(`${c.id}: exactly one of repo or url`); continue; }
    for (const [field, ids, kind] of [["cancers", c.cancers, "cancer"], ["targets", c.targets, "target"], ["technologies", c.technologies, "technology"], ["collections", c.collections, "collection"]] as const) {
      for (const id of ids ?? []) { const e = g.get(id); if (!e || e.kind !== kind) problems.push(`${c.id}: ${field} id "${id}" is not a ${kind} in the corpus`); }
    }
    for (const id of c.dataSources ?? []) if (!dataSourceIds.has(id)) problems.push(`${c.id}: dataSources id "${id}" is not in src/data/data-sources.ts`);
    if (c.url && c.licence && c.licence !== "not stated" && !c.licenceNote) problems.push(`${c.id}: page-fetched licence needs a licenceNote`);

    let maintainer = c.maintainer;
    let maintainerId: string | undefined;
    if (maintainer) {
      const e = g.get(maintainer);
      if (e && (e.kind === "institution" || e.kind === "company")) { maintainerId = e.id; maintainer = e.name; }
    }

    const base = { id: c.id, name: c.name, summary: c.summary, category: c.category, openness: c.openness, opennessNote: c.opennessNote, maintainer, maintainerId, cancers: c.cancers ?? [], targets: c.targets ?? [], technologies: c.technologies ?? [], dataSources: c.dataSources ?? [], collections: c.collections ?? [], oncology: c.oncology ?? true };

    if (c.repo) {
      const path = `repos/${c.repo}`;
      const res = ghApi(path);
      if (res.status !== 200) {
        skipped.push({ name: c.name, reason: res.status === 0 ? `No cached response for ${c.repo} (offline run).` : `GitHub API returned ${res.status} for ${c.repo} on ${TODAY}; not recorded.` });
        console.warn(`skip ${c.id}: ${res.status} ${c.repo}`);
        continue;
      }
      if (!existsSync(join(CACHE, "gh", `${slug(path)}.json`))) await sleep(DELAY_MS);
      const repo = JSON.parse(res.body) as Repo;
      const readme = ghApi(`${path}/readme`, true);
      const doi = readme.status === 200 ? firstDoi(readme.body) : undefined;
      let licence: string;
      let licenceNote = c.licenceNote;
      const spdx = repo.license?.spdx_id ?? null;
      if (spdx && spdx !== "NOASSERTION") licence = spdx;
      else if (spdx === "NOASSERTION") { licence = c.licence ?? "custom"; licenceNote = licenceNote ?? `The repository declares terms GitHub does not map to an SPDX id ("${repo.license?.name ?? "Other"}"); read its LICENSE file.`; }
      else { licence = c.licence ?? "none stated"; licenceNote = licenceNote ?? "The repository declares no licence file, so by default all rights are reserved."; }
      // Only https homepages are kept: the site does not link to plain http, and an upgraded URL would be one we did not read.
      const homepage = (repo.homepage && /^https:\/\//.test(repo.homepage.trim()) ? repo.homepage.trim() : c.homepage) ?? undefined;
      records.push(OpenSourceProjectSchema.parse({
        ...base,
        description: repo.description ?? undefined,
        licence, licenceNote,
        language: repo.language ?? undefined,
        repo: repo.html_url,
        homepage: homepage && homepage !== repo.html_url ? homepage : undefined,
        since: Number(repo.created_at.slice(0, 4)),
        lastCommit: repo.pushed_at.slice(0, 10),
        stars: repo.stargazers_count,
        doi,
        archived: repo.archived || undefined,
        source: { url: `https://api.github.com/${path}`, status: 200, fetched: TODAY },
      }));
    } else if (c.url) {
      const res = await fetchPage(c.url);
      if (res.status !== 200) {
        skipped.push({ name: c.name, reason: res.status === 0 ? `No cached response for ${c.url} (offline run or network error).` : `${c.url} returned ${res.status} on ${TODAY}; not recorded.` });
        console.warn(`skip ${c.id}: ${res.status} ${c.url}`);
        continue;
      }
      const text = stripHtml(res.body);
      let licence = c.licence ?? "not stated";
      let licenceNote = c.licenceNote;
      if (licence !== "not stated") {
        const pat = LICENCE_PATTERNS[licence];
        if (!pat) { problems.push(`${c.id}: no pattern to verify licence ${licence}`); }
        else if (!pat.test(text)) { licence = "not stated"; licenceNote = `The page fetched on ${TODAY} did not name the licence; check the project.`; console.warn(`licence not found on page for ${c.id} (${c.licence})`); }
      } else licenceNote = licenceNote ?? "The page does not state a licence; for public bodies the content may be public domain, but the page itself did not say so.";
      const title = /<title[^>]*>([^<]*)<\/title>/i.exec(res.body)?.[1]?.trim();
      records.push(OpenSourceProjectSchema.parse({
        ...base,
        description: title ? title.replace(/\s+/g, " ").slice(0, 200) : undefined,
        licence: LICENCE_LABEL[licence] ?? licence, licenceNote,
        homepage: c.homepage ?? c.url,
        doi: firstDoi(text),
        source: { url: c.url, status: 200, fetched: TODAY },
      }));
    }
  }

  if (problems.length) { console.error(problems.join("\n")); process.exit(1); }

  records.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
  const header = `/**
 * Open-source projects in oncology: what has been done in the open, one record per project, for /open-source/.
 * GENERATED by scripts/fetch-open-source.ts on ${TODAY} from the curated list in scripts/open-source-curated.ts and
 * the GitHub REST API (or the project page for projects that are not repositories). Do not edit by hand: change the
 * curated list and re-run. Every record's \`source\` is the URL fetched with status 200 on that day; \`licence\` is
 * the SPDX id the repository declares (or "custom", "none stated", "not stated" with a note); \`since\` is the year
 * the repository was created; \`lastCommit\` is its last push; \`doi\` is the first non-Zenodo DOI the README names.
 * \`summary\` is OnCo's plain-English gloss; \`description\` is the project's own line, verbatim.
 */
import type { OpenSourceProject } from "@/lib/schema";

export const OPEN_SOURCE_GENERATED = "${TODAY}";

/** Looked for and not recorded, with the reason: closed source, unverifiable, not oncology, or a fetch that failed. */
export const OPEN_SOURCE_SKIPPED: Array<{ name: string; reason: string }> = ${JSON.stringify(skipped, null, 2)};

export const openSourceProjects: OpenSourceProject[] = ${JSON.stringify(records, null, 2)};
`;
  writeFileSync(OUT, header);
  const byCat = new Map<string, number>();
  for (const r of records) byCat.set(r.category, (byCat.get(r.category) ?? 0) + 1);
  console.log(`wrote ${records.length} records, ${skipped.length} skipped`);
  for (const [k, n] of [...byCat].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${n}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

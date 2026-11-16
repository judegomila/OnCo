/**
 * scripts/ci/fetch-allowed.sh is the only network tool the model job of .github/workflows/fill-gaps.yml has. That job
 * holds the Anthropic API key and reads text gathered from outside pages, so this script is what stops a crafted page
 * from having the key, or anything else, sent somewhere. These tests hold it to that: it reads from listed hosts,
 * refuses every other host, refuses a redirect that leaves the list, and has no way to send a method, a body or a
 * header.
 *
 * No request leaves the machine. A stand-in `curl` is put first on PATH; it answers from a routes file and writes
 * down the arguments it was called with, so a test can also say that curl was never called at all.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const WRAPPER = join(__dirname, "fetch-allowed.sh");
const ALLOWLIST = join(__dirname, "fetch-allowlist.txt");
const WORKFLOW = join(__dirname, "..", "..", ".github", "workflows", "fill-gaps.yml");

let dir: string;
let bin: string;
let cwd: string;
let log: string;
let routes: string;

const FAKE_CURL = `#!/usr/bin/env bash
# Stand-in for curl. One line of arguments per call goes to $FAKE_CURL_LOG. The reply comes from $FAKE_CURL_ROUTES:
# lines of "<url> <status> [<location>]". An unknown URL answers 200.
printf '%s\\n' "$*" >> "$FAKE_CURL_LOG"
headers=""; output=""; url=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --dump-header) headers="$2"; shift 2 ;;
    --output) output="$2"; shift 2 ;;
    --) url="$2"; shift 2 ;;
    *) shift ;;
  esac
done
status=200; location=""
while read -r u s l; do
  if [ "$u" = "$url" ]; then status="$s"; location="$l"; fi
done < "$FAKE_CURL_ROUTES"
{
  printf 'HTTP/2 %s\\r\\n' "$status"
  [ -z "$location" ] || printf 'Location: %s\\r\\n' "$location"
  printf '\\r\\n'
} > "$headers"
printf 'body of %s' "$url" > "$output"
printf '%s' "$status"
`;

function run(args: string[], route: string[] = []) {
  writeFileSync(routes, route.map((r) => r + "\n").join(""));
  const r = spawnSync("bash", [WRAPPER, ...args], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, FAKE_CURL_LOG: log, FAKE_CURL_ROUTES: routes, TMPDIR: dir },
  });
  const calls = existsSync(log) ? readFileSync(log, "utf8").split("\n").filter(Boolean) : [];
  return { status: r.status, stdout: r.stdout, stderr: r.stderr, calls };
}

beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), "fetch-allowed-test-"));
  bin = join(dir, "bin");
  cwd = join(dir, "cwd");
  mkdirSync(bin);
  mkdirSync(cwd);
  writeFileSync(join(bin, "curl"), FAKE_CURL);
  chmodSync(join(bin, "curl"), 0o755);
  log = join(dir, "curl.log");
  routes = join(dir, "routes.txt");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
beforeEach(() => rmSync(log, { force: true }));

describe("fetch-allowed.sh reads from hosts on the allow-list", () => {
  it.each([
    ["a listed host", "https://clinicaltrials.gov/api/v2/studies/NCT00000000"],
    ["a subdomain of a listed host", "https://www.accessdata.fda.gov/scripts/opdlisting/oopd/"],
    ["a host listed in full", "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=x&format=json"],
    ["a host written in capitals", "https://API.Crossref.org/works/10.1000/example"],
    ["the default port written out", "https://www.nice.org.uk:443/guidance/ta1"],
  ])("reads %s", (_name, url) => {
    const r = run([url]);
    expect(r.status, r.stderr).toBe(0);
    expect(r.stdout).toBe(`body of ${url}`);
    expect(r.calls).toHaveLength(1);
  });

  it("follows a redirect to another listed host, checking each hop itself", () => {
    const r = run(["https://fda.gov/drugs"], [
      "https://fda.gov/drugs 301 https://www.fda.gov/drugs",
      "https://www.fda.gov/drugs 302 /drugs/index",
    ]);
    expect(r.status, r.stderr).toBe(0);
    expect(r.stdout).toBe("body of https://www.fda.gov/drugs/index");
    expect(r.calls).toHaveLength(3);
  });

  it("reports a server error without calling it a success", () => {
    const r = run(["https://www.cancer.gov/missing"], ["https://www.cancer.gov/missing 404"]);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("HTTP 404");
  });

  it("saves to a named file under .fill-gaps/fetched when asked", () => {
    const r = run(["--out", "study.json", "https://clinicaltrials.gov/api/v2/studies/NCT00000000"]);
    expect(r.status, r.stderr).toBe(0);
    expect(r.stdout).toBe("");
    expect(readFileSync(join(cwd, ".fill-gaps", "fetched", "study.json"), "utf8")).toContain("body of https://clinicaltrials.gov");
  });
});

describe("fetch-allowed.sh refuses every other host, before any request is made", () => {
  it.each([
    ["a host that is not listed", "https://example.com/"],
    ["a host that only ends like a listed one", "https://notfda.gov/"],
    ["a listed host used as a prefix", "https://fda.gov.example.com/"],
    ["a listed host used as a user name", "https://fda.gov@example.com/"],
    ["a listed host after a fragment", "https://example.com/#@fda.gov"],
    ["a listed host after a backslash", "https://example.com\\@fda.gov/"],
    ["a percent-encoded host", "https://fda.gov%2eexample.com/"],
    ["a sibling of a host listed in full", "https://evil.ebi.ac.uk.example.com/"],
    ["a parent of a host listed in full", "https://ncbi.nlm.nih.gov/"],
    ["an IP address", "https://127.0.0.1/"],
    ["plain http", "http://www.fda.gov/"],
    ["another scheme", "file:///etc/passwd"],
    ["another port", "https://www.fda.gov:8443/"],
    ["a URL with a space in it", "https://www.fda.gov/ https://example.com/"],
    ["an empty host", "https:///etc/passwd"],
  ])("refuses %s", (_name, url) => {
    const r = run([url]);
    expect(r.status, r.stdout).toBe(2);
    expect(r.stderr).toContain("refused");
    expect(r.stdout).toBe("");
    expect(r.calls).toEqual([]);
  });

  it.each([
    ["another host", "https://example.com/collect"],
    ["plain http on a listed host", "http://www.fda.gov/drugs"],
    ["a lookalike host, written without a scheme", "//fda.gov.example.com/x"],
    ["a relative address", "collect"],
  ])("refuses a redirect from a listed host to %s, and never requests it", (_name, location) => {
    const r = run(["https://www.fda.gov/go"], [`https://www.fda.gov/go 302 ${location}`]);
    expect(r.status, r.stdout).toBe(2);
    expect(r.stderr).toContain("refused");
    expect(r.stdout).toBe("");
    expect(r.calls).toHaveLength(1);
    expect(r.calls[0]).toContain("-- https://www.fda.gov/go");
  });

  it("stops after five redirects", () => {
    const r = run(["https://www.fda.gov/loop"], ["https://www.fda.gov/loop 302 /loop"]);
    expect(r.status).toBe(2);
    expect(r.calls).toHaveLength(6);
  });
});

describe("fetch-allowed.sh cannot send anything", () => {
  const url = "https://clinicaltrials.gov/api/v2/studies";
  it.each([
    ["a POST with -X", ["-X", "POST", url]],
    ["a POST with --request", ["--request", "POST", url]],
    ["a method after the URL", [url, "-X", "POST"]],
    ["a PUT", ["-X", "PUT", url]],
    ["a body with -d", ["-d", "key=value", url]],
    ["a body after the URL", [url, "--data", "key=value"]],
    ["a body read from a file", ["--data-binary", "@/proc/self/environ", url]],
    ["a JSON body", ["--json", "{}", url]],
    ["a form upload", ["-F", "file=@/etc/passwd", url]],
    ["an upload", ["-T", "/etc/passwd", url]],
    ["a header", ["-H", "X-Key: value", url]],
    ["a header after the URL", [url, "-H", "X-Key: value"]],
    ["a user agent", ["-A", "value", url]],
    ["a cookie", ["-b", "key=value", url]],
    ["credentials", ["-u", "user:password", url]],
    ["a proxy", ["-x", "https://example.com", url]],
    ["a config file", ["-K", "/tmp/curlrc", url]],
    ["a second URL", [url, "https://example.com/"]],
    ["an option glued to --text", ["--text", "-d", url]],
    ["no URL at all", []],
  ])("refuses %s", (_name, args) => {
    const r = run(args as string[]);
    expect(r.status, r.stdout).toBe(2);
    expect(r.stderr).toContain("refused");
    expect(r.calls).toEqual([]);
  });

  it.each([["../../scripts/ci/fetch-allowlist.txt"], [".gitconfig"], ["a/b"], [""]])("refuses the --out name %j", (name) => {
    const r = run(["--out", name, url]);
    expect(r.status).toBe(2);
    expect(r.calls).toEqual([]);
  });

  it("calls curl with GET, no redirects of its own, no curlrc, and nothing that carries a body or a header", () => {
    const r = run([url]);
    expect(r.status, r.stderr).toBe(0);
    const words = r.calls[0].split(" ");
    expect(words[0]).toBe("-q");
    expect(r.calls[0]).toContain("--request GET");
    expect(r.calls[0]).toContain("--max-redirs 0");
    expect(r.calls[0]).toContain("--proto =https");
    expect(r.calls[0]).toContain("--globoff");
    for (const flag of ["-L", "--location", "--location-trusted", "-d", "--data", "--data-binary", "--data-raw", "--data-urlencode",
      "--json", "-F", "--form", "-T", "--upload-file", "-H", "--header", "-A", "--user-agent", "-e", "--referer", "-b", "--cookie",
      "-u", "--user", "-x", "--proxy", "-K", "--config", "--next", "-X"]) {
      expect(words, flag).not.toContain(flag);
    }
    expect(words.at(-2)).toBe("--");
    expect(words.at(-1)).toBe(url);
  });

  it("has no environment variable that widens the list", () => {
    const script = readFileSync(WRAPPER, "utf8");
    const read = [...script.matchAll(/\$\{?([A-Z][A-Z0-9_]*)/g)].map((m) => m[1]);
    expect([...new Set(read)].sort()).toEqual(["BASH_SOURCE", "MAX_BYTES", "MAX_REDIRECTS", "MAX_SECONDS", "MAX_URL_LENGTH", "TMPDIR"]);
  });
});

describe("the allow-list and the workflow that uses it", () => {
  const entries = readFileSync(ALLOWLIST, "utf8").split("\n").map((l) => l.replace(/#.*/, "").trim()).filter(Boolean);

  it("lists plain host names only, with no wildcard, scheme, path or port", () => {
    for (const e of entries) expect(e, e).toMatch(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/);
    expect(new Set(entries).size).toBe(entries.length);
  });

  it("holds the regulators, registries and societies the gap fill reads", () => {
    for (const h of ["fda.gov", "ema.europa.eu", "nice.org.uk", "who.int", "iarc.who.int", "cancer.gov", "cdc.gov", "dailymed.nlm.nih.gov",
      "pubmed.ncbi.nlm.nih.gov", "pmc.ncbi.nlm.nih.gov", "eutils.ncbi.nlm.nih.gov", "api.crossref.org", "www.ebi.ac.uk", "clinicaltrials.gov",
      "api.openalex.org", "esmo.org", "asco.org", "mascc.org", "nccn.org", "iaea.org"]) expect(entries).toContain(h);
  });

  it("lists no host that would carry the key or the repository token onward", () => {
    for (const e of entries) expect(e, e).not.toMatch(/(^|\.)(anthropic\.com|github\.com|githubusercontent\.com|google\.com|bing\.com|pastebin\.com|webhook\.site)$/);
  });

  // The workflow is the other half of the restriction: the script only helps if it is the one command the model has.
  const workflow = readFileSync(WORKFLOW, "utf8");
  const allowed = /--allowedTools "([^"]*)"/.exec(workflow)?.[1].split(",") ?? [];
  const jobs = workflow.split(/\n(?= {2}[a-z-]+:\n {4}(?:name|needs|if|runs-on):)/);
  const job = (name: string) => jobs.find((j) => j.startsWith(`  ${name}:`)) ?? "";

  it("gives the model one Bash command, the installed copy of the fetch script", () => {
    expect(allowed.length).toBeGreaterThan(0);
    expect(allowed.filter((t) => t.startsWith("Bash"))).toEqual(["Bash(/opt/onco-fetch/fetch-allowed.sh:*)"]);
    for (const t of allowed) expect(t, t).toMatch(/^(Read|Glob|Grep|Edit\(.+\)|Write\(.+\)|Bash\(\/opt\/onco-fetch\/fetch-allowed\.sh:\*\))$/);
    // Comments may name the flag; no line of arguments may pass it.
    expect(workflow).not.toMatch(/^\s*--permission-mode|^\s*--dangerously|bypassPermissions/m);
  });

  it("uses the API key in the model job only, and runs no gate there", () => {
    expect(job("fill")).toContain("secrets.ANTHROPIC_API_KEY");
    expect(job("fill")).not.toMatch(/npm run (validate|typecheck|lint)|vitest|\.github\/actions\/gates/);
    for (const name of ["check", "propose"]) {
      expect(job(name), name).not.toBe("");
      expect(job(name), name).not.toMatch(/ANTHROPIC|secrets\./);
    }
    expect(job("check")).toContain("./.github/actions/gates");
    expect(job("check")).not.toMatch(/contents: write|pull-requests: write/);
    expect(job("propose")).not.toMatch(/npm |npx |\.github\/actions\/gates/);
  });

  it("pins every action it uses to a commit", () => {
    const uses = [...workflow.matchAll(/^\s*-?\s*uses: (\S+)/gm)].map((m) => m[1]).filter((u) => !u.startsWith("./"));
    expect(uses.length).toBeGreaterThan(5);
    for (const u of uses) expect(u, u).toMatch(/@[0-9a-f]{40}$/);
  });
});

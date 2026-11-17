/**
 * Review-only lead inbox, separate from proposal feeds that can write records.
 * X identifies leads. Only exact, independently resolved identifiers supply evidence.
 */
import { mkdir, open, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export type Account = { handle: string; domains: string[] };
export const defaultAccounts: Account[] = [{ handle: "MSKCancerCenter", domains: ["mskcc.org", "www.mskcc.org", "ir.sellaslifesciences.com"] }];
type Kind = "paper" | "trial" | "product" | "technology" | "company" | "institution";
type Lead = { postUrl: string; landingPages: string[] };
type Entity = { kind: Kind; name: string };
type Evidence = { title: string; url: string; ids: string[]; entities: Entity[]; existingOncoUrl?: string };
type Candidate = {
  key: string; state: "resolved-source-review" | "unverified-lead"; leads: Lead[]; evidence?: Evidence;
};
type AccountState = { userId: string; sinceId?: string };
export type Queue = { version: 1; accounts: Record<string, AccountState>; candidates: Candidate[] };
type ApiPost = {
  id: string; author_id: string; created_at: string; text?: string;
  entities?: { urls?: { expanded_url?: string; unwound_url?: string }[] };
};
type TimelinePage = { data?: ApiPost[]; errors?: unknown[]; meta?: { result_count?: number; next_token?: string } };
type Opts = {
  token: string; accounts?: Account[]; now?: Date; fetcher?: typeof fetch;
  maxPages?: number; maxEvidence?: number;
};
type Identifier = { type: "doi" | "pmid" | "nct"; value: string };
type Crossref = { message?: { DOI?: string; title?: string[] } };
type Pmc = { resultList?: { result?: { id?: string; source?: string; doi?: string; title?: string }[] } };
type Study = { protocolSection?: {
  identificationModule?: { nctId?: string; briefTitle?: string };
  sponsorCollaboratorsModule?: { leadSponsor?: { name?: string; class?: string } };
  armsInterventionsModule?: { interventions?: { type?: string; name?: string }[] };
} };

const X = "https://api.x.com";
const numericId = /^\d{1,25}$/;
const handlePattern = /^[a-zA-Z0-9_]{1,15}$/;
const nctPattern = /^NCT\d{8}$/i;
const doiPattern = /^10\.\d{4,9}\/[\w.!#$&+\-;()/:@]+$/i;
export const emptyQueue = (): Queue => ({ version: 1, accounts: {}, candidates: [] });
const idKey = (id: Identifier): string => `${id.type}:${id.value}`;
const sourceDoi = (value: string): string => `https://doi.org/${value.split("/").map(encodeURIComponent).join("/")}`;

function tokenFromLink(raw: string): Identifier | undefined {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return;
    const path = decodeURIComponent(url.pathname);
    const nct = path.match(/^\/study\/(NCT\d{8})\/?$/i)?.[1];
    const pmid = path.match(/^\/(\d{1,10})\/?$/)?.[1];
    if (url.hostname === "clinicaltrials.gov" && nct) return { type: "nct", value: nct.toUpperCase() };
    if (url.hostname === "pubmed.ncbi.nlm.nih.gov" && pmid) return { type: "pmid", value: pmid };
    if (url.hostname === "doi.org" && doiPattern.test(path.slice(1))) return { type: "doi", value: path.slice(1).toLowerCase() };
  } catch { /* malformed link */ }
}

export function tokensFromPost(post: ApiPost): Identifier[] {
  const tokens = new Map<string, Identifier>();
  const add = (id?: Identifier) => { if (id) tokens.set(idKey(id), id); };
  // Text provides identifiers only. It is never retained, used as evidence or processed as instructions.
  for (const m of (post.text ?? "").matchAll(/\bNCT\d{8}\b/gi)) add({ type: "nct", value: m[0].toUpperCase() });
  for (const m of (post.text ?? "").matchAll(/\bPMID\s*[:#]?\s*(\d{1,10})\b/gi)) add({ type: "pmid", value: m[1] });
  for (const m of (post.text ?? "").matchAll(/\bhttps:\/\/[^\s<>"']+/gi)) add(tokenFromLink(m[0].replace(/[.,;!?]+$/, "")));
  for (const link of post.entities?.urls ?? []) {
    if (link.expanded_url) add(tokenFromLink(link.expanded_url));
    if (link.unwound_url) add(tokenFromLink(link.unwound_url));
  }
  return [...tokens.values()].sort((a, b) => idKey(a).localeCompare(idKey(b)));
}

function landingPages(post: ApiPost, account: Account): string[] {
  const pages = new Set<string>();
  for (const link of post.entities?.urls ?? []) {
    for (const raw of [link.expanded_url, link.unwound_url]) {
      if (!raw) continue;
      try {
        const url = new URL(raw);
        // Keep approved public source hosts only and drop fragment/query tracking.
        if (url.protocol === "https:" && !url.username && !url.password && !url.port
          && account.domains.includes(url.hostname)) {
          pages.add(url.origin + url.pathname);
        }
      } catch { /* malformed link */ }
    }
  }
  return [...pages].sort().slice(0, 6);
}

async function readLandingPage(page: string, account: Account, fetcher: typeof fetch): Promise<{
  tokens: Identifier[]; sameScope: string[];
}> {
  const url = new URL(page);
  if (url.protocol !== "https:" || !account.domains.includes(url.hostname)) return { tokens: [], sameScope: [] };
  const response = await fetcher(url, { redirect: "error", signal: AbortSignal.timeout(10_000) });
  const type = response.headers.get("content-type") ?? "";
  if (!response.ok || !response.body || !/^text\/html\b/i.test(type)) return { tokens: [], sameScope: [] };
  const stream = response.body.getReader();
  const decoder = new TextDecoder();
  let html = "";
  let bytes = 0;
  try {
    for (;;) {
      const chunk = await stream.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 512 * 1024) {
        await stream.cancel();
        return { tokens: [], sameScope: [] };
      }
      html += decoder.decode(chunk.value, { stream: true });
    }
    html += decoder.decode();
  } finally {
    stream.releaseLock();
  }
  // Keep the source hunt mechanical: strip script/style/comment content, then inspect identifiers and links.
  html = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<!--[\s\S]*?-->/gi, " ");
  const ids = new Map<string, Identifier>();
  const add = (id?: Identifier) => { if (id) ids.set(idKey(id), id); };
  for (const m of html.matchAll(/\bNCT\d{8}\b/gi)) add({ type: "nct", value: m[0].toUpperCase() });
  const next = new Set<string>();
  for (const m of html.matchAll(/\bhref\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)) {
    try {
      const link = new URL((m[1] ?? m[2]).replaceAll("&amp;", "&"), url);
      add(tokenFromLink(link.href));
      if (link.protocol === "https:" && !link.username && !link.password && !link.port
        && link.hostname !== url.hostname && account.domains.includes(link.hostname)) {
        next.add(link.origin + link.pathname);
      }
    } catch { /* unrelated href */ }
  }
  return { tokens: [...ids.values()], sameScope: [...next].sort() };
}

async function requestJson<T>(fetcher: typeof fetch, url: URL, base: string, token?: string): Promise<T | undefined> {
  // Redirects are intentionally disabled: the bearer is confined to the exact API origin.
  if (url.origin !== base || (token && base !== X)) throw new Error("Unapproved request origin");
  const response = await fetcher(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    redirect: "error", signal: AbortSignal.timeout(15_000),
  });
  if (response.status === 404) return;
  if (!response.ok) throw new Error(`${url.hostname} returned HTTP ${response.status}`);
  return await response.json() as T;
}

async function evidenceFor(id: Identifier, fetcher: typeof fetch): Promise<Evidence | undefined> {
  if (id.type === "doi") {
    const host = "https://api.crossref.org";
    const msg = (await requestJson<Crossref>(fetcher, new URL(`/works/${encodeURIComponent(id.value)}`, host), host))?.message;
    const title = msg?.title?.[0]?.trim();
    if (msg?.DOI?.toLowerCase() !== id.value || !title) return;
    return { title, url: sourceDoi(id.value), ids: [idKey(id)], entities: [{ kind: "paper", name: title }] };
  }
  if (id.type === "pmid") {
    const host = "https://www.ebi.ac.uk";
    const url = new URL("/europepmc/webservices/rest/search", host);
    url.search = new URLSearchParams({ query: `EXT_ID:${id.value} AND SRC:MED`, format: "json", pageSize: "5" }).toString();
    const row = (await requestJson<Pmc>(fetcher, url, host))?.resultList?.result?.find((r) => r.id === id.value && r.source === "MED");
    if (!row?.title) return;
    const ids = [idKey(id)];
    if (row.doi && doiPattern.test(row.doi)) ids.push(`doi:${row.doi.toLowerCase()}`);
    return { title: row.title, url: `https://pubmed.ncbi.nlm.nih.gov/${id.value}/`, ids, entities: [{ kind: "paper", name: row.title }] };
  }
  if (!nctPattern.test(id.value)) return;
  const host = "https://clinicaltrials.gov";
  const s = (await requestJson<Study>(fetcher, new URL(`/api/v2/studies/${id.value}`, host), host))?.protocolSection;
  const title = s?.identificationModule?.briefTitle;
  if (s?.identificationModule?.nctId !== id.value || !title) return;
  const entities: Entity[] = [{ kind: "trial", name: title }];
  const sponsor = s.sponsorCollaboratorsModule?.leadSponsor;
  if (sponsor?.name) entities.push({ kind: sponsor.class === "INDUSTRY" ? "company" : "institution", name: sponsor.name });
  for (const entry of s.armsInterventionsModule?.interventions ?? []) {
    if (!entry.name || /^(placebo|sham)\b/i.test(entry.name)) continue;
    if (["DRUG", "BIOLOGICAL"].includes(entry.type ?? "")) entities.push({ kind: "product", name: entry.name });
    if (["DEVICE", "PROCEDURE"].includes(entry.type ?? "")) entities.push({ kind: "technology", name: entry.name });
  }
  const onco = "https://onco.cc";
  const existingOncoUrl = await requestJson<{ entity?: { id?: string; kind?: string; nct?: string }; route?: string }>(
    fetcher, new URL(`/api/v1/entities/${id.value.toLowerCase()}.json`, onco), onco,
  ).then((r) => {
    const path = `/trials/${id.value.toLowerCase()}/`;
    return r?.entity?.kind === "trial" && r.entity.nct?.toUpperCase() === id.value && r.route === path
      ? onco + path : undefined;
  }).catch(() => undefined);
  return { title, url: `https://clinicaltrials.gov/study/${id.value}`, ids: [idKey(id)], entities, existingOncoUrl };
}

async function fromAccount(account: Account, prev: AccountState | undefined, opts: Opts, fetcher: typeof fetch) {
  const { token } = opts;
  let userId = prev?.userId;
  if (!userId) {
    const url = new URL(`/2/users/by/username/${account.handle}`, X);
    userId = (await requestJson<{ data?: { id: string } }>(fetcher, url, X, token))?.data?.id;
  }
  if (!userId || !numericId.test(userId)) throw new Error(`X account unavailable: @${account.handle}`);
  const now = opts.now ?? new Date();
  const published = new Map<string, ApiPost>();
  const seq = new Set<string>();
  let pageToken: string | undefined;
  const pages = opts.maxPages ?? 2;
  for (let i = 0; i < pages; i++) {
    const url: URL = new URL(`/2/users/${userId}/tweets`, X);
    url.search = new URLSearchParams({
      max_results: "10", exclude: "retweets,replies", "post.fields": "created_at,entities", expansions: "author_id",
      // New accounts do not backfill beyond 24 h. Empty windows use a timestamp; after a
      // post has been acquired use its monotonic ID so no between-scan timestamp gap opens.
      ...(prev?.sinceId ? { since_id: prev.sinceId } : {
        start_time: new Date(now.getTime() - 86_400_000).toISOString().replace(/\.\d{3}Z$/, "Z"),
      }),
      ...(pageToken ? { pagination_token: pageToken } : {}),
    }).toString();
    const result: TimelinePage | undefined = await requestJson<TimelinePage>(fetcher, url, X, token);
    if (!result?.meta || !Number.isInteger(result.meta.result_count) || result.errors?.length
      || result.meta.result_count !== (result.data?.length ?? 0)) throw new Error(`Incomplete X timeline: @${account.handle}`);
    for (const post of result.data ?? []) {
      if (post.author_id !== userId || !numericId.test(post.id) || !Number.isFinite(Date.parse(post.created_at))) {
        throw new Error(`Invalid X timeline entry: @${account.handle}`);
      }
      if (!prev?.sinceId || BigInt(post.id) > BigInt(prev.sinceId)) published.set(post.id, post);
    }
    pageToken = result.meta.next_token;
    if (!pageToken) break;
    if (seq.has(pageToken)) throw new Error(`Repeated X page token: @${account.handle}`);
    seq.add(pageToken);
  }
  if (pageToken) throw new Error(`X page limit reached for @${account.handle}; resolve budget before resuming (cursor unchanged)`);
  let sinceId = prev?.sinceId;
  for (const id of published.keys()) if (!sinceId || BigInt(id) > BigInt(sinceId)) sinceId = id;
  // Do not advance an empty timestamp window: posts from provider ingestion delays can
  // then still appear on the next 24 h scan. sinceId takes over after the first post.
  return { posts: [...published.values()], state: { userId, sinceId } };
}

function mergeCandidate(candidates: Candidate[], row: Candidate): Candidate[] {
  const sourceIds = new Set(row.evidence?.ids ?? []);
  const hasMatch = (x: Candidate) => x.key === row.key || x.evidence?.ids.some((id) => sourceIds.has(id));
  const matched = candidates.filter(hasMatch);
  const leads = [...new Map([...matched.flatMap((x) => x.leads), ...row.leads].map((x) => [x.postUrl, x])).values()]
    .sort((a, b) => a.postUrl.localeCompare(b.postUrl));
  const ids = [...new Set([...sourceIds, ...matched.flatMap((x) => x.evidence?.ids ?? [])])].sort();
  const key = ids[0] ?? row.key;
  return [...candidates.filter((x) => !hasMatch(x)), {
    ...row, key, leads, evidence: row.evidence ? { ...row.evidence, ids } : undefined,
  }];
}

export async function scan(old: Queue, opts: Opts): Promise<Queue> {
  if (!opts.token.trim()) throw new Error("Live collection disabled: set X_RESEARCH_BEARER_TOKEN only in a trusted runner");
  if (!Number.isInteger(opts.maxPages ?? 2) || (opts.maxPages ?? 2) < 1 || (opts.maxPages ?? 2) > 10) throw new Error("maxPages must be 1–10");
  const accounts = opts.accounts ?? defaultAccounts;
  const handles = new Set<string>();
  for (const { handle, domains } of accounts) {
    if (!handlePattern.test(handle) || handles.has(handle.toLowerCase()) || !Array.isArray(domains)
      || domains.some((d) => !/^([a-z0-9-]+\.)+[a-z]{2,63}$/.test(d))) throw new Error("Invalid or duplicate account");
    handles.add(handle.toLowerCase());
  }
  if (accounts.length < 1 || accounts.length > 12) throw new Error("Configure 1–12 handles");
  const fetcher = opts.fetcher ?? fetch;
  const next: Queue = structuredClone(old);
  const remembered = new Map<string, Evidence>();
  for (const row of old.candidates) for (const id of row.evidence?.ids ?? []) remembered.set(id, row.evidence!);
  let evidenceRequests = 0;
  let landingRequests = 0;
  for (const account of accounts) {
    const key = account.handle.toLowerCase();
    const result = await fromAccount(account, Object.hasOwn(old.accounts, key) ? old.accounts[key] : undefined, opts, fetcher);
    for (const post of result.posts.sort((a, b) => BigInt(a.id) < BigInt(b.id) ? -1 : 1)) {
      const lead = { postUrl: `https://x.com/${account.handle}/status/${post.id}`, landingPages: landingPages(post, account) };
      const postTokens = tokensFromPost(post);
      const tokensByKey = new Map(postTokens.map((id) => [idKey(id), id]));
      const pending = [...lead.landingPages];
      const visited = new Set<string>();
      while (pending.length && visited.size < 2 && landingRequests < 20 && !tokensByKey.size) {
        const page = pending.shift()!;
        if (visited.has(page)) continue;
        visited.add(page);
        landingRequests++;
        try {
          const landed = await readLandingPage(page, account, fetcher);
          for (const id of landed.tokens) tokensByKey.set(idKey(id), id);
          pending.push(...landed.sameScope);
          if (!lead.landingPages.includes(page)) lead.landingPages.push(page);
        } catch { /* Redirects, unavailable or oversized sources leave a manual lead. */ }
      }
      const tokens = [...tokensByKey.values()].sort((a,b) => idKey(a).localeCompare(idKey(b)));
      if (!tokens.length && !lead.landingPages.length
        && !/\b(research|study|studies|trial|trials|paper|abstract|publication|published|oncolog\w*|cancer|tumou?r|fda|treatment|therapy|biotech)\b/i.test(post.text ?? "")) continue;
      let resolved = false;
      for (const id of tokens) {
        const k = idKey(id);
        let evidence = remembered.get(k);
        if (!evidence && evidenceRequests < (opts.maxEvidence ?? 40)) {
          evidenceRequests++;
          try { evidence = await evidenceFor(id, fetcher); }
          catch { /* Preserve a manual lead rather than assert anything or drop this post. */ }
        }
        if (!evidence) continue;
        for (const alias of evidence.ids) remembered.set(alias, evidence);
        next.candidates = mergeCandidate(next.candidates, { key: k, state: "resolved-source-review", leads: [lead], evidence });
        resolved = true;
      }
      // Keep unresolved identity leads, including official institution newsroom links, for human verification.
      if (!resolved || tokens.some((id) => !remembered.has(idKey(id)))) {
        next.candidates = mergeCandidate(next.candidates, { key: `post:${post.id}`, state: "unverified-lead", leads: [lead] });
      }
    }
    Object.defineProperty(next.accounts, key, { value: result.state, enumerable: true, configurable: true, writable: true });
  }
  next.candidates.sort((a,b) => a.key.localeCompare(b.key));
  return next;
}

async function run() {
  const token = process.env.X_RESEARCH_BEARER_TOKEN ?? "";
  if (!token.trim() || process.env.ONCO_X_MONITOR_ENABLED !== "1") throw new Error("Live collection disabled; requires ONCO_X_MONITOR_ENABLED=1 and a configured X bearer token");
  const statePath = resolve(process.env.ONCO_X_MONITOR_STATE ?? ".cache/x-research-monitor/queue.json");
  await mkdir(dirname(statePath), { recursive: true, mode: 0o700 });
  const lockPath = `${statePath}.lock`;
  const lock = await open(lockPath, "wx", 0o600);
  try {
    await lock.writeFile(String(process.pid));
    await runLocked(statePath, token);
  } finally {
    await lock.close();
    await unlink(lockPath);
  }
}

async function runLocked(statePath: string, token: string) {
  let queue = emptyQueue();
  try {
    queue = JSON.parse(await readFile(statePath, "utf8")) as Queue;
    if (queue.version !== 1 || !queue.accounts || !Array.isArray(queue.candidates)) throw new Error("Unsupported or invalid queue state");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
  }
  const accounts = process.env.ONCO_X_MONITOR_ACCOUNTS ? JSON.parse(process.env.ONCO_X_MONITOR_ACCOUNTS) as Account[] : undefined;
  const next = await scan(queue, { token, accounts, maxPages: Number(process.env.ONCO_X_MONITOR_MAX_PAGES ?? "2") });
  // The queue and its cursor are one checkpoint. A request/write failure preserves the old checkpoint.
  const tmp = `${statePath}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(next, null, 2) + "\n", { flag: "wx", mode: 0o600 });
  await rename(tmp, statePath);
  console.log(`X research monitor: ${next.candidates.length} review candidates; nothing published`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  run().catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : "X research monitor failed");
    process.exitCode = 1;
  });
}

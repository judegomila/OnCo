/**
 * Weekly re-check, part 6: dead links. Report only.
 *
 * Every address a record cites is collected with collectUrls from scripts/check-links.ts, and one slice of them is
 * probed each week: an address belongs to slice hash(address) mod 4, and the slice probed is the week number mod 4, so
 * the whole corpus is covered about once a month and an address is always in the same slice.
 *
 * Reported: 404 and 410, and a `.pdf` address that now answers with a web page (a moved file behind a "not found"
 * page served with 200). Not reported as dead: 401, 403, 429 and bot-challenge pages, which are a site refusing a
 * script and almost always a live link; they are counted as blocked. A host that refuses five requests in a row is
 * not asked again in that run.
 *
 * Polite by construction (see Net in ./lib): one request at a time per host with a pause between, a handful of hosts
 * at once, HEAD before GET, and a plain user agent naming the project. A DOI is checked at doi.org without following
 * it to the publisher: a redirect there means the DOI resolves, and publishers are where the bot walls are.
 */
import { isSoftPdf404 } from "../check-links";
import { type Finding, type Net, hostOf, pooled, refusal, stableHash, weekNumber } from "./lib";

export type Probe = { status: number; finalUrl?: string; contentType?: string; etag?: string; lastModified?: string; blocked?: string; error?: string };
export type Verdict = "ok" | "gone" | "blocked" | "unreachable" | "error";
export type Ref = { id: string; kind: string; field: string; label?: string };

export const SLICES = 4;
export const sliceOf = (url: string, slices = SLICES): number => stableHash(url) % slices;
/** The addresses to probe in the week `isoDate` falls in. */
export function weeklySlice(urls: string[], isoDate: string, slices = SLICES): string[] {
  const want = ((weekNumber(isoDate) % slices) + slices) % slices;
  return urls.filter((u) => sliceOf(u, slices) === want).sort();
}

const isDoi = (url: string) => /^https?:\/\/(dx\.)?doi\.org\//i.test(url);

/** HEAD, then GET where HEAD is refused, unsupported or says the page is gone (a GET confirms it and shows a challenge page for what it is). */
export async function probe(net: Net, url: string): Promise<Probe> {
  const redirect = isDoi(url) ? "manual" as const : "follow" as const;
  let r = await net.request(url, { method: "HEAD", redirect, accept: "text/html,application/pdf;q=0.9,*/*;q=0.8" });
  if (r.status === 0 || r.status >= 500) r = await net.get(url, { redirect, body: "none", tries: 2 });
  else if ([400, 401, 403, 404, 405, 406, 410, 501].includes(r.status)) r = await net.request(url, { method: "GET", redirect, body: r.status === 404 || r.status === 410 ? "text" : "none", accept: "text/html,application/pdf;q=0.9,*/*;q=0.8" });
  const blocked = r.blocked ?? refusal({ status: r.status, finalUrl: r.finalUrl, headers: r.headers });
  return { status: r.status, finalUrl: r.finalUrl, contentType: r.headers.get("content-type") ?? undefined, etag: r.headers.get("etag") ?? undefined, lastModified: r.headers.get("last-modified") ?? undefined, blocked, error: r.error };
}

export function verdict(url: string, p: Probe): Verdict {
  if (p.blocked) return "blocked";
  if (p.status === 0) return "unreachable";
  if (p.status === 404 || p.status === 410) return "gone";
  if (p.status >= 200 && p.status < 400) return isSoftPdf404(p.finalUrl ?? url, p.contentType) ? "gone" : "ok";
  return "error";
}

/** Where a redirect ended, when that is somewhere else: not the same page over https, with or without www or a trailing slash. */
export function movedTo(url: string, finalUrl?: string): string | undefined {
  if (!finalUrl) return undefined;
  const norm = (u: string) => { try { const x = new URL(u); return `${x.hostname.replace(/^www\./, "").toLowerCase()}${decodeURIComponent(x.pathname).replace(/\/+$/, "").toLowerCase()}${x.search}`; } catch { return u; } };
  return norm(url) === norm(finalUrl) ? undefined : finalUrl;
}

export function linkFindings(results: Array<{ url: string; probe: Probe }>, refs: Map<string, Ref[]>): Finding[] {
  const out: Finding[] = [];
  for (const { url, probe: p } of results) {
    if (verdict(url, p) !== "gone") continue;
    const cited = refs.get(url) ?? [];
    const ids = [...new Set(cited.map((r) => r.id))];
    const first = cited[0];
    const soft = p.status !== 404 && p.status !== 410;
    out.push({
      kind: "links", type: soft ? "pdf-address-serves-a-web-page" : "link-gone", severity: ids.includes("red-flags") || ids.length >= 5 ? "high" : "medium", recordId: first?.id, recordKind: first?.kind,
      onco: first ? `cited in ${first.field}${first.label ? ` ("${first.label.slice(0, 80)}")` : ""}${ids.length > 1 ? ` and by ${ids.length - 1} other record${ids.length === 2 ? "" : "s"}` : ""}` : "cited",
      source: soft ? `answers ${p.status} with ${p.contentType ?? "no content type"}, not a PDF` : `${p.status} ${p.status === 410 ? "Gone" : "Not Found"}`, url,
      note: ids.length > 1 ? `Also: ${ids.slice(1, 9).join(", ")}${ids.length > 9 ? ` and ${ids.length - 9} more` : ""}` : undefined,
    });
  }
  return out;
}

/** Probe every address, a few hosts at a time. A host that refuses `giveUpAfter` requests running is left alone for the rest of the run. */
export async function probeAll(net: Net, urls: string[], opts: { concurrency?: number; giveUpAfter?: number; log?: (s: string) => void; label?: string } = {}): Promise<Array<{ url: string; probe: Probe }>> {
  const refusals = new Map<string, number>();
  const giveUp = opts.giveUpAfter ?? 5;
  // Interleave hosts so the pool is not spent waiting on one host's turn.
  const byHost = new Map<string, string[]>();
  for (const u of urls) byHost.set(hostOf(u), [...(byHost.get(hostOf(u)) ?? []), u]);
  const order: string[] = [];
  for (let i = 0, more = true; more; i++) { more = false; for (const list of byHost.values()) if (i < list.length) { order.push(list[i]); more = true; } }
  let done = 0;
  return pooled(order, opts.concurrency ?? 6, async (url) => {
    const host = hostOf(url);
    let p: Probe;
    if ((refusals.get(host) ?? 0) >= giveUp) p = { status: 0, blocked: "host refused earlier requests in this run; not asked again" };
    else {
      p = await probe(net, url);
      refusals.set(host, p.blocked ? (refusals.get(host) ?? 0) + 1 : 0);
    }
    if (++done % 500 === 0) opts.log?.(`  ${opts.label ?? "links"}: ${done}/${order.length} (${net.requests} requests)`);
    return { url, probe: p };
  });
}

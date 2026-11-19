/**
 * Weekly re-check, part 5: guideline sources. A cheap check and nothing more.
 *
 * Every protocol under src/data/protocols names its sources, each with a publisher, a year and an address. Each
 * address is asked for its headers (HEAD, then GET where HEAD is refused) and three things are reported:
 *   - the address is gone (404 or 410);
 *   - it now redirects somewhere it did not last week;
 *   - its Last-Modified date changed since last week, or, for a file such as a PDF, its ETag did.
 * A changed date says a publisher touched the page. It does not say a new edition exists, and no attempt is made to
 * find one by reading publishers' sites: most refuse scripts, and a refusal is recorded as blocked, not worked round.
 *
 * Last week's headers are kept in src/data/recheck/guideline-headers.json. Two kinds of header are known to change
 * without the document changing and are not compared: an ETag on a web page (many are made per response), and a
 * Last-Modified that was less than two days old when it was read (a render stamp, not a publication date).
 */
import type { Finding } from "./lib";
import { type Probe, movedTo, verdict } from "./links";

export type GuidelineSource = { url: string; label: string; publisher: string; year: number; protocols: string[] };
export type HeaderState = { status: number; finalUrl?: string; lastModified?: string; etag?: string; /** The Last-Modified was under two days old when read: a render stamp. */ fresh?: true };
export type HeaderFile = { generated: string; note: string; sources: Record<string, HeaderState> };

const isHtml = (contentType?: string) => !contentType || /text\/html|application\/xhtml/i.test(contentType);
/** DOI resolvers always redirect; that is what they are for. */
const isResolver = (url: string) => /^https?:\/\/(dx\.)?doi\.org\//i.test(url);

/** What to keep of this week's reading. Undefined when the address was blocked or unreachable: last week's entry then stands. */
export function headerState(url: string, p: Probe, readAt: number): HeaderState | undefined {
  const v = verdict(url, p);
  if (v === "blocked" || v === "unreachable" || v === "error") return undefined;
  const lm = p.lastModified && !Number.isNaN(Date.parse(p.lastModified)) ? p.lastModified : undefined;
  const moved = isResolver(url) ? undefined : movedTo(url, p.finalUrl);
  return {
    status: p.status, ...(moved ? { finalUrl: moved } : {}), ...(lm ? { lastModified: lm } : {}),
    ...(p.etag && !isHtml(p.contentType) ? { etag: p.etag } : {}),
    ...(lm && readAt - Date.parse(lm) < 2 * 86_400_000 ? { fresh: true as const } : {}),
  };
}

export function compareGuideline(src: GuidelineSource, prev: HeaderState | undefined, p: Probe, readAt: number): Finding[] {
  const what = `"${src.label.slice(0, 110)}" (${src.publisher.slice(0, 60)}, ${src.year})`;
  const others = src.protocols.length > 1 ? ` and ${src.protocols.length - 1} other protocol${src.protocols.length === 2 ? "" : "s"}` : "";
  const base = { kind: "guidelines" as const, recordId: src.protocols[0], recordKind: "protocol", url: src.url, onco: `cites ${what}${others}`, note: src.protocols.length > 1 ? `Also: ${src.protocols.slice(1, 9).join(", ")}${src.protocols.length > 9 ? ` and ${src.protocols.length - 9} more` : ""}` : undefined };
  const v = verdict(src.url, p);
  if (v === "blocked" || v === "error") return [];
  if (v === "unreachable") return prev ? [{ ...base, type: "source-unreachable", severity: "low", source: `no answer${p.error ? ` (${p.error})` : ""}; it answered ${prev.status} when last read` }] : [];
  if (v === "gone") return [{ ...base, type: "source-gone", severity: "high", source: p.status === 404 || p.status === 410 ? `${p.status} ${p.status === 410 ? "Gone" : "Not Found"}` : `answers ${p.status} with ${p.contentType ?? "no content type"}, not a PDF` }];
  const now = headerState(src.url, p, readAt)!;
  const out: Finding[] = [];
  if (now.finalUrl && now.finalUrl !== prev?.finalUrl) out.push({ ...base, type: "source-redirected", severity: "medium", source: `redirects to ${now.finalUrl}` });
  if (prev && prev.status >= 200 && prev.status < 400) {
    if (prev.lastModified && now.lastModified && prev.lastModified !== now.lastModified && !prev.fresh) {
      out.push({ ...base, type: "source-changed", severity: isHtml(p.contentType) ? "low" : "medium", source: `Last-Modified ${now.lastModified}; it was ${prev.lastModified}`, date: new Date(Date.parse(now.lastModified)).toISOString().slice(0, 10) });
    } else if (!prev.lastModified && !now.lastModified && prev.etag && now.etag && prev.etag !== now.etag) {
      out.push({ ...base, type: "source-changed", severity: "medium", source: `ETag ${now.etag}; it was ${prev.etag}` });
    }
  }
  return out;
}

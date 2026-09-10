/**
 * Minimal iCalendar (RFC 5545) writer and the fuzzy-date helpers shared by the catalyst pages.
 *
 * OnCo dates come at four resolutions: a day (YYYY-MM-DD), a month (YYYY-MM), a quarter (YYYY-Qn) or a
 * year (YYYY). Calendar clients need a real date, so fuzzy periods become an all-day event on the first
 * day of the period with the resolution spelled out in the summary ("Expected Q4 2026: ...").
 *
 * No dependencies; output uses CRLF line endings and folds lines at 75 octets as the RFC requires.
 */
export type IcsEvent = {
  uid: string;
  /** Any OnCo date string (see above). */
  date: string;
  summary: string;
  description?: string;
  url?: string;
  categories?: string[];
};

export type Resolution = "day" | "month" | "quarter" | "year";

export function resolutionOf(date: string): Resolution {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return "day";
  if (/^\d{4}-\d{2}$/.test(date)) return "month";
  if (/^\d{4}-Q[1-4]$/.test(date)) return "quarter";
  return "year";
}

/** First calendar day of the period as YYYY-MM-DD. */
export function periodStart(date: string): string {
  const q = date.match(/^(\d{4})-Q([1-4])$/);
  if (q) return `${q[1]}-${String((Number(q[2]) - 1) * 3 + 1).padStart(2, "0")}-01`;
  if (/^\d{4}-\d{2}$/.test(date)) return `${date}-01`;
  if (/^\d{4}$/.test(date)) return `${date}-01-01`;
  return date;
}

/** Last calendar day of the period as YYYY-MM-DD (the day itself for a day). */
export function periodEnd(date: string): string {
  const q = date.match(/^(\d{4})-Q([1-4])$/);
  if (q) { const m = Number(q[2]) * 3; return `${q[1]}-${String(m).padStart(2, "0")}-${lastDay(Number(q[1]), m)}`; }
  const m = date.match(/^(\d{4})-(\d{2})$/);
  if (m) return `${m[1]}-${m[2]}-${lastDay(Number(m[1]), Number(m[2]))}`;
  if (/^\d{4}$/.test(date)) return `${date}-12-31`;
  return date;
}

function lastDay(year: number, month: number): string {
  return String(new Date(Date.UTC(year, month, 0)).getUTCDate()).padStart(2, "0");
}

/** Sort key that places fuzzy periods after the precise dates inside them. */
export function sortKey(date: string): string {
  const q = date.match(/^(\d{4})-Q([1-4])$/);
  if (q) return `${q[1]}-${String(Number(q[2]) * 3).padStart(2, "0")}-99`;
  if (/^\d{4}$/.test(date)) return `${date}-99-99`;
  if (/^\d{4}-\d{2}$/.test(date)) return `${date}-98`;
  return date;
}

/** Human label: "18 September 2026", "November 2026", "Q4 2026", "2027". */
export function dateLabel(date: string): string {
  const r = resolutionOf(date);
  if (r === "day") { const [y, m, d] = date.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }); }
  if (r === "month") { const [y, m] = date.split("-").map(Number); return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }); }
  if (r === "quarter") { const q = date.match(/^(\d{4})-Q([1-4])$/)!; return `Q${q[2]} ${q[1]}`; }
  return date;
}

/** Quarter bucket "2026-Q4" for any date string (a bare year lands in its final quarter). */
export function quarterOf(date: string): string {
  if (/^\d{4}-Q[1-4]$/.test(date)) return date;
  if (/^\d{4}$/.test(date)) return `${date}-Q4`;
  const m = Number(date.slice(5, 7));
  return `${date.slice(0, 4)}-Q${Math.ceil(m / 3)}`;
}

const escapeText = (s: string) => s.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");

/** Fold a content line at 75 octets (continuation lines start with a space), per RFC 5545 section 3.1. */
export function foldLine(line: string): string {
  const enc = new TextEncoder();
  const out: string[] = [];
  let cur = "";
  let bytes = 0;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    const limit = out.length ? 74 : 75;
    if (bytes + b > limit) { out.push(cur); cur = ch; bytes = b; }
    else { cur += ch; bytes += b; }
  }
  out.push(cur);
  return out.map((l, i) => (i ? ` ${l}` : l)).join("\r\n");
}

/**
 * Serialise events to an iCalendar document. `stamp` is the DTSTAMP applied to every event (pass the build
 * time so the feed is stable within a deployment).
 */
export function toIcs(events: IcsEvent[], opts: { name: string; description?: string; stamp: Date; domain?: string }): string {
  const domain = opts.domain ?? "onco.cc";
  const stamp = opts.stamp.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OnCo//Catalyst calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(opts.name)}`,
  ];
  if (opts.description) lines.push(`X-WR-CALDESC:${escapeText(opts.description)}`);
  for (const e of events) {
    const start = periodStart(e.date).replace(/-/g, "");
    const next = new Date(Date.UTC(Number(start.slice(0, 4)), Number(start.slice(4, 6)) - 1, Number(start.slice(6, 8)) + 1));
    const end = next.toISOString().slice(0, 10).replace(/-/g, "");
    const res = resolutionOf(e.date);
    const summary = res === "day" ? e.summary : `Expected ${dateLabel(e.date)}: ${e.summary}`;
    lines.push("BEGIN:VEVENT", `UID:${e.uid}@${domain}`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end}`, `SUMMARY:${escapeText(summary)}`);
    const desc = [e.description, res === "day" ? "" : `Timing resolution: ${res}. The event is placed on the first day of the period.`].filter(Boolean).join("\n\n");
    if (desc) lines.push(`DESCRIPTION:${escapeText(desc)}`);
    if (e.url) lines.push(`URL:${e.url}`);
    if (e.categories?.length) lines.push(`CATEGORIES:${e.categories.map(escapeText).join(",")}`);
    lines.push("TRANSP:TRANSPARENT", "END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}

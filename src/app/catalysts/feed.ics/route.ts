import { mergedCatalysts } from "@/lib/catalysts";
import { toIcs } from "@/lib/ics";
import { absoluteUrl } from "@/lib/seo";

/** Required under `output: "export"`: the feed is written to disk at build time. */
export const dynamic = "force-static";

/** iCalendar feed of every catalyst and readout-calendar event, for subscription in calendar apps. */
export function GET() {
  const now = new Date();
  const events = mergedCatalysts(now.toISOString().slice(0, 10));
  const ics = toIcs(events.map((e) => ({
    uid: `onco-${e.origin}-${e.id}`,
    date: e.date,
    summary: e.title,
    description: `${e.note}${e.confidence === "expected" ? "\n\nEditorial estimate; can slip by quarters." : ""}${e.companies.length ? `\n\nCompanies: ${e.companies.map((c) => c.name).join(", ")}` : ""}\n\n${absoluteUrl(`/catalysts/#${e.id}`)}`,
    url: e.source,
    categories: [e.kindLabel, e.confidence],
  })), { name: "OnCo oncology catalysts", description: "Regulatory decisions, expected readouts, advisory committees, congresses and deal closings in oncology, from onco.cc.", stamp: now });
  return new Response(ics, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

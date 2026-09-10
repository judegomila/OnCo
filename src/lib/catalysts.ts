import { graph } from "./graph";
import { routeFor, type Entity } from "./schema";
import { periodEnd } from "./ics";
import { catalysts, type CatalystKind } from "@/data/catalysts";
import { calendar, type CalendarKind } from "@/data/calendar";
import type { CatalystEvent, CatalystRef } from "@/components/CatalystBrowser";

/** Where the iCalendar feed is written (a route handler under src/app/catalysts/feed.ics/). */
export const FEED_PATH = "/catalysts/feed.ics";

const CATALYST_LABEL: Record<CatalystKind, string> = { pdufa: "Regulatory decision", readout: "Expected readout", adcom: "Advisory committee", "label-decision": "Label or clearance decision", "patent-ruling": "Patent ruling", filing: "Filing", "deal-close": "Deal closing" };
const CATALYST_TONE: Record<CatalystKind, string> = { pdufa: "approved", readout: "phase-2", adcom: "phase-3", "label-decision": "approved", "patent-ruling": "mixed", filing: "planned", "deal-close": "established" };
const CALENDAR_LABEL: Record<CalendarKind, string> = { pdufa: "Regulatory decision", adcom: "Advisory committee", "readout-expected": "Expected readout", congress: "Congress", policy: "Policy" };
const CALENDAR_TONE: Record<CalendarKind, string> = { pdufa: "approved", adcom: "phase-3", "readout-expected": "phase-2", congress: "established", policy: "planned" };

const ref = (e: Entity): CatalystRef => ({ id: e.id, name: e.name, route: routeFor(e), kind: e.kind });

/**
 * Merge catalysts.ts with calendar.ts into one serialisable list. Calendar rows have no company field, so
 * their companies are derived from company refs and from the companies of the products they name.
 */
export function mergedCatalysts(today: string): CatalystEvent[] {
  const g = graph();
  const out: CatalystEvent[] = [];
  for (const c of catalysts) {
    const companies = c.companies.map((id) => g.get(id)).filter((x): x is Entity => !!x).map(ref);
    const refs = [...c.drugs, ...c.refs].map((id) => g.get(id)).filter((x): x is Entity => !!x).map(ref);
    out.push({ id: c.id, date: c.date, kind: c.kind, kindLabel: CATALYST_LABEL[c.kind], tone: CATALYST_TONE[c.kind], title: c.title, note: c.note, confidence: c.confidence, source: c.source, companies, refs, past: periodEnd(c.date) < today, origin: "catalyst" });
  }
  calendar.forEach((e, i) => {
    const ents = e.refs.map((id) => g.get(id)).filter((x): x is Entity => !!x);
    const companyIds = new Set<string>();
    for (const x of ents) {
      if (x.kind === "company") companyIds.add(x.id);
      if (x.kind === "drug") for (const cid of x.companies) companyIds.add(cid);
    }
    const companies = [...companyIds].map((id) => g.get(id)).filter((x): x is Entity => !!x).map(ref);
    out.push({ id: `cal-${i}`, date: e.date, kind: e.kind, kindLabel: CALENDAR_LABEL[e.kind], tone: CALENDAR_TONE[e.kind], title: e.title, note: e.note, confidence: e.confidence, source: e.source, companies, refs: ents.filter((x) => x.kind !== "company").map(ref), past: periodEnd(e.date) < today, origin: "calendar" });
  });
  return out;
}

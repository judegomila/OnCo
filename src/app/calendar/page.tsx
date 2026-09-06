import type { Metadata } from "next";
import { calendar, type CalendarKind } from "@/data/calendar";
import { Container, PageHeader } from "@/components/ui";
import { RefChips } from "@/components/RefChips";
import { statusClass } from "@/lib/text";

export const metadata: Metadata = { title: "Readout calendar", description: "Upcoming FDA decisions, advisory committees, expected trial readouts, and congresses in oncology, on one timeline." };

const KIND_LABEL: Record<CalendarKind, string> = { pdufa: "Regulatory decision", adcom: "Advisory committee", "readout-expected": "Expected readout", congress: "Congress", policy: "Policy" };
const KIND_TONE: Record<CalendarKind, string> = { pdufa: "approved", adcom: "phase-3", "readout-expected": "phase-2", congress: "established", policy: "planned" };

function monthKey(date: string): string {
  const m = date.match(/^(\d{4})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}`;
  const q = date.match(/^(\d{4})-Q([1-4])$/);
  if (q) return `${q[1]}-Q${q[2]}`;
  return date; // year only
}
function monthLabel(key: string): string {
  const m = key.match(/^(\d{4})-(\d{2})$/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, 1).toLocaleString("en-GB", { month: "long", year: "numeric" });
  const q = key.match(/^(\d{4})-Q([1-4])$/);
  if (q) return `Q${q[2]} ${q[1]} (approximate)`;
  return `${key} (timing not announced)`;
}
function sortKey(date: string): string {
  const q = date.match(/^(\d{4})-Q([1-4])$/);
  if (q) return `${q[1]}-${String(Number(q[2]) * 3).padStart(2, "0")}-99`;
  if (/^\d{4}$/.test(date)) return `${date}-99-99`;
  if (/^\d{4}-\d{2}$/.test(date)) return `${date}-98`;
  return date;
}

export default function CalendarPage() {
  const sorted = [...calendar].sort((a, b) => sortKey(a.date).localeCompare(sortKey(b.date)));
  const groups = new Map<string, typeof sorted>();
  for (const e of sorted) { const k = monthKey(e.date); groups.set(k, [...(groups.get(k) ?? []), e]); }
  const confirmed = calendar.filter((e) => e.confidence === "confirmed").length;
  return (
    <>
      <PageHeader kicker={<span className="kicker">Pipeline</span>} title="Readout calendar"
        lede="Regulatory decisions, advisory committees, expected trial readouts, and the congresses where results land. Confirmed items carry a source. Expected items are our editorial estimate from trial registrations and sponsor statements, and can slip by quarters." />
      <Container className="pb-16">
        <div className="flex flex-wrap gap-2 text-sm mb-6">
          <span className={`chip ${statusClass("approved")}`}>{confirmed} confirmed</span>
          <span className={`chip ${statusClass("phase-2")}`}>{calendar.length - confirmed} expected</span>
          {(Object.keys(KIND_LABEL) as CalendarKind[]).map((k) => <span key={k} className={`chip ${statusClass(KIND_TONE[k])}`}>{KIND_LABEL[k]}</span>)}
        </div>
        <ol className="relative border-l-2 border-border ml-3 space-y-10">
          {[...groups.entries()].map(([key, events]) => (
            <li key={key} className="ml-6">
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-accent ring-4 ring-background" />
              <h2 className="text-lg font-semibold">{monthLabel(key)}</h2>
              <div className="mt-3 space-y-3">
                {events.map((e, i) => (
                  <div key={i} className="card p-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-muted">{e.date}</span>
                      <span className={`chip ${statusClass(KIND_TONE[e.kind])}`}>{KIND_LABEL[e.kind]}</span>
                      <span className={`chip ${e.confidence === "confirmed" ? statusClass("approved") : "bg-foreground/5 text-muted"}`}>{e.confidence}</span>
                    </div>
                    <div className="font-medium mt-1.5">{e.title}</div>
                    <p className="text-sm text-muted mt-1">{e.note}</p>
                    <RefChips ids={e.refs} className="mt-2" />
                    {e.source && <a className="text-xs underline text-muted mt-2 inline-block break-all" href={e.source} rel="noopener">Source</a>}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted mt-10 max-w-2xl">Missing a date? Add it to <code>src/data/calendar.ts</code> with a source. Expected readouts become confirmed only when a sponsor or registry gives a date.</p>
      </Container>
    </>
  );
}

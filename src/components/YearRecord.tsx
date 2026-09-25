import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { refChipClass } from "@/lib/text";
import type { Year, YearEvent } from "@/lib/schema";
import { YEAR_EVENT_GROUPS, YEAR_GROUP_META, dateLabel, type YearEventGroup } from "@/lib/year-groups";
import { groupCounts, precisionCounts, yearId } from "@/lib/years";
import { Block } from "./record-blocks";

/**
 * A year page: everything the corpus dates to that year, grouped by what kind of thing it was, in the order a
 * reader wants it (what was allowed, what was read out, what was written down, who was founded, what is expected).
 *
 * Every line is generated (src/data/years.ts), so nothing here is written twice: the date is the one the source
 * record gives, the title is that record's own words, and the chips are links back to the records the fact is
 * about. A row costs about the same however much is known about it, which is what the page budget in
 * src/app/heavy-pages.test.ts measures.
 */

/** One dated line: the date as the source gives it, what it was, and the records it is about. */
function EventRow({ e }: { e: YearEvent }) {
  const g = graph();
  const from = e.from ? g.get(e.from) : undefined;
  const refs = e.refs.map((id) => g.get(id)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  // One short class per part (.yr-* in globals.css), for the same reason the reference pills carry .k-*: a year page
  // renders up to eight hundred of these rows, and the Tailwind utilities were most of the markup of each one.
  return (
    <li className="yr">
      <div className="yr-h">
        <span className="yr-d">{dateLabel(e.date)}</span>
        <span className="yr-t">{from ? <Link className="hover:underline" href={routeFor(from)}>{e.title}</Link> : e.title}</span>
      </div>
      {e.note && <p className="yr-n">{e.note}</p>}
      {refs.length > 0 && <div className="yr-r">{refs.map((r) => <Link key={r.id} className={refChipClass(r.kind)} href={routeFor(r)}>{r.name}</Link>)}</div>}
    </li>
  );
}

/** The counts strip: how much the year holds, and how exactly it is known. */
export function YearStats({ y }: { y: Year }) {
  const p = precisionCounts(y.events);
  const known = [["day", p.day], ["month", p.month], ["quarter", p.quarter], ["year", p.year]] as const;
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 mt-6">
      <div className="card p-3"><div className="kicker mb-1">Dated entries</div><div className="text-2xl font-semibold tabular-nums">{y.events.length.toLocaleString("en-GB")}</div></div>
      {known.filter(([, n]) => n > 0).map(([label, n]) => (
        <div key={label} className="card p-3"><div className="kicker mb-1">Known to the {label}</div><div className="text-2xl font-semibold tabular-nums">{n.toLocaleString("en-GB")}</div></div>
      ))}
    </div>
  );
}

/** Previous and next year, so the years read as one chain rather than as a list. */
export function YearNav({ y }: { y: Year }) {
  const g = graph();
  const prev = g.get(yearId(y.year - 1)), next = g.get(yearId(y.year + 1));
  const around = [prev, next].filter(Boolean).length;
  if (!around) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-8 text-sm">
      <div>{prev ? <Link className="hover:underline" href={routeFor(prev)}>← {prev.name}</Link> : <span />}</div>
      <Link className="underline text-muted" href="/timeline/">All years on one timeline</Link>
      <div>{next ? <Link className="hover:underline" href={routeFor(next)}>{next.name} →</Link> : <span />}</div>
    </div>
  );
}

/** Every event of the year, grouped. Groups keep the order of YEAR_EVENT_GROUPS, so every year page reads the same way. */
export function YearEvents({ y }: { y: Year }) {
  const counts = new Map(groupCounts(y.events));
  const groups = YEAR_EVENT_GROUPS.filter((g) => (counts.get(g) ?? 0) > 0);
  if (!groups.length) {
    return (
      <Block title="What happened" id="what-happened">
        <p className="text-[15px] max-w-3xl">No record in OnCo carries a date in {y.year}. The year has a page so that the gap is visible rather than passed over: an empty year here means nothing has been read into the corpus for it, and says nothing about the year itself. The <Link className="underline" href="/timeline/">timeline</Link> shows which parts of the record are thin.</p>
      </Block>
    );
  }
  return (
    <>
      <Block title="What happened" id="what-happened">
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => <a key={g} href={`#${g}`} className="chip">{YEAR_GROUP_META[g].label} {counts.get(g)}</a>)}
        </div>
      </Block>
      {groups.map((g) => <GroupBlock key={g} group={g} events={y.events.filter((e) => e.group === g)} />)}
    </>
  );
}

function GroupBlock({ group, events }: { group: YearEventGroup; events: YearEvent[] }) {
  const meta = YEAR_GROUP_META[group];
  return (
    <Block title={`${meta.label} (${events.length.toLocaleString("en-GB")})`} id={group}>
      <p className="text-sm text-muted mb-2 max-w-3xl">{meta.source}</p>
      <ul className="max-w-4xl">{events.map((e, i) => <EventRow key={`${e.date}-${i}`} e={e} />)}</ul>
    </Block>
  );
}

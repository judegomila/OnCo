/**
 * One record per year in oncology, generated from every other record.
 *
 * A year is not a new kind of claim, it is a view: src/lib/years.ts reads every dated field the corpus holds (the
 * history entries on cancers, approvals and regulatory events on treatments, reported trials, papers, technologies,
 * companies and journals founded, financing rounds, guideline versions, the law index, roadmap watch items and
 * the readout calendar), and this file sorts them into years and writes a record for each. Nothing is written by hand: a
 * hand-written year would drift the moment one of the records it summarised changed.
 *
 * Coverage rule. From CONTINUOUS_FROM (1900) to the last year the corpus dates anything to, every year gets a
 * record, including the handful with nothing in them, which say so; leaving them out would imply that nothing
 * happened in them, when what is true is that the corpus holds nothing. Before 1900 only the years the corpus
 * actually holds something for get a record, and the timeline says plainly that the early record is a scatter of
 * landmarks rather than a year-by-year reading.
 *
 * Wired into ALL_INPUTS at the end of ./index.ts, after every other record, because it reads them all.
 */
import type { EntityInput, YearInput } from "@/lib/schema";
import { CONTINUOUS_FROM, byYear, groupCounts, precisionCounts, withoutYear, yearEvents, yearId } from "@/lib/years";
import { groupPhrase } from "@/lib/year-groups";
import { guidelineVersions } from "./guideline-versions";
import { calendar } from "./calendar";
import { catalysts } from "./catalysts";
import { TRIAL_REGISTRY_STATUS } from "./trial-registry-status";
import { LAW_INDEX, LAW_JURISDICTIONS } from "./law-wave";

/** The day the generator and the fields it reads were last checked over. The facts themselves carry the asOf of the records they came from. */
const asOf = "2026-09-25";

const plural = (n: number, one: string, many = `${one}s`) => `${n.toLocaleString("en-GB")} ${n === 1 ? one : many}`;
const list = (parts: string[]): string => (parts.length <= 1 ? parts.join("") : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`);

export function yearRecords(inputs: readonly EntityInput[]): YearInput[] {
  const law = LAW_INDEX.map((l) => ({ id: l.id, year: l.year, instrument: l.instrument, jurisdiction: LAW_JURISDICTIONS[l.jurisdiction] }));
  const events = yearEvents(inputs, { guidelineVersions, calendar, catalysts, registryStatus: TRIAL_REGISTRY_STATUS, law });
  const index = byYear(events);
  const taken = new Set(inputs.map((e) => e.id));
  const withSomething = [...index.keys()].sort((a, b) => a - b);
  if (!withSomething.length) return [];
  const last = withSomething[withSomething.length - 1];
  const wanted = new Set<number>(withSomething);
  for (let y = CONTINUOUS_FROM; y <= last; y++) wanted.add(y);
  const years = [...wanted].sort((a, b) => a - b).filter((y) => !taken.has(yearId(y)));

  return years.map((year, i) => {
    const own = index.get(year) ?? [];
    const groups = groupCounts(own);
    const precision = precisionCounts(own);
    const neighbours = [years[i - 1], years[i + 1]].filter((y) => y !== undefined).map(yearId);
    const headline = groups.slice(0, 4).map(([g, n]) => groupPhrase(g, n));

    const tldr = own.length === 0
      ? `OnCo holds nothing dated to ${year}. That is a gap in what has been read into the corpus, not a claim that the year was quiet, and the year has a page so the gap can be seen rather than passed over.`
      : `Everything OnCo dates to ${year}: ${plural(own.length, "entry", "entries")}, ${list(headline)}. Each line links to the record it was read from, so the year is a view of the corpus rather than a second copy of it.`;

    const knownTo = [precision.day && `${precision.day} to the day`, precision.month && `${precision.month} to the month`, precision.quarter && `${precision.quarter} to the quarter`, precision.year && `${precision.year} to the year only`].filter(Boolean) as string[];

    const summary = own.length === 0
      ? [`No record in OnCo carries a date in ${year}. The corpus reads the field through its records, so an empty year means nothing has yet been read into it, and says nothing about what happened.`,
         `Years from ${CONTINUOUS_FROM} onwards all have a page, empty or not, so that a gap in the reading is visible. The timeline shows which parts of the record are thin and why.`].join("\n\n")
      : [`${plural(own.length, "dated entry", "dated entries")} in OnCo fall in ${year}: ${list(groups.map(([g, n]) => groupPhrase(g, n)))}.`,
         `Of those, ${list(knownTo)}. Most of the corpus dates a fact to the year, because that is what the source it was read from gives; regulatory events and the readout calendar are the parts that carry a full date.`,
         `Everything on this page is generated from the other records. It holds no fact of its own, and it changes when they do.`].join("\n\n");

    return {
      id: yearId(year),
      kind: "year",
      year,
      name: `${year} in oncology`,
      aka: [String(year)],
      tldr,
      summary,
      asOf,
      events: own.map(withoutYear),
      related: neighbours,
      notes: [`Generated from every dated field in the corpus, not written by hand. The groups and the fields behind them are listed in src/lib/year-groups.ts; the reader is src/lib/years.ts.`],
    } satisfies YearInput;
  });
}

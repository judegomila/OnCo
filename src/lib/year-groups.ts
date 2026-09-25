/**
 * The kinds of dated fact a year record lists, in the order a year page shows them: what was allowed, what was
 * read out, what was written down, who was founded, and what is expected. Every group is a field the corpus
 * already carries (src/lib/years.ts says which), so a year is a view of the corpus and never a new claim.
 *
 * Zod-free and in its own file so the year page, the timeline and the schema share one list without the client
 * bundle pulling in the validation schemas.
 */
export const YEAR_EVENT_GROUPS = ["approval", "regulatory", "law", "guideline", "trial", "paper", "history", "technology", "company", "funding", "journal", "person-paper", "expected"] as const;
export type YearEventGroup = (typeof YEAR_EVENT_GROUPS)[number];

/** Heading for each group on a year page, its singular for counts of one, and the line saying which field of which record it was read from. */
export const YEAR_GROUP_META: Record<YearEventGroup, { label: string; one: string; source: string }> = {
  approval: { label: "Approvals", one: "approval", source: "The approvals rows on treatment records: region, year and indication." },
  regulatory: { label: "Regulatory events", one: "regulatory event", source: "The regulatory events on treatment records: designations, filings, decisions, label changes and withdrawals, most of them carrying a full date." },
  law: { label: "Laws and regulations", one: "law or regulation", source: "The statutes, regulations, guidance and court rulings in the law index, dated to the year the instrument was made." },
  guideline: { label: "Guideline changes", one: "guideline change", source: "The dated NCCN and ESMO versions in the guideline history, with the rows each one added, removed or recategorised." },
  trial: { label: "Trials reported", one: "trial reported", source: "The year reported on trial records, with the headline result the record gives." },
  paper: { label: "Papers", one: "paper", source: "The publication year on key paper records." },
  history: { label: "Landmarks", one: "landmark", source: "The history entries editors wrote on cancer records: the dated turning points of each disease." },
  technology: { label: "Technologies", one: "technology", source: "The since year on technology records: first use in humans or first approval, as the record states it." },
  company: { label: "Companies founded", one: "company founded", source: "The founded year on company records." },
  funding: { label: "Financing rounds", one: "financing round", source: "The funding rounds on company records, each with the source that states the figure." },
  journal: { label: "Journals founded", one: "journal founded", source: "The founded year on journal records." },
  "person-paper": { label: "Papers listed on people's pages", one: "paper listed on a person's page", source: "The selected publications each biography lists, which is a reading of that person rather than a reading of the year." },
  expected: { label: "Expected dates", one: "expected date", source: "Dates a source states for something still to come: roadmap watch items, the readout calendar, company catalysts, and registry primary completion dates." },
};

/** "3 approvals", "1 approval": the group's own label, in step with the count. */
export const groupPhrase = (group: YearEventGroup, n: number): string => `${n.toLocaleString("en-GB")} ${n === 1 ? YEAR_GROUP_META[group].one : YEAR_GROUP_META[group].label.toLowerCase()}`;

/** How exactly a dated fact is known. A year page and the timeline both say which, because most of the corpus knows only the year. */
export const DATE_PRECISIONS = ["day", "month", "quarter", "year"] as const;
export type DatePrecision = (typeof DATE_PRECISIONS)[number];

/** "2011-08-26" to "26 August 2011", "2011-08" to "August 2011", "2011-Q3" to "Q3 2011", "2011" to "2011". */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function dateLabel(date: string): string {
  const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (day) return `${Number(day[3])} ${MONTHS[Number(day[2]) - 1]} ${day[1]}`;
  const month = /^(\d{4})-(\d{2})$/.exec(date);
  if (month) return `${MONTHS[Number(month[2]) - 1]} ${month[1]}`;
  const quarter = /^(\d{4})-(Q[1-4])$/.exec(date);
  if (quarter) return `${quarter[2]} ${quarter[1]}`;
  return date;
}

/** The precision a date string carries, from its shape alone. */
export function precisionOf(date: string): DatePrecision {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return "day";
  if (/^\d{4}-\d{2}$/.test(date)) return "month";
  if (/^\d{4}-Q[1-4]$/.test(date)) return "quarter";
  return "year";
}

import Link from "next/link";
import type { Drug } from "@/lib/schema";
import { availabilityFor, EML_CHECKED, STATUS_VIEW, type AvailabilityRow } from "@/lib/drug-availability";
import { StaticTable, type CellObj, type StaticColumn, type StaticRow } from "./filters/StaticTable";
import { AvailabilityAnswer, type AnswerLine } from "./AvailabilityAnswer";
import { TL } from "./T";
import { REGIONS } from "@/lib/region-meta";

const COLUMNS: StaticColumn[] = [
  { key: "where", label: "Where" },
  { key: "approved", label: "Approved", filterable: true, className: "whitespace-nowrap" },
  { key: "paid", label: "Who pays", className: "max-w-sm" },
  { key: "help", label: "Help with the cost", hide: "hidden md:table-cell", className: "max-w-xs break-words" },
];

/** One table row per region or country the corpus holds anything for (src/lib/drug-availability.ts). */
export function availabilityRows(rows: AvailabilityRow[]): StaticRow[] {
  return rows.map((r) => {
    const s = r.approval ? STATUS_VIEW[r.approval.status] : undefined;
    const approved: CellObj | undefined = r.approval && s
      ? { text: r.approval.year ? `${s.label} ${r.approval.year}` : s.label, v: s.label, chip: s.chip, href: r.approval.source, ext: !!r.approval.source, title: [r.approval.indication, r.approval.note].filter(Boolean).join(" · ") || undefined }
      : r.key === "WHO" ? undefined : { text: "Not recorded", v: "Not recorded", muted: true };
    return {
      id: r.key,
      where: { text: `${r.flag ? `${r.flag} ` : ""}${r.where}`, href: r.route, strong: true, sub: [r.named ? "Discussed on its page" : "", r.generic ? "Generics recorded" : ""].filter(Boolean).join(" · ") || undefined },
      approved,
      paid: r.paid.map((p): CellObj => ({ text: p.text, href: p.href, ext: !!p.href })),
      help: r.help.map((p): CellObj => ({ text: p.text, href: p.href, ext: !!p.href })),
    };
  });
}

/** What the answer line says for each region the header's switcher offers. */
function answerLines(rows: AvailabilityRow[]): AnswerLine[] {
  return rows.filter((r) => (REGIONS as string[]).includes(r.key)).map((r) => ({
    key: r.key,
    where: r.where,
    text: [r.approval ? `${STATUS_VIEW[r.approval.status].label}${r.approval.year ? ` ${r.approval.year}` : ""}` : "No approval recorded", ...r.paid.slice(0, 1).map((p) => p.text)].join(" · "),
  }));
}

/**
 * "Is this drug available in my country?": approvals, who pays and help with the cost, by region and country, from
 * the data the corpus holds. Rendered on every drug page that has at least one row; a drug with none says so.
 */
export function DrugAvailability({ drug }: { drug: Drug }) {
  const { rows, notRecorded } = availabilityFor(drug);
  if (!rows.length) return null;
  return (
    <div id="availability" className="mt-6 scroll-mt-24">
      <div className="kicker mb-2"><TL text="Is this drug available in my country?" /></div>
      <AvailabilityAnswer lines={answerLines(rows)} />
      <StaticTable rows={availabilityRows(rows)} columns={COLUMNS} noun="places" />
      <p className="text-xs text-muted mt-2">
        Approval is the regulator&apos;s decision for any cancer indication, with the year of the first; it is not a promise that a hospital stocks the drug or that your indication is covered.
        {notRecorded.length > 0 && <> Not recorded for {notRecorded.join(", ")}: a gap in our research, not a refusal.</>}
        {rows.some((r) => r.key === "WHO") && <> The WHO list is the model countries draw their own essential medicines lists from, as read on {EML_CHECKED}; it does not say whether your country lists the drug.</>}
        {" "}<Link className="underline" href="/regulatory/regions/">Compare products across regions</Link>.
      </p>
    </div>
  );
}

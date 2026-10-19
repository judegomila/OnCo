/** Earliest US or EU approval year recorded on a drug record, for the approval chip. */
export function approvedYearOf(e: { approvals?: Array<{ region: string; year?: number }> }): number | undefined {
  const years = (e.approvals ?? []).filter((a) => /^(US|EU|FDA|EMA)/i.test(a.region)).map((a) => a.year).filter((y): y is number => typeof y === "number");
  return years.length ? Math.min(...years) : undefined;
}

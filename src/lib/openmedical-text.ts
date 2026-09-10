/** Text normalisers shared by scripts/fetch-openmedical.ts and its tests; no data imports so the script can run first. */

/** One line, first sentence, no leading emoji or bracketed venue tag, no em-dashes, at most 160 characters. */
export function blurbOf(summary: string): string {
  let s = summary.replace(/\s+/g, " ").trim();
  s = s.replace(/^\[[^\]]*\]\s*/, "").replace(/^[^A-Za-z0-9"'(]+/, "");
  s = s.replace(/\s*[—–]\s*/g, ", ").replace(/,\s*,/g, ",");
  const sentence = s.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? s;
  const cut = sentence.length > 160 ? `${sentence.slice(0, 157).replace(/[\s,;:]+\S*$/, "")}...` : sentence;
  return cut.replace(/\.{4}$/, "...");
}

/** Registry licence lists use SPDX ids with some casing noise; NOASSERTION means the registry could not tell. */
export function licenceOf(list: string[] | undefined): string {
  const ids = (list ?? []).map((l) => l.replace(/^LicenseRef-/, "").replace(/^MIT-LICENSE$/i, "MIT").replace(/^APACHE2\.0$/i, "Apache-2.0"));
  const known = [...new Set(ids.filter((l) => l && !/^(NOASSERTION|UNLICENSE|OTHER-[A-Z]+)$/i.test(l)))];
  return known.length ? known.join(" / ") : "not stated";
}

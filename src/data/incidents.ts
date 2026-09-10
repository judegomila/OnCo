/**
 * Incident log for the automated feeds and the corpus' currency: what went stale or broke, when it was noticed,
 * and what fixed it. Newest first. Every entry needs a date and a pointer (file, commit or snapshot) that a
 * reader can check. Shown on /status/.
 */
export type Incident = { date: string; feed: string; title: string; detail: string; status: "open" | "resolved"; resolved?: string; ref?: { label: string; url: string } };

export const incidents: Incident[] = [
  {
    date: "2026-09-09", feed: "hta", status: "open",
    title: "NICE TA numbers that do not name the cited product",
    detail: "The first run of scripts/fetch-hta.ts fetched every technology appraisal page cited in src/data/coverage-uk.ts and found pages whose title names a different medicine (for example TA982, cited for enfortumab vedotin, is a terminated baricitinib appraisal). Those rows are flagged on /hta/ until the TA numbers are corrected.",
    ref: { label: "/hta/", url: "/hta/" },
  },
  {
    date: "2026-09-09", feed: "regional", status: "open",
    title: "EU rows recorded as under review that EMA lists as authorised",
    detail: "The first EMA register check found products recorded as under review in regional-approvals.ts that the register lists as authorised (camizestrant, tarlatamab, lurbinectedin, vimseltinib), one recorded as approved that EMA lists as withdrawn (pralsetinib), and products with an EPAR but no EU row. They are listed in public/regional/candidates.json and drafted as proposals; the EPAR_CHECKED stamp is not moved until the rows agree.",
    ref: { label: "public/regional/candidates.json", url: "/regional/candidates.json" },
  },
  {
    date: "2026-09-06", feed: "openalex-institutions", status: "open",
    title: "OpenAlex citation sums missing for institutions",
    detail: "The institution research-output run was rate-limited by OpenAlex, so works counts were collected but citation sums are null. The snapshot carries the note; re-running npm run fetch:openalex fills them.",
    ref: { label: "public/openalex/institutions.json", url: "/openalex/institutions.json" },
  },
  {
    date: "2026-08-26", feed: "fda", status: "resolved", resolved: "2026-09-08",
    title: "Daraxonrasib approval not reflected for two weeks",
    detail: "The FDA approved daraxonrasib for metastatic pancreatic adenocarcinoma on 26 August 2026. The corpus recorded it on 8 September, when the weekly fact check flagged an openFDA label for a product not recorded as approved. The FDA approvals feed (scripts/fetch-fda.ts) now surfaces OCE notices on /regulatory/ within a week of publication.",
    ref: { label: "FDA notice", url: "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-daraxonrasib-metastatic-pancreatic-adenocarcinoma" },
  },
];

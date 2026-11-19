# The weekly re-check

`.github/workflows/weekly-recheck.yml` compares what OnCo holds with what public sources say, once a week, and opens
one pull request for a person to read. The owner asked for it on 18 November 2026: "do the weekly recheck and have
that as a cron job". It never merges, ships or deploys.

It exists because the commonest serious fault found on cancer and drug pages was staleness. Pages written in September
were, by November, showing indications since withdrawn, approvals since granted, trials "awaited" that had reported,
and registry statuses that had moved.

No model takes part and no key or secret is used. Every row of the report is a comparison between a record and a
public source, made by `scripts/weekly-recheck.ts` and the six files in `scripts/recheck/`. Each file's header states
its rules, and each has unit tests that run from fixtures with no network.

## When it runs

Tuesdays at 05:17 UTC, and by hand from the Actions tab or with `gh workflow run weekly-recheck.yml`. One run at a
time. A new run updates the open pull request on the branch `bot/weekly-recheck` rather than opening a second, so the
report in it is always the latest reading.

## What it checks

| Check | Source | What is compared |
|---|---|---|
| Trial registry drift | ClinicalTrials.gov v2 API | Status, phase, enrolment, primary completion date and lead sponsor of every registration that is a trial record's own. |
| US approvals | FDA approval notices page; the FDA's four accelerated-approval tables | Notices newer than the newest US approval on a drug record; indications the FDA lists as withdrawn or converted that `src/data/accelerated-approvals.ts` does not; decision dates (PDUFA) that have passed with no outcome recorded. |
| EU approvals | The EMA's downloadable table of human medicines | The EU row of `src/data/regional-approvals.ts` against the EMA's status (authorised, conditional, withdrawn, refused); CHMP opinions on medicines of products OnCo holds. |
| US label changes | openFDA drug label API, DailyMed history service | For each DailyMed set id a drug record cites: the label's version and date against the one last read, and which of three sections changed (boxed warning, indications, dosage). |
| Guideline sources | The source addresses of `src/data/protocols/*` | Headers only: gone (404, 410), newly redirected, or a changed Last-Modified or ETag. |
| Dead links | Every address a record cites | One quarter each week, a different quarter each week, so the corpus is covered about monthly. 404 and 410 only. |

## What it changes by itself

Only generated data, through the generators that already own it:

- `src/data/trial-registry-status.ts`, by `scripts/fetch-registry-status.ts`, from the run's own registry reading.
  That script's rules stand: a result status (positive, negative, mixed) is never replaced, and an editor's "historic"
  label is kept.
  A change is held back when the record's own words would then contradict the status: a TL;DR, plain-language
  sentence or Chinese TL;DR that ends "now recruiting" beside a status of completed fails
  `src/data/trial-status-text.test.ts`, and rewriting a sentence is not a mechanical update. A held trial keeps the
  status it had and is listed in the report with the words in question, so the two can be corrected together.
- `src/data/trial-participation.ts`, by `scripts/refresh-trial-participation.ts --stale-updated`: studies whose status
  differs, or that the registry has updated since they were read. A linked study a record only cites is not attached
  to it (`ownRegistryIds`), and the script stops if one registration is attached to two records that
  `SHARED_REGISTRATIONS` does not name. When it stops, the report says so and names the records.
- `src/data/recheck/label-versions.json` and `src/data/recheck/guideline-headers.json`: what was read this week, kept
  so next week's run can say what changed. The site does not read them.
- `docs/proposals/weekly-recheck-latest.md` and `docs/proposals/weekly-recheck-latest.json`: the report.

The workflow stages exactly those paths. Anything else a run touches is dropped and named in the pull request, and
`scripts/change-class.ts` is run over the staged change: if it ever finds a product file, no pull request is opened.

## What it only reports

Everything else. In particular it never edits a record's text, a drug's approvals or regulatory events, a row of
`regional-approvals.ts`, a protocol or a link. Each row of the report gives the record, what OnCo says, what the
source says, the source address and the source's date, graded high, medium or low. A row says the two sides differ.
It does not say which is right: a person or an agent reads the source and decides.

The rows most worth reading first:

- status changes that were held back, and one registration carried by two records, because both stop an update
  that would otherwise have been made;
- trials that moved to completed, terminated or withdrawn, or posted results, since the record was last checked. The
  generator corrects the status; the sentence that says "recruiting" or "results are awaited" is still on the page,
  and the row quotes the words;
- indications the FDA lists as withdrawn that OnCo shows as open;
- decision dates that have passed with no outcome recorded;
- EU rows that disagree with the EMA, and CHMP opinions awaiting the Commission;
- labels whose boxed warning or indications changed.

`src/data/accelerated-approvals.ts` is deliberately not regenerated here, although `scripts/fetch-accelerated.ts
--apply` would do it: that file writes regulatory events onto products, and a withdrawal needs the product's own text
read against it in the same change.

## Limits

- **A blocked source is reported as blocked.** A 401, 403 or 429, a bot-challenge page or a challenge header is
  recorded and left alone. Nothing is retried with different headers, and a refusal is never counted as a dead link
  or a change. A host that answers "too many requests" is given thirty seconds before its next address, and a host
  that refuses five requests in a row is not asked again in that run. On the first run PubMed answered 208 addresses
  and then rate-limited the rest of its 1,300, so most PubMed links in a slice go unchecked. `www.fda.gov` has turned
  plain scripts away before; when it does, the US check says the page refused the request and compares nothing.
- **Polite by construction.** One request at a time per host with a pause between (0.6 to 1.5 seconds by source), a
  handful of hosts at once, HEAD before GET, and a user agent that names the project. A DOI is checked at doi.org and
  not followed to the publisher.
- **The guideline check is cheap on purpose.** A changed header says a publisher touched a page. It does not say a
  new edition exists, and no attempt is made to find one by reading publishers' sites. Two headers known to change
  without the document changing are not compared: an ETag on a web page, and a Last-Modified that was under two days
  old when read.
- **Labels are covered only where a record cites a set id.** A record that links a DailyMed search page, or an
  openFDA search by brand name, is not covered. The first reading of a label has nothing to compare with, so it is
  listed only when the label is newer than the record.
- **The EMA table has one row per medicine.** An opinion on a new use of a medicine already authorised is not in it.
- **A notice is taken as held** when the record carries its address, a US event on its day, or its date written out.
  A record that describes an approval without any of the three is listed, and may turn out to be up to date.
- **CI does not run on the pull request by itself**, because workflows do not start on a pull request opened by the
  workflow token. The gate result in its description comes from the run. Close and reopen it to run CI.
- **It overlaps two older workflows.** `links.yml` probes every address weekly and `refresh-regional.yml` compares the
  EMA table weekly, and both merge their own snapshots. This one does not replace them: it reports to a person and
  merges nothing.

## The two jobs

| Job | Runs repository code | Can write | What it does |
|---|---|---|---|
| `recheck` | yes | no (`contents: read`, no saved credentials) | Installs, runs the six checks and the generators, classifies the change, runs the same gates as CI, uploads the change as a patch. |
| `propose` | no | yes | Applies the patch through the path list and opens the pull request, labelled `needs-review`, `recheck` and `automated`. |

Every action is pinned to a commit. `scripts/recheck/workflow.test.ts` reads the workflow and fails if an action is not
pinned, if a secret is named, if the writing job runs repository code, or if a merge step appears.

## How to pause it

Any one of these:

- set the repository variable `WEEKLY_RECHECK_PAUSED` to `true` (Settings, Secrets and variables, Actions, Variables,
  or `gh variable set WEEKLY_RECHECK_PAUSED --body true`). Both jobs are skipped until it is removed or set to
  anything else (`gh variable delete WEEKLY_RECHECK_PAUSED`);
- `gh workflow disable weekly-recheck.yml`, and `gh workflow enable weekly-recheck.yml` to resume.

To stop a run in progress: `gh run list --workflow weekly-recheck.yml`, then `gh run cancel <id>`.

## Running it by hand

```
npx tsx scripts/weekly-recheck.ts                  # all six checks; writes the report, changes no data
npx tsx scripts/weekly-recheck.ts --only=us,eu     # some of them
npx tsx scripts/weekly-recheck.ts --apply          # also write the generated data listed above
npx tsx scripts/weekly-recheck.ts --record         # keep every answer from the sources
npx tsx scripts/weekly-recheck.ts --replay         # compare again from the kept answers, asking no source anything
```

`--record` and `--replay` are for changing a rule: take one reading, then work on the comparison without asking the
sources again.

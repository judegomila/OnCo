# X research monitor

The monitor polls a small allowlist of official accounts and keeps a **private editorial
queue**, separate from OnCo's publishing pipeline. The seed is [MSK](https://x.com/MSKCancerCenter).
It does not create GitHub issues or records, write under `src/data/` or `public/`, or launch a deployment.

## Run without X access

With Node 22.18 or later, from the repository root:

    node --test scripts/x-research-monitor.test.mjs

The fixture tests make no live requests and incur no charges.

## Enable collection only on an approved persistent runner

1. Confirm an X developer app has access to the official [User Posts timeline](https://docs.x.com/x-api/users/get-posts)
   and [username lookup](https://docs.x.com/x-api/users/get-user-by-username). Review
   [X API pricing](https://docs.x.com/x-api/getting-started/pricing) and set an app spending cap.
   Never put a bearer token in a commit, command argument, issue, or log.
2. Inject `X_RESEARCH_BEARER_TOKEN` through the runner's secret manager and set
   `ONCO_X_MONITOR_ENABLED=1` only after approving live usage. With either missing,
   the command stops before any network or filesystem writes.
3. Set `ONCO_X_MONITOR_STATE` to a private, durable path (default:
   `.cache/x-research-monitor/queue.json`, ignored by Git). Use the same state for each run.
   Schedule this on **one** dedicated runner, for example twice daily (cron below uses the
   runner's existing secret injection and a durable working directory):

       21 8,20 * * * cd /srv/onco && /usr/bin/node scripts/x-research-monitor.ts

   Use the actual current absolute Node path. The command takes an exclusive lock on
   the queue; if the runner was killed and left a lock, verify no writer is active
   before clearing that lock. Back up and archive queue entries off-repository, without
   deleting the checkpoint or editing a state file during a run.
4. `ONCO_X_MONITOR_ACCOUNTS` optionally replaces the default allowlist: a JSON array of
   `{"handle":"MSKCancerCenter","domains":["mskcc.org","www.mskcc.org","ir.sellaslifesciences.com"]}`
   objects. Verify each account on its organisation's site before adding it and allow
   only exact official editorial or research source hosts. The seed sponsor host lets
   MSK's newsroom link identify the REGAL trial. Shorteners never receive our requests.
   The scanner reads only X-supplied expanded/unwound public URLs, strips query strings
   and fragments on landing-page links, follows at most one link across allowlisted
   hosts, and does not follow HTTP redirects. It reads at most 512 KiB per landing page.
5. The first scan is limited to 24 hours. The script checks at most two pages of ten
   posts per account by default (1–10 pages via `ONCO_X_MONITOR_MAX_PAGES`). A remaining
   page or X error preserves the prior cursor; investigate the volume, budget and code
   before rerunning rather than repeatedly billing a failed batch. It does not auto-retry.

## Review candidates

- `resolved-source-review`: the DOI/PMID or NCT was verified by exact ID at Crossref,
  Europe PMC or ClinicalTrials.gov. Trial records propose only registry-named maybes
  for products, technologies and sponsors. An exact confirmed OnCo trial match is
  linked; the absence of a link is not evidence of absence. Check aliases, exact
  identifiers, sponsors, device names and the rest of the corpus before proposing a
  new object. Indexed titles and registered study facts do not verify social clinical
  outcomes. For example, confirm a sponsor readout against its actual results and
  give appropriate weight to its design and publication status.
- `unverified-lead`: open the post and approved publication links yourself. The
  monitor does not use these lead links or post text as evidence. Publisher links without
  resolvable identifiers, ambiguous matches, unavailable sources and unrelated posts
  that pass the cheap topical filter can land here. Never send raw post text or patient
  data into an OnCo issue, and do not use social copy as a citation.

After editorial verification, follow OnCo's [contribution process](../CONTRIBUTING.md),
starting with a correctly sourced issue. Reuse existing papers and trials. Annotating the
private queue never authorizes a data write. To stop collection, disable the scheduler
or remove the enable flag; keep the checkpoint to avoid rereads on a later restart.

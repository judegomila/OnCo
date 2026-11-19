# Research lead monitor

`scripts/research-lead-monitor.ts` watches where oncology approvals, trial readouts and guidelines are announced,
and keeps a **private review queue** of what it finds. It needs no account, no key and no payment. It builds on
the X monitor (`scripts/x-research-monitor.ts`, [X-RESEARCH-MONITOR.md](X-RESEARCH-MONITOR.md)) and keeps its rules.

## The rules

- **An announcement is a lead, never evidence.** A record that follows is written from the paper, the registry
  entry, the regulator's notice or the label, read as raw text. Nothing in a record, a commit message or the
  changelog says an announcement prompted it.
- **No announcement wording is stored.** Text is read in memory to find identifiers and names, then dropped. The
  queue holds identifiers, source URLs, dates and the OnCo records an item may concern. The title beside a
  resolved identifier is the one Crossref, Europe PMC or ClinicalTrials.gov returns for it.
- **Leads are deduplicated by stable identifier**: DOI, PubMed id, NCT number. One paper seen on six channels is
  one candidate with six leads.
- **Nothing is published.** The script writes no record, opens no issue and starts no deploy.
- **The queue is private.** It lives outside the repository and the script prints counts only. It is not run by
  a GitHub workflow, because a public repository's Actions logs and artifacts are public.

## Can X itself be read for free? No

Read on 18 November 2026, as raw text, from X's own developer documentation:

- [Pricing](https://docs.x.com/x-api/getting-started/pricing): "The X API uses **pay-per-usage** pricing. No
  subscriptions—pay only for what you use." Credits are bought in advance: "Purchase credits upfront in the
  Developer Console. Credits are deducted as you make API requests." Reading is charged per item returned:
  "**Posts: Read** $0.005 per resource" and "**User: Read** $0.010 per resource". The page lists no free tier and
  no free monthly allowance. Its only cap is an upper one: "Pay-per-usage plans are capped at **3 million Post
  reads per monthly billing cycle**."
- [Rate limits](https://docs.x.com/x-api/fundamentals/rate-limits): `GET /2/users/:id/tweets` allows 10,000
  requests per 15 minutes per app and 900 per user. The same page says the limits are not an allowance: "Rate
  limits and billing are separate" and "You can be within rate limits but still incur usage costs".
- [Getting access](https://docs.x.com/x-api/getting-started/getting-access): a developer account is needed. "Visit
  console.x.com and sign in with your X account", accept the Developer Agreement and Policy, and create an app.
  The page states no charge for the account or the app; the charge is for the reads.
- [Free credit incentives](https://docs.x.com/x-api/getting-started/free-credits): the only free credit is tied
  to paying. "$20 of free API credits, added to your account's free-credit balance after you complete your first
  purchase of API credits. Adding a card on its own no longer qualifies (updated October 13, 2026)." The credits
  "expire 3 months after they are granted", and the page says the incentives "are currently rolling out".

So a developer account is free to open, and a timeline cannot be read without buying credits. The X monitor
therefore stays off by default, as it was. What it would cost and what the owner would do to switch it on are in
[X-RESEARCH-MONITOR.md](X-RESEARCH-MONITOR.md).

This project does not read X any other way. No logged-out pages, no mirrors, no syndication or embed endpoints
used as an API, no browser automation, nothing that goes around a login wall, a bot check or a rate limit.

## What it reads instead

The organisations that post on X publish the same announcements on channels meant for programs. The list of
organisations is `scripts/research-lead-accounts.ts`, and the sources are derived from it.

| Type | What | Terms it runs under |
|---|---|---|
| `feed` | RSS and Atom feeds of regulators, journals, societies, agencies, centres, trial groups, charities, trade press and three company newsrooms | The host's robots.txt, read before every fetch |
| `bluesky` | The account's own posts through `public.api.bsky.app`, `app.bsky.feed.getAuthorFeed` | Bluesky's [API hosts](https://bsky.network/docs/api-directory) page: public endpoints "do not require authentication" and are to be called "preferably via the https://public.api.bsky.app hostname". Its [rate limits](https://bsky.network/docs/rate-limits) page: "These API services have generous rate-limits." The host's robots.txt: "Crawling the public parts of the API is allowed ... Up to a handful concurrent requests should be ok." |
| `pubmed` | Two PubMed searches through NCBI E-utilities: randomised and phase 3 cancer trials in eleven journals, and cancer guidelines | E-utilities is NCBI's interface for programs. This makes two requests a run, a second apart, with no key |
| `registry` | Phase 3 cancer trials whose results were first posted in the window, through the ClinicalTrials.gov data API | The documented data API (`/api/v2/studies`), one request a run. The site's robots.txt disallows `/api/` to crawlers, which covers its RSS path for a search, so no feed of it is polled |
| `oce` | The FDA Oncology Center of Excellence approvals table, which has no feed | robots.txt, including its 30-second crawl delay |

A run makes one request per source, at most one request a second to any host, and honours a longer crawl delay
where robots.txt asks for one. Bluesky gets one request per account per run, one at a time. Feeds are fetched
with `If-None-Match` and `If-Modified-Since`, so an unchanged feed costs a 304. The user agent is generic and
carries no name, address or project: `research-lead-monitor/1.0 (oncology reference; automated feed reader)`.
Set `ONCO_LEAD_MONITOR_UA` to replace it if a contact URL is wanted.

Robots.txt is honoured for feeds and pages. A missing robots.txt permits, an unreachable one forbids, and a
redirect is followed only over https and only where the next host permits. The identifier resolvers (Crossref,
Europe PMC, ClinicalTrials.gov) and the three search interfaces above are documented data APIs and are called
under their own terms.

### What is not read, stated plainly

- **NICE** offers no feed, and its syndication API needs a licence. Read it by hand.
- **NEJM, The Lancet Oncology and JCO** close their feed paths in robots.txt, and **Blood** has no public feed.
  Their trials arrive through the PubMed search, a few days later than the journal's own announcement.
- **The BMJ**'s feed redirects to a host whose robots.txt disallows it; its Bluesky account is read.
- **The ICR** disallows all automated readers; **the Royal Marsden, ASCO, Endpoints News and Fierce Biotech**
  answer a program with HTTP 403. Where one of them has a Bluesky account, that is read. None is worked around.
- **MSK, MD Anderson, Dana-Farber, Gustave Roussy and Peter Mac** have no newsroom feed. MD Anderson, Gustave
  Roussy and Peter Mac are read on Bluesky and Dana-Farber through its Insight blog feed. **MSK is on X only.**
- **Company newsrooms** mostly refuse programs or offer no feed. Of the industry sponsors with the most phase 3
  trials in the corpus, three had a feed that answered.

## Running it

    npx tsx scripts/research-lead-monitor.ts --verify     # does every source answer, permit and parse? writes nothing
    npx tsx scripts/research-lead-monitor.ts              # read every source, update the private queue

Options: `--days=30` (how far back a first run looks), `--types=feed,bluesky,pubmed,registry,oce`,
`--max-items=60` (per source per run), `--max-evidence=150` (identifier resolutions per run) and
`--max-landing=40` (pages read on an organisation's own host when an item carries no identifier). When a budget
runs out the run stops taking items from that source and leaves its checkpoint where it was, so the next run
continues from there.

The queue directory is `ONCO_RESEARCH_LEADS_DIR`, by default `~/Library/Application Support/onco-research-leads/`
on macOS and `~/.local/state/onco-research-leads/` elsewhere, created with mode 0700. A directory inside the
checkout is refused unless git ignores it. In it:

- `queue.json`: the candidates and one checkpoint per source (validators, what has been seen, how the last
  attempt went). The queue and its checkpoints are one file, replaced whole after every source and under a
  lock, so a run that is cut short loses at most the source it was reading.
- `queue.md`: the same candidates as a checklist.
- `x-queue.json`: the X monitor's queue, if it is ever enabled.

A failed or refused source keeps its old checkpoint and is reported in the counts. A run that was killed leaves
`queue.json.lock` behind; check that no run is writing, then remove it. Run it once a day on one
machine; there is nothing to gain from more.

## Reading the queue

Each candidate has a state, a priority and a standing.

- `regulator-notice-review` (priority 1): a notice on a regulator's own site. The notice is a primary source;
  open it, then find the label or the assessment report it points to.
- `resolved-source-review`: a DOI, PubMed id or NCT number confirmed by exact match. Priority 2 where it is a
  registry record or names a drug or trial OnCo holds, 3 otherwise. A resolved title proves the paper exists and
  nothing about what an announcement said of it: read the abstract before using a figure.
- `unverified-lead`: no identifier was found or none resolved. Open the link yourself. It stays here until a
  primary source is found.

Standing says what the corpus already has: `identifier-held` (a record carries this DOI, PubMed id or NCT number,
so supplement that record), `names-existing-record` (a drug or trial OnCo holds is named, so this probably
updates it) or `no-match`. No match is not proof of absence: check aliases, brands and `npm run dedupe` before
writing a new record.

After verification, follow [CONTRIBUTING.md](../CONTRIBUTING.md). Ticking a line in the queue authorises nothing.

## The account list

`scripts/research-lead-accounts.ts` is the allow-list for this monitor and for the X monitor. Every handle and
feed in it was taken from the organisation's own pages, with the page recorded beside it, and never from memory:
a handle recalled from memory is the same error as a DOI recalled from memory.

- An X handle is listed only where the organisation's own site links it. Sites that refuse programs have none
  listed until someone reads the site by hand.
- A Bluesky handle is listed where the organisation's site links it, or where the handle is the organisation's
  own domain, which Bluesky verifies.
- Individual clinician-scientists are absent. The rule for a person is that their own institutional page links
  the account. Thirty profile pages were read and none linked a personal account.
- Companies are chosen by rule: industry sponsors ranked by phase 3 trials in the corpus, kept where the
  company's own newsroom offers a feed or links an account, capped at fifteen.

To add an organisation: find the handle or the feed on its own site, add the row with the page that links it, and
run `--verify`. `scripts/research-lead-monitor.test.ts` checks the list's shape; only a person can check a link.

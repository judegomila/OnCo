# The weekly gap fill

`.github/workflows/fill-gaps.yml` drafts records for gaps in the corpus once a week and opens one pull request for a
person to read. The owner added the `ANTHROPIC_API_KEY` secret on 10 November 2026 and said on 16 November "turn on
the weekly gap fill automation". It never merges, ships or deploys.

## What it does

It runs on Thursdays at 04:23 UTC, the morning after the universe refresh, and by hand from the Actions tab or with
`gh workflow run fill-gaps.yml` (inputs: `max_items`, 1 to 15, default 10; `model`). It does nothing, and spends
nothing, when the standing issue "Freshness: stale sources and companies to add" is closed, or while the pull request
from the last run is still open.

There are three jobs. No job holds two of these three things: the API key, code the model wrote, a token that can
write to the repository.

| Job | Has the key | Runs what the model wrote | Can write | What it does |
|---|---|---|---|---|
| `fill` | yes | no | no | Claude Code reads the issue and the gap audit, reads primary sources, and drafts records under `src/data`. |
| `check` | no | yes | no | Applies the patch, checks the change class (`scripts/change-class.ts`), runs the same gates as CI. |
| `propose` | no | no | yes | Applies the same patch and opens a pull request labelled `needs-review`, `gap-fill` and `automated`. |

A data file here is TypeScript, and the gates import it. So running a gate over files the model has just written is
running the model's code. That is why the model cannot run the gates itself, and why they run in a job that has no
key and a token that can only read.

Only `src/data/**` and one report, `docs/proposals/fill-gaps-latest.md`, can reach the pull request. The `fill` job
builds its patch by comparing those two places with a copy taken before the model ran, and both later jobs apply it
through the same path filter.

## What the model can and cannot reach

The model job is given these tools and no others (`--allowedTools` in the workflow):

- `Read`, `Glob` and `Grep`, Claude Code's own file tools, which start no process;
- `Edit` and `Write`, on `src/data/**` and the report only;
- one command, `/opt/onco-fetch/fetch-allowed.sh`, a copy of `scripts/ci/fetch-allowed.sh` installed outside the
  checkout and owned by root before the model starts.

It has no `curl`, `wget`, `git`, `gh`, `npm`, `npx`, `node` or `python`, and no web search or web fetch tool. No
permission mode is set, so a call to anything not on the list is refused rather than judged.

The fetch script reads one https page and prints it. It can read from the hosts in `scripts/ci/fetch-allowlist.txt`
and their subdomains: regulators (FDA, EMA, NICE, WHO, IARC, NCI, CDC, DailyMed), literature and registries (PubMed,
PMC, E-utilities, Crossref, Europe PMC, ClinicalTrials.gov, OpenAlex) and five societies and agencies (ESMO, ASCO,
MASCC, NCCN, IAEA). It refuses, before making any request:

- any host that is not listed, any scheme but https, any port but 443, a URL with a user name in it, an IP address;
- any other argument, so there is no way to give it a method, a request body, a header, a cookie or a proxy;
- a redirect to a host that is not listed. It follows redirects itself, one hop at a time, and checks each.

So it can read, and it cannot post anything anywhere. `scripts/ci/fetch-allowed.test.ts` holds it to this, and
also reads the workflow: it fails if the model is given a second command, if the key appears outside the
`fill` job, if a gate runs inside it, or if an action is not pinned to a commit.

Things it cannot do that a person filling gaps can:

- **Company websites are not reachable.** A company record can be written only from what a regulator, a registry or
  a paper states. Where a required field needs the company's own site, the model skips the item and names the host in
  its report. Adding a host is a pull request to the allow-list.
- **www.fda.gov turns away plain scripts.** On 16 November 2026 it answered a request from this script with its
  "abuse detection" page, while ClinicalTrials.gov, Crossref and NICE answered normally. The other FDA hosts were
  not tried. The script sends curl's default headers on purpose, so this is left as a limit rather than worked round.
- **The model cannot run `npm run validate`.** A record that fails a gate is found in the `check` job, and the pull
  request says which gate failed. The pull request is still opened, so the work is not lost.

## What is still at risk

- The key is in the `fill` job's memory, as it must be to call the API. A page crafted to instruct the model could
  still get it to put text into a URL sent to one of the listed hosts, or into a data file. The first reaches only a
  regulator's or registry's server log. The second is checked: a step refuses to upload a patch that contains the key
  as written or in base64. A key split up or encoded some other way would pass that check and appear in a public pull
  request. This is unlikely and not impossible. If a report or a record ever contains a long string that is not a
  source, rotate the key.
- The restriction on tools is enforced by Claude Code and the action, pinned at one commit. Read the tool rules again
  before moving that pin.
- Workflows do not start on a pull request opened by the workflow token, so CI does not run on the gap-fill pull
  request by itself. The gate result in its description comes from the `check` job. Close and reopen the pull request
  to run CI on it.
- The limit on fetching is a limit on tools, not on the network. The action's own repository runs its model jobs on a
  runner that filters outbound traffic against a list of hosts. A filter of that kind would hold even if the tool
  rules failed, and is the next step if this workflow is ever given more to do.

## How to pause it

Any one of these:

- set the repository variable `FILL_GAPS_PAUSED` to `true` (Settings, Secrets and variables, Actions, Variables, or
  `gh variable set FILL_GAPS_PAUSED --body true`). All three jobs are skipped until it is removed or set to anything
  else (`gh variable delete FILL_GAPS_PAUSED`);
- `gh workflow disable fill-gaps.yml`, and `gh workflow enable fill-gaps.yml` to resume;
- leave the open gap-fill pull request unmerged: no new run starts while it is open.

To stop a run in progress: `gh run list --workflow fill-gaps.yml`, then `gh run cancel <id>`.

## How to rotate the key

Do this at once if a run reports "The patch contains the API key", or if anything in a run's output looks like a
secret. Otherwise do it on whatever schedule the owner keeps for keys.

1. Pause the workflow (above).
2. In the Anthropic Console, under API keys, create a new key for this workflow and delete the old one. Deleting the
   old key is what stops a leaked copy from working.
3. Save the new value as the repository secret: Settings, Secrets and variables, Actions, `ANTHROPIC_API_KEY`,
   Update. From a terminal, `gh secret set ANTHROPIC_API_KEY` asks for the value without showing it. Do not pass the
   value on the command line, put it in a file in the repository, or paste it into a chat or a commit message.
4. Remove the pause, and start one run by hand to confirm the first step ("Check the API key is set") passes.

The key should be one made for this workflow alone, so that rotating it breaks nothing else. Where the Console
allows a spending limit on it, set one.

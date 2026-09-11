# Launch checklist (owner away 10 to 15 September 2026)

The owner returns in five days and expects the site ready to launch and maximised. Every improvement tick
(30-minute cron) should pick the next unchecked item, ship it through the gated chain, and tick it here.

## Ship chain (never skip)
validate → typecheck → lint → test → `rm -rf out && npm run build` (gate on exit code and `out/index.html`,
`out/coverage/us/index.html`) → commit → `git push origin HEAD` → `vercel deploy --prod --yes --archive=tgz`.
Merge finished worktree agents before the chain; never `cd` into a worktree; never `vercel link`.

## Owner asks in flight (agents)
- [x] Accurate 3D molecules (ball and stick) and protein ribbons (Molecule3D): merged 10 Sept, deploying
- [x] Complementary approaches with evidence grades; hair-loss page under Living with cancer: merged 10 Sept
- [x] Whole-site language switch (chrome dictionary, 8 languages, RTL for Arabic): merged 10 Sept; new nav items need entries in src/lib/i18n/nav/*.ts or the i18n test fails
- [x] Graph explorer redesign (SVG, kind icons, side panel): merged 10 Sept
- [x] MCP server and CLI (packages/onco-cli, packages/onco-mcp), /api/ section, docs/ACCESS.md: live 10 Sept; owner publishes to npm (name clash with mcp/package.json "onco-mcp" to resolve)
- [x] Homepage front schematics quality (renderer depth cues, mesh rework): merged 10 Sept
- [x] Completeness denominators per kind (/completeness/, roadmap panel, fetch:universe): merged 10 Sept, 28 denominators, headline 841 of 2,578 listed items
- [x] India deep dive (institutions, companies, CDSCO region, trials, people, /countries/in/): merged 10 Sept
- [x] China deep dive (/countries/cn/, 20 drugs, 20 companies, 18 trials, 17 people): merged 10 Sept
- [ ] Glossary Wikipedia links and aliases; schematics wave 3; KOL people; research leaders batches; summaries chunks; portraits (wired and live 10 Sept, 77 photos)

## Owner asks not yet started
- [ ] Google Search Console verification (needs the owner's TXT token; IndexNow key is live but the host verification was still pending on 10 Sept, retry `api.indexnow.org` each tick)
- [ ] www.onco.cc: confirm the domain is attached in Vercel so the redirect in vercel.json applies (curl returned 200 on 10 Sept, not 308)
- [ ] Complete coverage: NCI-designated centres and 93 global centres (merged 10 Sept); paediatric and rare cancers (merged 10 Sept, NCI list 100%); screening and diagnostic tests (merged 10 Sept, 72 tests); EU and Japan approvals for every approved drug (merged 10 Sept, gauge clears)
- [ ] Time estimate and speed-up plan written for the owner (docs/LAUNCH.md bottom)
- [ ] Repo housekeeping the owner must do: GitHub Discussions "Objects" category; delete stray Vercel project agent-aa17c7ae82bcaf068

## Standing rules (see memory)
Plain English first, UK spelling, no em-dashes in copy, no "as of", no invented numbers, corrections via issue form only,
light theme default, pink accent, no red buttons, never "spike", survival figures behind a click, solution and mechanism first,
every problem paired with what is being done, Global region default, icons everywhere, tooltips on technical terms,
data licence CC BY-NC 4.0 with commercial licences (attribution "Data from OnCo (onco.cc)").

## Time estimate and how to go faster (written 10 September 2026)

What "finished" means here: every owner ask above shipped, and the completeness dashboard showing near 100% on the
defined lists (NCI cancer types, NCI-designated centres, FDA and EMA approved oncology drugs, top journals) with
people, approvals, schematics, summaries and plain-language text on every record.

Rough sizes, at the pace of the last two days (about 8 to 12 agents finishing per day, each landing 50 to 400 records
or one feature):
- Owner feature asks in flight (3D rendering, language, graph, MCP/CLI, complementary care, completeness, India, China): 1 to 2 days.
- Coverage to the defined denominators (cancer types, centres, tests, approvals, people per institution): 2 to 3 days.
- Quality gauges to zero (summaries, simple layer, translations, schematics, term Wikipedia, target prevalence): 2 to 4 days, in parallel.
- Google indexing: hours once the owner pastes the Search Console TXT token; IndexNow is live and retried each tick.

So the five-day window is enough for the asks and for the defined lists, if the machine stays under a load of about
15 and agents are told to commit early and run one test pass at the end.

Speed-ups that work:
1. Fan out by list, not by topic: give each agent a fixed list of ids to fill (for example 40 institutions) so none re-scan the corpus.
2. Merge every 30 minutes and run one build per merge round rather than one per agent; the build is the bottleneck (about 8 minutes).
3. Keep agents off shared files (schema.ts, nav.ts, EntityDetail.tsx); data-only agents almost never conflict.
4. Resume stalled agents with "commit what you have; single test pass at the end" instead of restarting.
5. Let the fetchers do the bulk work (EMA, PMDA, ClinicalTrials.gov, OpenAlex, Wikidata) and use agents for judgement, wording and sourcing.
6. The remaining owner-only items (Search Console token, Vercel stray project, Discussions category) each take under five minutes.

## The plan the owner endorsed on 10 September ("make sure we see this through")

Tier 1, features in flight: flags and icons in filters, submenu icons, breadcrumbs, target thumbnails, CI fix,
licence (done); graph explorer, homepage schematics, ball-and-stick molecules and protein ribbons (today to
tomorrow); whole-site language, MCP and CLI, complementary and hair-loss area, completeness dashboard (tomorrow);
India and China deep dives (1 to 2 days). Then a day of review and polish.

Tier 2, completeness against known lists: 72 NCI centres with directors; every FDA and EMA approved oncology drug
(merged 10 Sept: NCI list fully matched, 91 records added); every institution with at least one person; summaries, plain-language
sentences, glossary Wikipedia links and schematics to 100%; regional approvals for every approved drug across
US, EU, UK, Japan, China, India. Target: every defined list at 90%+ and most at 100% by 15 September.

Tier 3, open-ended: trial outcomes for every trial, portraits for every person, body-text translations, every paper
that matters; continues on weekly workflows and the 30-minute ticks. The completeness page shows where each stands.

Speed levers in use: bulk ingestion from open sources with schema mapping, enriched afterwards by summary agents;
merge rounds every 30 minutes with one build per round; agents kept off shared files. Waiting on the owner: Search
Console token, licensing contact email, stray Vercel project, Discussions category.

Caveats already stated to the owner: a launch review after this much parallel change will find things to fix (plan a
day); earlier CC BY 4.0 releases cannot be relicensed, CC BY-NC applies from this version onward.

## Snapshots refreshed 10 Sept
Logos 882 entries (166 new), trial snapshots for all 530 products (17 changes), paper snapshots for 1,140 entities. Weekly workflows keep these current.

## Graph health after 10 Sept linking pass
Orphans 84 (from 2,185), records without a source 415 (from 2,974), backlink gaps 355 (from 595). Remaining orphans are regional hospitals, news-outlet collections and five journals.

## Gauges after the 10 Sept evening round
- Plain-language sentences 5,519 of 6,303 (88%); translations in all eight languages 4,513 after five waves (fifth wave merge pending the current deploy; sixth wave running; the long tail is people and ideas); people with papers 946 of 1,152; institutions with at least one person 552 of 557 (the five left are documented as unsourceable); technology schematics 411 of 411 specific after eight waves; trial outcomes: 5 more filled, 33 left are genuinely unreported; glossary terms 80 without Wikipedia, 61 documented as having no certain source; molecules gauge clear (409 of 530 products have a structure, the rest are explained placeholders: cells, vaccines, tests, devices); roadmaps 29 (every front covered plus paediatric, global access, trial modernisation); MEDLINE oncology journals 223 of 223 and KEGG cancer maps 28 of 28 (completeness scopes at 100%); short summaries down from 1,589 to 475 (institutions, companies, trials and people all clear; terms, pairings, ideas, collections and a few journals remain, agent running); kind-size gauge 17 of 18, the last is fronts at 19, a deliberate taxonomy not to be padded; regional approvals gauge clear; NCI cancer types and NCI drug list 100% matched.
- Still open for the owner's return: reviewed pages 0 (needs named reviewers), Google Search Console token, npm publish of the CLI and MCP packages, deleting the stray Vercel project, Discussions category.

## Gauges at the close of 10 Sept (corpus 6,689 entities)
sources 6,297; backlinks 5,975 of 6,670; orphans 7 of 6,670 after the second linking pass (all seven are news-source collections nothing in the corpus cites); backlink gaps 539, mostly leaders whose only relation is their institution; summary gauge clear: every record has a summary of 300 characters or more; schematics gauge clear: 411 of 411 technologies have a specific animated schematic after eight waves; target prevalence 91 of 99 (the eight left carry notes explaining why no positivity rate exists); trial outcomes 418 of 451 (the 33 left are unreported); people with papers 1,045 of 1,309 (the 264 left are patients, advocates, donors, administrators and regulators, or names too common to match with certainty); term Wikipedia 525 of 605 (rest documented); translations 4,513; provenance 6,258 (weekly job); logos 882 of 1,347 (fetch rerunning); reviewed 0 (needs named humans); kind-size 17 of 18 (fronts kept at 19 on purpose).

## Review and polish phase (started 10 Sept, late)
- [x] Launch review agent: 13,976 pages crawled; 5 broken link targets fixed (new /coverage/ index); dashes, "as of" and "spike" removed from component copy; /hub/ canonical to /roadmap/; newsletter descriptions; 2 heading jumps; 9 tables wrapped for mobile. Merged 10 Sept.
- [x] Duplicate records merged 10 Sept: cstone, hengrui, pancan, 16 journals that also existed as src-* collections, seven reversed-name people, three "-term" twins and nine more the scan found; removed ids kept as aliases; vercel.json path redirects do not fire on this project, so scripts/build-redirect-stubs.ts writes static stub pages for each (live and resolving). Left for a human look: gap-fill collections versus institutions for ALSF, St Baldrick's, MRA and PCF, and bcrf/macmillan versus their src-* sources; dashes, "as of" and "spike" cleared from data text on 10 Sept (185 strings in 41 files) with a house-style test that exempts only companies, journals, people, terms and sources until the duplicate-merge agent lands; still yours: the hub idea titled "As of dates" (a feature name), the `spikes/` directory name and `spike` tag, the corrections page linking the repo root
- [x] Ask OnCo quality pass: 60 new natural questions score 100% (from 74%); new intents for evidence grade, regulator approvals, companies, investors, roadmaps and journals; survival figures kept out of every answer sentence; old floors kept. Merged 10 Sept.
- [ ] Owner's day of review on return: click through the eight-language switch and RTL, the 3D molecules on a phone, the graph explorer, the startups and completeness pages

## Deploy note (10 Sept, late)
One `vercel deploy` failed after upload with "Not authorized" (reason deploy_failed) while the token still worked; the next chain redeployed the same tree. If it recurs, check the Vercel dashboard for the inspect URL in /tmp/vercel-tick.log.

## Merge lessons (10 Sept)
- Agents working in parallel add the same drug or person; run a duplicate-id scan across src/data before validate and fold the poorer copy into the richer one.
- Every new nav item needs label and blurb in the eight nav dictionaries.
- Snapshot files under src/data/universe-lists can collide; keep the completeness envelope names and give other scripts their own file.

## Queued agent briefs (launch when a slot frees; 20-agent cap)
- [x] Plain-language sentences: every term, idea and person covered 10 Sept; gauge 5,519 of 6,303 (88%); remainder is trials and newer records (about 140 technologies, 28 targets, 45 bottlenecks, 146 papers, new tests and complementary records) into src/data/simple/part-e.ts; brief drafted 10 Sept, blocked on the 20-agent cap
- [x] Insurance rankings (/coverage/rankings/) and Getting costs down (/costs/, 29 ideas): merged 10 Sept (/costs/ with ideas wave-costs). Brief drafted 10 Sept; owner ask: "build a section for insurance rankings for oncology, coverage, costs ranges and add another section for getting costs down and ideas around that".
- [x] Startups, YC and VC map with investors: live 10 Sept (/startups/, /investors/; 62 YC, 187 startups, 69 investors)
- [x] Donors in the heroes section: merged 10 Sept (41 donors, 15 foundations)
- [x] Open Medical Registry links per section: merged 10 Sept (133 tools, /open-tools/)

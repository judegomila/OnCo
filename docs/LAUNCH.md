# Launch checklist (owner away 10 to 15 September 2026)

The owner returns in five days and expects the site ready to launch and maximised. Every improvement tick
(30-minute cron) should pick the next unchecked item, ship it through the gated chain, and tick it here.

## Ship chain (never skip)
validate → typecheck → lint → test → `rm -rf out && npm run build` (gate on exit code and `out/index.html`,
`out/coverage/us/index.html`) → commit → `git push origin HEAD` → `vercel deploy --prod --yes --archive=tgz`.
Merge finished worktree agents before the chain; never `cd` into a worktree; never `vercel link`.

## Owner asks in flight (agents)
- [ ] Accurate 3D molecules (ball and stick) and protein ribbons (Molecule3D)
- [ ] Complementary approaches with evidence grades; hair-loss page under Living with cancer
- [ ] Whole-site language switch (chrome dictionary, 8 languages, RTL for Arabic)
- [ ] Graph explorer redesign (SVG, kind icons, side panel)
- [ ] MCP server and CLI (packages/onco-cli, packages/onco-mcp), /api/ section, docs/ACCESS.md
- [ ] Homepage front schematics quality (renderer depth cues, mesh rework)
- [ ] Completeness denominators per kind (/completeness/, roadmap panel, fetch:universe)
- [ ] India deep dive (institutions, companies, CDSCO region, trials, people, /countries/in/)
- [ ] China deep dive (same structure)
- [ ] Glossary Wikipedia links and aliases; schematics wave 3; KOL people; research leaders batches; summaries chunks; portraits (wire Portrait per docs/wiring/PORTRAITS.md)

## Owner asks not yet started
- [ ] Google Search Console verification (needs the owner's TXT token; IndexNow key is live but the host verification was still pending on 10 Sept, retry `api.indexnow.org` each tick)
- [ ] www.onco.cc: confirm the domain is attached in Vercel so the redirect in vercel.json applies (curl returned 200 on 10 Sept, not 308)
- [ ] Complete coverage: NCI-designated centres (72) and top global centres with people; paediatric and rare cancers; screening and diagnostic tests; EU and Japan approvals for every approved drug
- [ ] Time estimate and speed-up plan written for the owner (docs/LAUNCH.md bottom)
- [ ] Repo housekeeping the owner must do: GitHub Discussions "Objects" category; delete stray Vercel project agent-aa17c7ae82bcaf068

## Standing rules (see memory)
Plain English first, UK spelling, no em-dashes in copy, no "as of", no invented numbers, corrections via issue form only,
light theme default, pink accent, no red buttons, never "spike", survival figures behind a click, solution and mechanism first,
every problem paired with what is being done, Global region default, icons everywhere, tooltips on technical terms,
data licence CC BY-NC 4.0 with commercial licences (attribution "Data from OnCo (onco.cc)").

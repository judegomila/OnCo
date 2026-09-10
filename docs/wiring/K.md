# Wiring for batch K (Every page has content)

Exact edits to shared files that batch K could not touch. One change, additive.

## 1. `package.json` scripts

Add the weekly issue and the freshness snapshot to the build so every deploy carries the current issue and the current freshness figures (both are pure functions of the corpus and run in a few seconds; neither needs the network or git history):

```json
    "build:api": "tsx scripts/build-api.ts && tsx scripts/embed.ts && tsx scripts/build-ask.ts && tsx scripts/build-similar.ts && tsx scripts/build-triples.ts && tsx scripts/build-context.ts && tsx scripts/freshness.ts && tsx scripts/newsletter.ts",
```

Optionally add the launch audit as a script (it reads `out/` after `next build`; it is a report, never a gate):

```json
    "audit:pages": "tsx scripts/audit-empty-pages.ts",
```

## 2. Why the newsletter page was empty in production

`public/newsletter/<date>.html` was linked from `/newsletter/` but static hosts with clean URLs (Vercel, `trailingSlash: true`) do not serve a bare `.html` file from `public/`: `https://onco.cc/newsletter/2026-09-09.html` returned 404 while `/newsletter/2026-09-09/` returned 200. The page itself only listed the archive entry, so a visitor saw a header, one dead link and no issue.

`scripts/newsletter.ts` now writes `public/newsletter/<date>/index.html` (served at `/newsletter/<date>/` everywhere) plus `public/newsletter/<date>.json` with the issue's sections, moves any legacy `<date>.html` into place, and rewrites the archive paths. `/newsletter/` renders the latest issue inline under five fixed headings (What changed, Regulatory events, Upcoming readouts, What the journals said, Corrections), then the archive, then the Atom feed link. No file outside `scripts/`, `src/app/newsletter/` and `public/newsletter/` changed for this.

## 3. Snapshots that still need git history or a token (stay in the weekly workflows)

- `scripts/history.ts` and `scripts/provenance.ts` need the full git history; Vercel clones shallow, so they stay in `factcheck.yml` and the committed files are what ships. Both were rerun here and committed.
- `scripts/fetch-votes.ts` needs `GITHUB_TOKEN` with discussions read; without it the script exits without writing, so `/idea-votes/` shows the warm "voting has just opened" state until `refresh-votes.yml` produces `public/votes.json`.
- `scripts/fetch-preprints.ts` was resumed here to full coverage (817 topics) and committed; `refresh-preprints.yml` keeps it current.

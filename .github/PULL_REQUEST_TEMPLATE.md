## What changed and why

<!-- One paragraph. Link the issue if there is one. -->

## Review track

<!-- Tick the track(s) this change falls under (.github/REVIEWERS.md). Labels are added automatically from the files touched; the bot comments the affected page URLs. -->

- [ ] Expert (clinical): cancer pages, standard-of-care rows, trial outcomes
- [ ] Expert (scientific): targets, pathways, technologies, payloads, resistance
- [ ] Expert (regulatory): approvals, regulatory events, regional status, calendar
- [ ] Patient advocate: TL;DRs, simple mode, questions, reading paths
- [ ] Organisation self-edit (identity verified per REVIEWERS.md; `provenance` names the organisation)
- [ ] Site, scripts or schema only (no data facts changed)

## Sources

<!-- For every new or changed fact: the primary source (label, regulator notice, publication DOI, registry page). Paste the URLs here as well as in the record. -->

## Checklist

- [ ] Every new or changed fact has a source URL (`links`, `wikipedia`, `nct`, or a field-level `source`).
- [ ] `asOf` updated to today on every record I touched.
- [ ] Numbers in `tldr`, `summary` or `result` are traceable to a linked source (the audit flags numbers without one).
- [ ] `npm run validate`, `npm run typecheck`, `npm run lint`, and `npm test` pass locally (the corpus rule tests in `src/lib/corpus-rules.test.ts` included).
- [ ] No patient data, private CRM content, credentials, or personal contact details are included.
- [ ] Statuses are honest (`approved` only where a regulator approved; failures marked `negative`/`withdrawn`).
- [ ] If this fixes a factual error, `CORRECTIONS.md` has a row: date, entity, what was wrong, how it was found, fix.
- [ ] If this is a review sign-off, `src/data/reviews.ts` includes a conflict-of-interest statement.
- [ ] I opened the affected pages listed in the bot comment and checked the TL;DR reads correctly.

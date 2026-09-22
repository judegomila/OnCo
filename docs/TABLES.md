# Tables: filter state (22 Sept 2026)

Every file under src/app and src/components containing `<table` (75 files, `src/app/nested-anchors.test.ts` and `src/components/MarkdownLite.tsx` excluded: a test scanner and a markdown renderer, not tables). One line each: file, what it lists, and how it filters today.

How the shared pieces fit together:

- `src/components/filters/ColumnFilter.tsx`: the header trigger (funnel glyph, popover of value pills with counts, search past eight values, Clear, Close, Escape, bottom sheet under sm).
- `src/components/filters/ResultsTable.tsx`: the shared table; `ColumnHead` puts the filter on any column that carries a `filter` spec.
- `src/components/filters/FilterableTable.tsx`: `useColumnFilters` (selection, sort, counts, optional URL sync through `src/lib/table-view.ts`) and `FilterableTable` (toolbar with the "N of M" count and a Clear pill, plus the table) for plain `columns` and `rows`. `initial` seeds a selection before the URL is read.
- `src/components/filters/StaticTable.tsx`: the client wrapper for server-rendered pages. The page builds plain rows (strings, numbers, `{ text, href, chip, sub, v, bar, bars, avatar }` objects or lists of them) and column specs; the component draws links, chips, bars and avatars on the client side, so no function or React node crosses the server boundary and every row is still in the exported HTML (filtering only hides rows). One table per page carries `url` (its column keys become the query keys; a second URL-synced table would clash on `kind` or `sort`).

Rule applied: a table with fewer than ten rows on every page that renders it stays a plain `<table>`; the skip is recorded below.

Left alone on purpose: `src/app/tumour-testing/page.tsx` (being redesigned by another agent).

## On the shared header filter before this round

- src/components/filters/ResultsTable.tsx: the shared results table; header cell exported as `ColumnHead`. Filters: yes.
- src/components/EntityBrowser.tsx: every kind browser plus /assays/, /coverage/uk/, /coverage/us/, /data-sources/, /dossiers/, /investors/, /machines/, /models/, /open-questions/, /preclinical-models/, /regimens/, /startups/, InstitutionsExplorer, StartupRequestBoard. Filters: yes, URL-synced. Header filters on every facet column.
- src/components/RegulatoryBrowser.tsx (/regulatory/): dated regulatory events. Headers: Event, Region, Date (year).
- src/components/CasesByCountry.tsx (/cases/): GLOBOCAN country rows. Headers: Region, HDI.
- src/components/CentreTable.tsx (cancer pages, /centres/): linked centres. Header: Country (single).
- src/components/HtaTable.tsx (/hta/): HTA appraisals. Headers: Body, Verdict.
- src/components/PowerView.tsx (/power/): ranked objects for a cancer. Header: Phase / status.
- src/components/RegionMatrix.tsx (/regulatory/regions/): products by region. Header: Modality (single).
- src/components/SideEffectLookup.tsx (/side-effects/): side effects by symptom. Header: Treatment.
- src/components/SponsorBoard.tsx (/sponsors/): trial sponsors. Header: Top cancers (single).
- src/components/ToxicityBrowser.tsx (/toxicity/): adverse events by class. Headers: Adverse event, Product.

## Group 1: server-rendered tables now on StaticTable

- src/app/deals/page.tsx (64 deals): one table replaces the per-year sections. Headers: Year, From region, To region, Type; Date, Upfront and Total sort (amounts parsed to a number, currencies treated alike). URL-synced.
- src/app/evidence/page.tsx (3,527 trials): Phase, Result, Strength filter; rank, Enrolled and Score sort. URL-synced. Every row still in the HTML.
- src/app/funding/page.tsx (11 funders): the four type sections became one table. Headers: Type, Country, Year; Year sorts. URL-synced.
- src/app/universities/page.tsx, corpus score table (269 universities): Country filters; rank, Centres, Linked objects, Score sort. Logo drawn through `avatar`. (The OpenAlex output tables above it are ResearchRanking: see group 3.)
- src/app/payloads/page.tsx, payloads (11): Class, Bystander, Efflux substrate filter; DAR sorts. URL-synced. Linkers (9 rows): plain table, skipped.
- src/app/costs/page.tsx, all ideas (29): Who acts, Cost to try, Evidence so far filter; Years sorts. URL-synced. The per-driver cards above are not tables.
- src/app/status/page.tsx, feeds (19): State and Runs (automatically or by hand) filter; Fetched, Age, Count sort. URL-synced. Schedules (9 rows): plain, skipped.
- src/app/freshness/page.tsx: SLAs (13): Track and Critical filter; Max age, Checked, Past due sort; URL-synced. Past due (0 to 120 rows, rendered when anything is overdue): Critical, Kind, SLA filter; Last checked and Days over sort. By review track (5 rows): plain, skipped.
- src/app/eval/page.tsx, the questions (100): Category, Level, Outcome (all met, partly, missed, not scored) filter; Level and OnCo score sort. Expected answer moved to the row's second line and the rubric to its tooltip. URL-synced. Leaderboard (3 runs): plain, skipped.
- src/app/survival/page.tsx (36 cancers): Staged and Period filter; 5-year survival (with its bar) and the three stage columns sort. URL-synced.
- src/components/CitedPapers.tsx (/papers/, 25 rows): Journal and Year filter; rank, Citations and the two recent years sort; by-year bars kept through `bars`.
- src/components/PapersPulse.tsx `PulseTable` (/papers/, 15 to 30 rows per table): Kind (when the table mixes kinds) and Trend (growing, flat, shrinking) filter; counts and Change sort; yearly bars kept.
- src/app/startups/page.tsx, most active investors (64, first 25 shown, Show all): Type and Country filter; rank and Portfolio sort; logo through `avatar`. The startups browser itself is EntityBrowser.
- src/app/audit/page.tsx: per-check findings tables (up to 150 rows each, inside the details cards): Kind filters. Registry fact checks (237): Severity and Check filter, URL-synced. Proposed patches (116): Field filters. Broken links (150 of 1,975): Status and Archive filter. Staleness (80): Kind filters, Days sorts. Redirected links (moved, inside a details card): plain, skipped (no categorical column).
- src/app/review/page.tsx: where models disagree (21): Kind and Panel (split or agree) filter; Models, Disagreements, Latest sort. Human coverage by kind (13): Tracks needed filters; counts sort. The human queue (top 50): Kind and Needs filter; Score, Links, Evidence, Age sort; URL-synced. Model panel (2 rows) and Translations (8 rows): plain, skipped.
- src/app/countries/cn/page.tsx: key trials (851): Phase, Status, Year filter (Phase and Status are new columns); Year sorts; URL-synced. Out-licensing and acquisitions (27): Year and Type filter; Date sorts.
- src/app/countries/in/page.tsx, leading cancers (12): no categorical column; every figure sorts.
- src/app/pathway-drugs/page.tsx, pathways (108): Gap (undrugged nodes, fully drugged, no druggable node) filters; every count sorts and keeps its deep link. URL-synced. Per-pathway node tables (108 tables of at most 16 rows): plain, skipped (108 hydrated tables for a column that rarely has more than two values).
- src/components/Dossier.tsx, trials (per target, up to several hundred): Phase and Status filter. Products by modality (a matrix), companion diagnostics and cell lines (a few rows): plain.

## Group 1: skipped (fewer than ten rows everywhere, or not a data table)

- src/app/contributors/page.tsx: 4 contributors today.
- src/app/reviewers/page.tsx: roster empty today (the table only renders once someone has signed off).
- src/app/idea-votes/page.tsx: no idea has a vote yet, so the table does not render.
- src/app/coverage/rankings/page.tsx: list prices (4), UK routes (5), nine countries (9). PlanRankings on the same page: see group 2.
- src/components/HotspotPlot.tsx: at most 7 residues per gene.
- src/components/InvestorPanels.tsx `DealsPanel`: at most 6 deals per company.
- src/components/PrevalenceTable.tsx: at most 7 cancers per target; `CancerPrevalence` per cancer likewise small.
- src/components/AccessTable.tsx: at most 3 countries per product.
- src/components/EntityDetail.tsx approvals: at most 7 per product; papers on record pages: small per-record lists.
- src/components/ResearchOutput.tsx, src/components/StartupPanels.tsx, src/components/TrialLeadership.tsx: per-record panels with few rows; not in this round's list.
- src/components/CompletenessTable.tsx (one row per kind), src/components/CountryCasesMini.tsx (two side-by-side minis), src/components/Pictogram.tsx (per-trial figure).

## Group 2: client tables with their own controls (header filter to be added)

- src/components/TrialFinder.tsx, src/components/TrialFinderGeo.tsx, src/components/AssistanceBrowser.tsx, src/components/GuidelineConcordance.tsx, src/components/ManufacturingMap.tsx, src/app/interactions/InteractionChecker.tsx, src/components/AutoPulse.tsx, src/components/CaregiverPanel.tsx, src/components/SurvivorshipPlan.tsx, src/components/MarketEstimator.tsx, src/components/TumorBoard.tsx, src/components/Navigator.tsx, src/components/PlanRankings.tsx: pending.

## Group 3: ResultsTable users without a header for their toolbar facet (pending)

- src/components/CountryRanking.tsx (/research/countries/): Region facet, no region column.
- src/components/ScorecardTable.tsx (/scorecard/): Type and Country facets, shown under the name.
- src/components/PipelineFunnel.tsx, src/components/ResearchRanking.tsx: sortable, no facets.

## Left alone

- Matrices: src/components/BiomarkerMatrix.tsx, src/components/PrevalenceMatrix.tsx, src/components/DealFlow.tsx, src/components/PivotTable.tsx.
- src/components/CompareView.tsx (transposed), src/components/CommandPalette.tsx (search results), src/components/SavedViews.tsx (personal list), src/components/SlideDeck.tsx, src/components/QueryBuilder.tsx (the clauses are the filter), src/app/irae/IraeGuide.tsx (guide layout).
- Static reference or form tables: src/app/api/page.tsx, src/app/build/page.tsx, src/app/cancers/[id]/decisions/page.tsx, src/app/history/page.tsx, src/app/live/hair/page.tsx, src/app/privacy/page.tsx, src/app/regimens/[id]/page.tsx, src/app/report/2026/page.tsx, src/app/schema/page.tsx, src/app/sequencing/[id]/page.tsx, src/app/staging/page.tsx, src/app/startup-requests/page.tsx.
- src/app/tumour-testing/page.tsx: another agent's redesign.

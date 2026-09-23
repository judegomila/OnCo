# Mobile: two-column tools

The owner's report (23 Sept 2026): "this view doesn't work well on mobile: /body/". Many OnCo tools put a control list in one column and the thing it drives in the other. Below the `lg` breakpoint (64rem) the columns stack, so at 390 px a tap in the controls changed something a screen or more away. This pass found every view with that shape, measured each at 390 x 844 in headless Chrome (tap a control, then check whether the driven element's bounding box is inside the viewport), and fixed the ones that failed with one of three patterns. Desktop layouts are unchanged.

## Patterns

- **Sticky preview** (`data-mobile-pattern="sticky-preview"`): the driven element moves above the controls and sticks under the site header at no more than 40 percent of the viewport height (`max-lg:sticky max-lg:top-14 max-lg:max-h-[40vh]`), scrolling inside itself; the controls scroll beneath. Controls point at it with `aria-controls`; it announces with `aria-live="polite"`.
- **Choose / view** (`data-mobile-pattern="choose-view"`, `src/components/ChooseView.tsx`): two pills with glyphs, "Choose" and "View" (renamed per view), in a sticky bar under the header switch between the two panes; a choice shows the view (or, for multi-select tools, updates the count on the View pill); a "Back" link and the Choose pill return. The pills are `role="tab"` with `aria-controls`; the View pill's hint is mirrored in an `sr-only` live region. Both panes stay in the DOM and both print (globals.css). Focus moves to the shown pane on small screens only.
- **Inline** (`data-mobile-pattern="inline"`): the driven element is reordered to sit directly under the control on small screens (`max-lg:order-first` or `max-md:order-first`).

Every fixed view names its wrapper (`data-mobile-view`), a representative control (`data-mobile-control`) and the driven element (`data-mobile-driven`). `npm run audit:mobile [base-url]` (scripts/mobile-audit.ts) taps each control at 390 px and fails if the effect is off screen; `src/components/mobile-patterns.test.ts` keeps the structure in the static markup.

## Views

One line per view: route, what drives what, what changed.

| Route | Drives | Before (390 px) | Change |
| --- | --- | --- | --- |
| `/body/` (BodyMap) | Tap an organ on the figure, or a system-wide chip, shows the region's cancers or technologies in a panel | Panel sat below a two-screen figure (top at 1052 to 1320 px after a tap) | Sticky preview: the panel goes above the figure and sticks under the header (40vh, scrolls inside); compact hint when nothing is pinned; `aria-controls="body-detail"` on every organ and chip |
| `/body/` (SpreadPicker) | Cancer select drives the spread map and site list | Select is directly above the heading and the folded map; effect visible | None |
| `/graph/` (GraphExplorer) | Panel "Start from" and neighbour buttons refocus the scene; scene taps update the panel | Scene 619 px above the viewport after tapping a neighbour deep in the panel | Sticky preview: the scene sticks under the header at 40vh (the SVG letterboxes); panel buttons carry `aria-controls="gx-scene"` |
| `/tumor-board/` (TumorBoard) | Cancer select and biomarker ticks drive the ranked matches | Matches header at 1120 px after the first tick; the aside was a nested 85vh scroller on mobile | Choose / Matches pills: the first tick shows the matches, later ticks update "Matches · n" live; aside scroller is `lg:` only |
| `/query/` (QueryBuilder) | Saved and multi-hop example queries drive the query form and results | Form card at 946 px after tapping a saved query | Saved queries / Results pills; loading a query shows the results with the count on the pill |
| `/irae/` (IraeGuide) | Organ list and grade filter drive the management card | Card at 939 px after picking an organ; aside was a nested 85vh scroller | Choose / Card pills; picking an organ or grade shows the card; aside scroller is `lg:` only |
| `/prep/` (PrepPack) | Cancer tiles and question ticks drive the printable pack | Pack at 3244 px after a tick; only the builder toolbar count was visible | Build / Pack pills with the running "n questions" hint (live region); the builder's own toolbar sticks on desktop only, so there is one bar on a phone |
| `/prep/[id]/` (PrepSheet) | Question ticks and custom questions drive the appointment sheet | Sheet below a 28rem nested scroller; the count lived in the sheet | Tick / Sheet pills with the running count; question list scroller is `lg:` only |
| `/path/` (PathFinder) | Example buttons (right column) fill the From and To pickers and the routes | Pickers and routes above the examples, off screen when the routes were long; chips overflowed the viewport (748 px wide) | Inline: examples go first below lg so the pickers and routes follow directly beneath; route chips wrap inside the card |
| `/deals/` (DealFlow) | Tapping a chord ribbon lists its deals | Deal list under the region matrix at 890 px | Inline: the deal list sits directly under the drawing below md, `aria-live`, `aria-controls="deal-flow-detail"` on the drawing |
| `/dependencies/` (DagViewer) | Root picker (above the map) narrows the map; hover on a tile fills the side panel; "Centre here" in the panel re-roots the map | Root picker is above the map (visible). The panel is hover-driven and tiles are links, so on touch the panel only shows the legend; "Centre here" is not reachable by touch | None in this pass; a touch-first panel (tap to select, second tap to open) is a later item |
| `/resistance/` (ResistanceMap) | Route list and diagram drive the side caption | Already has a compact diagram plus list below sm; caption at 654 to 844 px after a tap (visible) | None |
| `/staging/` (RiskScore) | Selects and ticks drive the score box in the same card | Score box directly under a short input list (visible) | None |
| `/cancers/map/` (CancerMapBy) | Badge pills above the map switch the count shown | Pills are directly above the map (visible) | None |
| `/timeline/`, `/for-me/`, `/navigator/`, `/pipeline/`, `/manufacturing/`, `/universities/`, `/market/`, `/second-opinion/`, `/report-reader/`, `/biomarker-matrix/`, `/compare/`, `/pivot/`, `/interactions/`, `/molecules/` | Controls sit in a row or sticky bar above what they drive | Effect directly beneath the controls | None |
| Roadmap records (RoadmapStory) | Timeline steps in the aside scroll the story | `go()` already scrolls the step into view | None |

## Left for a later pass

- `/dependencies/`: a touch path into the side panel (tap selects, second tap opens), then the sticky preview for the map.
- Horizontal overflow at 390 px on `/deals/` (region matrix, 522 px) and `/resistance/` (414 px) is separate from the stacking problem; the tumour board, irAE guide and path finder overflows went away with this pass.
- The audit runs against a dev server or the live site (one request per route); it is not yet part of the ship chain.
- Dev-only hydration attribute warnings seen while measuring are pre-existing and not from this pass: float rounding in `/graph/` node transforms and `/deals/` chord paths, and ChipTitles stamping `title` on truncated chips before the page hydrates (now also on `/path/`, whose route chips truncate instead of overflowing).

# Wiring for batch F (Site mechanics)

Everything in batch F ships working and testable from the files the batch owns. The lines below are the
small edits to shared files that only the main session makes after merge. Nothing here is required for the
build to pass; each block says what it switches on.

## 1. `src/app/layout.tsx`: PWA manifest, theme colour, service worker, feed autodiscovery (items 55, 57)

Add to the imports:

```tsx
import type { Metadata, Viewport } from "next";
import { RegisterSW } from "@/components/RegisterSW";
```

Add to the exported `metadata` object (alongside `metadataBase`, `applicationName`):

```tsx
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "OnCo", statusBarStyle: "default" },
  alternates: {
    types: {
      "application/atom+xml": [
        { url: "/feeds/changelog.xml", title: "OnCo changelog" },
        { url: "/feeds/regulatory.xml", title: "OnCo regulatory events" },
        { url: "/feeds/calendar.xml", title: "OnCo readout calendar" },
        { url: "/feeds/pulse.xml", title: "OnCo research pulse" },
      ],
    },
  },
```

Note: `pageMeta()` in `src/lib/seo.ts` sets `alternates: { canonical }` per page, which replaces the root
`alternates` object on those pages. If feed autodiscovery should be on every page, add the same `types` block
inside `pageMeta()` (`alternates: { canonical: url, types: FEED_TYPES }`) and export `FEED_TYPES` from a
small constant in `src/lib/seo.ts`.

Add a `viewport` export next to `metadata` (the theme colour follows the two themes):

```tsx
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d6336c" },
    { media: "(prefers-color-scheme: dark)", color: "#121816" },
  ],
};
```

Mount the service-worker registration and offline banner once, inside `<RegionProvider>` after `<CommandPalette />`:

```tsx
        <CommandPalette />
        <RegisterSW />
```

`RegisterSW` registers `/sw.js` only when `NODE_ENV === "production"`, so `next dev` is unaffected.

Icons: the manifest lists `/icon.svg` (the only icon Next exports; `src/app/apple-icon.svg` is not emitted because Next
only accepts raster formats for `apple-icon`). Chromium's install prompt wants raster icons too, so add
`public/icons/icon-192.png` and `public/icons/icon-512.png` (rendered from `src/app/icon.svg`, plus a `maskable`
variant with 10% padding) and list them in `public/manifest.webmanifest`. No PNG was generated in this batch rather
than committing a binary of unknown quality.

## 2. `src/lib/nav.ts`: new routes (items 51, 52, 55)

In the `find` group (Start here), after the Body map item:

```ts
      { href: "/saved/", label: "Saved", blurb: "Your saved table views and watched pages, with what changed since you looked. Stored in your browser only." },
```

`/offline/` is deliberately not in the nav (the service worker and the offline banner link to it).

## 3. `src/lib/sitemap-urls.ts`: keep browser-only pages out of the sitemap (items 51, 55)

```ts
const EXCLUDED_PREFIXES = ["/embed/", "/saved/", "/offline/"];
```

Both pages already carry `robots: noindex` via `pageMeta({ noindex: true })`; this just stops them being listed.

## 4. `src/components/EntityDetail.tsx`: pass the page route and date to the toolbar (item 52), and to print (item 59)

The `SuggestEdit` card now hosts the `WatchButton`. Both work without these props (they read the URL and fetch
`/api/v1/entities/<id>.json`), but passing them saves a fetch per page view for watched pages:

```tsx
<SuggestEdit id={e.id} kind={e.kind} name={e.name} fields={Object.keys(e)} source={sourceLocation(e.id, e.kind)} route={routeFor(e)} asOf={e.asOf} />
```

Likewise `PrintButton` accepts `asOf` and `title` so the print header does not need to fetch:

```tsx
<PrintButton className="underline" asOf={e.asOf} title={e.name} />
```

Optional: any block that should be dropped from the "Patient pack" print mode can carry `className="print-technical"`
(for example the `EvidenceBar` and the raw `Data` links in the aside; the aside is already hidden in print).

## 5. `src/components/filters/ResultsTable.tsx`: header scope (item 58)

Add `scope="col"` to the `<th>` in the header row (`aria-sort` is already present):

```tsx
<th key={c.key} scope="col" className={...} aria-sort={...}>
```

## 6. `.gitignore`: generated feeds (item 57)

`scripts/build-api.ts` now also writes the Atom feeds; like `/public/api/v1/` they are derived output:

```
# generated feeds
/public/feeds/
```

## 7. `package.json`: convenience scripts (items 56, 57, 58, 60)

None are required (`build:api` already runs the feeds), but these make the new scripts discoverable:

```json
    "build:feeds": "tsx scripts/build-feeds.ts",
    "a11y": "tsx scripts/a11y.ts",
    "i18n:coverage": "tsx scripts/i18n-coverage.ts",
```

## 8. New languages: `src/lib/layer.ts`, `src/components/TldrText.tsx`, `src/components/LayerToggle.tsx`, `src/lib/health.ts` (item 60)

`src/data/i18n/{fr,de,ja,ar}.ts` exist and cover all 64 cancers (as do es, zh, pt and hi now). To expose them:

`src/lib/layer.ts`:

```ts
export type Lang = "en" | "es" | "zh" | "pt" | "hi" | "fr" | "de" | "ja" | "ar";

export const LANGS: Array<{ code: Lang; label: string; native: string }> = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ar", label: "Arabic", native: "العربية" },
];
```

`src/components/TldrText.tsx`:

```tsx
import { tldr_fr } from "@/data/i18n/fr";
import { tldr_de } from "@/data/i18n/de";
import { tldr_ja } from "@/data/i18n/ja";
import { tldr_ar } from "@/data/i18n/ar";

const TABLES = { es: tldr_es, zh: tldr_zh, pt: tldr_pt, hi: tldr_hi, fr: tldr_fr, de: tldr_de, ja: tldr_ja, ar: tldr_ar } as const;
```

and drop the unused `dir` variable: right-to-left is handled by `globals.css` (`[lang="ar"] { direction: rtl; ... }`),
which keys off the `lang` attribute `TldrText` already sets. Extend `coverageFor()` with the four new keys.

`src/components/LayerToggle.tsx`: the language grid is `grid-cols-5`; with nine languages use `grid-cols-3`
(or `grid-cols-5` with wrapping). No other change.

`src/lib/health.ts`: the "translations" gauge checks four languages; either leave it as the four-language gauge
or extend the list to eight with the same pattern.

### hreflang (item 60, wiring note for `src/app/[kind]/[id]/page.tsx`)

Not recommended as specified. `hreflang` alternates need one URL per language; OnCo serves every language from
the same URL with a client-side switch, and Google ignores `hreflang` entries that point at the same URL. If
per-language URLs are added later (e.g. `/es/cancers/tnbc/`), `entityMeta()` in `src/lib/seo.ts` is the place
to emit `alternates.languages`. Until then, the correct signal is what the pages already do: `lang` on the
translated text and `x-default` = the canonical URL.

## 9. About page links (item 57): `src/app/about/page.tsx`

In the "How it is built" paragraph, after the `/api/v1/` link:

```tsx
Atom feeds for the <Link href="/api/#feeds">changelog, regulatory events, calendar and research pulse</Link> are rebuilt with the site.
```

## 10. Repository settings (item 56)

- Releases: tag `vX.Y.Z` on `main` triggers `.github/workflows/release-dataset.yml`, which attaches the corpus files to a GitHub release.
- Zenodo: either enable the GitHub integration for `judegomila/OnCo` at zenodo.org (uses `.zenodo.json`) or add a
  `ZENODO_TOKEN` repository secret so the workflow deposits directly. Add the ORCID of the creator to
  `.zenodo.json` (`"orcid": "0000-..."`) when known; it was omitted rather than guessed.
- Accessibility: `.github/workflows/a11y.yml` runs on pull requests and weekly; it installs Playwright and
  axe-core for the run only, so `package.json` is unchanged.

## What is live without any wiring

- Save view, CSV and JSON download, `sort=` in the URL and `?v=` compact links on every `EntityBrowser` table and the pivot grid.
- `/saved/` (saved views, watchlist, change detection, export and import).
- Watch button on every object page (inside the `SuggestEdit` card).
- Keyboard layer: `/`, `?`, `j` `k` `Enter`, `g` chords, with the off switch; palette focus trap and `aria-activedescendant`.
- Print modes with header, QR code and disclaimer; arrow keys on the section bar; print, RTL and forced-colours CSS.
- `/api/v1/*.csv`, `all.ndjson`, `schema.json`, `meta.json.files`, four Atom feeds under `/feeds/`, the rewritten `/api/` page.
- `/offline/` page, `public/manifest.webmanifest`, `public/sw.js` (inert until `RegisterSW` is mounted and the manifest linked, see section 1).
- `scripts/a11y.ts`, `scripts/build-feeds.ts`, `scripts/i18n-coverage.ts`, `.zenodo.json`, the two workflows.
- Translations for all 64 cancers in es, zh, pt, hi, fr, de, ja, ar (the last four inert until section 8).

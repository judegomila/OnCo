import Link from "next/link";
import type { ReactNode } from "react";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { GLOBOCAN } from "@/lib/globocan";
import { geographyFor, geographyRows, geographyUrls, siteRatesFor, type GeoFigure, type GeoSource } from "@/lib/cancer-geography";
import { CancerGeography } from "./CancerGeography";
import { GeoGlyphIcon, type GeoGlyphName } from "./GeoGlyph";
import { GentleSection } from "./GentleSection";
import { TL } from "./T";

const STRENGTH: Record<string, string> = { consistent: "consistent evidence", mixed: "mixed evidence", suggestive: "suggestive evidence", untested: "never tested as prevention" };

/** Entity ids as pills that open their records; an id with no record is dropped rather than shown dead (the test fails on it). */
function Refs({ ids }: { ids: string[] | undefined }) {
  if (!ids?.length) return null;
  const g = graph();
  const list = ids.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e);
  if (!list.length) return null;
  return <div className="flex flex-wrap gap-1.5 mt-2">{list.map((e) => <Link key={e.id} href={routeFor(e)} className="chip border border-border bg-card text-xs hover:bg-foreground/5" title={e.kind}>{e.name}</Link>)}</div>;
}

function Sources({ list }: { list: GeoSource[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
      {list.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{s.label}{s.date ? ` (${s.date})` : ""}</a></li>)}
    </ul>
  );
}

function Head({ id, glyph, title, lede, aside }: { id: string; glyph: GeoGlyphName; title: string; lede?: string; aside?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3" id={id}>
      <div>
        <h3 className="font-semibold inline-flex items-center gap-2"><GeoGlyphIcon name={glyph} className="h-4 w-4 text-muted" /><TL text={title} /></h3>
        {lede && <p className="text-sm text-muted mt-0.5">{lede}</p>}
      </div>
      {aside}
    </div>
  );
}

function FigureTable({ rows }: { rows: GeoFigure[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="onco text-sm">
        <thead><tr><th>Figure</th><th>Value</th><th className="hidden sm:table-cell">Where and when</th><th>Source</th></tr></thead>
        <tbody>
          {rows.map((f, i) => (
            <tr key={i}>
              <td>{f.label}{f.note && <div className="text-xs text-muted mt-0.5">{f.note}</div>}</td>
              <td className="tabular-nums font-medium whitespace-nowrap">{f.value}</td>
              <td className="hidden sm:table-cell text-muted">{f.place}{f.period ? `, ${f.period}` : ""}</td>
              <td><a href={f.source.url} target="_blank" rel="noopener noreferrer" className="underline text-xs" title={f.source.label}>{f.source.label.split(",")[0]}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The epidemiology section of a cancer page for cancers with a geography layer: the map by country and sex, the
 * high-burden regions with their papers, the national programmes and registries, the country spotlights, the
 * prevention evidence, the registry figures and the named gaps. Server component; the map is the client island.
 */
export function CancerGeographySection({ c }: { c: { id: string; name: string } }) {
  const geo = geographyFor(c.id);
  const rates = siteRatesFor(c.id);
  if (!geo || !rates) return null;
  const methods: Record<string, { methodInc?: string; methodMort?: string }> = {};
  for (const iso3 of Object.keys(rates.countries)) { const x = GLOBOCAN.countries[iso3]; if (x) methods[iso3] = { methodInc: x.methodInc, methodMort: x.methodMort }; }
  const rows = geographyRows(rates, "both", "inc", methods);
  const jsonUrl = `/api/v1/cancers/${geo.cancerId}/geography.json`;
  const urls = geographyUrls(geo);
  return (
    <section id="geography" className="mt-8 space-y-6" data-onco-section="geography">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
          <h2 className="text-lg font-semibold tracking-tight inline-flex items-center gap-2"><GeoGlyphIcon name="globe" className="h-4 w-4 text-muted" /><TL text="Where it happens" /></h2>
          <div className="text-xs text-muted flex flex-wrap gap-x-3">
            <span>GLOBOCAN {rates.year}, fetched {rates.fetched} · layer checked {geo.asOf}</span>
            <a href={jsonUrl} className="underline inline-flex items-center gap-1" type="application/json"><GeoGlyphIcon name="json" className="h-3 w-3" />JSON</a>
          </div>
        </div>
        <p className="text-[15px] leading-relaxed max-w-3xl">{geo.headline}</p>
      </div>

      <CancerGeography cancerId={geo.cancerId} cancerName={c.name} rows={rows} world={rates.world}
        meta={{ version: rates.version, fetched: rates.fetched, year: rates.year, sourceUrl: rates.sourceUrl, apiUrl: rates.apiUrl, citation: rates.citation, label: rates.label, icd: rates.icd, note: rates.note }}
        regions={geo.regions.map((r) => ({ id: r.id, title: r.title, countries: r.countries, glyph: r.glyph }))} jsonUrl={jsonUrl} />

      <div>
        <Head id="geography-regions" glyph="map" title="The high-burden regions" lede="Each region with the papers that describe it; press a region's pill above to pick it out on the map." />
        <div className="grid gap-4 md:grid-cols-2">
          {geo.regions.map((r) => (
            <article key={r.id} id={`geography-${r.id}`} className="card p-4 flex flex-col">
              <h4 className="font-semibold leading-snug inline-flex items-center gap-2"><GeoGlyphIcon name={r.glyph} className="h-4 w-4 text-muted" />{r.title}</h4>
              <p className="mt-2 text-sm leading-relaxed">{r.summary}</p>
              <details className="mt-2 group">
                <summary className="cursor-pointer text-sm text-muted hover:text-foreground select-none">The figures and the papers</summary>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{r.detail}</p>
                <Sources list={r.sources} />
              </details>
              <div className="mt-auto pt-2 flex flex-wrap gap-1.5 text-xs">
                {r.countries.map((iso3) => { const row = rates.countries[iso3]; return row ? <Link key={iso3} href={`/cases/?country=${iso3}`} className="chip border border-border bg-card hover:bg-foreground/5" title={`${row.name}: GLOBOCAN ${rates.year} by site`}>{row.name} <span className="text-muted tabular-nums">{row.both[1]}</span></Link> : null; })}
              </div>
              <Refs ids={r.refs} />
            </article>
          ))}
        </div>
      </div>

      <div>
        <Head id="geography-spotlights" glyph="flag" title="Country spotlights" lede="The two countries that carry the most, and what each is doing about it." />
        <div className="grid gap-4 lg:grid-cols-2">
          {geo.spotlights.map((s) => (
            <article key={s.id} id={`geography-${s.id}`} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-semibold text-base">{s.flag} {s.title}</h4>
                {s.route && <Link href={s.route} className="text-sm text-accent hover:underline">Country page →</Link>}
              </div>
              <p className="mt-2 text-[15px] leading-relaxed">{s.lede}</p>
              <ul className="mt-3 space-y-1.5 text-sm list-disc ps-5 text-foreground/85">{s.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
              <div className="mt-3"><FigureTable rows={s.figures} /></div>
              <Refs ids={s.refs} />
              <Sources list={s.sources} />
            </article>
          ))}
        </div>
      </div>

      <div>
        <Head id="geography-programmes" glyph="registry" title="Programmes, registries and practice" lede="What the high-burden countries have built: a prevention law, a registry network, a surgical tradition." />
        <div className="grid gap-4 md:grid-cols-3">
          {geo.programmes.map((p) => (
            <article key={p.id} id={`geography-${p.id}`} className="card p-4 flex flex-col">
              <h4 className="font-semibold leading-snug inline-flex items-center gap-2"><GeoGlyphIcon name={p.glyph} className="h-4 w-4 text-muted" />{p.title}</h4>
              <ul className="mt-2 space-y-1.5 text-sm list-disc ps-5 text-foreground/85">{p.what.map((x, i) => <li key={i}>{x}</li>)}</ul>
              <p className="mt-2 text-xs text-muted">{p.detail}</p>
              <Refs ids={p.refs} />
              <Sources list={p.sources} />
            </article>
          ))}
        </div>
      </div>

      <div>
        <Head id="geography-prevention" glyph="scalpel" title="Prevention: what the geography teaches" lede="The levers the high-burden regions point at, graded by how far the evidence goes." />
        <ol className="space-y-2">
          {geo.prevention.map((p) => (
            <li key={p.id} id={`geography-${p.id}`} className="card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-semibold inline-flex items-center gap-2"><GeoGlyphIcon name={p.glyph} className="h-4 w-4 text-muted" />{p.title}</h4>
                <span className={`chip text-xs ${p.strength === "consistent" ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200" : p.strength === "untested" ? "bg-amber-500/10 text-amber-800 dark:text-amber-200" : "bg-foreground/5"}`}>{STRENGTH[p.strength]}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{p.evidence}</p>
              <Refs ids={p.refs} />
              <Sources list={p.sources} />
            </li>
          ))}
        </ol>
      </div>

      <GentleSection className="border-dashed" title="the registry and study figures behind the map" why="Rates from national registries and cohort studies, which GLOBOCAN's modelled estimates cannot show, each with its source." reassurance="Population figures describe places, not people; a rate for a region says nothing about any one person's chances." kicker={<span className="inline-flex items-center gap-1.5"><GeoGlyphIcon name="registry" />Figures</span>}>
        <FigureTable rows={geo.figures} />
      </GentleSection>

      <div className="card p-4">
        <Head id="geography-gaps" glyph="gap" title="What could not be sourced" lede="Named gaps, so a missing figure is never mistaken for a zero." />
        <ul className="text-sm list-disc ps-5 space-y-1 text-foreground/80">{geo.gaps.map((x, i) => <li key={i}>{x}</li>)}</ul>
        <p className="mt-3 text-xs text-muted">Every figure links to the page it was read from ({urls.length} sources, checked {geo.asOf}); the country rows are GLOBOCAN {rates.year} estimates read through the IARC API on {rates.fetched}. Pills open OnCo records with their own sources.</p>
      </div>
    </section>
  );
}

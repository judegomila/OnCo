import Link from "next/link";
import { BANDS, bandValue, type YearColumn } from "@/lib/timeline";

/**
 * The whole field at a glance: one column per year, stacked into four bands, every column a link to that year.
 *
 * Drawn as four paths rather than four rectangles a year. A stacked column chart of 134 years is 536 rectangles and
 * about 37 KB of markup; the same shape as one vertical-segment path per band is under 10 KB, and the page has a
 * budget (src/app/heavy-pages.test.ts). The clickable layer is one transparent rectangle a year, which carries the
 * title a reader hovers and the link a reader follows.
 */

const W = 1000, H = 210, PAD_B = 18, PAD_T = 6;

const r1 = (n: number) => Math.round(n * 10) / 10;

export function TimelineChart({ columns }: { columns: YearColumn[] }) {
  if (!columns.length) return null;
  const max = Math.max(...columns.map((c) => c.total), 1);
  const step = W / columns.length;
  const barW = Math.max(1, step * 0.72);
  const plot = H - PAD_B - PAD_T;
  const y = (v: number) => PAD_T + plot - (v / max) * plot;

  // One path per band: a vertical segment per year, from the top of the bands below it to the top of this one.
  const paths = BANDS.map((band, bi) => {
    const below = BANDS.slice(0, bi);
    const d = columns.map((c, i) => {
      const base = below.reduce((s, b) => s + bandValue(c, b), 0);
      const v = bandValue(c, band);
      if (!v) return "";
      const x = r1(i * step + (step - barW) / 2 + barW / 2);
      return `M${x} ${r1(y(base))}V${r1(y(base + v))}`;
    }).join("");
    return { band, d };
  });

  const decades = columns.map((c, i) => ({ c, i })).filter(({ c }) => c.year % 10 === 0);

  return (
    <figure className="card p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Dated entries per year from ${columns[0].year} to ${columns[columns.length - 1].year}, stacked by kind of entry.`}>
        {paths.map(({ band, d }) => d && <path key={band.id} d={d} className={band.className.replace("fill-", "stroke-")} strokeWidth={r1(barW)} strokeLinecap="butt" fill="none" />)}
        {decades.map(({ c, i }) => {
          const x = r1(i * step + step / 2);
          return <text key={c.year} x={x} y={H - 5} textAnchor="middle" className="fill-current text-[9px] opacity-60">{c.year}</text>;
        })}
        {columns.map((c, i) => (
          <Link key={c.year} href={`/years/${c.year}/`}>
            <rect x={r1(i * step)} y={0} width={r1(step)} height={H - PAD_B} fill="transparent" className="hover:fill-current hover:opacity-10">
              <title>{`${c.year}: ${c.total.toLocaleString("en-GB")} dated ${c.total === 1 ? "entry" : "entries"}`}</title>
            </rect>
          </Link>
        ))}
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {BANDS.map((b) => <span key={b.id} className="inline-flex items-center gap-1.5"><span className={`inline-block h-2 w-2 rounded-sm ${b.className.replace("fill-", "bg-")}`} />{b.label}</span>)}
      </figcaption>
    </figure>
  );
}

/** The scattered years before the continuous record: one tick each, because a column chart of them would be mostly gaps. */
export function EarlyStrip({ columns }: { columns: YearColumn[] }) {
  if (!columns.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {columns.map((c) => <Link key={c.year} href={`/years/${c.year}/`} className="chip tabular-nums" title={`${c.total} dated ${c.total === 1 ? "entry" : "entries"}`}>{c.year}<span className="opacity-60 ms-1">{c.total}</span></Link>)}
    </div>
  );
}

/** Every year with a record, by decade: the way into one year in detail. */
export function YearIndex({ columns }: { columns: YearColumn[] }) {
  const decades = [...new Set(columns.map((c) => Math.floor(c.year / 10) * 10))].sort((a, b) => b - a);
  return (
    <div className="space-y-3">
      {decades.map((d) => {
        const inDecade = columns.filter((c) => Math.floor(c.year / 10) * 10 === d);
        const total = inDecade.reduce((s, c) => s + c.total, 0);
        return (
          <div key={d} className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t border-border pt-3 first:border-t-0 first:pt-0">
            <div className="w-24 shrink-0 font-semibold tabular-nums">{d}s</div>
            <div className="w-28 shrink-0 text-xs text-muted tabular-nums">{total.toLocaleString("en-GB")} entries</div>
            <div className="flex flex-wrap gap-1.5 min-w-0">
              {inDecade.map((c) => <Link key={c.year} href={`/years/${c.year}/`} className={`chip tabular-nums ${c.total === 0 ? "opacity-50" : ""}`} title={`${c.total} dated ${c.total === 1 ? "entry" : "entries"}`}>{c.year}<span className="opacity-60 ms-1">{c.total}</span></Link>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

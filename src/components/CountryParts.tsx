import { GLOBOCAN } from "@/lib/globocan";
import { autoCountry, partAnchor, partsOf } from "@/lib/country-pages";

/**
 * GLOBOCAN entries shown as a section of their parent country's page rather than a page of their own: France's
 * overseas departments on /countries/fr/ (owner decision, 11 November 2026; PART_OF in src/data/country-codes.ts).
 * Each card carries IARC's figures for the department, its method codes and its five leading sites by new cases
 * and by deaths, read from public/globocan/countries.json. The prose about the health system is the parent page's.
 */
const n0 = (n: number | null | undefined) => (n == null ? "n/a" : n.toLocaleString("en-GB"));
const n1 = (n: number | null | undefined) => (n == null ? "n/a" : n.toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 }));

export function CountryParts({ parent }: { parent: string }) {
  const parts = partsOf(parent).map((c) => autoCountry(c)).filter((x): x is NonNullable<typeof x> => !!x);
  if (!parts.length) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {parts.map((c) => {
        const a = c.all;
        return (
          <article key={c.iso2} id={partAnchor(c.iso2)} className="card p-5 scroll-mt-20">
            <h3 className="font-semibold">{c.name}</h3>
            <p className="mt-2 text-sm leading-relaxed">
              {n0(a?.[0])} new cancer cases and {n0(a?.[2])} deaths in {GLOBOCAN.year}; age-standardised incidence {n1(a?.[1])} and mortality {n1(a?.[3])} per 100,000; cumulative risk to 74: {a?.[4] == null ? "n/a" : `${n1(a[4])}%`}. Population {n0(c.pop)}.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <h4 className="text-xs text-muted mb-1">Most new cases</h4>
                <ol className="list-decimal ps-5 space-y-0.5">{c.byIncidence.slice(0, 5).map((s) => <li key={s.code}>{s.label} <span className="text-muted tabular-nums">{n0(s.cases)}</span></li>)}</ol>
              </div>
              <div>
                <h4 className="text-xs text-muted mb-1">Most deaths</h4>
                <ol className="list-decimal ps-5 space-y-0.5">{c.byMortality.slice(0, 5).map((s) => <li key={s.code}>{s.label} <span className="text-muted tabular-nums">{n0(s.deaths)}</span></li>)}</ol>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted">
              IARC lists it as &ldquo;{c.globocanName}&rdquo;. Incidence: method {c.methodInc.code ?? "not given"}{c.methodInc.meaning ? `, ${c.methodInc.meaning}` : ""}. Mortality: method {c.methodMort.code ?? "not given"}{c.methodMort.meaning ? `, ${c.methodMort.meaning}` : ""}.
            </p>
          </article>
        );
      })}
    </div>
  );
}

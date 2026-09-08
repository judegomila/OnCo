import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { Container, PageHeader } from "@/components/ui";
import { CountryRanking, type CountryRow } from "@/components/CountryRanking";
import { countryExtras } from "@/data/country-extras";
import data from "../../../public/openalex/countries.json";

export const metadata: Metadata = { title: "Countries: who is doing the most cancer research", description: "Countries ranked by oncology research output (OpenAlex), growth, highly cited share, open access, registered trials, and a disclosed composite score, with GLOBOCAN burden and national funders." };

type Raw = { built: string; years: number[]; source: string; countries: Record<string, { name: string; works: Record<string, number>; total: number; citedHigh: number; oa: number; trials?: number }> };

export default function Countries() {
  const raw = data as Raw;
  const g = graph();
  const instByCountry = new Map<string, number>();
  for (const i of g.kind("institution")) instByCountry.set(i.country, (instByCountry.get(i.country) ?? 0) + 1);
  const rows: CountryRow[] = Object.entries(raw.countries).map(([code, c]) => ({ code, ...c, ...(countryExtras[code] ?? {}), name: countryExtras[code]?.name ?? c.name, institutions: instByCountry.get(code) ?? 0 }));
  const y1 = raw.years[raw.years.length - 1];
  const top = [...rows].sort((a, b) => (b.works[String(y1)] ?? 0) - (a.works[String(y1)] ?? 0)).slice(0, 3);

  return (
    <>
      <PageHeader kicker={<span className="kicker">Who</span>} title="Countries: who is doing the most cancer research"
        lede={`Oncology research output by country from OpenAlex (${raw.years[0]}–${y1}), with growth, highly cited share, open access, ClinicalTrials.gov sites, cancer burden, and the national funder. Ranked by a disclosed composite score. In ${y1} the leaders by volume were ${top.map((t) => t.name).join(", ")}.`} />
      <Container className="pb-16">
        <CountryRanking rows={rows} years={raw.years} />

        <section className="mt-12 grid gap-6 lg:grid-cols-2 text-[15px] leading-relaxed max-w-6xl">
          <div>
            <h2 className="text-lg font-semibold mb-2">How the score works</h2>
            <p>Research intensity (0–100) = 40% works in {y1} (log-scaled against the leader) + 20% highly cited share (works with more than 50 citations, {raw.years[0]}–{y1}, scaled to the best country with at least 500 works) + 15% five-year growth (capped at +150%) + 15% registered trials with a site in the country (log-scaled) + 10% open-access share. Per-capita mode divides works and trials by population in millions. The formula is deliberately simple; argue with it in the repository.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Counting rules and caveats</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Whole counting.</strong> OpenAlex credits a work to every country among its authors&apos; affiliations, so international papers count once per participating country and totals exceed the true number of works. Fractional counting (as in Nature Index) would lower the totals of highly collaborative countries such as the UK, Netherlands, and Switzerland.</li>
              <li><strong>Topic assignment.</strong> Works are those whose primary OpenAlex topic falls in subfield 2730, Oncology. Cancer biology published under genetics, immunology, or radiology subfields is not counted; clinical oncology dominates.</li>
              <li><strong>Language and indexing bias.</strong> OpenAlex indexes English-language journals most completely; Chinese-, Japanese-, and Russian-language output is under-represented, and China&apos;s counted share has risen partly because more of its journals are now indexed.</li>
              <li><strong>Citations lag.</strong> The highly cited share uses a fixed threshold (more than 50 citations) over five years, which favours earlier years; {y1} papers have had little time to accrue citations.</li>
              <li><strong>Trials.</strong> ClinicalTrials.gov counts every registered study with at least one site in the country, all statuses and all conditions where the registry lists the location; it is a proxy for clinical research capacity, not cancer trials alone, and under-counts countries whose trials register elsewhere (EU CTIS, ChiCTR, CTRI, jRCT).</li>
              <li><strong>Burden and funding.</strong> Incidence and mortality are GLOBOCAN 2022 age-standardised rates per 100,000; funder budgets are approximate and mix cancer-specific and all-field figures, as labelled.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10 text-sm text-muted max-w-4xl">
          <h2 className="text-lg font-semibold text-foreground mb-2">Sources</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><a className="underline" href="https://docs.openalex.org/api-entities/works" rel="noopener">OpenAlex works API</a>: {raw.source}. Data built {raw.built}; rebuild with <code>npm run fetch:countries</code>.</li>
            <li><a className="underline" href="https://clinicaltrials.gov/data-api/api" rel="noopener">ClinicalTrials.gov API v2</a>, <code>query.locn</code> counts.</li>
            <li><a className="underline" href="https://gco.iarc.who.int/today/en/fact-sheets-populations" rel="noopener">IARC Global Cancer Observatory</a>, GLOBOCAN 2022 country fact sheets.</li>
            <li><a className="underline" href="https://data.worldbank.org/indicator/SP.POP.TOTL" rel="noopener">World Bank population</a>, 2024 estimates; national funder websites as linked in each row.</li>
            <li>Cross-checks: <a className="underline" href="https://www.nature.com/nature-index/country-outputs/generate/all/global" rel="noopener">Nature Index country outputs</a> (fractional counting, 145 journals) and <a className="underline" href="https://www.scimagojr.com/countryrank.php?area=2700&category=2730" rel="noopener">SCImago country rank, Oncology</a>.</li>
          </ul>
        </section>
      </Container>
    </>
  );
}

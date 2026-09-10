/**
 * HTA decisions feed (improvement #95): payer and appraisal verdicts per product and country.
 *
 * Sources, all public and key-free, each with a different depth:
 *   NICE (England)   The published-guidance list blocks scripts, but individual technology appraisal pages do
 *                    not. Every NICE TA referenced in src/data/coverage-uk.ts is fetched to confirm the title,
 *                    publication date and whether the guidance has been withdrawn or replaced.
 *   G-BA (Germany)   The early benefit assessment (Nutzenbewertung) register is an HTML table, newest first:
 *                    active substance, brand, procedure start date and status. The first pages are read and
 *                    matched to corpus products.
 *   PBAC (Australia) Meeting outcomes are published as PDF documents. The latest meetings are listed with a
 *                    link to the outcome document; verdicts are not extracted from PDFs.
 *   HAS (France), CDA-AMC (Canada): no machine-readable list without a key or a browser; not fetched.
 *
 * Fetched rows are merged with the curated NICE outcomes from coverage-uk.ts in /hta/.
 *
 *   public/hta/index.json  { fetched, bodies: {...}, decisions: [...] }
 *
 * Run: npx tsx scripts/fetch-hta.ts   Monthly via .github/workflows/refresh-hta.yml.
 */
import { graph } from "../src/lib/graph";
import { coverageUk } from "../src/data/coverage-uk";
import { NameMatcher, decodeEntities, getText, matchableFromGraph, normaliseDate, publicPath, sleep, stripTags, today, writeJson } from "./feed-utils";

const OUT = publicPath("hta", "index.json");
const GBA_PAGES = Number(process.argv.find((a) => a.startsWith("--gba-pages="))?.slice(12) ?? 8);

export type HtaBody = "NICE" | "G-BA" | "PBAC";
export type HtaDecision = {
  body: HtaBody; country: string; drugId?: string; product: string; brand?: string; title: string;
  verdict: string; verdictLabel: string; date?: string; updated?: string; url: string; documentUrl?: string; note?: string;
};
export type HtaSnapshot = {
  fetched: string;
  bodies: Record<HtaBody, { name: string; country: string; url: string; method: string; checked: number; ok: number; failed: number; note?: string }>;
  decisions: HtaDecision[];
  errors: string[];
};

const GBA_STATUS: Record<string, string> = {
  "Verfahren begonnen": "Procedure started",
  "Stellungnahmeverfahren": "Written consultation",
  "Mündliche Anhörung": "Oral hearing",
  "Beschluss gefasst": "Decision adopted",
  "Beschluss veröffentlicht": "Decision published",
  "Verfahren beendet": "Procedure closed",
  "Verfahren eingestellt": "Procedure discontinued",
  "Verfahren ausgesetzt": "Procedure suspended",
};

async function main() {
  const g = graph();
  const drugs = g.kind("drug");
  const matcher = new NameMatcher(matchableFromGraph(drugs as never), ["drug"]);
  const snap: HtaSnapshot = {
    fetched: today(), decisions: [], errors: [],
    bodies: {
      NICE: { name: "National Institute for Health and Care Excellence", country: "United Kingdom (England and Wales)", url: "https://www.nice.org.uk/guidance/published?ngt=Technology%20appraisal%20guidance", method: "Each TA cited in coverage-uk.ts is fetched to confirm title, publication date and withdrawal status", checked: 0, ok: 0, failed: 0 },
      "G-BA": { name: "Gemeinsamer Bundesausschuss", country: "Germany", url: "https://www.g-ba.de/bewertungsverfahren/nutzenbewertung/", method: `First ${GBA_PAGES} pages of the early benefit assessment register, matched to corpus products by active substance`, checked: 0, ok: 0, failed: 0 },
      PBAC: { name: "Pharmaceutical Benefits Advisory Committee", country: "Australia", url: "https://www.pbs.gov.au/industry/listing/elements/pbac-meetings/pbac-outcomes", method: "Latest meetings listed with links to the outcome documents (PDF; verdicts not extracted)", checked: 0, ok: 0, failed: 0 },
    },
  };

  // ---- NICE: verify every TA page we cite ----
  const nice = Object.values(coverageUk).filter((c) => /nice\.org\.uk\/guidance\/ta\d+/i.test(c.nice.url ?? ""));
  for (const c of nice) {
    const d = g.get(c.drugId);
    const url = c.nice.url!;
    snap.bodies.NICE.checked++;
    const html = await getText(url, { accept: "text/html", tries: 2 });
    await sleep(700);
    if (!html) { snap.bodies.NICE.failed++; snap.decisions.push({ body: "NICE", country: "UK", drugId: c.drugId, product: d?.name ?? c.drugId, brand: d && "brand" in d ? (d.brand as string | undefined) : undefined, title: c.nice.ta ?? url, verdict: c.nice.status, verdictLabel: c.nice.status, date: c.nice.year ? String(c.nice.year) : undefined, url, note: "TA page not reachable at fetch time; curated status shown" }); continue; }
    snap.bodies.NICE.ok++;
    const title = decodeEntities(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "").split("|").map((s) => s.trim()).filter((s) => s && !/^(Overview|Guidance|NICE)$/i.test(s))[0] ?? c.nice.ta ?? url;
    const published = normaliseDate(html.match(/Published:[\s\S]{0,80}?<time[^>]*datetime="([^"]+)"/i)?.[1]);
    const updated = normaliseDate(html.match(/Last updated:[\s\S]{0,80}?<time[^>]*datetime="([^"]+)"/i)?.[1]);
    const text = stripTags(html.slice(0, 60_000));
    const superseded = /this guidance has been (updated and replaced|replaced)/i.test(text);
    const withdrawn = !superseded && /this guidance has been withdrawn/i.test(text);
    // The TA page must name the product (a word of its INN, brand or alias); otherwise the TA number in coverage-uk.ts is wrong or renumbered.
    const words = [d?.name ?? "", d && "brand" in d ? String(d.brand ?? "") : "", ...(d?.aka ?? [])].join(" ").toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 5 && !/^(liposomal|pegylated|acetate|hydrochloride|therapy|inhibitor|tablets?|injection)$/.test(w));
    const stem = (w: string) => w.slice(0, Math.max(5, Math.floor(w.length * 0.75)));
    const low = title.toLowerCase();
    const titleNames = words.some((w) => low.includes(stem(w)));
    if (!titleNames) { snap.decisions.push({ body: "NICE", country: "UK", drugId: c.drugId, product: d?.name ?? c.drugId, brand: d && "brand" in d ? (d.brand as string | undefined) : undefined, title, verdict: "mismatch", verdictLabel: "TA page does not name this product", date: published, updated, url, note: `Curated status ${c.nice.status}; the cited TA number may be wrong or renumbered` }); continue; }
    const label = withdrawn ? "Withdrawn" : superseded ? "Superseded by newer guidance" : { recommended: "Recommended", optimised: "Recommended (optimised)", cdf: "Cancer Drugs Fund", "not recommended": "Not recommended", "in development": "In development", terminated: "Terminated", "not appraised": "Not appraised", unknown: "Not yet researched" }[c.nice.status];
    snap.decisions.push({ body: "NICE", country: "UK", drugId: c.drugId, product: d?.name ?? c.drugId, brand: d && "brand" in d ? (d.brand as string | undefined) : undefined, title, verdict: withdrawn ? "withdrawn" : superseded ? "superseded" : c.nice.status, verdictLabel: label, date: published ?? (c.nice.year ? String(c.nice.year) : undefined), updated, url, note: c.nice.indication });
  }
  console.log(`hta: NICE ${snap.bodies.NICE.ok}/${snap.bodies.NICE.checked} TA pages read`);

  // ---- G-BA: paginated register ----
  for (let page = 1; page <= GBA_PAGES; page++) {
    const url = `https://www.g-ba.de/bewertungsverfahren/nutzenbewertung/?sort=beginn&direction=desc&seite=${page}`;
    snap.bodies["G-BA"].checked++;
    const html = await getText(url, { accept: "text/html", tries: 2 });
    await sleep(800);
    if (!html) { snap.bodies["G-BA"].failed++; continue; }
    snap.bodies["G-BA"].ok++;
    for (const row of html.match(/<tr[^>]*gba-entity-list__table-row[^>]*>[\s\S]*?<\/tr>/g) ?? []) {
      const cell = (label: string) => { const m = row.match(new RegExp(`data-label="${label}"[^>]*>([\\s\\S]*?)</td>`)); return m ? stripTags(m[1]) : undefined; };
      const substance = cell("Wirkstoff") ?? "";
      const href = row.match(/href="(\/bewertungsverfahren\/nutzenbewertung\/\d+\/)"/)?.[1];
      const brand = cell("Handelsname");
      const start = cell("Beginn des Verfahrens");
      const status = cell("Status") ?? "";
      const inn = substance.replace(/\s*\(.*$/, "").trim();
      const id = matcher.best(inn) ?? (brand ? matcher.best(brand) : undefined);
      if (!id || !href) continue;
      const d = g.get(id);
      const m = start?.match(/(\d{2})\.(\d{2})\.(\d{4})/);
      snap.decisions.push({ body: "G-BA", country: "Germany", drugId: id, product: d?.name ?? inn, brand, title: substance, verdict: status, verdictLabel: GBA_STATUS[status] ?? status, date: m ? `${m[3]}-${m[2]}-${m[1]}` : undefined, url: `https://www.g-ba.de${href}`, note: substance.match(/\((.*)\)\s*$/)?.[1] });
    }
  }
  console.log(`hta: G-BA ${snap.decisions.filter((d) => d.body === "G-BA").length} procedures matched to corpus products`);

  // ---- PBAC: latest meetings and their outcome documents ----
  const index = await getText(snap.bodies.PBAC.url, { accept: "text/html", tries: 2 });
  snap.bodies.PBAC.checked++;
  if (!index) snap.bodies.PBAC.failed++;
  else {
    snap.bodies.PBAC.ok++;
    const meetings = [...index.matchAll(/href="(pbac-outcomes\/recommendations-made-by-the-pbac-[^"]+)"[^>]*>([^<]*)</g)].map((m) => ({ href: `https://www.pbs.gov.au/industry/listing/elements/pbac-meetings/${m[1]}`, label: stripTags(m[2]) })).slice(0, 6);
    for (const mt of meetings) {
      const html = await getText(mt.href, { accept: "text/html", tries: 2 });
      await sleep(600);
      const pdf = html?.match(/href="([^"]+\.pdf)"/i)?.[1];
      const when = mt.label.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i);
      snap.decisions.push({ body: "PBAC", country: "Australia", product: "All items considered at the meeting", title: mt.label, verdict: "document", verdictLabel: "Outcomes document", date: when ? `${when[2]}-${String(["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].indexOf(when[1].toLowerCase()) + 1).padStart(2, "0")}` : undefined, url: mt.href, documentUrl: pdf ? (pdf.startsWith("http") ? pdf : `https://www.pbs.gov.au${pdf}`) : undefined, note: "PBAC publishes outcomes as PDF; open the document for product-level recommendations." });
    }
    snap.bodies.PBAC.note = `${meetings.length} most recent meetings listed`;
  }

  snap.decisions.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  writeJson(OUT, snap);
  console.log(`hta: ${snap.decisions.length} decisions -> ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

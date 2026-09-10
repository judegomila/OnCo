/**
 * FDA approvals feed (improvement #91).
 *
 * Two public sources, no key:
 *   (a) The FDA Oncology Center of Excellence "Oncology (Cancer)/Hematologic Malignancies Approval
 *       Notifications" page: every oncology approval, accelerated approval and label expansion, dated.
 *   (b) openFDA `drugsfda`: applications with a submission approved (status AP) inside the window, which
 *       catches supplements (new indications, label changes) for products already in the corpus.
 *
 * Each item is matched to corpus product ids by name, brand, code and alias. Items that match nothing are
 * "not yet in corpus" candidates. `firstSeen` is carried over from the previous snapshot so /regulatory/ can
 * show what is new since the last build.
 *
 * Writes public/fda/recent.json. Run: npx tsx scripts/fetch-fda.ts   Weekly via .github/workflows/refresh-fda.yml.
 */
import { graph } from "../src/lib/graph";
import { FDA_OCE_URL, NameMatcher, getJson, getText, isoDaysAgo, matchableFromGraph, parseOcePage, publicPath, readJson, sleep, today, writeJson } from "./feed-utils";

const WINDOW_DAYS = Number(process.argv.find((a) => a.startsWith("--days="))?.slice(7) ?? 120);
const OUT = publicPath("fda", "recent.json");

export type OceApproval = { date: string; title: string; url: string; summary: string; drugIds: string[]; cancerIds: string[]; firstSeen: string };
export type DrugsFdaApproval = { applicationNumber: string; sponsor?: string; brand?: string; generic?: string; submissionType: string; submissionNumber: string; classCode?: string; classDescription?: string; statusDate: string; drugIds: string[]; firstSeen: string };
export type FdaSnapshot = {
  fetched: string; previousFetched?: string; window: { from: string; to: string };
  sources: { oce: string; drugsfda: string };
  oce: OceApproval[];
  drugsfda: DrugsFdaApproval[];
  notInCorpus: Array<{ date: string; title: string; url: string; firstSeen: string; generic?: string }>;
  errors: string[];
};

type DrugsFdaResult = {
  application_number?: string; sponsor_name?: string;
  products?: Array<{ brand_name?: string; active_ingredients?: Array<{ name?: string }> }>;
  openfda?: { generic_name?: string[]; brand_name?: string[] };
  submissions?: Array<{ submission_type?: string; submission_number?: string; submission_status?: string; submission_status_date?: string; submission_class_code?: string; submission_class_code_description?: string }>;
};

/** "granted accelerated approval to sevabertinib (Hyrnuo, Bayer ...)" -> "sevabertinib" */
function genericFromSummary(summary: string): string | undefined {
  const m = summary.match(/(?:approv(?:ed|al)(?: to| for| of)?|authori[sz]ed|cleared|granted [a-z ]*approval (?:to|for))\s+((?:[a-z][a-z0-9-]+\s?){1,4}?)\s*\(/i);
  return m?.[1]?.trim();
}

async function main() {
  const g = graph();
  const matcher = new NameMatcher(matchableFromGraph(g.entities as never), ["drug", "cancer"]);
  const prev = readJson<FdaSnapshot>(OUT);
  const fetched = today();
  const from = isoDaysAgo(WINDOW_DAYS);
  const snap: FdaSnapshot = { fetched, previousFetched: prev?.fetched, window: { from, to: fetched }, sources: { oce: FDA_OCE_URL, drugsfda: "https://api.fda.gov/drug/drugsfda.json" }, oce: [], drugsfda: [], notInCorpus: [], errors: [] };
  const prevOce = new Map((prev?.oce ?? []).map((o) => [o.url, o.firstSeen]));
  const prevNic = new Map((prev?.notInCorpus ?? []).map((o) => [o.url, o.firstSeen]));
  const prevDf = new Map((prev?.drugsfda ?? []).map((o) => [`${o.applicationNumber}/${o.submissionType}${o.submissionNumber}`, o.firstSeen]));

  // (a) OCE approval notifications.
  const html = await getText(FDA_OCE_URL, { accept: "text/html" });
  if (!html) snap.errors.push("FDA OCE page unreachable");
  else {
    const items = parseOcePage(html).filter((i) => i.date >= from);
    for (const it of items) {
      const text = `${it.title} ${it.summary}`;
      const ids = matcher.match(text);
      const drugIds = ids.filter((id) => g.get(id)?.kind === "drug");
      const cancerIds = ids.filter((id) => g.get(id)?.kind === "cancer");
      if (drugIds.length) snap.oce.push({ ...it, drugIds, cancerIds, firstSeen: prevOce.get(it.url) ?? fetched });
      else snap.notInCorpus.push({ date: it.date, title: it.title, url: it.url, generic: genericFromSummary(it.summary), firstSeen: prevNic.get(it.url) ?? fetched });
    }
    console.log(`fda: OCE ${items.length} notifications since ${from}; ${snap.oce.length} matched, ${snap.notInCorpus.length} not in corpus`);
  }

  // (b) openFDA drugsfda: applications with an approved submission in the window.
  const fromCompact = from.replace(/-/g, ""), toCompact = fetched.replace(/-/g, "");
  const search = `submissions.submission_status_date:[${fromCompact}+TO+${toCompact}]+AND+submissions.submission_status:AP`;
  let skip = 0, pages = 0, total = 0;
  for (;;) {
    const url = `https://api.fda.gov/drug/drugsfda.json?search=${search}&limit=100&skip=${skip}`;
    const json = await getJson<{ meta?: { results?: { total?: number } }; results?: DrugsFdaResult[] }>(url);
    await sleep(400);
    if (!json) { if (pages === 0) snap.errors.push("openFDA drugsfda unreachable"); break; }
    total = json.meta?.results?.total ?? 0;
    for (const app of json.results ?? []) {
      const names = new Set<string>();
      for (const p of app.products ?? []) { if (p.brand_name) names.add(p.brand_name); for (const a of p.active_ingredients ?? []) if (a.name) names.add(a.name); }
      for (const n of app.openfda?.generic_name ?? []) names.add(n);
      for (const n of app.openfda?.brand_name ?? []) names.add(n);
      const drugIds = matcher.match([...names].join(" ; "), ["drug"]);
      if (!drugIds.length) continue;
      for (const s of app.submissions ?? []) {
        const d = s.submission_status_date ?? "";
        if (s.submission_status !== "AP" || d < fromCompact || d > toCompact) continue;
        const key = `${app.application_number}/${s.submission_type}${s.submission_number}`;
        snap.drugsfda.push({
          applicationNumber: app.application_number ?? "", sponsor: app.sponsor_name, brand: app.products?.[0]?.brand_name ?? app.openfda?.brand_name?.[0],
          generic: app.openfda?.generic_name?.[0] ?? app.products?.[0]?.active_ingredients?.map((a) => a.name).join(" / "),
          submissionType: s.submission_type ?? "", submissionNumber: s.submission_number ?? "", classCode: s.submission_class_code, classDescription: s.submission_class_code_description,
          statusDate: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`, drugIds, firstSeen: prevDf.get(key) ?? fetched,
        });
      }
    }
    skip += 100; pages++;
    if (skip >= total || pages >= 30) break;
  }
  snap.drugsfda.sort((a, b) => b.statusDate.localeCompare(a.statusDate));
  console.log(`fda: drugsfda ${total} applications with approvals in window; ${snap.drugsfda.length} submissions for corpus products`);

  writeJson(OUT, snap);
  console.log(`fda: wrote ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

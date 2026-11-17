import { testCoverageFor, type TestCoverageRow } from "@/data/test-coverage";
import { statusClass } from "@/lib/text";
import { TL } from "./T";

const WHERE: Record<TestCoverageRow["country"], string> = { US: "United States", GB: "United Kingdom" };
/** Chip tone per status: a recommendation or cover reads green, a refusal red, a gap neutral. */
const TONE: Record<TestCoverageRow["status"], string> = {
  covered: "approved", "covered with conditions": "approved", "recommended with conditions": "approved",
  "not covered": "negative", "not recommended": "negative", "research only": "mixed", "not confirmed": "concept",
};
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

/**
 * "Who pays for this test": what a payer's or guidance body's own document says about a test, one entry per
 * document, each with the day it was read (src/data/test-coverage.ts). A test that was looked for and could not be
 * confirmed says so, with what was searched, so a gap reads as a gap in our research and never as a refusal.
 * Rendered on a test page only when a row exists; a test nobody has looked up shows nothing.
 */
export function TestCoverage({ testId }: { testId: string }) {
  const rows = testCoverageFor(testId);
  if (!rows.length) return null;
  return (
    <div id="who-pays" className="mt-6 scroll-mt-24">
      <div className="kicker mb-2"><TL text="Who pays for this test" /></div>
      <ul className="space-y-3">
        {rows.map((r, i) => (
          <li key={i} className="card p-4 text-sm">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-semibold">{WHERE[r.country]}</span>
              <span className="text-muted">{r.payer}</span>
              <span className={`chip ${statusClass(TONE[r.status])}`}>{cap(r.status)}</span>
            </div>
            <p className="leading-relaxed max-w-3xl">{r.note}</p>
            <p className="mt-1.5 text-xs text-muted">
              {r.document && <><a className="underline" href={r.document.url} rel="noopener">{r.document.id}: {r.document.title}</a>{r.effective && <>, in effect from {r.effective}</>}. </>}
              {r.searched && <>Searched: {r.searched} {r.searchUrl && <><a className="underline break-all" href={r.searchUrl} rel="noopener">Repeat the search</a>. </>}</>}
              Read on {r.readOn}.
            </p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted mt-2">A national rule or a recommendation is not a promise that a given plan or hospital pays for the test: ask the laboratory or your care team before it is ordered. Countries not listed have not been researched.</p>
    </div>
  );
}

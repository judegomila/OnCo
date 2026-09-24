import Link from "next/link";
import { routeFor } from "@/lib/kinds";
import { resolveCompare, type CompareSet, type ResolvedCell } from "@/lib/cancer-compare";
import { CancerIcon } from "./CancerIcon";
import { ToolGlyph } from "./ToolGlyph";

/**
 * Side-by-side table of a compare set: one column per cancer, one row per field, every cell naming the record field
 * or the page it came from. Wide tables scroll inside the card so the page stays inside a 390 px viewport; the row
 * label column sticks to the left while scrolling.
 */
export function CompareCancers({ set }: { set: CompareSet }) {
  const { cancers, rows } = resolveCompare(set);
  const short = (name: string) => name.replace(/\s*\(.*?\)\s*$/, "");
  return (
    <div className="card overflow-x-auto">
      <table className="onco text-sm min-w-[720px]">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-card min-w-[150px]">Field</th>
            {cancers.map((c) => (
              <th key={c.id} className="min-w-[210px] align-bottom">
                <Link href={routeFor(c)} className="inline-flex items-center gap-1.5 hover:underline"><CancerIcon cancerId={c.id} className="h-4 w-4 shrink-0" />{short(c.name)}</Link>
                {c.id === set.anchorId && <span className="block text-[10px] font-normal text-accent mt-0.5">this page&rsquo;s cancer</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ def, cells }) => (
            <tr key={def.id} id={`row-${def.id}`} className="align-top">
              <th scope="row" className="sticky left-0 z-10 bg-card text-start font-medium">
                <span className="inline-flex items-center gap-1.5"><ToolGlyph name={def.icon} className="h-3.5 w-3.5 text-accent" />{def.label}</span>
                {def.note && <span className="block text-[11px] font-normal text-muted mt-0.5">{def.note}</span>}
              </th>
              {cancers.map((c) => <td key={c.id}><Cell cell={cells[c.id]} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-xs text-muted">Each cell names the record field it was read from or links the paper it quotes; an empty cell means the corpus records nothing for it yet. Rates are population-level and depend on the cohort and assay; open the target page for every cohort.</p>
    </div>
  );
}

function Cell({ cell }: { cell: ResolvedCell }) {
  if (!cell) return <span className="text-xs text-muted">Not recorded</span>;
  return (
    <div className="space-y-1">
      {cell.lines.map((l, i) => <p key={i} className="text-foreground/85 leading-snug">{l}</p>)}
      <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-muted">
        {cell.from && <Link href={cell.from.href} className="underline decoration-dotted underline-offset-[3px]">{cell.from.name}: {cell.from.field}</Link>}
        {cell.sources.map((s) => <a key={s.url} href={s.url} className="underline" rel="noopener noreferrer" title={s.label}>{s.label.length > 60 ? `${s.label.slice(0, 59)}…` : s.label}</a>)}
      </div>
    </div>
  );
}

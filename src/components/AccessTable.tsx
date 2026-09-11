import type { Drug } from "@/lib/schema";

const FLAG: Record<string, string> = { US: "United States", UK: "United Kingdom", EU: "European Union", JP: "Japan", CN: "China", DE: "Germany", FR: "France", CA: "Canada", AU: "Australia", KR: "South Korea" };

/** Cost and access by country: list price where disclosed, reimbursement status, assistance programme. */
export function AccessTable({ access }: { access: Drug["access"] }) {
  if (!access.length) return null;
  return (
    <div className="card p-4">
      <div className="kicker mb-2">Cost & access</div>
      <div className="overflow-x-auto -mx-4 px-4">
      <table className="onco">
        <thead><tr><th>Country</th><th>Reimbursement</th><th className="hidden sm:table-cell">List price</th><th className="hidden md:table-cell">Assistance</th></tr></thead>
        <tbody>
          {access.map((a, i) => (
            <tr key={i}>
              <td className="font-medium whitespace-nowrap">{FLAG[a.country] ?? a.country}{a.generic && <span className="ml-1 chip bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">generic</span>}</td>
              <td>{a.reimbursement ?? <span className="text-muted">-</span>}</td>
              <td className="hidden sm:table-cell">{a.listPrice ?? <span className="text-muted">not disclosed</span>}</td>
              <td className="hidden md:table-cell">{a.assistance ? <a className="underline break-all" href={a.assistance} rel="noopener">{a.assistance.replace(/^https?:\/\/(www\.)?/, "")}</a> : <span className="text-muted">-</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <p className="text-xs text-muted mt-2">List prices are manufacturer or Medicare figures where publicly disclosed; net prices after rebates are usually lower. Reimbursement changes; check the payer.</p>
    </div>
  );
}

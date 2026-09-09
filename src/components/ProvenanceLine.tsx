import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";

type Prov = { commit: string; date: string; author: string; message: string; file: string };
let cache: Record<string, Prov> | null = null;

function load(): Record<string, Prov> {
  if (cache) return cache;
  const p = join(process.cwd(), "public", "provenance.json");
  cache = existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as Record<string, Prov>) : {};
  return cache;
}

/** Records with a field-level change history (public/history/<id>.json, built by scripts/history.ts). */
let historyIds: Set<string> | null = null;
function hasHistory(id: string): boolean {
  if (!historyIds) {
    const p = join(process.cwd(), "public", "history", "index.json");
    historyIds = new Set();
    if (existsSync(p)) {
      const idx = JSON.parse(readFileSync(p, "utf8")) as { changes?: Array<{ id: string; type: string }> };
      for (const c of idx.changes ?? []) if (c.type !== "added") historyIds.add(c.id);
    }
  }
  return historyIds.has(id) || existsSync(join(process.cwd(), "public", "history", `${id}.json`));
}

const REPO = "https://github.com/judegomila/OnCo";

/** First clause of a commit subject, trimmed to one short line. */
function subject(message: string): string {
  const first = message.split(/\s+[—–]\s+|\n/)[0].trim();
  return first.length > 60 ? first.slice(0, 57).trimEnd() + "…" : first;
}

/** "Last edited <date> · <author> · <message> · diff · history" from public/provenance.json (built by scripts/provenance.ts) and public/history/ (scripts/history.ts). */
export function ProvenanceLine({ id, className = "" }: { id: string; className?: string }) {
  const p = load()[id];
  if (!p) return null;
  const history = hasHistory(id);
  return (
    <div className={`text-xs text-muted ${className}`}>
      <span className="kicker mr-2">Provenance</span>
      Last edited {p.date} · {p.author} · <span title={p.message}>{subject(p.message)}</span>
      {" · "}
      <a className="underline" href={`${REPO}/commit/${p.commit}`} rel="noopener">diff</a>
      {" · "}
      <a className="underline" href={`${REPO}/blob/main/${p.file}`} rel="noopener">file</a>
      {history && (
        <>
          {" · "}
          <Link className="underline" href={`/history/#${id}`} title="Field-level changes to this record">history</Link>
        </>
      )}
    </div>
  );
}

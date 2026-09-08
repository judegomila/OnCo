import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type Prov = { commit: string; date: string; author: string; message: string; file: string };
let cache: Record<string, Prov> | null = null;

function load(): Record<string, Prov> {
  if (cache) return cache;
  const p = join(process.cwd(), "public", "provenance.json");
  cache = existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as Record<string, Prov>) : {};
  return cache;
}

const REPO = "https://github.com/judegomila/OnCo";

/** First clause of a commit subject, trimmed to one short line. */
function subject(message: string): string {
  const first = message.split(/\s+[—–]\s+|\n/)[0].trim();
  return first.length > 60 ? first.slice(0, 57).trimEnd() + "…" : first;
}

/** "Last edited <date> · <author> · <message> · diff" from public/provenance.json (built by scripts/provenance.ts). */
export function ProvenanceLine({ id, className = "" }: { id: string; className?: string }) {
  const p = load()[id];
  if (!p) return null;
  return (
    <div className={`text-xs text-muted ${className}`}>
      <span className="kicker mr-2">Provenance</span>
      Last edited {p.date} · {p.author} · <span title={p.message}>{subject(p.message)}</span>
      {" · "}
      <a className="underline" href={`${REPO}/commit/${p.commit}`} rel="noopener">diff</a>
      {" · "}
      <a className="underline" href={`${REPO}/blob/main/${p.file}`} rel="noopener">file</a>
    </div>
  );
}

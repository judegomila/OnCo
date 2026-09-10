/** Tiny argv parser: `--key value`, `--key=value`, boolean switches, repeated flags collect into arrays. No dependencies. */
export type Flags = Record<string, string | string[] | boolean>;
export type Parsed = { command: string | undefined; positionals: string[]; flags: Flags };

/** Flags that never take a value. */
export const SWITCHES = new Set(["json", "csv", "help", "h", "version", "v", "quiet", "no-attribution"]);
/** Flags that may repeat. */
export const REPEATABLE = new Set(["filter"]);

export function parseArgs(argv: string[]): Parsed {
  const positionals: string[] = [];
  const flags: Flags = {};
  const set = (key: string, value: string | boolean) => {
    if (REPEATABLE.has(key)) { const cur = flags[key]; flags[key] = Array.isArray(cur) ? [...cur, String(value)] : cur === undefined ? [String(value)] : [String(cur), String(value)]; return; }
    flags[key] = value;
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") { positionals.push(...argv.slice(i + 1)); break; }
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq > 0) { set(a.slice(2, eq), a.slice(eq + 1)); continue; }
      const key = a.slice(2);
      const next = argv[i + 1];
      if (SWITCHES.has(key) || next === undefined || next.startsWith("--")) { set(key, true); continue; }
      set(key, next); i++;
      continue;
    }
    if (/^-[a-z]$/i.test(a)) { const key = a.slice(1); const next = argv[i + 1]; if (SWITCHES.has(key) || next === undefined || next.startsWith("-")) set(key, true); else { set(key, next); i++; } continue; }
    positionals.push(a);
  }
  const [command, ...rest] = positionals;
  return { command, positionals: rest, flags };
}

export const str = (flags: Flags, key: string): string | undefined => { const v = flags[key]; return typeof v === "string" ? v : Array.isArray(v) ? v[v.length - 1] : undefined; };
export const list = (flags: Flags, key: string): string[] => { const v = flags[key]; return Array.isArray(v) ? v : typeof v === "string" ? [v] : []; };
export const bool = (flags: Flags, key: string): boolean => flags[key] === true || flags[key] === "true";
export const int = (flags: Flags, key: string, fallback: number): number => { const v = str(flags, key); if (v === undefined) return fallback; const n = Number.parseInt(v, 10); if (!Number.isFinite(n) || n < 1) throw new Error(`--${key} must be a positive integer`); return n; };

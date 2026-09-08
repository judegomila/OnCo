import { logoFor } from "@/lib/logos";

/**
 * Organisation logo. Prefers the self-hosted file fetched by scripts/fetch-logos.ts
 * (Wikimedia Commons or Clearbit), falls back to the organisation's favicon, then initials.
 * Trademarks belong to their owners; shown for identification. Commons licences and attribution
 * are recorded in public/logos/index.json and surfaced in the title attribute.
 */
export function Logo({ id, website, name, size = 56, className = "" }: { id?: string; website: string; name: string; size?: number; className?: string }) {
  const { src, source, entry } = logoFor(id, website);
  const initials = name.split(/[\s/–-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  const title = entry?.source === "wikidata" ? `${name} logo · Wikimedia Commons${entry.license ? ` · ${entry.license}` : ""}${entry.attribution ? ` · ${entry.attribution}` : ""}` : `${name} logo`;
  const pad = source === "favicon" ? "h-[62%] w-[62%]" : "h-[78%] w-[78%]";
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center rounded-xl border border-border bg-white overflow-hidden ${className}`} style={{ width: size, height: size }} title={src ? title : undefined} aria-hidden>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-zinc-500">{initials}</span>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element -- static logo files, no optimisation pipeline
        <img src={src} alt="" width={size} height={size} loading="lazy" decoding="async" referrerPolicy="no-referrer" className={`relative ${pad} object-contain bg-white`} />
      )}
    </span>
  );
}

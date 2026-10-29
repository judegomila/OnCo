import { logoFor } from "@/lib/logos";
import { initialsOf, tint } from "@/lib/monogram";

/**
 * Organisation logo. Prefers the self-hosted file fetched by scripts/fetch-logos.ts
 * (Wikimedia Commons, or the organisation's own site icon), otherwise OnCo's initials tile on a tint chosen from the name.
 * Trademarks belong to their owners; shown for identification. Commons licences and attribution
 * are recorded in public/logos/index.json and surfaced in the title attribute.
 */
export function Logo({ id, website, name, size = 56, className = "", rounded = "rounded-xl" }: { id?: string; website?: string; name: string; size?: number; className?: string; /** Corner radius class; small tiles inside pills want a tighter one. */ rounded?: string }) {
  const { src, source, entry } = logoFor(id, website);
  const initials = initialsOf(name);
  const title = entry?.source === "wikidata" ? `${name} logo · Wikimedia Commons${entry.license ? ` · ${entry.license}` : ""}${entry.attribution ? ` · ${entry.attribution}` : ""}` : `${name} logo`;
  const pad = source === "favicon" ? "h-[62%] w-[62%]" : "h-[78%] w-[78%]";
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${rounded} border border-border overflow-hidden ${className}`} style={{ width: size, height: size, background: src ? "white" : tint(name) }} title={src ? title : undefined} aria-hidden>
      <span className={`absolute inset-0 flex items-center justify-center font-semibold text-zinc-600 ${size < 28 ? "text-[8px]" : "text-sm"}`}>{initials}</span>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element -- static logo files, no optimisation pipeline
        <img src={src} alt="" width={size} height={size} loading="lazy" decoding="async" referrerPolicy="no-referrer" className={`relative ${pad} object-contain bg-white`} />
      )}
    </span>
  );
}

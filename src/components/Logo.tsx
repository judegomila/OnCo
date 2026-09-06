/**
 * Organisation logo, hotlinked from the organisation's own site via Google's favicon
 * service (never copied into this repository). Falls back to initials.
 * Trademarks belong to their owners; this is nominative use for identification.
 */
export function Logo({ website, name, size = 56, className = "" }: { website: string; name: string; size?: number; className?: string }) {
  let domain = "";
  try { domain = new URL(website).hostname.replace(/^www\./, ""); } catch { domain = ""; }
  const initials = name.split(/[\s/–-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center rounded-xl border border-border bg-white overflow-hidden ${className}`} style={{ width: size, height: size }} aria-hidden>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-zinc-500">{initials}</span>
      {domain && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`} alt="" width={size} height={size} loading="lazy" referrerPolicy="no-referrer"
          className="relative h-[70%] w-[70%] object-contain" onError={undefined} />
      )}
    </span>
  );
}

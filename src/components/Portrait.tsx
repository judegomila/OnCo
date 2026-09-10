import { portraitFor, portraitInitial } from "@/lib/portraits";

/**
 * Person portrait in a circle. Uses the self-hosted Wikimedia Commons file fetched by
 * scripts/fetch-portraits.ts (CC0 / CC BY / CC BY-SA / public domain only); the `title` carries the
 * attribution and licence. Without a portrait it falls back to the surname-initial avatar used on the
 * heroes page. Server component: no hooks, no client JS.
 */
export function Portrait({ id, name, size = 56, className = "" }: { id: string; name: string; size?: number; className?: string }) {
  const p = portraitFor(id);
  const text = size >= 56 ? "text-2xl" : size >= 40 ? "text-lg" : size >= 28 ? "text-sm" : "text-[11px]";
  if (!p) {
    return (
      <span aria-hidden className={`inline-flex shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent font-semibold tracking-tight ${text} ${className}`} style={{ width: size, height: size }}>
        {portraitInitial(name)}
      </span>
    );
  }
  return (
    <span className={`inline-flex shrink-0 overflow-hidden rounded-full border border-border bg-white ${className}`} style={{ width: size, height: size }} title={p.attribution}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static self-hosted file with recorded licence, no optimisation pipeline */}
      <img src={p.src} alt={name} title={p.attribution} width={size} height={size} loading="lazy" decoding="async" className="h-full w-full object-cover" />
    </span>
  );
}

/** One-line credit for the person page: author, licence (linked) and the Commons file page. */
export function PortraitCredit({ id, className = "" }: { id: string; className?: string }) {
  const p = portraitFor(id);
  if (!p) return null;
  return (
    <p className={`text-xs text-muted ${className}`}>
      Photo: {p.author}, {p.licenseUrl ? <a className="underline" href={p.licenseUrl} rel="license noopener">{p.license}</a> : p.license}, via{" "}
      <a className="underline" href={p.source} rel="noopener">Wikimedia Commons</a>
    </p>
  );
}

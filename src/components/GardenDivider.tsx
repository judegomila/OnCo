/**
 * A thin botanical section divider: hairline, a small seed head with two leaves, hairline.
 * Decorative only (aria-hidden); hidden with the rest of `.garden` in the contrast theme.
 */
export function GardenDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`garden flex items-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-border" />
      <svg viewBox="0 0 64 22" width="64" height="22" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-55 dark:opacity-65">
        <path d="M32 21 C31.2 15 31.2 10 32 4.5" />
        <path d="M31.6 12 C27.5 10.6 23.4 11.4 19.6 14.4 C23.8 15.4 27.9 14.4 31.6 12 Z" />
        <path d="M32.4 9 C36.4 7.4 40.5 7.8 44.4 10.6 C40.3 11.8 36.2 11 32.4 9 Z" />
        <path d="M30.2 4.2 a1.8 2.4 0 1 0 3.6 0 a1.8 2.4 0 1 0 -3.6 0" />
      </svg>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

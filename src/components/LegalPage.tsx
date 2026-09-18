import Link from "next/link";
import type { ReactNode } from "react";
import { Tip } from "./Tip";

/**
 * Shared pieces for the legal pages (/terms-of-use/ and /privacy/): line icons drawn like the rest of the site,
 * a contents strip of chips, sections whose headings carry an icon and link to themselves, plain-word tooltips on
 * legal terms, highlighted placeholders the owner must fill, and the build date rendered as "Last updated".
 */
type IconProps = { className?: string };
const Svg = ({ children, className = "h-5 w-5" }: { children: ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>{children}</svg>
);

export const LEGAL_ICONS = {
  compass: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M15 9l-2 5-4 2 2-5z" /></Svg>,
  stethoscope: (p: IconProps) => <Svg {...p}><path d="M6 3v5a5 5 0 0 0 10 0V3" /><path d="M11 13v2.5a4.5 4.5 0 0 0 9 0V13" /><circle cx="20" cy="10.5" r="2" /></Svg>,
  check: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M8.5 12.5l2.3 2.3L15.5 10" /></Svg>,
  user: (p: IconProps) => <Svg {...p}><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20.5c0-3.9 3.4-6.5 7.5-6.5s7.5 2.6 7.5 6.5" /></Svg>,
  key: (p: IconProps) => <Svg {...p}><circle cx="8" cy="14" r="4.5" /><path d="M11.5 11.5L20 3" /><path d="M16.5 6.5l2.5 2.5" /><path d="M14 9l2 2" /></Svg>,
  book: (p: IconProps) => <Svg {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5V5.5" /><path d="M8 7h8" /><path d="M8 11h8" /></Svg>,
  link: (p: IconProps) => <Svg {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" /></Svg>,
  shield: (p: IconProps) => <Svg {...p}><path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z" /><path d="M9.5 12l1.8 1.8L15 10" /></Svg>,
  refresh: (p: IconProps) => <Svg {...p}><path d="M20 12a8 8 0 0 1-14.5 4.6" /><path d="M4 12a8 8 0 0 1 14.5-4.6" /><path d="M18.5 3.5v4h-4" /><path d="M5.5 20.5v-4h4" /></Svg>,
  scale: (p: IconProps) => <Svg {...p}><path d="M12 3v18" /><path d="M5 7h14" /><path d="M8 21h8" /><path d="M5 7l-3 7a3 3 0 0 0 6 0z" /><path d="M19 7l-3 7a3 3 0 0 0 6 0z" /></Svg>,
  mail: (p: IconProps) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></Svg>,
  building: (p: IconProps) => <Svg {...p}><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M16 9h2a2 2 0 0 1 2 2v10" /><path d="M8 7h2M8 11h2M8 15h2" /><path d="M3 21h18" /></Svg>,
  list: (p: IconProps) => <Svg {...p}><path d="M8 6h12" /><path d="M8 12h12" /><path d="M8 18h12" /><circle cx="4" cy="6" r="0.8" /><circle cx="4" cy="12" r="0.8" /><circle cx="4" cy="18" r="0.8" /></Svg>,
  server: (p: IconProps) => <Svg {...p}><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" /></Svg>,
  chart: (p: IconProps) => <Svg {...p}><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 16v-5" /><path d="M12 16V8" /><path d="M16 16v-3" /></Svg>,
  cookie: (p: IconProps) => <Svg {...p}><path d="M20.5 12.5A8.5 8.5 0 1 1 11.5 3.5a3 3 0 0 0 3.5 3.5 3 3 0 0 0 3 3 3 3 0 0 0 2.5 2.5z" /><path d="M9 10h.01M8 15h.01M13 14h.01M15 17h.01" /></Svg>,
  heart: (p: IconProps) => <Svg {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></Svg>,
  globe: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.6 2.6 3.8 5.4 3.8 8.5s-1.2 5.9-3.8 8.5c-2.6-2.6-3.8-5.4-3.8-8.5s1.2-5.9 3.8-8.5z" /></Svg>,
  ban: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M6 6l12 12" /></Svg>,
  hand: (p: IconProps) => <Svg {...p}><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11" /><path d="M10 10V4.5a1.5 1.5 0 0 1 3 0V10" /><path d="M13 10V5.5a1.5 1.5 0 0 1 3 0V12" /><path d="M16 12V8.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.4L2.8 14a1.6 1.6 0 0 1 2.7-1.7L7 14" /></Svg>,
  child: (p: IconProps) => <Svg {...p}><circle cx="12" cy="7" r="3.5" /><path d="M6.5 21v-4a5.5 5.5 0 0 1 11 0v4" /><path d="M9 17v4M15 17v4" /></Svg>,
  plane: (p: IconProps) => <Svg {...p}><path d="M2.5 12.5l19-8-5 16-4-6z" /><path d="M12.5 14.5l9-10" /></Svg>,
  clock: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>,
  code: (p: IconProps) => <Svg {...p}><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M14 5l-4 14" /></Svg>,
} as const;
export type LegalIcon = keyof typeof LEGAL_ICONS;

export type LegalSectionDef = { id: string; title: string; icon: LegalIcon };

/** Contents strip: one chip per section, each jumping to its heading. */
export function LegalToc({ sections }: { sections: readonly LegalSectionDef[] }) {
  return (
    <nav aria-label="Contents" className="flex flex-wrap gap-2 text-sm not-prose">
      {sections.map((s) => {
        const Icon = LEGAL_ICONS[s.icon];
        return <a key={s.id} href={`#${s.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 hover:border-accent/50 hover:text-accent"><Icon className="h-4 w-4" />{s.title}</a>;
      })}
    </nav>
  );
}

/** A numbered section whose heading carries the icon and links to its own anchor. */
export function LegalSection({ def, index, children }: { def: LegalSectionDef; index: number; children: ReactNode }) {
  const Icon = LEGAL_ICONS[def.icon];
  return (
    <section id={def.id} className="scroll-mt-24 space-y-3">
      <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
        <Icon className="h-5 w-5 text-accent shrink-0" />
        <a href={`#${def.id}`} className="hover:underline"><span className="text-muted font-normal tabular-nums me-1.5">{index}.</span>{def.title}</a>
      </h2>
      {children}
    </section>
  );
}

/** A legal or technical term with its plain-word meaning on hover or focus. */
export function Term({ children, tip }: { children: string; tip: string }) {
  return (
    <Tip title={children} text={tip}>
      <span tabIndex={0} className="underline decoration-dotted decoration-accent/70 underline-offset-[3px] cursor-help rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">{children}</span>
    </Tip>
  );
}

/** Text the owner must replace before the page is final; highlighted so it cannot be missed. */
export function Placeholder({ children }: { children: string }) {
  return <mark className="rounded bg-accent-soft px-1 py-0.5 text-accent font-medium" title="To be filled in by the site owner">{children}</mark>;
}

/** The date of the build that produced this page, in words (static export: the render runs at build time). */
export function buildDate(now = new Date()): { iso: string; label: string } {
  return { iso: now.toISOString().slice(0, 10), label: now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) };
}

/** "Last updated" line with the build date and cross-links to the sibling legal page and the repository. */
export function LegalMeta({ date, siblings }: { date: { iso: string; label: string }; siblings: Array<{ href: string; label: string }> }) {
  const Icon = LEGAL_ICONS.clock;
  return (
    <p className="not-prose flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <span className="inline-flex items-center gap-1.5"><Icon className="h-4 w-4" />Last updated <time dateTime={date.iso}>{date.label}</time></span>
      {siblings.map((s) => (s.href.startsWith("http")
        ? <a key={s.href} href={s.href} rel="noopener" className="underline hover:text-foreground">{s.label}</a>
        : <Link key={s.href} href={s.href} className="underline hover:text-foreground">{s.label}</Link>))}
    </p>
  );
}

export const REPO_URL = "https://github.com/judegomila/OnCo";
export const ISSUES_URL = `${REPO_URL}/issues`;

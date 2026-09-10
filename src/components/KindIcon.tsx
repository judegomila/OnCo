import type { Kind } from "@/lib/schema";

type P = { className?: string };
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const Svg = ({ className, children }: P & { children: React.ReactNode }) => <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} {...S}>{children}</svg>;

/** One monoline icon per object kind, so a newcomer can tell a treatment from a trial at a glance. */
const ICONS: Record<Kind, (p: P) => React.ReactElement> = {
  cancer: (p) => <Svg {...p}><path d="M12 3c4.5 0 8 3.6 8 8.2 0 4.8-3.8 9.8-8 9.8S4 16 4 11.2C4 6.6 7.5 3 12 3Z" /><circle cx="10" cy="10" r="2.2" /><circle cx="14.5" cy="14" r="1.2" fill="currentColor" stroke="none" /></Svg>,
  section: (p) => <Svg {...p}><path d="M5 21V4M5 4h11l-1.5 3L16 10H5" /></Svg>,
  technology: (p) => <Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></Svg>,
  target: (p) => <Svg {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></Svg>,
  drug: (p) => <Svg {...p}><rect x="3.5" y="9" width="17" height="7" rx="3.5" transform="rotate(-35 12 12.5)" /><path d="M9.2 8.7l5.6 8.1" /></Svg>,
  company: (p) => <Svg {...p}><path d="M4 21V5.5L12 3l8 2.5V21M4 21h16M9 21v-5h6v5" /><path d="M8 9h1.5M11 9h1.5M14.5 9H16M8 13h1.5M11 13h1.5M14.5 13H16" /></Svg>,
  institution: (p) => <Svg {...p}><path d="M3 21h18M5 21V10h14v11M4 10 12 4l8 6" /><path d="M12 13v5M9.5 15.5h5" /></Svg>,
  pathway: (p) => <Svg {...p}><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M6.5 7.5 10.8 16M17.5 7.5 13.2 16M7 6h10" /></Svg>,
  term: (p) => <Svg {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20M9 8h7" /></Svg>,
  trial: (p) => <Svg {...p}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M8.5 10h7M8.5 14h7M8.5 18h4" /></Svg>,
  pairing: (p) => <Svg {...p}><path d="M10 14a4 4 0 0 1 0-5.7l2.3-2.3a4 4 0 0 1 5.7 5.7l-1 1M14 10a4 4 0 0 1 0 5.7l-2.3 2.3a4 4 0 0 1-5.7-5.7l1-1" /></Svg>,
  roadmap: (p) => <Svg {...p}><path d="M4 19c4-1 5-6 8-7s4-6 8-7" /><circle cx="4" cy="19" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="20" cy="5" r="1.5" fill="currentColor" stroke="none" /></Svg>,
  idea: (p) => <Svg {...p}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 3.5 10.9c-.7.5-1 1.2-1 2.1h-5c0-.9-.3-1.6-1-2.1A6 6 0 0 1 12 3Z" /></Svg>,
  collection: (p) => <Svg {...p}><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></Svg>,
  person: (p) => <Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></Svg>,
  bottleneck: (p) => <Svg {...p}><path d="M4 4h16l-6 8v7l-4 2v-9L4 4Z" /></Svg>,
  paper: (p) => <Svg {...p}><path d="M6 3h8l4 4v14H6V3ZM14 3v4h4" /><path d="M9 12h6M9 16h6" /></Svg>,
  journal: (p) => <Svg {...p}><path d="M4 4h16v16H4z" /><path d="M7 8h5v5H7zM14 8h3M14 11h3M7 16h10" /></Svg>,
};

export function KindIcon({ kind, className = "h-5 w-5" }: { kind: Kind; className?: string }) {
  const I = ICONS[kind];
  return I ? I({ className }) : <Svg className={className}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" /></Svg>;
}

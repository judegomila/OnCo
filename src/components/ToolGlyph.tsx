import type { ReactNode } from "react";
import type { ToolIcon } from "@/lib/decision-tools";

/** Small line glyphs for the decision aids' inputs, pills and cards; drawn inline so no dependency is added. Works in server and client trees. */
export function ToolGlyph({ name, className = "h-4 w-4" }: { name: ToolIcon; className?: string }) {
  const paths: Record<ToolIcon, ReactNode> = {
    ruler: <><rect x="3" y="8" width="18" height="8" rx="1.5" /><path d="M7 8v3M11 8v4M15 8v3M19 8v4" /></>,
    trend: <><path d="M4 18l5-6 4 3 7-8" /><path d="M16 7h4v4" /></>,
    shape: <><path d="M5 19c0-5 3-8 7-8s7 3 7 8" /><path d="M12 11V5" /><circle cx="12" cy="4" r="1.5" /></>,
    age: <><circle cx="12" cy="8" r="4" /><path d="M5 21c0-4 3-6 7-6s7 2 7 6" /></>,
    liver: <><path d="M4 10c0-3 3-5 8-5s8 2 8 5c0 4-4 7-9 9-4 1-7-1-7-4v-5Z" /><path d="M13 5v6l3 3" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    pain: <><path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9L9.5 8Z" /></>,
    layers: <><path d="M3 8l9-4 9 4-9 4-9-4Z" /><path d="M3 12l9 4 9-4" /><path d="M3 16l9 4 9-4" /></>,
    margin: <><path d="M4 12h10" /><path d="M14 6v12" /><path d="M14 12h6" /><path d="M17 9l3 3-3 3" /></>,
    vessel: <><path d="M4 6c4 0 4 6 8 6s4 6 8 6" /><path d="M4 18c4 0 4-6 8-6s4-6 8-6" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    scalpel: <><path d="M3 21l7-7" /><path d="M9 15l9-11a2 2 0 0 1 3 3L10 16l-3-1Z" /></>,
    watch: <><circle cx="12" cy="12" r="6" /><path d="M12 9v3l2 1" /><path d="M9 3h6M9 21h6" /></>,
    stop: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
    talk: <><path d="M4 5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-5 4V7a2 2 0 0 1 2-2H4Z" /><path d="M8 10h7" /></>,
    refer: <><path d="M4 12h12" /><path d="M12 7l5 5-5 5" /><path d="M20 5v14" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 8v.5M12 11v5" /></>,
    scan: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 12h18" /><circle cx="12" cy="12" r="3" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    flag: <><path d="M5 21V4" /><path d="M5 4h12l-2 4 2 4H5" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 5-5 2 2-5 5-2Z" /></>,
    polyp: <><path d="M6 20c0-6 2-9 6-9s6 3 6 9" /><circle cx="12" cy="6" r="3" /><path d="M12 9v2" /></>,
    question: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7" /><circle cx="12" cy="17" r=".6" /></>,
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>;
}

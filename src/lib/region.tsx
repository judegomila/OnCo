"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { REGION_META, type Region } from "@/data/regional-approvals";

export type { Region };
export { REGION_META };

/** Order shown in the switcher: the three the owner asked for first, then the other regions we track. */
export const REGION_ORDER: Region[] = ["US", "UK", "CN", "EU", "JP", "AU", "IN"];
const KEY = "onco:region";

/** Best guess from the browser locale; the reader can override it from the header. */
function guess(): Region {
  if (typeof navigator === "undefined") return "US";
  const langs = [navigator.language, ...(navigator.languages ?? [])].map((l) => l.toLowerCase());
  for (const l of langs) {
    if (l.endsWith("-gb") || l.endsWith("-uk") || l.endsWith("-ie")) return "UK";
    if (l.startsWith("zh") || l.endsWith("-cn") || l.endsWith("-hk") || l.endsWith("-tw")) return "CN";
    if (l.startsWith("ja") || l.endsWith("-jp")) return "JP";
    if (l.endsWith("-au") || l.endsWith("-nz")) return "AU";
    if (l.startsWith("hi") || l.endsWith("-in") || /^(bn|ta|te|mr|gu|kn|ml|pa|or|as)\b/.test(l)) return "IN";
    if (/^(de|fr|es|it|nl|pt|pl|sv|da|fi|el|cs|hu|ro|bg|hr|sk|sl|lt|lv|et|mt)\b/.test(l) && !l.endsWith("-br") && !l.endsWith("-mx") && !l.endsWith("-ar")) return "EU";
  }
  return "US";
}

const Ctx = createContext<{ region: Region | null; setRegion: (r: Region | null) => void; ready: boolean }>({ region: null, setRegion: () => {}, ready: false });

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, set] = useState<Region | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const saved = window.localStorage.getItem(KEY) as Region | null;
      // Readers start in Global view and choose a country themselves; a saved choice is honoured.
      set(saved && saved in REGION_META ? saved : null);
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  const setRegion = (r: Region | null) => { set(r); if (r) window.localStorage.setItem(KEY, r); else window.localStorage.removeItem(KEY); document.documentElement.dataset.region = r ?? "global"; };
  return <Ctx.Provider value={{ region, setRegion, ready }}>{children}</Ctx.Provider>;
}

export function useRegion() { return useContext(Ctx); }

/** Best guess from the browser locale, offered as a one-tap option in the switcher. */
export function guessRegion(): Region { return guess(); }

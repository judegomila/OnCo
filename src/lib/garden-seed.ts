/**
 * Small, stable hash of a string: lets page headers vary their garden motif by title without any state.
 * Lives apart from src/components/Garden.tsx (a client module) so server components can call it at render time.
 */
export function gardenSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

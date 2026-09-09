import type { Target } from "@/lib/schema";
import { graph } from "@/lib/graph";

/**
 * Three-step strip for a target page: What it is → What goes wrong in cancer → How drugs use it.
 * Server component; text comes from the target record and the product graph, icons are inline SVG.
 */
export function TargetExplainer({ target }: { target: Target }) {
  const drugs = graph().incoming(target.id).get("drug") ?? [];
  const steps: Array<{ label: string; text: string; icon: React.ReactNode }> = [
    { label: "What it is", text: target.tldr, icon: <ReceptorIcon /> },
    { label: "What goes wrong in cancer", text: firstSentences(target.biology, 2, 240), icon: <WarningIcon /> },
    { label: "How drugs use it", text: howDrugsUseIt(target, drugs.map((d) => (d.kind === "drug" ? d.modality : ""))), icon: <DrugIcon /> },
  ];
  return (
    <ol className="grid gap-3 sm:grid-cols-3" aria-label={`${target.name} in three steps`}>
      {steps.map((s, i) => (
        <li key={s.label} className="card p-4 relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent shrink-0">{s.icon}</span>
            <span className="text-xs font-medium uppercase tracking-wide text-muted">{i + 1} · {s.label}</span>
          </div>
          <p className="text-sm leading-relaxed">{s.text}</p>
          {i < steps.length - 1 && <span aria-hidden="true" className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-muted text-sm">→</span>}
        </li>
      ))}
    </ol>
  );
}

const ICON = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
/** A receptor: stem in a membrane with a cup on top. */
function ReceptorIcon() {
  return (
    <svg {...ICON}>
      <path d="M3 19h18" />
      <path d="M12 19v-8" />
      <path d="M8 6a4 4 0 0 0 8 0" />
      <path d="M8 6v5M16 6v5" />
    </svg>
  );
}
/** Warning triangle. */
function WarningIcon() {
  return (
    <svg {...ICON}>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 9v5" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}
/** Capsule pill. */
function DrugIcon() {
  return (
    <svg {...ICON}>
      <rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)" />
      <path d="M9.6 15.4 14.4 8.6" />
    </svg>
  );
}

/** First `n` sentences of a text, trimmed to about `max` characters. */
export function firstSentences(text: string, n = 2, max = 240): string {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  let out = "";
  for (const p of parts.slice(0, n)) { if (out && (out + " " + p).length > max) break; out = out ? `${out} ${p}` : p; }
  return out || text.slice(0, max);
}

/** Plain-word buckets for drug modality strings, in a fixed display order. */
const BUCKETS: Array<[RegExp, string]> = [
  [/imaging|tracer|\bPET\b|fluorescent/i, "imaging agents"],
  [/\bADC\b|conjugate/i, "antibody-drug conjugates"],
  [/bispecific|engager|ImmTAC|×|x CD3/i, "bispecific antibodies"],
  [/CAR-T|CAR-NK|TCR-T|\bTIL\b|cellular|cell therapy/i, "cell therapies"],
  [/radio|alpha therapy|lutetium|actinium|emitter/i, "radioligands"],
  [/vaccine/i, "vaccines"],
  [/immunotoxin|cytotoxin/i, "immunotoxins"],
  [/antibody/i, "antibodies"],
  [/PROTAC|degrader|SERD|cereblon|IMiD|molecular glue/i, "degraders"],
  [/hormon|GnRH|antiandrogen|aromatase|progestin|SERM/i, "hormonal therapies"],
  [/small[- ]molecule|inhibitor|TKI|antagonist|agonist|modulator|mimetic|oral/i, "small molecules"],
];
const ORDER = ["antibodies", "antibody-drug conjugates", "bispecific antibodies", "cell therapies", "immunotoxins", "radioligands", "vaccines", "small molecules", "degraders", "hormonal therapies", "imaging agents", "other agents"];

function bucketOf(modality: string): string {
  for (const [re, name] of BUCKETS) if (re.test(modality)) return name;
  return "other agents";
}

const CLASS_HINT: Record<string, string> = {
  "surface-antigen": "Because it sits on the outside of the cell, it can be reached from the bloodstream: antibodies flag the cell, ADCs deliver a toxin, radioligands deliver radiation, and CAR-T or bispecifics bring a T cell.",
  kinase: "Kinases are switched on by binding ATP inside the cell, so most drugs are small molecules shaped to plug that ATP pocket.",
  checkpoint: "Checkpoint drugs are antibodies that cover one side of an immune ‘stand down’ handshake so T cells stay active.",
  "nuclear-receptor": "Drugs cut off the hormone supply, block the receptor so the hormone cannot bind, or send the receptor to the cell's waste disposal.",
  enzyme: "Inhibitors are shaped to fit the enzyme's active site so the reaction the cancer relies on stops.",
  transcription: "Transcription factors have no pocket to plug, so drugs either degrade them or block the partner protein they need to dock on DNA.",
  oncogene: "Drugs fit a pocket that exists only in one shape of the mutant protein and hold it there, off.",
  "tumor-suppressor": "Because the protein is lost rather than overactive, drugs either restore its function or exploit the weakness its loss leaves (synthetic lethality).",
  stroma: "The target is on the supporting tissue around the tumour, so drugs aim to breach the wall or use it as a beacon for radioligands and imaging.",
  other: "Drugs bind the molecule precisely: to switch it off, flag the cell for the immune system, or deliver a payload.",
};

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** "12 products aim at HER2: antibodies, antibody-drug conjugates and small molecules. <class hint>" */
export function howDrugsUseIt(target: Pick<Target, "name" | "targetClass">, modalities: string[]): string {
  const hint = CLASS_HINT[target.targetClass] ?? CLASS_HINT.other;
  const n = modalities.length;
  if (n === 0) return `No product in this corpus aims at ${target.name} yet. ${hint}`;
  const kinds = [...new Set(modalities.map(bucketOf))].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
  return `${n} ${n === 1 ? "product aims" : "products aim"} at ${target.name}: ${joinList(kinds)}. ${hint}`;
}

import { MECHANICS } from "@/data/mechanics-atlas";

/**
 * One monoline glyph per stage of the mechanics atlas, and one per chapter. Same grammar as KindIcon, FrontIcon
 * and GuideIcon: 24x24 viewBox, 1.5px stroke, currentColor, rounded joins, no fills except tiny dots. Server-safe,
 * no hooks. `MechanicsGlyphDefs` renders every glyph once as a <symbol>; `MechanicsGlyph sprite` then draws a
 * <use>, which keeps the hub's markup small when the same glyph appears in the journey strip, the rail and a card.
 */
const STAGE: Record<string, string> = {
  // Chapter 1: the body's defences
  // A wall of bricks with a sheet beneath: tissue architecture and the basement membrane
  "tissue-architecture": "M3 7h18M3 11h18M3 15h18M7 7v4M15 7v4M11 11v4M3 19h18",
  // An eye with a shield inside: immune surveillance
  "immune-surveillance": "M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6ZM12 8.5l3 1.2v2.3c0 1.7-1.3 3-3 3.6-1.7-.6-3-1.9-3-3.6V9.7l3-1.2Z",
  // A tick inside a magnifier over a strand: DNA damage checkpoints
  "dna-damage-checkpoints": "M4 4c4 3 4 5 0 8m0-8c4 3 4 5 0 8M4 12c4 3 4 5 0 8m0-8c4 3 4 5 0 8M15.5 15.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 0L20 20M13.5 11l1.5 1.5 3-3",
  // A cell splitting apart with a power symbol: apoptosis, the self-destruct switch
  "apoptosis-defence": "M12 4a8 8 0 0 1 8 8M12 4a8 8 0 0 0-8 8M4.5 14.5l2 3.5M8.5 17.5l1 3M12 18v3M15.5 17.5l-1 3M19.5 14.5l-2 3.5M12 8v5M9.5 9.5a3.5 3.5 0 1 0 5 0",
  // A pause sign inside a circle with a slow leak: senescence, permanent retirement
  "senescence-defence": "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM10 9v6M14 9v6M20 20l2 2M21 17l1.5.5",
  // Two brake levers holding a wheel: tumour suppressors p53 and RB
  "tumour-suppressors": "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 5l4 4M20 5l-4 4M4 5h3M4 5v3M20 5h-3m3 0v3M12 16v5M9 21h6",
  // Two cells touching, arrows pushed back: contact inhibition
  "contact-inhibition": "M7 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM11 11h2M7 18v3M17 18v3M5 20l2 1 2-1M15 20l2 1 2-1",
  // A strand with a capped, shortening end and a counter: telomere limits
  "telomere-limits": "M3 8c3 2.5 3 4.5 0 7m0-7c3 2.5 3 4.5 0 7M9 8c3 2.5 3 4.5 0 7m0-7c3 2.5 3 4.5 0 7M15 11.5h3M20.5 11.5a1.5 1.5 0 1 0 0-.01M15 8v7",

  // Chapter 2: how a cell becomes cancer
  // A fingerprint: mutation and mutational signatures
  "mutation-signatures": "M12 4a8 8 0 0 0-6.5 3.3M4 12a8 8 0 0 0 1 4M12 7a5 5 0 0 0-5 5c0 2 .5 3.5 1.5 5M12 10a2 2 0 0 0-2 2c0 2.5 1 4.5 2.5 6.5M12 4.2a8 8 0 0 1 7.5 5.3M20 12c0 3-1 5.5-2.5 7.5M15 12c0-1.7-1.3-3-3-3M16.5 15.5c-.3 1.7-1 3.2-2 4.5",
  // A steering wheel with a passenger seat: drivers versus passengers
  "driver-passenger": "M9 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM9 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM4 11h2.5M11.5 11H14M9 13.5V16M17 12h4v6h-4zM17 18l-1 3M21 18l1 3M15 12l2-4h4",
  // A branching tree of dots: clonal evolution
  "clonal-evolution": "M12 21v-6M12 15l-5-4M12 15l5-4M7 11l-3-3M7 11l2-5M17 11l3-3M17 11l-2-5M4 8V5M9 6V3M20 8V5M15 6V3",
  // A strand with switch tags: epigenetic reprogramming
  "epigenetic-reprogramming": "M3 12h18M7 12V8a1.5 1.5 0 1 1 3 0v4M14 12v4a1.5 1.5 0 1 0 3 0v-4M5 16h2M17 8h2",
  // A field of cells with a few marked: field cancerisation
  "field-cancerisation": "M4 6h4v4H4zM10 6h4v4h-4zM16 6h4v4h-4zM4 12h4v4H4zM10 12h4v4h-4zM16 12h4v4h-4zM6 8h.01M18 14h.01M4 18h16",
  // A virus particle with a flame: viral and inflammatory causes
  "viral-inflammatory": "M10 16a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM10 4v3M10 16v3M4 11.5h1.5M14.5 11.5H16M5.8 7.3l1 1M13.2 15.7l1 1M5.8 15.7l1-1M13.2 7.3l1-1M18 21c2 0 3-1.5 3-3.2 0-1.6-1.3-2.8-1.6-4.3-.7 1-1.2 1.6-1.4 2.7-.3-.6-.6-1-1-1.2-.5 1-1 2-1 3 0 1.7 1 3 2 3Z",

  // Chapter 3: replication and growth machinery
  // A clock face with four ticks: the cell cycle and CDKs
  "cell-cycle-cdks": "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM12 4v2M12 18v2M4 12h2M18 12h2M12 12l3-3M12 12h.01",
  // A replication fork: DNA replication and replication stress
  "dna-replication": "M3 12h7M10 12c2 0 3-1.5 4.5-3s3-3 5.5-3M10 12c2 0 3 1.5 4.5 3s3 3 5.5 3M16 9v-.01M16 15v-.01M20 4v2M20 18v2",
  // A spindle with two poles and chromosomes at the plate: mitosis and chromosome segregation
  "mitosis": "M4 12h16M4 12c4-5 12-5 16 0M4 12c4 5 12 5 16 0M12 8.5v7M10 10l2 2 2-2M10 14l2-2 2 2",
  // An antenna dimer relaying down: growth-factor signalling
  "growth-factor-signalling": "M8 3v6M16 3v6M6 5l2-2 2 2M14 5l2-2 2 2M5 9h14M12 9v4M9 13h6M12 13v4M12 17l-3 4M12 17l3 4",
  // Three stacked amplifier stages: PI3K/AKT/mTOR
  "pi3k-akt-mtor": "M12 3v3M12 6l-5 4h10l-5-4ZM12 10v3M12 13l-5 4h10l-5-4ZM12 17v4M4 6l3 1M20 6l-3 1",
  // A loudspeaker with sound: transcription and MYC
  "transcription-myc": "M4 10v4h3l5 4V6L7 10H4ZM15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11",
  // A ribbon feeding through a ribosome: translation
  "translation": "M3 12h5M16 12h5M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM9.5 9.5a3 3 0 0 1 5 0M12 12v.01M9 20h6",
  // A shredder with a tagged protein going in: protein homeostasis and the proteasome
  "proteostasis": "M5 12h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1ZM8 16h.01M12 16h.01M16 16h.01M12 3v9M9 6l3-3 3 3M15.5 9.5a1.5 1.5 0 1 0 0-.01",

  // Chapter 4: evading death and repair
  // A dam wall holding water with a gate: apoptosis and the BCL-2 family
  "apoptosis-bcl2": "M4 20V8h6v12M6 11h2M6 14h2M6 17h2M10 12c2-1 4 1 6 0s4 1 5 0M10 16c2-1 4 1 6 0s4 1 5 0M14 8V4M12 6l2-2 2 2",
  // Two halves of a broken strand with a bandage: DNA repair and synthetic lethality
  "dna-repair-synthetic-lethality": "M3 6c3 2 3 4 0 6m0-6c3 2 3 4 0 6M3 12c3 2 3 4 0 6m0-6c3 2 3 4 0 6M12 7l9 9M13.5 5.5a1.5 1.5 0 0 1 2 0l3 3a1.5 1.5 0 0 1 0 2l-7 7a1.5 1.5 0 0 1-2 0l-3-3a1.5 1.5 0 0 1 0-2l7-7Z",
  // A cell with a mouth eating its own contents: autophagy
  "autophagy": "M12 20a8 8 0 1 1 7.5-10.5M20 12l-4.5 2.5V9.5L20 12ZM9 10a1 1 0 1 0 0-.01M9 15a1 1 0 1 0 0-.01M13 13.5a1 1 0 1 0 0-.01",
  // A membrane with rust spots and an iron atom: ferroptosis
  "ferroptosis": "M3 9c3-2 6 2 9 0s6-2 9 0M3 15c3-2 6 2 9 0s6-2 9 0M6 12h.01M10 12h.01M14 12h.01M18 12h.01M12 3.5v1.5M9.5 6l1 1M14.5 6l-1 1",

  // Chapter 5: feeding the tumour
  // A flame under a beaker with a sugar cube: Warburg metabolism
  "warburg": "M9 3h6M10 3v5l-4.5 8a2 2 0 0 0 1.7 3h9.6a2 2 0 0 0 1.7-3L14 8V3M8.5 15h7M11 10h2v2h-2z",
  // A hexagon amino acid with an N: glutamine
  "glutamine": "M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9L12 3ZM9.5 15V9l5 6V9",
  // A droplet of oil with a bilayer: lipids
  "lipids": "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11ZM9 14.5c1-1 2-1 3 0s2 1 3 0",
  // A gauge reading low with a cloud: hypoxia and HIF
  "hypoxia-hif": "M4 16a8 8 0 0 1 16 0M12 16l-4-4M12 16h.01M8 20h8M6 4.5a2 2 0 0 1 3.8-.9A2.5 2.5 0 0 1 12.5 7H6a1.5 1.5 0 0 1 0-2.5Z",
  // Branching vessels sprouting: angiogenesis and VEGF
  "angiogenesis": "M12 21v-8M12 13c0-3-2-5-5-5H4M12 13c0-3 2-5 5-5h3M7 8V4M17 8V4M4 8l-1.5-2M20 8l1.5-2M12 17l-3-1M12 17l3-1",
  // Two forks over one plate: nutrient competition
  "nutrient-competition": "M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM4 4v5a2 2 0 0 0 2 2M6 4v7M6 11v9M18 4v5a2 2 0 0 1-2 2M18 11v9M20 4v7",

  // Chapter 6: escaping the immune system
  // A wanted poster on a pin: antigen presentation
  "antigen-presentation": "M6 5h12v13H6zM12 5V3M9 9h6M9 12h6M9 15h4M12 18v3",
  // A brake pedal with a lock: checkpoints PD-1, CTLA-4, LAG-3
  "checkpoints": "M4 17l6-8M10 9l3 2-6 8M13 20l-6 0M14 9a3 3 0 0 1 6 0v2M13 11h8v6h-8zM17 13.5v1.5",
  // A snowflake over a barren dune: cold tumours, deserts and exclusion
  "cold-tumours": "M12 3v10M8.5 5l3.5 2 3.5-2M8.5 11l3.5-2 3.5 2M7.5 8h9M3 20c3-2 6-2 9 0s6 2 9 0M5 17h.01M19 17h.01",
  // A guard figure with a shield: myeloid suppression
  "myeloid-suppression": "M9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M15 10l4 1.5v3c0 2.3-1.7 4-4 4.8-2.3-.8-4-2.5-4-4.8v-3l4-1.5Z",
  // A brake that turns into an accelerator: TGF-beta
  "tgf-beta": "M4 12h6M10 12l-2-2M10 12l-2 2M14 12h6M14 12l2-2M14 12l2 2M12 4v16M4 6h5M15 18h5",
  // A cascade of falling drops punching a hole: complement
  "complement": "M6 3v4M12 3v6M18 3v4M6 11a2 2 0 1 0 0 .01M18 11a2 2 0 1 0 0 .01M12 13a2 2 0 1 0 0 .01M4 20a8 3 0 0 1 16 0M9 19h6",
  // A cell with its identity papers torn: NK-cell evasion
  "nk-evasion": "M9 19a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM15 4h6v7h-6zM15 4l6 7M18 6h.01M9 11h.01M7 15h4",

  // Chapter 7: invasion and metastasis
  // A brick leaving the wall as a rolling stone: epithelial-mesenchymal transition
  "emt": "M3 6h5v4H3zM3 12h5v4H3zM10 6h5v4h-5zM10 12h2M20 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15 15l3-3M15 15h2M15 15v-2",
  // A pickaxe through a wall: invasion
  "invasion": "M3 8h5M3 12h8M3 16h5M3 20h11M12 4l8 8M14 6c2-2 5-2 7 0M14 6l-3 3M18 12l-3 3",
  // A blood vessel with a cell slipping in: intravasation and circulating tumour cells
  "intravasation-ctc": "M3 9h18M3 15h18M8 12a2 2 0 1 0 0 .01M14 12a2 2 0 1 0 0 .01M11 3l1 6M12 3l-1 6",
  // A seed bed prepared before the seed lands: the pre-metastatic niche
  "pre-metastatic-niche": "M3 19h18M5 19c0-3 2-5 4-5s4 2 4 5M13 19c0-2 1-3.5 3-3.5s3 1.5 3 3.5M12 4v6M10 8l2 2 2-2M7 5l.01 0M17 5l.01 0",
  // A crescent moon over a sleeping cell: dormancy
  "dormancy": "M8 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM6 13h4M15 3a4 4 0 0 0 5 6 4.5 4.5 0 1 1-5-6ZM12 9h2l-2 2h2",
  // A map pin over a body outline: organ tropism
  "organ-tropism": "M12 3a4 4 0 0 1 4 4c0 3-4 7-4 7s-4-4-4-7a4 4 0 0 1 4-4ZM12 7h.01M6 21c0-4 2.5-6 6-6s6 2 6 6M4 15l2 2M20 15l-2 2",
  // A brick wall with a keyhole: the brain barrier
  "brain-barrier": "M3 5h18v14H3zM3 10h18M3 14h18M8 5v5M15 5v5M11 10v4M12 14v5M11.5 10a1 1 0 1 0 1 0",

  // Chapter 8: the tumour ecosystem
  // Woven fibres, a mesh: fibroblasts and the extracellular matrix
  "cafs-ecm": "M4 6c4 3 8-3 12 0s4 3 4 0M4 12c4 3 8-3 12 0s4 3 4 0M4 18c4 3 8-3 12 0s4 3 4 0M8 3v18M16 3v18",
  // A branching vessel tree with a leak: vasculature
  "vasculature": "M12 3v6M12 9c-3 0-4 2-4 5v7M12 9c3 0 4 2 4 5v7M8 14H5M16 14h3M20 17l.01 0M20 20l.01 0",
  // A neuron with dendrites reaching a cell: nerves
  "nerves": "M6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 11v5c0 2 1 3 3 3h3M4 4L3 3M8 4l1-1M3 8H2M17 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 19h2",
  // A gut loop with bacteria dots: microbiome
  "microbiome": "M5 6h9a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h10M8 9h.01M12 9h.01M10 17h.01M15 17h.01M18 4l.01 0",
  // A figure with a shrinking outline and a downward arrow: cachexia signals
  "cachexia": "M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 21v-7l-2-4h10l-2 4v7M9 14h6M19 5v6M17 9l2 2 2-2",

  // Chapter 9: why treatments fail
  // A blocked road with a fork around it: resistance mechanics
  "resistance-mechanics": "M12 21v-6M12 15c0-4-2-6-6-6H4M12 15c0-4 2-6 6-6h2M4 9V5M20 9V5M12 8V3M9 6l3-3 3 3M9 8h6",
  // Several differing cells in one tumour: heterogeneity
  "heterogeneity": "M7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM7 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM7 7h.01M15.5 7h3M17 15.5v3M15.5 17h3M5.5 17l3 0M7 15.5l0 3",
  // A few quiet cells sheltering under a rock: persisters
  "persisters": "M3 12c2-6 16-6 18 0H3ZM7 16a1.5 1.5 0 1 0 0 .01M12 17a1.5 1.5 0 1 0 0 .01M17 16a1.5 1.5 0 1 0 0 .01M6 20h12",
  // A pump throwing a molecule out through the membrane: efflux pumps
  "efflux": "M3 9h6M15 9h6M3 15h6M15 15h6M9 7h6v10H9zM12 20v-3M12 12v-2M10.5 8.5l1.5-1.5 1.5 1.5M12 4v3",
  // A cell morphing into a different shape: lineage plasticity
  "lineage-plasticity": "M8 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM8 10h.01M13 12h2M15 12l-1-1M15 12l-1 1M17 20a3 3 0 0 0 3-3c0-2-1.5-2.5-2-4-.5 1.5-2 2-2 4a3 3 0 0 0 1 3Z",
};

const CHAPTER: Record<string, string> = {
  // A shield: the body's defences
  defences: "M12 3l7 2.5v5.5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V5.5L12 3Z",
  // A cell with a spark: how a cell becomes cancer
  becoming: "M11 20a7 7 0 1 1 6.6-9.3M18 3v3M16 5h4M19 8l1.5 1.5M11 13h.01",
  // A cog: replication and growth machinery
  machinery: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-11v2m0 12v2M4 12h2m12 0h2M6.3 6.3l1.4 1.4m8.6 8.6 1.4 1.4M6.3 17.7l1.4-1.4m8.6-8.6 1.4-1.4",
  // A heart with a mended line: evading death and repair
  survival: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10ZM8 12h2l1.5-2 1.5 4 1.5-2h2",
  // A fork and leaf: feeding the tumour
  feeding: "M6 3v5a2 2 0 0 0 2 2M8 3v7M8 10v11M10 3v5a2 2 0 0 1-2 2M14 21c0-6 3-9 7-10-1 5-3 9-7 10ZM14 21c1-4 3-6 5-7",
  // A mask: escaping the immune system
  "immune-escape": "M4 8c2.5-1.5 5.5-2 8-2s5.5.5 8 2c0 6-3.5 10-8 12-4.5-2-8-6-8-12ZM8 11c1-.5 2-.5 3 0M13 11c1-.5 2-.5 3 0M9 15c2 1 4 1 6 0",
  // A footprint trail leaving a circle: invasion and metastasis
  metastasis: "M8 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM8 13v3M12 15l2 2M15 19l2 1M19 17l2 2M13 20h.01M17 14h.01",
  // Layers of a landscape: the tumour ecosystem
  ecosystem: "M3 18c3-2 6-2 9 0s6 2 9 0M3 13c3-2 6-2 9 0s6 2 9 0M12 3l4 6H8l4-6ZM12 9v4",
  // A cracked shield: why treatments fail
  failure: "M12 3l7 2.5v5.5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V5.5L12 3ZM12 6l-2 4 3 1.5-2 4",
};

export const MECHANICS_GLYPH_IDS = Object.keys(STAGE);

/** Every stage of the atlas has a glyph (src/app/mechanics/mechanics.test.ts holds this true). */
export function hasMechanicsGlyph(id: string): boolean {
  return id in STAGE || id in CHAPTER;
}

const FALLBACK = "M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9L12 3ZM12 12h.01";

function pathFor(id: string): string {
  return STAGE[id] ?? CHAPTER[id] ?? FALLBACK;
}

export function MechanicsGlyph({ id, className = "h-5 w-5", sprite = false }: { id: string; className?: string; sprite?: boolean }) {
  if (sprite) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <use href={`#mech-${hasMechanicsGlyph(id) ? id : "fallback"}`} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={pathFor(id)} />
    </svg>
  );
}

/** Render once per page that uses `sprite`; every stage and chapter glyph as a <symbol>. */
export function MechanicsGlyphDefs() {
  const ids = [...MECHANICS.map((c) => c.id), ...MECHANICS.flatMap((c) => c.stages.map((s) => s.id))];
  return (
    <svg aria-hidden focusable="false" width="0" height="0" className="absolute" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      {ids.map((id) => <symbol key={id} id={`mech-${id}`} viewBox="0 0 24 24"><path d={pathFor(id)} /></symbol>)}
      <symbol id="mech-fallback" viewBox="0 0 24 24"><path d={FALLBACK} /></symbol>
    </svg>
  );
}

/** Glyphs for the sections of a stage page; the hub's count pills use the same ones. */
const SECTION: Record<string, string> = {
  // Boxes joined by an arrow: the diagram
  diagram: "M3 5h6v4H3zM15 15h6v4h-6zM9 7h4a2 2 0 0 1 2 2v6M13 13l2 2 2-2",
  // An open book: what happens
  "what-happens": "M12 6.5c-2-1.5-4.5-2-8-2v13c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2v-13c-3.5 0-6 .5-8 2ZM12 6.5v13",
  // A hexagon node with bonds: the molecular players
  players: "M12 8l4 2.3v4.4L12 17l-4-2.3v-4.4L12 8ZM12 8V3M16 10.3l4-2.3M8 10.3 4 8M12 17v4",
  // A capsule: where medicines act
  medicines: "M8.5 4.5 4.5 8.5a4 4 0 0 0 5.7 5.7l4-4a4 4 0 0 0-5.7-5.7ZM15.5 19.5l4-4a4 4 0 0 0-5.7-5.7l-4 4a4 4 0 0 0 5.7 5.7ZM7.5 7.5l4 4",
  // A fork around a barrier: how tumours escape
  escape: "M4 12h5M9 12l3-4 3 4M9 12l3 4 3-4M15 12h5M18 9l2 3-2 3M12 5V3M12 21v-2",
  // A ruler with a probe: measured by
  measured: "M3 8h18v8H3zM7 8v3M11 8v5M15 8v3M19 8v5",
  // A speech bubble with a question mark: open questions
  questions: "M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9ZM10 9a2 2 0 1 1 3 1.7c-.6.4-1 .8-1 1.5M12 14.2v.1",
  // A stack of papers with a tick: key evidence
  evidence: "M7 3h8l4 4v14H7zM15 3v4h4M10 14l2 2 4-4",
  // Two arrows: related stages
  related: "M4 8h13M14 5l3 3-3 3M20 16H7M10 13l-3 3 3 3",
};

export function MechanicsSectionIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={SECTION[id] ?? FALLBACK} />
    </svg>
  );
}

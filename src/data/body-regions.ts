/**
 * Anatomical regions for the body map: which cancers arise there and which
 * local technologies (imaging, ablation, radiation, surgery) apply there.
 * Ids reference existing cancer and technology entities; validated at build by the body page.
 *
 * Geometry is in the BodyMap SVG's 0-400 × 0-980 space: a front-view figure drawn to the
 * eight-head canon (head 118 px; chin 140, nipple line 258, navel 376, pubis 494, knees 730, feet 966).
 * Viewer's left is the patient's right, so the liver sits on the left of the drawing.
 * `paths` are the organ silhouettes; `hit` says whether the clickable area is the fill or a wide stroke.
 */
export type BodyRegion = {
  id: string;
  label: string;
  /** Organ silhouette path(s) drawn in the 400×980 viewBox. */
  paths: string[];
  /** "fill" for closed organ shapes, "stroke" for tubes/bones/outline drawn as lines. */
  hit: "fill" | "stroke";
  /** Anchor the leader line starts from, and which margin the label sits in. */
  anchor: [number, number];
  side: "L" | "R";
  /** Label y in the margin (keeps labels from colliding). */
  labelY: number;
  /** Only shown for one body configuration. */
  sex?: "female" | "male";
  /** Not a single organ: shown as scattered marks and listed under "system-wide". */
  systemWide?: boolean;
  cancers: string[];
  technologies: string[];
};

const mirror = (d: string) => d.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g, (_, x, y) => `${(400 - parseFloat(x)).toFixed(1).replace(/\.0$/, "")} ${y}`);

const LEFT_LUNG = "M184 214 C150 210 126 244 124 292 C122 322 134 340 158 340 C178 340 186 324 188 302 L188 244 Z";
const LEFT_BREAST = "M132 262 C130 300 158 318 190 306 C196 296 196 272 190 260 C170 256 150 258 132 262 Z";
const LEFT_KIDNEY = "M138 372 C124 380 122 412 136 424 C150 430 160 410 156 390 C154 378 148 370 138 372 Z";
const PELVIS_WING = "M118 430 C122 454 136 470 152 472 L162 450 C152 436 136 428 118 430 Z";

export const BODY_REGIONS: BodyRegion[] = [
  { id: "brain", label: "Brain", hit: "fill", anchor: [158, 70], side: "L", labelY: 60,
    paths: ["M200 34 C170 34 156 56 158 80 C160 98 176 108 192 108 L208 108 C224 108 240 98 242 80 C244 56 230 34 200 34 Z"],
    cancers: ["glioblastoma"], technologies: ["mri", "pet-mri", "sbrt", "proton-therapy", "ttfields", "fluorescence-guided-surgery", "methylation-profiling"] },
  { id: "head-neck", label: "Head & neck", hit: "fill", anchor: [232, 128], side: "R", labelY: 110,
    paths: ["M168 112 C176 132 186 140 190 148 L210 148 C214 140 224 132 232 112 C224 120 210 124 200 124 C190 124 176 120 168 112 Z"],
    cancers: ["head-and-neck"], technologies: ["photoimmunotherapy", "bnct", "proton-therapy", "imrt-igrt", "robotic-surgery", "hpv-vaccine"] },
  { id: "thyroid", label: "Thyroid", hit: "fill", anchor: [222, 180], side: "R", labelY: 160,
    paths: ["M186 168 C180 168 176 176 178 186 C180 194 188 194 190 186 C192 180 194 178 200 178 C206 178 208 180 210 186 C212 194 220 194 222 186 C224 176 220 168 214 168 C208 168 204 172 200 172 C196 172 192 168 186 168 Z"],
    cancers: ["thyroid"], technologies: ["ultrasound", "radioligand-therapy"] },
  { id: "oesophagus", label: "Oesophagus", hit: "stroke", anchor: [204, 230], side: "R", labelY: 210,
    paths: ["M200 150 L200 196 C200 240 204 280 208 306"],
    cancers: ["esophageal"], technologies: ["pet-ct", "imrt-igrt", "robotic-surgery", "hyperthermia"] },
  { id: "lung", label: "Lungs", hit: "fill", anchor: [136, 280], side: "L", labelY: 262,
    paths: [LEFT_LUNG, mirror(LEFT_LUNG)],
    cancers: ["nsclc", "sclc", "mesothelioma"], technologies: ["ct", "pet-ct", "sbrt", "proton-therapy", "thermal-ablation", "robotic-surgery", "liquid-biopsy", "ttfields"] },
  { id: "breast", label: "Breast", hit: "fill", anchor: [262, 300], side: "R", labelY: 300,
    paths: [LEFT_BREAST, mirror(LEFT_BREAST)],
    cancers: ["tnbc", "breast-hr-positive", "breast-her2-positive"], technologies: ["mammography", "ultrasound", "mri", "sentinel-node", "brachytherapy", "imrt-igrt", "fluorescence-guided-surgery", "digital-pathology-ai"] },
  { id: "liver", label: "Liver", hit: "fill", anchor: [126, 350], side: "L", labelY: 340,
    paths: ["M120 328 C114 352 118 384 142 394 C170 402 198 388 206 366 L208 332 C182 322 150 320 120 328 Z"],
    cancers: ["hcc", "cholangiocarcinoma"], technologies: ["ultrasound", "mri", "thermal-ablation", "hifu-histotripsy", "sbrt", "radioligand-therapy", "fapi-pet"] },
  { id: "stomach", label: "Stomach", hit: "fill", anchor: [262, 348], side: "R", labelY: 350,
    paths: ["M212 318 C238 310 268 330 264 358 C260 382 238 394 224 386 C212 378 210 360 212 340 Z"],
    cancers: ["gastric"], technologies: ["fapi-pet", "hipec", "robotic-surgery", "car-t"] },
  { id: "pancreas", label: "Pancreas", hit: "fill", anchor: [252, 392], side: "R", labelY: 400,
    paths: ["M150 384 C178 374 226 376 254 388 C258 396 252 400 248 398 C222 390 178 390 152 398 C146 396 146 388 150 384 Z"],
    cancers: ["pancreatic"], technologies: ["fapi-pet", "mr-linac", "irreversible-electroporation", "ttfields", "carbon-ion", "hifu-histotripsy", "mced"] },
  { id: "kidney", label: "Kidneys", hit: "fill", anchor: [126, 400], side: "L", labelY: 392,
    paths: [LEFT_KIDNEY, mirror(LEFT_KIDNEY)],
    cancers: ["rcc"], technologies: ["ct", "thermal-ablation", "hifu-histotripsy", "robotic-surgery", "sbrt"] },
  { id: "colon", label: "Colon & rectum", hit: "stroke", anchor: [134, 470], side: "L", labelY: 460,
    paths: ["M138 404 C132 450 136 480 162 488 L238 488 C264 480 268 450 262 404", "M200 488 L200 500"],
    cancers: ["colorectal"], technologies: ["mrd-testing", "mced", "hipec", "robotic-surgery", "thermal-ablation", "sbrt"] },
  { id: "bladder", label: "Bladder", hit: "fill", anchor: [222, 486], side: "R", labelY: 480,
    paths: ["M180 466 C176 488 190 500 200 500 C210 500 224 488 220 466 Z"],
    cancers: ["urothelial"], technologies: ["mrd-testing", "robotic-surgery", "oncolytic-virus", "imrt-igrt"] },
  { id: "prostate", label: "Prostate", hit: "fill", anchor: [212, 508], side: "R", labelY: 520, sex: "male",
    paths: ["M190 504 C190 496 210 496 210 504 C210 514 190 514 190 504 Z"],
    cancers: ["prostate"], technologies: ["psma-pet", "mri", "brachytherapy", "hifu-histotripsy", "irreversible-electroporation", "sbrt", "mr-linac", "radioligand-therapy", "targeted-alpha-therapy", "robotic-surgery"] },
  { id: "pelvis-female", label: "Ovary, uterus, cervix", hit: "fill", anchor: [232, 456], side: "R", labelY: 440, sex: "female",
    paths: ["M188 448 C188 436 212 436 212 448 C212 462 206 474 200 480 C194 474 188 462 188 448 Z", "M166 452 C168 448 172 448 174 452 C172 456 168 456 166 452 Z", "M226 452 C228 448 232 448 234 452 C232 456 228 456 226 452 Z", "M174 452 C180 446 186 446 190 448", "M226 452 C220 446 214 446 210 448"],
    cancers: ["ovarian", "endometrial", "cervical"], technologies: ["brachytherapy", "hipec", "hpv-vaccine", "robotic-surgery", "hyperthermia", "mced"] },
  { id: "lymph", label: "Lymph nodes", hit: "fill", anchor: [116, 268], side: "L", labelY: 232, systemWide: true,
    paths: ["M170 174 a5 5 0 1 0 0.1 0 Z", "M230 174 a5 5 0 1 0 0.1 0 Z", "M166 190 a4 4 0 1 0 0.1 0 Z", "M234 190 a4 4 0 1 0 0.1 0 Z", "M116 262 a5 5 0 1 0 0.1 0 Z", "M284 262 a5 5 0 1 0 0.1 0 Z", "M126 278 a4 4 0 1 0 0.1 0 Z", "M274 278 a4 4 0 1 0 0.1 0 Z", "M168 504 a5 5 0 1 0 0.1 0 Z", "M232 504 a5 5 0 1 0 0.1 0 Z", "M160 518 a4 4 0 1 0 0.1 0 Z", "M240 518 a4 4 0 1 0 0.1 0 Z"],
    cancers: ["dlbcl", "hodgkin-lymphoma"], technologies: ["fdg-pet", "car-t", "t-cell-engager", "imrt-igrt"] },
  { id: "blood", label: "Blood & marrow", hit: "fill", anchor: [150, 452], side: "L", labelY: 430, systemWide: true,
    paths: [PELVIS_WING, mirror(PELVIS_WING), "M195 216 L205 216 L203 322 L197 322 Z"],
    cancers: ["aml", "all-leukemia", "cll", "multiple-myeloma"], technologies: ["car-t", "t-cell-engager", "mrd-testing", "whole-body-mri", "epigenetic-drugs"] },
  { id: "bone", label: "Bone & soft tissue", hit: "stroke", anchor: [146, 620], side: "L", labelY: 600, systemWide: true,
    paths: ["M150 522 C148 590 146 660 148 720", "M250 522 C252 590 254 660 252 720", "M98 266 C92 310 86 350 82 392", "M302 266 C308 310 314 350 318 392", "M144 760 C146 820 148 880 150 926", "M256 760 C254 820 252 880 250 926"],
    cancers: ["sarcoma"], technologies: ["proton-therapy", "carbon-ion", "hyperthermia", "spect", "mri"] },
  { id: "skin", label: "Skin", hit: "stroke", anchor: [96, 560], side: "L", labelY: 540, systemWide: true,
    paths: ["M184 140 C186 160 186 172 182 184 C160 190 132 196 108 214 C98 224 92 238 96 254 C84 300 76 350 72 400 C68 450 62 500 60 545 C58 570 56 595 60 612 L84 616 C90 596 92 570 96 545 C102 500 108 450 110 400 C112 360 116 300 122 262 C118 300 118 340 126 380 C134 410 124 440 112 470 C110 520 116 600 124 680 C128 720 130 760 134 800 C138 850 146 900 150 930 C152 950 150 965 144 972 L184 972 C186 950 184 930 182 920 C180 870 178 800 176 740 C174 690 180 600 192 520 C196 508 200 500 200 496", mirror("M184 140 C186 160 186 172 182 184 C160 190 132 196 108 214 C98 224 92 238 96 254 C84 300 76 350 72 400 C68 450 62 500 60 545 C58 570 56 595 60 612 L84 616 C90 596 92 570 96 545 C102 500 108 450 110 400 C112 360 116 300 122 262 C118 300 118 340 126 380 C134 410 124 440 112 470 C110 520 116 600 124 680 C128 720 130 760 134 800 C138 850 146 900 150 930 C152 950 150 965 144 972 L184 972 C186 950 184 930 182 920 C180 870 178 800 176 740 C174 690 180 600 192 520 C196 508 200 500 200 496"), "M200 22 C232 22 250 50 250 82 C250 112 232 138 200 142 C168 138 150 112 150 82 C150 50 168 22 200 22 Z"],
    cancers: ["melanoma"], technologies: ["sentinel-node", "oncolytic-virus", "til-therapy", "brachytherapy"] },
  { id: "neuroendocrine", label: "Neuroendocrine (gut, lung, pancreas)", hit: "fill", anchor: [262, 420], side: "R", labelY: 570, systemWide: true,
    paths: ["M148 300 a4 4 0 1 0 0.1 0 Z", "M252 300 a4 4 0 1 0 0.1 0 Z", "M200 392 a4 4 0 1 0 0.1 0 Z", "M232 452 a4 4 0 1 0 0.1 0 Z", "M176 464 a4 4 0 1 0 0.1 0 Z", "M244 366 a4 4 0 1 0 0.1 0 Z"],
    cancers: ["neuroendocrine", "neuroblastoma"], technologies: ["radioligand-therapy", "targeted-alpha-therapy", "pet"] },
];

/** Figure line art (not clickable): the outline, face hints, ribs, heart, hips, and hands. */
export const FIGURE = {
  outlineLeft: "M184 140 C186 160 186 172 182 184 C160 190 132 196 108 214 C98 224 92 238 96 254 C84 300 76 350 72 400 C68 450 62 500 60 545 C58 570 56 595 60 612 L84 616 C90 596 92 570 96 545 C102 500 108 450 110 400 C112 360 116 300 122 262 C118 300 118 340 126 380 C134 410 124 440 112 470 C110 520 116 600 124 680 C128 720 130 760 134 800 C138 850 146 900 150 930 C152 950 150 965 144 972 L184 972 C186 950 184 930 182 920 C180 870 178 800 176 740 C174 690 180 600 192 520 C196 508 200 500 200 496",
  head: "M200 22 C232 22 250 50 250 82 C250 112 232 138 200 142 C168 138 150 112 150 82 C150 50 168 22 200 22 Z",
  ears: ["M150 84 C142 82 140 98 150 100", "M250 84 C258 82 260 98 250 100"],
  hairline: "M158 60 C170 40 230 40 242 60",
  collarbones: ["M182 196 C160 200 136 206 116 216", "M218 196 C240 200 264 206 284 216"],
  ribs: ["M140 246 Q200 262 260 246", "M134 274 Q200 292 266 274", "M132 302 Q200 320 268 302", "M136 330 Q200 346 264 330"],
  heart: "M204 258 C194 246 174 250 174 272 C174 296 196 314 208 324 C222 310 244 294 244 270 C244 252 224 246 214 258 Z",
  hips: ["M118 440 C136 462 160 470 200 470 C240 470 264 462 282 440"],
  knees: ["M132 726 C148 736 168 736 178 726", "M268 726 C252 736 232 736 222 726"],
  hands: ["M60 612 C62 626 66 634 72 636 M70 614 C72 628 76 636 82 636 M78 616 C80 626 84 632 86 634"],
  mirror,
};

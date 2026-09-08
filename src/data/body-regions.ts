/**
 * Anatomical regions for the body map: which cancers arise there and which
 * local technologies (imaging, ablation, radiation, surgery) apply there.
 * Ids reference existing cancer and technology entities; validated at build by the body page.
 * Coordinates are in the BodyMap SVG's 0-400 × 0-900 space (front view, head at top).
 */
export type BodyRegion = {
  id: string;
  label: string;
  /** SVG path (front view) drawn in the 400×900 viewBox. */
  path: string;
  /** Label anchor. */
  at: [number, number];
  cancers: string[];
  technologies: string[];
};

export const BODY_REGIONS: BodyRegion[] = [
  { id: "brain", label: "Brain", at: [200, 62], path: "M200 20 C156 20 132 52 132 86 C132 112 150 132 172 140 L228 140 C250 132 268 112 268 86 C268 52 244 20 200 20 Z",
    cancers: ["glioblastoma"], technologies: ["mri", "pet-mri", "sbrt", "proton-therapy", "ttfields", "fluorescence-guided-surgery", "methylation-profiling"] },
  { id: "head-neck", label: "Head & neck", at: [200, 175], path: "M168 142 L232 142 L238 200 L162 200 Z",
    cancers: ["head-and-neck"], technologies: ["photoimmunotherapy", "bnct", "proton-therapy", "imrt-igrt", "robotic-surgery", "hpv-vaccine"] },
  { id: "thyroid", label: "Thyroid", at: [200, 218], path: "M180 206 C186 200 214 200 220 206 L216 232 L184 232 Z",
    cancers: ["thyroid"], technologies: ["ultrasound", "radioligand-therapy"] },
  { id: "lung", label: "Lungs", at: [200, 330], path: "M118 250 C104 300 100 380 122 420 L182 420 L186 262 Z M282 250 C296 300 300 380 278 420 L218 420 L214 262 Z",
    cancers: ["nsclc", "sclc", "mesothelioma"], technologies: ["ct", "pet-ct", "sbrt", "proton-therapy", "thermal-ablation", "robotic-surgery", "liquid-biopsy", "ttfields"] },
  { id: "breast", label: "Breast", at: [200, 296], path: "M124 280 C130 322 168 336 192 320 L192 270 Z M276 280 C270 322 232 336 208 320 L208 270 Z",
    cancers: ["tnbc", "breast-hr-positive", "breast-her2-positive"], technologies: ["mammography", "ultrasound", "mri", "sentinel-node", "brachytherapy", "imrt-igrt", "fluorescence-guided-surgery", "digital-pathology-ai"] },
  { id: "oesophagus", label: "Oesophagus", at: [200, 248], path: "M194 232 L206 232 L208 300 L192 300 Z",
    cancers: ["esophageal"], technologies: ["pet-ct", "imrt-igrt", "robotic-surgery", "hyperthermia"] },
  { id: "liver", label: "Liver", at: [148, 456], path: "M112 428 C108 470 130 496 172 496 L190 470 L190 428 Z",
    cancers: ["hcc", "cholangiocarcinoma"], technologies: ["ultrasound", "mri", "thermal-ablation", "hifu-histotripsy", "sbrt", "radioligand-therapy", "fapi-pet"] },
  { id: "stomach", label: "Stomach", at: [236, 450], path: "M210 426 C250 420 276 446 262 486 C250 508 214 506 206 484 Z",
    cancers: ["gastric"], technologies: ["fapi-pet", "hipec", "robotic-surgery", "car-t"] },
  { id: "pancreas", label: "Pancreas", at: [200, 518], path: "M150 508 C190 500 240 502 262 512 L260 528 C230 524 190 526 150 522 Z",
    cancers: ["pancreatic"], technologies: ["fapi-pet", "mr-linac", "irreversible-electroporation", "ttfields", "carbon-ion", "hifu-histotripsy", "mced"] },
  { id: "kidney", label: "Kidneys", at: [200, 560], path: "M126 528 C110 550 116 588 142 590 C160 588 166 560 154 532 Z M274 528 C290 550 284 588 258 590 C240 588 234 560 246 532 Z",
    cancers: ["rcc"], technologies: ["ct", "thermal-ablation", "hifu-histotripsy", "robotic-surgery", "sbrt"] },
  { id: "colon", label: "Colon & rectum", at: [200, 604], path: "M136 596 C132 660 168 680 200 680 C232 680 268 660 264 596 L248 596 C250 640 226 656 200 656 C174 656 150 640 152 596 Z",
    cancers: ["colorectal"], technologies: ["mrd-testing", "mced", "hipec", "robotic-surgery", "thermal-ablation", "sbrt"] },
  { id: "bladder", label: "Bladder", at: [200, 690], path: "M172 672 C170 700 184 714 200 714 C216 714 230 700 228 672 Z",
    cancers: ["urothelial"], technologies: ["mrd-testing", "robotic-surgery", "oncolytic-virus", "imrt-igrt"] },
  { id: "prostate", label: "Prostate", at: [200, 736], path: "M186 722 C186 712 214 712 214 722 C214 736 186 736 186 722 Z",
    cancers: ["prostate"], technologies: ["psma-pet", "mri", "brachytherapy", "hifu-histotripsy", "irreversible-electroporation", "sbrt", "mr-linac", "radioligand-therapy", "targeted-alpha-therapy", "robotic-surgery"] },
  { id: "pelvis-female", label: "Ovary, uterus, cervix", at: [200, 654], path: "M160 640 C160 626 240 626 240 640 C240 660 224 668 200 668 C176 668 160 660 160 640 Z",
    cancers: ["ovarian", "endometrial", "cervical"], technologies: ["brachytherapy", "hipec", "hpv-vaccine", "robotic-surgery", "hyperthermia", "mced"] },
  { id: "skin", label: "Skin", at: [330, 400], path: "M300 300 L340 300 L340 500 L300 500 Z",
    cancers: ["melanoma"], technologies: ["sentinel-node", "oncolytic-virus", "til-therapy", "brachytherapy"] },
  { id: "bone", label: "Bone & soft tissue", at: [70, 400], path: "M60 300 L100 300 L100 500 L60 500 Z",
    cancers: ["sarcoma"], technologies: ["proton-therapy", "carbon-ion", "hyperthermia", "spect", "mri"] },
  { id: "blood", label: "Blood & marrow", at: [200, 820], path: "M120 790 L280 790 L280 850 L120 850 Z",
    cancers: ["aml", "all-leukemia", "cll", "multiple-myeloma"], technologies: ["car-t", "t-cell-engager", "mrd-testing", "whole-body-mri", "epigenetic-drugs"] },
  { id: "lymph", label: "Lymph nodes", at: [200, 878], path: "M120 858 L280 858 L280 898 L120 898 Z",
    cancers: ["dlbcl", "hodgkin-lymphoma"], technologies: ["fdg-pet", "car-t", "t-cell-engager", "imrt-igrt"] },
  { id: "neuroendocrine", label: "Neuroendocrine (gut, lung, pancreas)", at: [340, 560], path: "M300 540 L380 540 L380 580 L300 580 Z",
    cancers: ["neuroendocrine", "neuroblastoma"], technologies: ["radioligand-therapy", "targeted-alpha-therapy", "pet"] },
];

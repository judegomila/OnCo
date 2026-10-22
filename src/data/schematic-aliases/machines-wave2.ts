/** Schematic aliases for the records in src/data/machines-wave2.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/** Every new technology reuses an existing base drawing of the same mechanism (values are base ids, never aliases). */
export const machineSchematicAliases2: Record<string, string> = {
  "bnct-accelerator-systems": "bnct", "flash-research-accelerators": "flash-rt", "electron-beam-therapy-systems": "imrt-igrt",
  "oncology-information-systems": "imrt-igrt", "patient-positioning-surface-guidance-systems": "imrt-igrt", "respiratory-gating-tumour-tracking-systems": "sbrt",
  "in-room-imaging-systems": "imrt-igrt", "radiotherapy-qa-phantoms-dosimeters": "imrt-igrt",
  "hyperthermia-systems": "hyperthermia", "photodynamic-therapy-lasers": "photoimmunotherapy", "litt-systems": "litt",
  "transcranial-focused-ultrasound-systems": "bbb-focused-ultrasound", "electrochemotherapy-devices": "irreversible-electroporation", "hipec-pipac-devices": "hipec",
  "intraoperative-fluorescence-imaging-systems": "fluorescence-guided-surgery", "gamma-probes-dose-calibrators": "sentinel-node",
  "endoscopic-ultrasound-systems": "ultrasound", "capsule-endoscopy-systems": "optical-imaging", "colposcopes-digital-cervical-screening": "optical-imaging",
  "confocal-oct-skin-imaging": "optical-imaging", "contrast-enhanced-mammography": "mammography", "breast-mri-coils-abbreviated-mri": "mri",
  "closed-system-transfer-devices": "cytotoxic-chemotherapy",
};

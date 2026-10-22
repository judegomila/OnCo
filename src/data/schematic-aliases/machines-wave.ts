/** Schematic aliases for the records in src/data/machines-wave.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/** Every new machine technology shares an existing base drawing of the same mechanism (values are base ids, never aliases). */
export const machineSchematicAliases: Record<string, string> = {
  "x-ray-radiography-fluoroscopy": "ct", "photon-counting-ct": "ct", "dual-energy-spectral-ct": "ct", "ultrasound-elastography-ceus": "ultrasound",
  "mri-field-strengths": "mri", "spect-ct": "spect", "intraoperative-mri-ct": "mri",
  "c-arm-linac": "imrt-igrt", "ring-gantry-linac": "imrt-igrt", tomotherapy: "imrt-igrt", cyberknife: "sbrt", "gamma-knife": "sbrt", "zap-x": "sbrt",
  "biology-guided-radiotherapy": "pet-ct", "brachytherapy-afterloaders": "brachytherapy",
  "proton-therapy-systems": "proton-therapy", "carbon-ion-synchrotrons": "carbon-ion",
  "cryoablation-systems": "thermal-ablation", "microwave-rf-ablation": "thermal-ablation", "surgical-robot-platforms": "robotic-surgery", "flow-cytometers": "mrd-testing",
};

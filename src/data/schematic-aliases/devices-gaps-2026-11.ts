/** Schematic aliases for the device and contrast records of the November 2026 gap round (src/data/devices-gaps-2026-11.ts, devices-gaps-2026-11-diagnostic.ts and contrast-agents-gaps-2026-11.ts). */
/** Every value is a base drawing of the same mechanism, never another alias (one hop; src/data/animated-wave8.test.ts). */
export const devicesGapsSchematicAliases: Record<string, string> = {
  // Vascular access and pumps share the infusion device drawing; the feeding pump shares the nutrition drawing.
  "implanted-ports": "infusion-devices-vascular-access", "picc-lines": "infusion-devices-vascular-access", "huber-needles-port-access": "infusion-devices-vascular-access",
  "picc-tip-location-systems": "infusion-devices-vascular-access", "catheter-securement-devices": "infusion-devices-vascular-access", "needleless-connector-disinfecting-caps": "infusion-devices-vascular-access",
  "catheter-lock-solutions": "infusion-devices-vascular-access", "midline-catheters": "infusion-devices-vascular-access", "tunnelled-cuffed-central-venous-catheters": "infusion-devices-vascular-access", "ethanol-lock-therapy": "infusion-devices-vascular-access", "ambulatory-chemotherapy-pumps": "infusion-devices-vascular-access", "pca-pumps": "pain-management",
  "syringe-drivers": "palliative-care", "smart-infusion-pumps": "infusion-devices-vascular-access", "hepatic-arterial-infusion-pump": "infusion-devices-vascular-access",
  "intrathecal-drug-delivery-pumps": "pain-management", "enteral-feeding-pumps": "enteral-parenteral-nutrition",
  // Stoma, breast and laryngectomy devices.
  "ostomy-appliances": "rejuv-rehab-assistive-devices", "colostomy-irrigation": "rejuv-rehab-assistive-devices", "ostomy-support-garments": "rejuv-rehab-assistive-devices",
  "ostomy-skin-care-products": "rejuv-rehab-assistive-devices", "ostomy-output-management-products": "rejuv-rehab-assistive-devices",
  "breast-implants": "rejuv-recon-breast", "breast-tissue-expanders": "rejuv-recon-breast", "acellular-dermal-matrix-breast": "rejuv-recon-breast", "nipple-areola-tattooing": "rejuv-recon-breast",
  "external-breast-prostheses": "rejuv-rehab-assistive-devices", "pneumatic-compression-lymphoedema": "lymphoedema-decongestive-therapy",
  "voice-prostheses": "rejuv-rehab-assistive-devices", "laryngectomy-stoma-care-devices": "rejuv-rehab-assistive-devices",
  // Biopsy and localisation.
  "vacuum-assisted-breast-biopsy": "mammography", "stereotactic-breast-biopsy": "mammography", "breast-lesion-localisation": "mammography", "magnetic-sentinel-node-tracer": "sentinel-node",
  "prostate-fusion-biopsy-systems": "mp-mri", "transperineal-prostate-biopsy-devices": "mp-mri", "bone-marrow-biopsy-devices": "histopathology-ihc", "image-guided-percutaneous-robots": "ct",
  // Embolisation, drainage and stents.
  "embolic-microspheres": "tace", "drug-eluting-beads": "tace", "tace-delivery-microcatheters": "tace",
  "indwelling-pleural-catheters": "palliative-care", "indwelling-peritoneal-catheters": "palliative-care", "pleural-and-peritoneal-shunts": "palliative-care",
  "self-expanding-metal-stents": "biliary-stenting-drainage", "ureteric-stents-and-nephrostomy": "biliary-stenting-drainage",
  // Analysers, endoscopy and breast ultrasound.
  "tumour-marker-immunoassay-analysers": "liquid-biopsy", "haematology-analysers": "mrd-testing", "digital-pcr-platforms": "mrd-testing", "m-protein-laboratory-analysers": "liquid-biopsy",
  "barretts-radiofrequency-ablation": "thermal-ablation", "cholangioscopy": "colorectal-screening", "automated-breast-ultrasound": "ultrasound",
  // Contrast families.
  "gadolinium-based-contrast-agents": "mri", "iodinated-contrast-media": "ct", "ultrasound-contrast-agents": "ultrasound",
};

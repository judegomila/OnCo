/** Coarse class of a product from its modality text, for gallery and filter facets. Pure; safe on server and client. */
export function modalityGroup(modality: string): string {
  const m = modality.toLowerCase();
  if (/bispecific adc|\badc\b|drug conjugate|toxin conjugate|immunotoxin|cytotoxin|photoimmunotherapy/.test(m)) return "Antibody-drug conjugate";
  if (/bispecific|engager|immtac|bifunctional|biparatopic/.test(m)) return "Bispecific or engager";
  if (/antibody|\bmab\b|anti-pd|anti-ctla|anti-lag|anti-tigit|anti-cd|anti-her2|anti-vegf|anti-egfr|anti-gd2|checkpoint/.test(m)) return "Antibody";
  if (/radioligand|radiopharm|alpha therapy|theranostic|lutetium|radium|actinium|iodine-131|lead-212/.test(m)) return "Radiopharmaceutical";
  if (/\bpet\b|radiotracer|imaging agent|fluorescen|lymphatic mapping|near-infrared/.test(m)) return "Imaging agent";
  if (/car-t|tcr-t|\btil\b|cell therapy|cellular immunotherapy|dendritic/.test(m)) return "Cell therapy";
  if (/vaccine|mrna|oncolytic|virus|gene therapy|virus-like/.test(m)) return "Vaccine or virus";
  if (/cytokine|interferon|interleukin|il-2|il-15|fusion|enzyme|peptide hormone|hepcidin|erythroid|ligand trap|somatostatin|gnrh/.test(m)) return "Protein or peptide";
  if (/\btest\b|assay|classifier|profiling|sequencing|panel|digital pathology|\bmrd\b|detection/.test(m)) return "Test";
  if (/device|treating fields|drug-eluting/.test(m)) return "Device";
  if (/cytotoxic|chemotherapy|alkylating|platinum|taxane|vinca|anthracycline|antifolate|antimetabolite|nucleoside|topoisomerase|camptothecin|podophyllotoxin|nitrosourea|nitrogen mustard|halichondrin|microtubule|liposomal|dna|actinomycin|antibiotic|fluoropyrimidine|purine|hydroxyurea|conditioning|arsenical/.test(m)) return "Cytotoxic";
  if (/serd|serm|aromatase|antiandrogen|androgen receptor|\bar |hormon|progestin|glucocorticoid|oestrogen|estrogen|cyp17|adrenolytic|retinoid/.test(m)) return "Hormonal";
  if (/protac|degrader|molecular glue|celmod|cereblon|imid/.test(m)) return "Degrader";
  return "Small molecule";
}

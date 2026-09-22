/**
 * Which people are expected to have papers, decided from the role line of the person record.
 *
 * The person schema keeps `role` as free text ("Chief Executive, Marie Curie"), so there is no enum to derive from.
 * These are the rules the wave 6 paper fetcher (scripts/fetch-people-papers.ts) used to decide whom to search: a
 * research or clinical post outranks an administrative word on the same line ("Professor and Dean" is searched), an
 * administrative, donor, patient, advocate or public-figure role is never searched, and a bare "Director" of a whole
 * institution is an institution head who may publish but cannot be matched safely by role alone.
 *
 * The health gauge (src/lib/health.ts, people-papers) and the fetcher share this module so the two never disagree.
 * Where the role line misleads the rule ("Founder and Director of the Institute for Protein Design" is a scientist),
 * set `papersExpected` on the person record; it overrides the derived answer.
 */

/** Administrative, donor, patient, advocate and public-figure roles: a wrong paper on such a page is worse than none. */
export const ADMIN_ROLE = /\b(chief executive|ceo|chief operating|chief financial|chief medical officer|chief strategy|chairman|chairwoman|chairperson|chair of the board|board chair|executive chair|executive director|managing director|director[- ]general|general director|director of operations|dean|provost|vice[- ]chancellor|rector|president|vice[- ]president|representative|secretary|minister|commissioner|administrator|trustee|board member|governor|senator|mayor|politician|first lady|philanthropist|donor|benefactor|patient|survivor|advocate|campaigner|activist|founder|co-founder|entrepreneur|investor|venture|journalist|broadcaster|actor|actress|singer|musician|athlete|footballer|cyclist|advertising|industrialist|businessman|businesswoman|magnate|heir|heiress|child|whose|diretor|directeur|presidente|geschäftsführer|superintendent|party secretary|secretary-general|acting secretary|general manager|gerente|direttore|direktur|directora|director nacional|executive board|raad van bestuur|centrumchef|müdür|namesake|founders|founded|co-founded|champion|star|the boy|the girl|behind the|film executive|giving)\b/i;

/** Research or clinical posts; these outrank an administrative word in the same role line ("Professor and Dean"). */
export const RESEARCH_ROLE = /\b(professor|oncologist|ha?ematologist|scientist|researcher|investigator|surgeon|radiologist|pathologist|physician|geneticist|immunologist|biologist|epidemiologist|pharmacologist|statistician|biostatistician|clinician|laboratory head|lab head|group leader|programme leader|program leader|principal investigator|clinical director|scientific director|research director|director of research|chief scientific officer|chief scientist|trial lead|trialist|(chief|head|director|lead|leader) of (the )?(neuro-oncology|early[- ]phase trials|clinical trials|[a-z-]+ (oncology|medicine|surgery|pathology|radiology|ha?ematology|trials|unit|service|department|division|section|program|programme|laboratory|lab)))\b/i;

/** A director or chief with no research post named: an institution head, who may publish but cannot be matched safely by role alone. */
export const INSTITUTION_HEAD = /\b(director|chief|head)\b/i;

export type RoleBucket = "researcher" | "administrator" | "institution head";

/** What the role line says the person does; tags such as "clinician-scientist" describe the record, not the post. */
export function roleBucket(role: string): RoleBucket {
  if (RESEARCH_ROLE.test(role)) return "researcher";
  if (ADMIN_ROLE.test(role)) return "administrator";
  if (INSTITUTION_HEAD.test(role)) return "institution head";
  return "researcher";
}

/**
 * True when the person's role is one that produces papers, so an empty `papers` list is a gap; false when the role is
 * administrative, donor, patient, advocate or public figure, so no papers is the expected state. Institution heads
 * count as expected: they may well publish, the record just has not been matched yet.
 */
export function papersExpected(p: { role: string; papersExpected?: boolean }): boolean {
  return p.papersExpected ?? roleBucket(p.role) !== "administrator";
}

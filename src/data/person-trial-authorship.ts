/**
 * Person to the trials they wrote up (pair 5 of docs/proposals/cross-links-census-2026-11.md).
 *
 * A pure function: no file access, no network, no clock. It takes the person, trial, paper and institution records
 * and the author lists that scripts/fetch-trial-authors.ts read from Europe PMC (src/data/trial-paper-authors.json),
 * and returns which person is an author of which trial report. scripts/fetch-trial-authors.ts writes the result to
 * src/data/person-trial-links.generated.json, and src/data/person-trial-authorship.test.ts recomputes it and fails
 * when the two differ, so the generated file cannot drift from the rule below.
 *
 * THE RULE
 *
 * 1. A paper REPORTS a trial when the two are linked (paper `trials` or trial `keyPapers`) AND the trial's id, name
 *    or an alias appears as a whole token run in the paper's id or name. A link alone is not enough: the first key
 *    paper of FLAURA2 is FLAURA's.
 * 2. A person NAME-MATCHES an author of that paper when the surnames are equal after accents, case and punctuation
 *    are removed, and the given names are compatible: token by token, two full names must be equal and an initial
 *    must be the other's first letter ("Dong-Wan" is "Dong Wan", "Dongwan", "Dong W" and "D W", never "Dong Hyun").
 * 3. A name match becomes a LINK only with one of two further pieces of evidence:
 *      - "orcid": the ORCID on the person record equals the ORCID Europe PMC holds for that author; or
 *      - "affiliation": Europe PMC gives the author's first name in full, it equals the person's, and the name or an
 *        alias of one of the person's institutions appears, as whole words, in that author's own affiliation string
 *        on that paper.
 * 4. Everything else is AMBIGUOUS, listed and left unlinked:
 *      - "name-only": the name matches and neither ORCID nor affiliation confirms it;
 *      - "initials-only": the affiliation names the person's institution but Europe PMC gives the author's initials
 *        and no first name, so a colleague with the same surname and initial at the same hospital would match too;
 *      - "homonym": two different person records name-match the same author, whatever else is known;
 *      - "orcid-conflict": the person record and the author both carry an ORCID and they differ.
 *    Nothing is ever linked on a name alone.
 *
 * Every pattern is matched on whole tokens. A fragment once matched `imid` inside `pyrimidine`; here "ucl" does not
 * match "UCLA" and "Lu" does not match "Luo".
 */

// ---------------------------------------------------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------------------------------------------------

/** One author as Europe PMC lists them on one paper. A group author has `collectiveName` and no personal name. */
export type CachedAuthor = {
  lastName?: string;
  firstName?: string;
  initials?: string;
  orcid?: string;
  affiliations?: string[];
  collectiveName?: string;
};

/** One paper in src/data/trial-paper-authors.json, keyed by the paper record id. */
export type CachedPaperAuthors = {
  doi?: string;
  pmid?: string;
  /** ISO date of the fetch. */
  fetchedAt: string;
  /** The Europe PMC request that returned (or did not return) the record. */
  source: string;
  /** True when Europe PMC returned no record whose DOI or PubMed id equals the one asked for. */
  missing?: true;
  /** With `missing`: Europe PMC holds a different DOI or PubMed id for this paper than our record does, so its author list was not used. */
  conflict?: string;
  authors?: CachedAuthor[];
};

export type TrialPaperAuthorCache = Record<string, CachedPaperAuthors>;

export type PersonLike = {
  id: string;
  name: string;
  aka?: string[];
  orcid?: string;
  institutionId?: string;
  institutions?: string[];
  links?: Array<{ url: string }>;
  profiles?: Array<{ url: string }>;
};
export type TrialLike = { id: string; name: string; aka?: string[]; keyPapers?: string[] };
export type PaperLike = { id: string; name: string; trials?: string[] };
/** Any record a person names as an institution: an institution, or a cooperative group held as a company record. */
export type InstitutionLike = { id: string; name: string; aka?: string[] };

export type AuthorshipEvidence = "orcid" | "affiliation";
export type PersonTrialLink = {
  trialId: string;
  paperId: string;
  evidence: AuthorshipEvidence;
  /** "full" when Europe PMC gave a first name that equals the person's; "initial" when only initials could be compared. */
  name: "full" | "initial";
};
export type AmbiguousReason = "name-only" | "initials-only" | "homonym" | "orcid-conflict";
export type AmbiguousAuthorship = {
  personId: string;
  trialId: string;
  paperId: string;
  /** The author as Europe PMC prints them: "Kim, Dong-Wan". */
  author: string;
  reason: AmbiguousReason;
  /** For a homonym: the other person records that match the same author. */
  others?: string[];
};
export type PersonTrialAuthorship = {
  /** personId -> the trial reports they are an author of, sorted by trial then paper. */
  links: Record<string, PersonTrialLink[]>;
  ambiguousCount: number;
  /** Name matches left unlinked, sorted by person, trial, paper. A (person, trial) pair that is linked through another paper is not listed. */
  ambiguous: AmbiguousAuthorship[];
};

export type AuthorshipInput = {
  people: PersonLike[];
  trials: TrialLike[];
  papers: PaperLike[];
  institutions: InstitutionLike[];
  cache: TrialPaperAuthorCache;
};

// ---------------------------------------------------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------------------------------------------------

/** Letters the Unicode decomposition leaves alone. */
const FOLD: Record<string, string> = { ø: "o", Ø: "O", ß: "ss", ł: "l", Ł: "L", æ: "ae", Æ: "AE", œ: "oe", Œ: "OE", đ: "d", Đ: "D", ı: "i", ð: "d", þ: "th" };

/** Lower case, no accents, every run of anything else one space: "Vall d'Hebron" and "VALL D’HEBRÓN" both give "vall d hebron". */
export function fold(s: string): string {
  return s
    .replace(/[øØßłŁæÆœŒđĐıðþ]/g, (c) => FOLD[c] ?? c)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** `fold` without the lower-casing, for acronyms: "the WHO" keeps "WHO". */
export function foldKeepCase(s: string): string {
  return s
    .replace(/[øØßłŁæÆœŒđĐıðþ]/g, (c) => FOLD[c] ?? c)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim();
}

/** Code-unit order, the same on every machine; `localeCompare` is not. */
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/** Whether the folded `needle` occurs in the folded `haystack` as whole tokens. Both must already be folded. */
export function hasTokenRun(haystack: string, needle: string): boolean {
  return needle.length > 0 && ` ${haystack} `.includes(` ${needle} `);
}

// ---------------------------------------------------------------------------------------------------------------------
// 1. Which paper reports which trial
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A trial key is its id, its name or an alias, folded. A key shorter than three characters or made of digits only
 * ("2", "301") says nothing about which trial a paper is on and is not used.
 */
export function trialKeys(t: TrialLike): string[] {
  const keys = new Set<string>();
  for (const raw of [t.id, t.name, ...(t.aka ?? [])]) {
    const k = fold(raw);
    if (k.length < 3 || /^[\d ]+$/.test(k)) continue;
    keys.add(k);
  }
  return [...keys];
}

/** The (trial, paper) pairs where the paper reports the trial, sorted by trial then paper. */
export function trialReports(trials: TrialLike[], papers: PaperLike[]): Array<{ trialId: string; paperId: string }> {
  const paperById = new Map(papers.map((p) => [p.id, p]));
  const trialById = new Map(trials.map((t) => [t.id, t]));
  const linked = new Map<string, Set<string>>(); // trialId -> paperIds
  const add = (trialId: string, paperId: string) => {
    if (!trialById.has(trialId) || !paperById.has(paperId)) return;
    const s = linked.get(trialId) ?? new Set<string>();
    s.add(paperId);
    linked.set(trialId, s);
  };
  for (const t of trials) for (const p of t.keyPapers ?? []) add(t.id, p);
  for (const p of papers) for (const t of p.trials ?? []) add(t, p.id);

  const out: Array<{ trialId: string; paperId: string }> = [];
  for (const [trialId, paperIds] of linked) {
    const keys = trialKeys(trialById.get(trialId)!);
    for (const paperId of paperIds) {
      const p = paperById.get(paperId)!;
      const hay = [fold(p.id), fold(p.name)];
      if (keys.some((k) => hay.some((h) => hasTokenRun(h, k)))) out.push({ trialId, paperId });
    }
  }
  return out.sort((a, b) => cmp(a.trialId, b.trialId) || cmp(a.paperId, b.paperId));
}

// ---------------------------------------------------------------------------------------------------------------------
// 2. Names
// ---------------------------------------------------------------------------------------------------------------------

const HONORIFICS = new Set(["jr", "sr", "ii", "iii", "iv", "md", "phd", "dphil", "mbbs", "obe", "cbe", "mbe", "dbe", "kbe", "frs", "frcp", "frcs", "frcr", "facs", "dame", "sir", "dr", "prof", "professor", "lord", "baroness", "baron"]);

/** Words that open a surname and are never a given name. */
const PARTICLES = new Set(["de", "del", "della", "der", "den", "di", "da", "dos", "du", "la", "le", "van", "von", "ten", "ter", "bin", "al", "el"]);

/** The tokens of a person's name as the record writes it, without nicknames in quotes, parentheses, post-nominals or titles. */
export function personNameTokens(name: string): string[] {
  const n = name.replace(/"[^"]*"|“[^”]*”/g, " ").replace(/\([^)]*\)/g, " ").replace(/,.*$/, "");
  return fold(n).split(" ").filter((t) => t && !HONORIFICS.has(t));
}

/**
 * "Dong-Wan" gives ["dong", "wan"], and so does "Dong Wan". A run of capitals is initials, "DW" gives ["d", "w"];
 * so is a run of full stops, "D.W.".
 */
function givenTokens(given: string, isInitials = false): string[] {
  const spaced = isInitials ? given.replace(/([A-Za-zÀ-ÿ])/g, "$1 ") : given.replace(/\b([A-ZÀ-Ý])\./g, "$1 ");
  return fold(spaced).split(" ").filter(Boolean);
}

/** Whether two given names can be the same person's, and whether a full first name was compared. */
export function givenCompatible(a: string[], b: string[]): "full" | "initial" | null {
  if (!a.length || !b.length) return null;
  const compact = (x: string[]) => x.join("");
  // "Do-Youn" against "Doyoun": the same letters, split differently. Only when both sides spell a name out.
  if (a[0].length > 1 && b[0].length > 1 && compact(a) === compact(b)) return "full";
  let full = false;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const x = a[i], y = b[i];
    if (x.length > 1 && y.length > 1) {
      if (x !== y) return null;
      if (i === 0) full = true;
    } else if (x[0] !== y[0]) return null;
  }
  return full ? "full" : "initial";
}

/**
 * Whether the person's name is this author's. Western order: the author's surname is the end of the person's name
 * and what precedes it is compatible with the author's given name ("Birgitte Klindt Poulsen" is "Poulsen, Birgitte
 * Klindt" and "Klindt Poulsen, Birgitte"). Surname first, as records of Chinese and Vietnamese names are written:
 * the author's surname opens the person's name and the rest equals the author's full first name letter for letter;
 * an initial is not enough in that order.
 */
export function nameMatches(personTokens: string[], author: CachedAuthor): "full" | "initial" | null {
  if (!author.lastName) return null;
  const last = fold(author.lastName).split(" ").filter((t) => t && !HONORIFICS.has(t));
  if (!last.length || personTokens.length <= last.length) return null;
  // Older PubMed records put the initials in the first-name field: "DW".
  const bareInitials = !!author.firstName && /^[A-Z]{1,3}$/.test(author.firstName.trim());
  const first = author.firstName && !bareInitials ? givenTokens(author.firstName) : [];
  const initials = givenTokens((bareInitials ? author.firstName : author.initials) ?? "", true);
  const authorGiven = first.length ? first : initials;
  if (!authorGiven.length) return null;
  const n = personTokens.length;

  const tail = personTokens.slice(n - last.length);
  const before = personTokens.slice(0, n - last.length);
  // A particle belongs to the surname: "Johann de Bono" is "de Bono, Johann" and never "Bono, Johann".
  if (tail.join(" ") === last.join(" ") && !PARTICLES.has(before[before.length - 1])) {
    const m = givenCompatible(before, authorGiven);
    if (m) return m;
  }
  const head = personTokens.slice(0, last.length);
  if (head.join(" ") === last.join(" ") && first.length && first[0].length > 1) {
    const rest = personTokens.slice(last.length);
    if (rest[0].length > 1 && rest.join("") === first.join("")) return "full";
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------------
// 3. ORCID and affiliation
// ---------------------------------------------------------------------------------------------------------------------

const ORCID_RE = /\b(\d{4}-\d{4}-\d{4}-\d{3}[\dX])\b/i;
/** "https://orcid.org/0000-0002-1825-0097" and "0000-0002-1825-0097" both give the bare id, upper case. */
export function orcidOf(s: string | undefined): string | undefined {
  return s?.match(ORCID_RE)?.[1].toUpperCase();
}

/** The person's ORCID: the `orcid` field, or failing that an orcid.org address among their links and profiles. */
export function personOrcid(p: PersonLike): string | undefined {
  const direct = orcidOf(p.orcid);
  if (direct) return direct;
  for (const l of [...(p.profiles ?? []), ...(p.links ?? [])]) {
    if (/\borcid\.org\//i.test(l.url)) {
      const o = orcidOf(l.url);
      if (o) return o;
    }
  }
  return undefined;
}

/** Words that name a kind of place and not a place. A key made only of these ("University Hospital") is not used. */
const GENERIC = new Set([
  "the", "of", "and", "for", "at", "in", "de", "la", "le", "du", "des", "di", "del", "della", "der", "und", "et", "y",
  "university", "universite", "universidad", "universita", "universitat", "universitaet", "universiteit", "college", "school", "faculty", "department", "division", "unit",
  "hospital", "hospitals", "hopital", "klinik", "klinikum", "clinic", "clinica", "clinical", "medical", "medicine", "health", "healthcare", "care", "system", "sciences", "science",
  "cancer", "oncology", "oncologia", "tumor", "tumour", "hematology", "haematology", "radiotherapy", "comprehensive",
  "center", "centre", "centro", "centrum", "institute", "institut", "instituto", "istituto", "foundation", "trust", "group", "network", "research", "academy", "laboratory",
  "national", "international", "general", "central", "regional", "royal", "state", "city", "first", "second", "third", "affiliated", "people", "peoples", "s", "nhs",
]);

/** An institution name to look for in an affiliation. `exact` keys are acronyms and keep their capitals. */
export type InstitutionKey = { key: string; exact: boolean };

/** An acronym as a record writes it: capitals and digits, "MSK", "IEO", "G-BA", "CHU". */
const ACRONYM = /^[A-Z0-9][A-Z0-9 &.-]*$/;

/**
 * What an institution may be recognised by in an affiliation: its name and each alias. A name with a bracketed
 * part is used without it, and the bracketed part counts only when it is an acronym, so "Fox Chase Cancer Center
 * (Philadelphia)" is never recognised by "Philadelphia". An acronym is matched with its capitals: "WHO", "NICE",
 * "INC" and "HAS" are institutions and "who", "nice", "Inc" and "has" are words. A key under three characters, or
 * made only of generic words ("University Hospital"), is dropped.
 */
export function institutionKeys(inst: InstitutionLike): InstitutionKey[] {
  const keys = new Map<string, InstitutionKey>();
  for (const raw of [inst.name, ...(inst.aka ?? [])]) {
    const outer = raw.replace(/\s*\([^)]*\)\s*/g, " ").trim();
    const inner = [...raw.matchAll(/\(([^)]+)\)/g)].map((m) => m[1].trim()).filter((x) => ACRONYM.test(x));
    for (const part of [outer, ...inner]) {
      const exact = ACRONYM.test(part);
      const key = exact ? foldKeepCase(part) : fold(part);
      if (key.length < 3) continue;
      if (!exact && key.split(" ").every((w) => GENERIC.has(w) || /^\d+$/.test(w))) continue;
      keys.set(`${exact ? "=" : "~"}${key}`, { key, exact });
    }
  }
  return [...keys.values()];
}

/** Whether an affiliation string, as Europe PMC prints it, names an institution by one of its keys, on whole words. */
export function affiliationNames(affiliation: string, keys: InstitutionKey[]): boolean {
  if (!keys.length) return false;
  const lower = fold(affiliation);
  const cased = foldKeepCase(affiliation);
  return keys.some((k) => hasTokenRun(k.exact ? cased : lower, k.key));
}

// ---------------------------------------------------------------------------------------------------------------------
// The function
// ---------------------------------------------------------------------------------------------------------------------

const authorLabel = (a: CachedAuthor) => [a.lastName, a.firstName ?? a.initials].filter(Boolean).join(", ");

export function personTrialAuthorship(input: AuthorshipInput): PersonTrialAuthorship {
  const { people, trials, papers, institutions, cache } = input;
  const instKeys = new Map(institutions.map((i) => [i.id, institutionKeys(i)]));

  const persons = people.map((p) => {
    const forms = [p.name, ...(p.aka ?? [])].map(personNameTokens).filter((t) => t.length >= 2);
    const ids = [...new Set([p.institutionId, ...(p.institutions ?? [])].filter((x): x is string => !!x))];
    return { id: p.id, forms, orcid: personOrcid(p), affKeys: ids.flatMap((i) => instKeys.get(i) ?? []) };
  });
  // Surname index: a person can only match an author whose folded surname opens or closes one of their name forms.
  const byToken = new Map<string, typeof persons>();
  for (const p of persons) {
    for (const t of new Set(p.forms.flatMap((f) => [f[0], f[f.length - 1]]))) {
      const list = byToken.get(t) ?? [];
      list.push(p);
      byToken.set(t, list);
    }
  }

  const reportsByPaper = new Map<string, string[]>();
  for (const r of trialReports(trials, papers)) reportsByPaper.set(r.paperId, [...(reportsByPaper.get(r.paperId) ?? []), r.trialId]);

  type Found = { personId: string; paperId: string; evidence?: AuthorshipEvidence; name: "full" | "initial"; reason?: AmbiguousReason; author: string; others?: string[] };
  const found: Found[] = [];

  for (const [paperId, trialIds] of reportsByPaper) {
    const entry = cache[paperId];
    if (!entry || entry.missing || !entry.authors || !trialIds.length) continue;
    for (const author of entry.authors) {
      if (!author.lastName) continue;
      const lastTokens = fold(author.lastName).split(" ").filter(Boolean);
      if (!lastTokens.length) continue;
      const candidates = new Set([...(byToken.get(lastTokens[0]) ?? []), ...(byToken.get(lastTokens[lastTokens.length - 1]) ?? [])]);
      const matched: Array<{ p: (typeof persons)[number]; name: "full" | "initial" }> = [];
      for (const p of candidates) {
        let best: "full" | "initial" | null = null;
        for (const f of p.forms) {
          const m = nameMatches(f, author);
          if (m === "full") { best = "full"; break; }
          if (m) best = m;
        }
        if (best) matched.push({ p, name: best });
      }
      if (!matched.length) continue;
      const label = authorLabel(author);
      if (matched.length > 1) {
        for (const m of matched) found.push({ personId: m.p.id, paperId, name: m.name, reason: "homonym", author: label, others: matched.filter((o) => o !== m).map((o) => o.p.id).sort() });
        continue;
      }
      const { p, name } = matched[0];
      const authorOrcid = orcidOf(author.orcid);
      if (p.orcid && authorOrcid) {
        if (p.orcid === authorOrcid) found.push({ personId: p.id, paperId, name, evidence: "orcid", author: label });
        else found.push({ personId: p.id, paperId, name, reason: "orcid-conflict", author: label });
        continue;
      }
      if (!(author.affiliations ?? []).some((a) => affiliationNames(a, p.affKeys))) found.push({ personId: p.id, paperId, name, reason: "name-only", author: label });
      // "Song Y" at a hospital of three thousand staff is not one person: initials need the ORCID, not the address.
      else if (name === "initial") found.push({ personId: p.id, paperId, name, reason: "initials-only", author: label });
      else found.push({ personId: p.id, paperId, name, evidence: "affiliation", author: label });
    }
  }

  // One row per (person, trial, paper). Two authors of one paper can match one person ("Wang, J" twice): evidence wins
  // over ambiguity, ORCID over affiliation.
  const rank = (f: Found) => (f.evidence === "orcid" ? 0 : f.evidence === "affiliation" ? 1 : f.reason === "homonym" ? 2 : f.reason === "orcid-conflict" ? 3 : f.reason === "initials-only" ? 4 : 5);
  const best = new Map<string, Found>();
  for (const f of found) {
    const k = `${f.personId}|${f.paperId}`;
    const cur = best.get(k);
    if (!cur || rank(f) < rank(cur)) best.set(k, f);
  }

  const links: Record<string, PersonTrialLink[]> = {};
  const linkedPairs = new Set<string>();
  for (const f of best.values()) {
    if (!f.evidence) continue;
    for (const trialId of reportsByPaper.get(f.paperId) ?? []) {
      (links[f.personId] ??= []).push({ trialId, paperId: f.paperId, evidence: f.evidence, name: f.name });
      linkedPairs.add(`${f.personId}|${trialId}`);
    }
  }
  const ambiguous: AmbiguousAuthorship[] = [];
  for (const f of best.values()) {
    if (f.evidence || !f.reason) continue;
    for (const trialId of reportsByPaper.get(f.paperId) ?? []) {
      if (linkedPairs.has(`${f.personId}|${trialId}`)) continue;
      ambiguous.push({ personId: f.personId, trialId, paperId: f.paperId, author: f.author, reason: f.reason, ...(f.others ? { others: f.others } : {}) });
    }
  }

  const sorted: Record<string, PersonTrialLink[]> = {};
  for (const id of Object.keys(links).sort()) sorted[id] = links[id].sort((a, b) => cmp(a.trialId, b.trialId) || cmp(a.paperId, b.paperId));
  ambiguous.sort((a, b) => cmp(a.personId, b.personId) || cmp(a.trialId, b.trialId) || cmp(a.paperId, b.paperId));
  return { links: sorted, ambiguousCount: ambiguous.length, ambiguous };
}

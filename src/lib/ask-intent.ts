/**
 * Ask OnCo, step one: what is being asked, and about which records.
 *
 * Intent classification is a short ordered list of wording patterns (no model). Entity resolution is
 * longest-match over every record name and alias in the Ask index (Aho-Corasick, entity-matcher.ts),
 * case-insensitive and tolerant of hyphens, spaces and quotes, so "'triple-negative'" reaches tnbc,
 * "HER2-low" the glossary term and "Enhertu" trastuzumab deruxtecan. The phrase the question is about
 * (quoted, or in the "what is X" slot) outranks other mentions. Curated question pairs (the open benchmark
 * and the per-cancer patient questions) are matched by token overlap or edit distance.
 *
 * Pure and browser-safe.
 */
import { buildMatcher, scan, type Matcher } from "./entity-matcher";
import { tokenize } from "./semantic";
import { baseName, type AskIndex, type AskIndexEntry, type AskPair } from "./ask-index";
import { ASK_CASE_SENSITIVE } from "./ask-lexicon";
import type { Kind } from "./schema";

export type Intent = "define" | "treatments" | "biomarkers" | "approval" | "regional-approvals" | "mechanism" | "side-effects" | "trials" | "results" | "evidence" | "compare" | "prognosis" | "who" | "investors" | "companies" | "roadmap" | "journals" | "cost" | "general";

export const INTENT_LABEL: Record<Intent, string> = {
  define: "what it means", treatments: "how it is treated", biomarkers: "which biomarkers matter", approval: "approval status", "regional-approvals": "what a regulator approved", mechanism: "how it works",
  "side-effects": "side effects", trials: "trials", results: "trial results", evidence: "how good the evidence is", compare: "comparison", prognosis: "outlook", who: "who and where",
  investors: "who invests", companies: "which companies work on it", roadmap: "where it is heading", journals: "where it is published", cost: "cost and coverage", general: "general",
};

/** Straight quotes and hyphens, single spaces. Length-preserving for the character classes it touches. */
export function normaliseQuestion(q: string): string {
  return q.replace(/[‘’‚‛′`´]/g, "'").replace(/[“”„‟″]/g, '"').replace(/[‐‑‒–—―]/g, "-").replace(/\s+/g, " ").trim();
}

type Span = [number, number];

/** Phrases the asker put in quotes: 'triple-negative', "HER2-low". Offsets refer to the normalised question. */
export function quotedSpans(normalised: string): Span[] {
  const out: Span[] = [];
  const re = /(?:^|[^\p{L}\p{N}])(['"])([^'"]{2,60})\1(?![\p{L}\p{N}])/gu;
  let m: RegExpExecArray | null;
  while ((m = re.exec(normalised))) { const start = m.index + m[0].indexOf(m[2]); out.push([start, start + m[2].length]); }
  return out;
}

export function quotedPhrases(q: string): string[] {
  const n = normaliseQuestion(q);
  return quotedSpans(n).map(([s, e]) => n.slice(s, e).trim());
}

/** The X in "what is X", "what does X mean", "define X", "how does X work", "side effects of X" and similar. */
export function focusSpans(normalised: string): Span[] {
  const q = normalised.toLowerCase();
  const res = [
    /\bwhat (?:exactly )?(?:is|are|does|do|was|were) (?:a |an |the |my |his |her )?(.+?)(?: mean| stand for| used for| for| in |\?|$)/,
    /\b(?:define|explain|describe|meaning of|definition of) (?:a |an |the )?(.+?)(?: in |\?|$)/,
    /\bhow (?:does|do|did|is|are) (?:a |an |the )?(.+?) (?:work|made|treated|managed|handled)\b/,
    /\b(?:side effects?|toxicit(?:y|ies)|safety|mechanism|cost|price|approval status|dosing|dose) of (?:a |an |the )?(.+?)(?: in |\?|$)/,
    /\b(?:is|are|was|were) (?:a |an |the )?(.+?) (?:approved|available|covered|safe|curable|under review|filed)\b/,
    /\bwho (?:makes|owns|develops|discovered|invented|runs|sells|leads|is behind) (?:a |an |the )?(.+?)(?:\?|$| and )/,
    /\b(?:is|are) (?:a |an |the )?(.+?) (?:worth|proven|effective|legit|legitimate|real|a scam|evidence|backed|good for|any good|recommended)\b/,
    /\b(?:does|do|can|could|will) (?:a |an |the )?(.+?) (?:help|work|cure|fight|prevent|stop|reduce|treat|shrink|kill|slow|improve)\b/,
    /\bwho (?:invests?|invested|is investing|backs|backed|funds|funded|finances|financed) (?:in )?(?:a |an |the )?(.+?)(?:\?|$| and )/,
    /\b(?:roadmap|future|history) (?:for|of) (?:a |an |the )?(.+?)(?:\?|$| and | in | over )/,
    /\bwhere (?:is|are) (?:a |an |the )?(.+?) (?:heading|headed|going)\b/,
  ];
  const out: Span[] = [];
  for (const re of res) { const m = re.exec(q); if (m && m[1]) { const start = m.index + m[0].indexOf(m[1]); out.push([start, start + m[1].length]); } }
  return out;
}

type Rule = { intent: Intent; re: RegExp[]; minEntities?: number; sameKind?: boolean };

/** First matching rule wins; order encodes precedence ("standard treatment for X" is treatments, not define). */
const REGULATORS = "(?:india|china|japan|australia|europe|the eu|the uk|the us|america|fda|ema|nmpa|cdsco|dcgi|pmda|tga|mhra|nice|health canada|regulators?|(?:the )?\\w+ regulator)";

const RULES: Rule[] = [
  { intent: "compare", minEntities: 2, sameKind: true, re: [/\bvs\.?\b/, /\bversus\b/, /\bdifferences? between\b/, /\bcompared? (?:to|with|against)\b/, /^compare\b/, /\bcompare\b/, /\bcomparison\b/, /\bdiffers? from\b/, /\bhow (?:does|do) .+ differ\b/, /\bwhich is better\b/, /\bbetter than\b/, /\bsame as\b/, /\bside[- ]by[- ]side\b/, /\bor\b.*\bwhich (?:one|is)\b/] },
  // KEGG maps, journals and roadmaps first: "covers" and "what is next" would otherwise read as cost and treatments.
  { intent: "define", re: [/\bkegg\b/, /\bwhich (?:signalling |signaling )?(?:pathway|map)\b/, /\bpathway (?:covers|map|for)\b/] },
  { intent: "journals", re: [/\bwhich journals?\b/, /\bwhat journals?\b/, /\bjournals? (?:publish|cover|carry|for|on|in|about)\b/, /\bwhere (?:is|are|was|were|do|does|did) .+ published\b/, /\bwho publishes\b/, /\bpublished in which\b/, /\bwhich journal\b/, /\bwhere (?:to|should i|can i) (?:read|publish)\b/] },
  { intent: "roadmap", re: [/\broadmap\b/, /\bwhere (?:is|are) .+ (?:heading|headed|going)\b/, /\bfuture of\b/, /\bover the next (?:decade|ten years|five years|10 years|5 years|few years)\b/, /\bnext decade\b/, /\bhow (?:has|did|will) .+ (?:evolve|evolved|change|changed|develop|developed)\b/, /\btimeline (?:of|for)\b/, /\bhistory (?:and future )?of\b/, /\bwhat(?:'s| is) (?:next|coming) (?:for|in|after)\b/, /\bwhat comes (?:next|after)\b/] },
  { intent: "evidence", re: [/\bworth it\b/, /\bworth (?:trying|taking|doing|the money)\b/, /\bproven\b/, /\b(?:is|are) (?:there )?(?:any |real |good |the )?evidence\b/, /\bevidence[- ]based\b/, /\b(?:is|are) .+ (?:effective|legit|legitimate|a scam|quackery|pseudoscience|backed by|any good|recommended)\b/, /(?<!\bhow |\bwhy )\bdoes .+ (?:help|work|cure|fight|prevent|stop|reduce|treat|shrink|kill|slow)\b/, /(?<!\bhow |\bwhy )\bdo .+ (?:help|work|cure|fight|prevent|stop|reduce|treat|shrink|kill|slow)\b/, /\bcan i (?:take|use|try|do|drink|eat)\b/, /\bshould i (?:take|try|use|do|drink|eat|avoid)\b/, /\bsafe to (?:use|take|try)\b/, /\bcure for cancer\b/, /\bcures? cancer\b/, /\b(?:supplements?|herbs?|herbal|diet|vitamins?|remedy|remedies|alternative medicine|natural|holistic)\b/] },
  // A regulator or region must be named; "which ADCs are approved for X" without one stays an ordinary approval question.
  { intent: "regional-approvals", re: [new RegExp(`\\bwhat (?:did|has|have|does|do) ${REGULATORS} (?:approve|approved|clear|cleared|authoris|authoriz|licen[cs]e)`), new RegExp(`\\bwhich (?:[\\w-]+ ){0,2}(?:drugs|products|treatments|medicines|therapies|adcs|antibodies|inhibitors|vaccines|tests|car-?t(?: products| therapies)?) (?:did|has|have|were|are|is|got) ${REGULATORS}\\b`), new RegExp(`\\b(?:approved|cleared|authori[sz]ed|licen[cs]ed) (?:in|by) ${REGULATORS} (?:for|in|that|which)\\b`), new RegExp(`\\bapprovals? in ${REGULATORS}\\b`), new RegExp(`\\b${REGULATORS} (?:has|have|had) (?:approved|cleared|authori[sz]ed)\\b`)] },
  { intent: "cost", re: [/\bcosts?\b/, /\bcostly\b/, /\bprices?\b/, /\bpriced\b/, /\bafford/, /\bexpensive\b/, /\bcover(?:ed|age|s)?\b/, /\binsurance\b/, /\breimburs/, /\bmedicare\b/, /\bmedicaid\b/, /\bnhs\b/, /\bpay(?:ing)? for\b/, /\bco-?pay/, /\bfinancial (?:help|assistance|support|aid)\b/, /\bfree of charge\b/, /\bout of pocket\b/, /\bhow much does\b/] },
  { intent: "side-effects", re: [/\bside[- ]effects?\b/, /\badverse\b/, /\btoxic/, /\bsafe(?:ty)?\b/, /\btolerab/, /\btolerated\b/, /\brisks? (?:of|from|with)\b/, /\bwarnings?\b/, /\bhair loss\b/, /\bnausea\b/, /\bneutropenia\b/, /\bpneumonitis\b/, /\bild\b/, /\bwhat (?:should|do) i (?:watch|look) (?:out )?for\b/, /\bharm(?:s|ful)?\b/, /\bdanger(?:s|ous)?\b/, /\bcomplications?\b/, /\bwhat (?:can|could) go wrong\b/, /\bmanaged?\b/, /\bmanagement\b/, /\bmonitor/] },
  { intent: "approval", re: [/\bapprov(?:ed|al|als|e)\b/, /\blicen[cs]ed\b/, /\bauthori[sz]ed\b/, /\bon the market\b/, /\bavailable (?:in|yet|now|anywhere)\b/, /\bmarketed\b/, /\bfda\b/, /\bema\b/, /\bmhra\b/, /\bnmpa\b/, /\bpmda\b/, /\bcleared\b/, /\bregulator/, /\bwhere does .+ stand\b/, /\bcan i get\b/, /\bis .+ (?:approved|available)\b/, /\bunder review\b/, /\bfiled\b/, /\bfiling\b/, /\bpdufa\b/, /\bwhere is .+ (?:approved|available|under review|filed|allowed)\b/] },
  { intent: "mechanism", re: [/\bhow (?:does|do|did|can|could|would|will) .+ work\b/, /\bmechanism\b/, /\bmode of action\b/, /\bhow (?:does|do) .+ (?:kill|attack|block|target|act|find|reach|deliver)\b/, /\bwhy (?:does|do|did|might|would|can|could) .+ work\b/, /\bhow it works\b/, /\bhow (?:is|are) .+ (?:made|built|manufactured)\b/, /\bhow (?:does|do) .+ (?:function|operate|differ from a conventional)\b/, /\bwhat does .+ do\b/, /\bwhy (?:does|do) .+ (?:cause|need|fail|resist)\b/, /\bresistance\b/] },
  { intent: "biomarkers", re: [/\bbiomarkers?\b/, /\bwhich (?:tests|mutations|markers) (?:should|must|need)\b/, /\bmust be tested\b/, /\bshould be tested\b/, /\btested (?:for|at diagnosis)\b/, /\bwhat (?:should|do) (?:i|they) test\b/, /\bcompanion diagnostic\b/, /\bcut-?off\b/] },
  { intent: "results", re: [/\bwhat did .+ (?:show|find|prove|report|demonstrate|do to)\b/, /\bresults? (?:of|from)\b/, /\bdid .+ (?:improve|extend|prolong|beat|work|succeed|fail|meet|help)\b/, /\bbeat\b/, /\bsurvival benefit\b/, /\bhow (?:well|much) (?:does|did|do) .+ (?:work|help)\b/, /\bhazard ratio\b/, /\bhow (?:effective|good)\b/, /\bhow big was\b/, /\boverall survival\b/, /\bprogression[- ]free\b/, /\bresponse rate\b/, /\breadout\b/, /\bwhat happened\b/, /\bwas .+ (?:positive|negative)\b/, /\bmet its\b/, /\bwhat (?:has|have) .+ shown\b/, /\bevidence (?:for|behind|that)\b/, /\breal evidence\b/, /\bdoes .+ (?:work|help|prevent|improve)\b/, /\bhow (?:well|much) .+ work/, /\bwhat is .+ testing\b/] },
  { intent: "investors", re: [/\bwhich (?:investors?|vcs?|venture (?:funds?|firms?|capital(?:ists)?)|funds|backers|financiers)\b/, /\bwho (?:invests?|invested|is investing|backs|backed|funds|funded|financed|finances|bankrolled|bankrolls)\b/, /\binvestors? (?:in|of|behind)\b/, /\bwho are the (?:investors|backers|vcs)\b/, /\bwhat does .+ invest in\b/, /\b(?:portfolio|backed by|funded by|financed by)\b/, /\bhow much (?:has|did|have) .+ raised?\b/, /\bfunding (?:rounds?|history)\b/, /\bseries [a-d]\b/, /\bventure capital\b/, /\bwho (?:owns|holds) (?:a |the )?stakes?\b/] },
  { intent: "companies", re: [/\bwhich (?:[\w-]+ ){0,3}(?:companies|startups|start-ups|firms|biotechs|players|manufacturers|makers) /, /\bwho (?:is|are|else is) (?:working|building|developing|active) (?:on|in)\b/, /\bcompanies (?:working|active|focused|building|developing|competing) (?:on|in)\b/, /\bstartups? (?:in|working on|building|developing)\b/, /\bwho (?:else )?(?:works|is working) on\b/, /\bwhat companies\b/, /\bwhich (?:\w+ )?(?:companies|startups) are\b/] },
  { intent: "who", re: [/^(?:who|whose)\b/, /\bwhich (?:company|companies|firm|hospital|hospitals|institution|institutions|cent(?:er|re)s?|university|universities|group|groups|doctor|doctors|oncologist|oncologists|lab|labs|team|cooperative group)\b/, /\bwho (?:makes|make|owns|own|develops|develop|discovered|invented|runs|run|sells|sell|leads|lead|is behind|founded|pioneered|treats|holds)\b/, /\bwhere (?:is|was|are|were) .+ (?:based|located|invented|discovered|made|headquartered|developed|run|treated|ranked)\b/, /\bmaker of\b/, /\bowner of\b/, /\bwhere can i (?:look up|find|go|see|get)\b/, /\bwhere to (?:look|find|go)\b/, /\bwhere (?:do|should|can) (?:i|we)\b/, /\bhow many .+ (?:centers|centres|hospitals)\b/, /\branked\b/, /\bheadquarter/, /\bcompan(?:y|ies)\b/, /\bsponsor/, /\brights\b/, /\blicense[ds]?\b/, /\bacqui/, /\bdeals?\b/, /\bbought\b/, /\bsecond opinion\b/, /\bexpert (?:cent|hospital)/, /\bbest (?:hospital|cent)/, /\bportfolio\b/, /\bpartner/] },
  { intent: "trials", re: [/\btrials?\b/, /\bstudy\b/, /\bstudies\b/, /\brecruiting\b/, /\benrol/, /\bnct\d+/] },
  { intent: "treatments", re: [/\bhow (?:is|are|do you|do we|should|would you) .+ treated\b/, /\bwhich (?:drugs|products|treatments|therapies|adcs|inhibitors|antibodies|medicines) (?:target|hit|block|act on|are there|exist|work)\b/, /\bdrugs? (?:that )?target(?:s|ing)?\b/, /\bproducts? against\b/, /\btreat(?:ment|ments|ed|ing)?\s+(?:for|of|options?|choices?|plan)\b/, /\bmain treatments?\b/, /\bstandard (?:of care|treatment|therapy|adjuvant)\b/, /\bfirst[- ]line\b/, /\bsecond[- ]line\b/, /\blater[- ]line/, /\bwhat works (?:for|in|against)\b/, /\boptions? (?:for|in|after|are)\b/, /\btherap(?:y|ies) (?:for|in|against)\b/, /\bdrugs? (?:for|in|against|used)\b/, /\bregimen\b/, /\bwhat (?:drugs|treatments|medicines|therapies|adcs|products) (?:are|exist|work|treat)\b/, /\bhow (?:do|would) (?:you|doctors|oncologists) treat\b/, /\bwhat is (?:used|given) (?:for|to treat)\b/, /\bpipeline\b/, /\bwhat(?:'s| is) (?:next|coming)\b/, /\bcan .+ be treated\b/, /\bwhat (?:can|should) be done\b/, /\bwhat are (?:the |my |their )?(?:\w+ )?(?:options|treatments|therapies)\b/, /\bhow (?:do|would) (?:you|i) (?:order|sequence)\b/, /\bwhat (?:is|are) (?:the )?best (?:treatment|drug|option)/, /\bindicat(?:ed|ions?)\b/, /\bwhat .+ (?:is|are) (?:it|they) (?:used|given) for\b/, /\bcure[sd]?\b/] },
  { intent: "prognosis", re: [/\bprognosis\b/, /\bsurviv(?:al|e) rates?\b/, /\bchances? of\b/, /\bhow long\b/, /\blife expectancy\b/, /\boutlook\b/, /\bcurable\b/, /\bcure rate\b/, /\b(?:will|am) i (?:die|going to die|survive|be ok)\b/, /\bmortality\b/, /\bfatal\b/, /\bdeadly\b/, /\b(?:5|five|10|ten)[- ]year\b/, /\bhow (?:serious|bad|dangerous|aggressive)\b/, /\bterminal\b/, /\bhow many .+ (?:die|survive|are alive|live)\b/, /\bwhat (?:fraction|percentage|proportion|share) .+ (?:alive|survive|die)\b/, /\bsurvivors?\b/, /\bcan .+ be cured\b/, /\bbeat(?:en)? (?:it|this|cancer)\b/, /\bodds\b/, /\bhow likely\b/, /\bwhat are my chances\b/] },
  { intent: "define", re: [/^is there (?:a|an|any)\b/, /\bhow (?:common|many cases|big is the market)\b/, /\bincidence\b/, /\bprevalence\b/, /\bmarket size\b/, /\bcases (?:per|a|each) year\b/, /\bdos(?:e|ing|age)\b/, /^what (?:is|are|does|do|was|were|'s)\b/, /\bwhat does .+ mean\b/, /\bmeaning of\b/, /\bdefin(?:e|ition|ed)\b/, /\bexplain\b/, /^what'?s\b/, /^tell me about\b/, /^describe\b/, /\bmeans?\b/, /\bin (?:plain|simple) (?:words|english|terms)\b/, /^(?:so )?what (?:exactly )?(?:is|are)\b/, /\bwhat (?:kind|sort|type) of\b/, /\bis .+ a (?:kind|type|form) of\b/] },
];

/**
 * Classify the question. `entityCount` lets "X vs Y" fall through when only one thing was named; `sameKind` says the two
 * are comparable; `exclude` skips intents already ruled out (evidence, when nothing graded was named).
 */
export function classifyIntent(question: string, entityCount = 2, sameKind = true, exclude?: ReadonlySet<Intent>): Intent {
  const q = normaliseQuestion(question).toLowerCase().replace(/['"]/g, "");
  for (const r of RULES) {
    if (exclude?.has(r.intent)) continue;
    if (r.minEntities && entityCount < r.minEntities) continue;
    if (r.sameKind && !sameKind) continue;
    if (r.re.some((re) => re.test(q))) return r.intent;
  }
  return "general";
}

/** How much a record kind fits an intent, 0 to 0.5. Chooses the primary record among what the question named. */
export function kindPriority(intent: Intent, kind: Kind): number {
  const table: Partial<Record<Intent, Partial<Record<Kind, number>>>> = {
    define: { term: 0.5, cancer: 0.45, target: 0.4, technology: 0.4, journal: 0.4, pathway: 0.38, roadmap: 0.35, drug: 0.3, company: 0.3, institution: 0.3, person: 0.3, trial: 0.25, collection: 0.2, bottleneck: 0.25, paper: 0.2, idea: 0.2 },
    treatments: { cancer: 0.5, drug: 0.3, target: 0.3, technology: 0.25, term: 0.1, trial: 0.1 },
    biomarkers: { cancer: 0.5, target: 0.3, term: 0.25, technology: 0.2, drug: 0.2 },
    approval: { drug: 0.5, technology: 0.35, cancer: 0.3, target: 0.25, term: 0.1 },
    "regional-approvals": { technology: 0.5, cancer: 0.5, target: 0.45, drug: 0.35, term: 0.3, section: 0.2 },
    mechanism: { drug: 0.5, technology: 0.45, pathway: 0.4, target: 0.4, term: 0.25, cancer: 0.1 },
    "side-effects": { drug: 0.5, technology: 0.4, term: 0.2, cancer: 0.1 },
    trials: { trial: 0.5, drug: 0.45, cancer: 0.4, target: 0.35, technology: 0.35, term: 0.1 },
    results: { trial: 0.5, drug: 0.4, paper: 0.35, technology: 0.3, cancer: 0.2, term: 0.1 },
    evidence: { technology: 0.5, drug: 0.3, term: 0.3, trial: 0.25, paper: 0.25, cancer: 0.2, target: 0.15 },
    compare: { technology: 0.3, drug: 0.3, cancer: 0.3, target: 0.3, trial: 0.3, term: 0.3, pathway: 0.3 },
    prognosis: { cancer: 0.5, term: 0.1, drug: 0.1, trial: 0.1 },
    who: { company: 0.5, institution: 0.5, person: 0.5, collection: 0.45, drug: 0.4, journal: 0.35, technology: 0.3, trial: 0.3, cancer: 0.2, term: 0.1 },
    investors: { company: 0.5, technology: 0.4, target: 0.35, cancer: 0.3, section: 0.2, term: 0.15, drug: 0.15 },
    companies: { technology: 0.5, target: 0.5, cancer: 0.45, company: 0.45, pathway: 0.3, term: 0.3, section: 0.3, drug: 0.3, institution: 0.1 },
    roadmap: { roadmap: 0.5, section: 0.45, technology: 0.4, cancer: 0.35, target: 0.3, term: 0.25, drug: 0.2, company: 0.1 },
    journals: { journal: 0.5, paper: 0.4, trial: 0.35, person: 0.3, term: 0.2, cancer: 0.2, technology: 0.2, drug: 0.2 },
    cost: { drug: 0.5, cancer: 0.2, technology: 0.2 },
    general: { cancer: 0.3, drug: 0.3, target: 0.3, technology: 0.3, trial: 0.3, term: 0.25, pathway: 0.25, journal: 0.25, roadmap: 0.25, company: 0.2, institution: 0.2, person: 0.2, collection: 0.2, bottleneck: 0.2 },
  };
  return table[intent]?.[kind] ?? 0.05;
}

/** Words that say the asker means a pathway map ("which KEGG pathway covers bladder cancer") or a journal ("the journal Blood"). */
const PATHWAY_WORDS = /\b(?:kegg|pathways?|signalling|signaling|map)\b/i;
const JOURNAL_WORDS = /\bjournals?\b/i;
const ROADMAP_WORDS = /\broadmap\b/i;

/** Extra weight for a kind the question's own words ask for, on top of the intent table. */
function contextBoost(question: string, kind: Kind): number {
  if (kind === "pathway" && PATHWAY_WORDS.test(question)) return 0.35;
  if (kind === "journal" && JOURNAL_WORDS.test(question)) return 0.3;
  if (kind === "roadmap" && ROADMAP_WORDS.test(question)) return 0.3;
  return 0;
}

export type Resolved = { entry: AskIndexEntry; pattern: string; start: number; end: number; strong: boolean; score: number };
export type Analysis = { question: string; intent: Intent; entities: Resolved[]; alternates: AskIndexEntry[]; quoted: string[]; pair?: { pair: AskPair; similarity: number } };

type Prepared = { matcher: Matcher<number>; byId: Map<string, AskIndexEntry>; pairTokens: Array<Set<string>>; pairNorm: string[] };
const prepared = new WeakMap<AskIndex, Prepared>();

const dehyphen = (s: string) => s.replace(/-/g, " ");
const normForPair = (s: string) => normaliseQuestion(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

/** Build (once per index object) the automaton over every alias, hyphens folded to spaces. */
export function prepareIndex(index: AskIndex): Prepared {
  let p = prepared.get(index);
  if (p) return p;
  const entries: Array<{ pattern: string; ref: number }> = [];
  index.entries.forEach((e, i) => { for (const a of e.aliases) entries.push({ pattern: dehyphen(a).toLowerCase(), ref: i }); });
  p = { matcher: buildMatcher(entries), byId: new Map(index.entries.map((e) => [e.id, e])), pairTokens: index.pairs.map((x) => new Set(tokenize(x.q))), pairNorm: index.pairs.map((x) => normForPair(x.q)) };
  prepared.set(index, p);
  return p;
}

/** A glossary alias that is an ordinary lower-case phrase ("early-stage", "chemo") only anchors an answer when nothing stronger is named. */
function isStrong(entry: AskIndexEntry, pattern: string, slice: string): boolean {
  if (entry.kind === "section") return false;
  if (entry.kind !== "term") return true;
  const base = dehyphen(baseName(entry.name)).toLowerCase();
  if (pattern === base) return true;
  // Written as an abbreviation or code ("pCR", "CPS", "HER2-low"): the asker means the term.
  if (/[A-Z0-9]/.test(slice)) return true;
  return !/^[a-z][a-z ]*$/.test(pattern);
}

/** Case-sensitive names ("VISION", "FDA") count only written in capitals or followed by "trial"/"study". */
function allowedCase(original: string, start: number, end: number, pattern: string): boolean {
  if (!ASK_CASE_SENSITIVE.has(pattern)) return true;
  const slice = original.slice(start, end);
  if (slice === slice.toUpperCase() && /[A-Z]/.test(slice)) return true;
  return /^\s+(?:trial|study)\b/i.test(original.slice(end, end + 8));
}

const within = (s: Span, ranges: Span[]) => ranges.some(([a, b]) => s[0] >= a && s[1] <= b);

/**
 * Every record the question names, best first, plus the other candidates that overlapped or tied
 * ("Not what you meant?"). Leftmost-longest spans win; within a span the kind that fits the intent wins;
 * the phrase the question is about (quoted, or in the "what is X" slot) outranks other mentions.
 */
export function resolveEntities(question: string, index: AskIndex, intent: Intent): { entities: Resolved[]; alternates: AskIndexEntry[] } {
  const p = prepareIndex(index);
  const original = normaliseQuestion(question);
  const text = dehyphen(original);
  const focus = [...quotedSpans(original), ...focusSpans(original)];
  const hits = scan(p.matcher, text).filter((h) => allowedCase(original, h.start, h.end, h.pattern));
  const spans = new Map<string, { start: number; end: number; pattern: string; refs: number[] }>();
  for (const h of hits) {
    const k = `${h.start}:${h.end}`;
    const s = spans.get(k) ?? { start: h.start, end: h.end, pattern: h.pattern, refs: [] };
    if (!s.refs.includes(h.ref)) s.refs.push(h.ref);
    spans.set(k, s);
  }
  const ordered = [...spans.values()].sort((a, b) => a.start - b.start || b.end - a.end);
  const chosen: Resolved[] = [];
  const alternates = new Map<string, AskIndexEntry>();
  const seenIds = new Set<string>();
  let pos = 0;
  for (const s of ordered) {
    const cands = s.refs.map((r) => index.entries[r]);
    if (s.start < pos) { for (const c of cands) if (!seenIds.has(c.id)) alternates.set(c.id, c); continue; }
    const slice = original.slice(s.start, s.end);
    const inFocus = within([s.start, s.end], focus);
    // A single ordinary word naming a glossary term ("chemotherapy", "surgery") is usually context, not the subject.
    const generic = /^[a-z]+$/.test(slice) && cands.every((c) => c.kind === "term" || c.kind === "section");
    const scored = cands.map((entry) => {
      // A front ("Radiation Therapy", "Surgery & Interventional") anchors a roadmap question; elsewhere it is context.
      const strong = isStrong(entry, s.pattern, slice) || (intent === "roadmap" && entry.kind === "section");
      const len = Math.min(s.end - s.start, 24) / 48;
      const score = (strong ? 1 : 0) + kindPriority(intent, entry.kind) + contextBoost(original, entry.kind) + len + 0.1 * (1 - s.start / Math.max(1, text.length)) + (inFocus ? 0.5 : 0) - (generic ? 0.3 : 0);
      return { entry, strong, score };
    }).sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name));
    const best = scored[0];
    if (!seenIds.has(best.entry.id)) {
      chosen.push({ entry: best.entry, pattern: slice, start: s.start, end: s.end, strong: best.strong, score: best.score });
      seenIds.add(best.entry.id);
    }
    for (const c of scored.slice(1)) if (!seenIds.has(c.entry.id)) alternates.set(c.entry.id, c.entry);
    pos = s.end;
  }
  chosen.sort((a, b) => b.score - a.score || a.start - b.start);
  for (const c of chosen) alternates.delete(c.entry.id);
  return { entities: chosen, alternates: [...alternates.values()] };
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}

/** The curated question (benchmark or patient question) closest to this one, when close enough to trust its records. */
export function matchPair(question: string, index: AskIndex, threshold = 0.8): { pair: AskPair; similarity: number } | undefined {
  const p = prepareIndex(index);
  const norm = normForPair(question);
  const toks = new Set(tokenize(question));
  let best: { pair: AskPair; similarity: number } | undefined;
  index.pairs.forEach((pair, i) => {
    if (p.pairNorm[i] === norm) { best = { pair, similarity: 1 }; return; }
    if (best && best.similarity === 1) return;
    const other = p.pairTokens[i];
    let inter = 0;
    for (const t of toks) if (other.has(t)) inter++;
    let sim = toks.size + other.size ? (2 * inter) / (toks.size + other.size) : 0;
    if (sim >= 0.55 && sim < threshold) {
      const d = levenshtein(norm, p.pairNorm[i]);
      sim = Math.max(sim, 1 - d / Math.max(norm.length, p.pairNorm[i].length));
    }
    if (sim >= threshold && (!best || sim > best.similarity)) best = { pair, similarity: sim };
  });
  return best;
}

/** Intent, named records and curated pairing for a question. */
export function analyseQuestion(question: string, index: AskIndex): Analysis {
  const quoted = quotedPhrases(question);
  // Resolve with the provisional intent, then re-classify knowing what was named (compare needs two of a kind).
  const provisional = classifyIntent(question, 2, true);
  let { entities, alternates } = resolveEntities(question, index, provisional);
  let strong = entities.filter((e) => e.strong);
  let sameKind = strong.length >= 2 && strong[0].entry.kind === strong[1].entry.kind;
  let intent = classifyIntent(question, strong.length, sameKind);
  // "Does X work?" is an evidence question only when X carries an evidence grade (a complementary approach); otherwise
  // the wording falls through to results, side effects or definition as before.
  if (intent === "evidence" && !strong.some((e) => e.entry.grade)) {
    ({ entities, alternates } = resolveEntities(question, index, "general"));
    strong = entities.filter((e) => e.strong);
    sameKind = strong.length >= 2 && strong[0].entry.kind === strong[1].entry.kind;
    if (!strong.some((e) => e.entry.grade)) intent = classifyIntent(question, strong.length, sameKind, new Set<Intent>(["evidence"]));
  }
  if (intent !== provisional) ({ entities, alternates } = resolveEntities(question, index, intent));
  const pair = matchPair(question, index);
  return { question, intent, entities, alternates, quoted, pair };
}

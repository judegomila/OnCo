import { TARGET_EXPRESSION_HPA_LICENCE, TARGET_EXPRESSION_HPA_LICENCE_URL, TARGET_EXPRESSION_HPA_VERSION, targetExpressionHpa, type HpaGeneExpression } from "@/data/target-expression-hpa";

const n = (x: number) => x.toLocaleString("en-GB", { maximumFractionDigits: 0 });
const hpaUrl = (gene: HpaGeneExpression, section: "tissue" | "pathology") => `https://www.proteinatlas.org/${gene.ensembl}-${gene.symbol}/${section}`;

/** The HPA rows for a target, or null when the atlas has none for its gene(s). */
export function hpaFor(targetId: string) { return targetExpressionHpa[targetId] ?? null; }

function GeneRows({ gene, showSymbol }: { gene: HpaGeneExpression; showSymbol: boolean }) {
  const highTissues = [...new Set(gene.normalHigh.map((x) => x.tissue))];
  const cellTypes = (tissue: string) => gene.normalHigh.filter((x) => x.tissue === tissue).map((x) => x.cellType).join(", ");
  const cancersHigh = gene.cancers.filter((c) => c.high > 0).slice(0, 8);
  const cancersMedium = gene.cancers.filter((c) => c.high === 0 && c.medium > 0).slice(0, 6);
  return (
    <div className="grid gap-4 sm:grid-cols-2 text-sm">
      <div>
        <div className="kicker mb-1">{showSymbol ? `${gene.symbol}: normal tissues` : "Normal tissues"}</div>
        <p className="text-muted">
          RNA: {gene.rnaTissue.specificity.toLowerCase()}{gene.rnaTissue.enriched.length ? <> ({gene.rnaTissue.enriched.map((e) => `${e.name} ${n(e.value)} nTPM`).join(", ")})</> : null}, {gene.rnaTissue.distribution.toLowerCase().replace("detected in", "detected in")} normal tissue{gene.rnaTissue.distribution === "Detected in single" ? "" : "s"}.
          {gene.bloodLineage.enriched.length > 0 && <> Blood: {gene.bloodLineage.specificity.toLowerCase()} ({gene.bloodLineage.enriched.map((e) => `${e.name} ${n(e.value)} nTPM`).join(", ")}).</>}
        </p>
        {highTissues.length > 0 ? (
          <ul className="mt-1 space-y-0.5">
            {highTissues.slice(0, 10).map((t) => <li key={t}><span className="font-medium">{t}</span> <span className="text-muted">· high staining in {cellTypes(t)}</span></li>)}
            {highTissues.length > 10 && <li className="text-muted">and {highTissues.length - 10} more tissues stained high</li>}
          </ul>
        ) : <p className="mt-1 text-muted">No normal tissue stained high{gene.normalMedium.length ? `; medium in ${gene.normalMedium.slice(0, 6).join(", ")}${gene.normalMedium.length > 6 ? " and more" : ""}` : ""}.</p>}
        {highTissues.length > 0 && gene.normalMedium.length > 0 && <p className="mt-1 text-xs text-muted">Medium: {gene.normalMedium.slice(0, 8).join(", ")}{gene.normalMedium.length > 8 ? " and more" : ""}.</p>}
      </div>
      <div>
        <div className="kicker mb-1">{showSymbol ? `${gene.symbol}: cancers` : "Cancers"}</div>
        {gene.rnaCancer.enriched.length > 0 && <p className="text-muted">RNA {gene.rnaCancer.specificity.toLowerCase()}: {gene.rnaCancer.enriched.map((e) => `${e.name.replace(" (TCGA)", "")} ${n(e.value)} pTPM`).join(", ")}.</p>}
        {cancersHigh.length > 0 ? (
          <ul className="mt-1 space-y-0.5">
            {cancersHigh.map((c) => { const total = c.high + c.medium + c.low + c.notDetected; return <li key={c.cancer}><span className="font-medium capitalize">{c.cancer}</span> <span className="text-muted tabular-nums">· high in {c.high} of {total} patients{c.medium ? `, medium in ${c.medium}` : ""}</span></li>; })}
          </ul>
        ) : cancersMedium.length > 0 ? <p className="mt-1 text-muted">No cancer stained high; medium in {cancersMedium.map((c) => c.cancer).join(", ")}.</p> : <p className="mt-1 text-muted">No cancer sample stained medium or high.</p>}
        {cancersHigh.length > 0 && cancersMedium.length > 0 && <p className="mt-1 text-xs text-muted">Medium only: {cancersMedium.map((c) => c.cancer).join(", ")}.</p>}
      </div>
      <p className="sm:col-span-2 text-xs text-muted">
        <a className="underline hover:text-foreground" href={hpaUrl(gene, "tissue")} rel="noopener">HPA {gene.symbol} tissue</a> · <a className="underline hover:text-foreground" href={hpaUrl(gene, "pathology")} rel="noopener">HPA {gene.symbol} pathology</a>
        {gene.proteinClass.some((c) => /Essential|CD markers|FDA approved/.test(c)) && <> · HPA protein class: {gene.proteinClass.filter((c) => /Essential|CD markers|FDA approved/.test(c)).join(", ")}</>}
      </p>
    </div>
  );
}

/**
 * "Where it is found" from the Human Protein Atlas: the normal tissues the target is stained high in (with the cell
 * type), the blood lineage it is enriched in, and the cancers with the largest share of patients stained high.
 * This is the data the specificity class rests on, shown so a reader can check it. Renders nothing when the atlas has
 * no row for the target's gene(s). Server component; data from src/data/target-expression-hpa.ts.
 */
export function TargetWhereFound({ targetId }: { targetId: string }) {
  const hpa = hpaFor(targetId);
  if (!hpa) return null;
  return (
    <div data-target-hpa>
      <div className="space-y-5">
        {hpa.genes.map((gene) => <GeneRows key={gene.ensembl} gene={gene} showSymbol={hpa.genes.length > 1} />)}
      </div>
      <p className="mt-3 text-xs text-muted">
        Human Protein Atlas version {TARGET_EXPRESSION_HPA_VERSION}, antibody staining at reliability approved, enhanced or supported; used under <a className="underline hover:text-foreground" href={TARGET_EXPRESSION_HPA_LICENCE_URL} rel="noopener">{TARGET_EXPRESSION_HPA_LICENCE}</a>. Staining counts are patients per level in the atlas cohort, not population prevalence.
      </p>
    </div>
  );
}

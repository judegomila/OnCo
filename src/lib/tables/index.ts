import { TABLE_PAGE } from "@/lib/static-tables";
import { EVIDENCE_TABLE, evidenceRows } from "./evidence";
import { CHINA_TRIALS_TABLE, chinaTrialRows } from "./china";
import { UNIVERSITY_GROUPED_TABLE, UNIVERSITY_OUTPUT_TABLE, UNIVERSITY_SCORE_TABLE, universityGroupedRankingRows, universityOutputRankingRows, universityScoreRows } from "./universities";
import { auditTableFiles } from "./audit";
import { PATHWAY_MATRIX_TABLE, PATHWAY_NODES_TABLE, pathwayDrugViews, pathwayMatrixRows, pathwaySections } from "./pathway-drugs";
import { dossierTrialTables } from "./dossier-trials";
import { STARTUPS_TABLE, startupBrowser } from "./startups";
import { dossierData } from "@/components/Dossier";

export type TableFile = { id: string; rows: unknown[] };

/**
 * Every paged table on the site as id and full rows, in the order each page renders them. scripts/build-tables.ts
 * writes those longer than one page to public/api/v1/tables/<id>.json; the pages slice the same rows with
 * `pageRows` (src/lib/static-tables.ts), so the first page in the HTML and the file agree by construction.
 */
export function allTables(): TableFile[] {
  const views = pathwayDrugViews();
  return [
    { id: EVIDENCE_TABLE, rows: evidenceRows() },
    { id: CHINA_TRIALS_TABLE, rows: chinaTrialRows() },
    { id: UNIVERSITY_OUTPUT_TABLE, rows: universityOutputRankingRows() },
    { id: UNIVERSITY_GROUPED_TABLE, rows: universityGroupedRankingRows() },
    { id: UNIVERSITY_SCORE_TABLE, rows: universityScoreRows() },
    ...auditTableFiles(),
    { id: PATHWAY_MATRIX_TABLE, rows: pathwayMatrixRows(views) },
    { id: PATHWAY_NODES_TABLE, rows: pathwaySections(views) },
    { id: STARTUPS_TABLE, rows: startupBrowser().rows },
    ...dossierTrialTables(dossierData),
  ];
}

/** The tables that need a file: those longer than the page the HTML carries. */
export function pagedTables(tables = allTables()): TableFile[] {
  return tables.filter((t) => t.rows.length > TABLE_PAGE);
}

import type { PrecisionRow } from "./types";
import { rows as molecular } from "./molecular";
import { rows as radiation } from "./radiation";
import { rows as surgery } from "./surgery";
import { rows as dosing } from "./dosing";

export * from "./types";
export const PRECISION_ROWS: PrecisionRow[] = [...molecular, ...radiation, ...surgery, ...dosing];

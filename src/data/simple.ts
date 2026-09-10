// Unreviewed simplified text; see review track (CONTRIBUTING.md, "Expert review track").
// About a 12-year-old reading age, one or two short sentences, no jargon. Keyed by entity id.
import { simpleA } from "./simple/part-a";
import { simpleB } from "./simple/part-b";
import { simpleD } from "./simple/part-d";
import { simpleE } from "./simple/part-e";
import { simpleF } from "./simple/part-f";
import { simpleG } from "./simple/part-g";
import { simpleH } from "./simple/part-h";

export const simple: Record<string, string> = { ...simpleA, ...simpleB, ...simpleD, ...simpleE, ...simpleF, ...simpleG, ...simpleH };

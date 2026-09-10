import type { IdeaInput } from "@/lib/schema";
import { ideasBiology1 } from "./wave-biology-1";
import { ideasBiology2 } from "./wave-biology-2";
import { ideasPrevention } from "./wave-prevention";
import { ideasTrials1 } from "./wave-trials-1";
import { ideasTrials2 } from "./wave-trials-2";
import { ideasRegulation } from "./wave-regulation";
import { ideasAccess } from "./wave-access";
import { ideasData } from "./wave-data";
import { ideasFunding } from "./wave-funding";
import { ideasPeopleMoonshots } from "./wave-people-moonshots";
import { ideasCosts } from "./wave-costs";

/** Waves of ideas attacking the bottlenecks of the war on cancer. Register each wave file here. */
const files: IdeaInput[][] = [ideasBiology1, ideasBiology2, ideasPrevention, ideasTrials1, ideasTrials2, ideasRegulation, ideasAccess, ideasData, ideasFunding, ideasPeopleMoonshots, ideasCosts];
export const ideaWaves: IdeaInput[] = files.flat();

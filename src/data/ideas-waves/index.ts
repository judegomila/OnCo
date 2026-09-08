import type { IdeaInput } from "@/lib/schema";
import { ideasAccess } from "./wave-access";
import { ideasPeopleMoonshots } from "./wave-people-moonshots";

/** Waves of ideas attacking the bottlenecks of the war on cancer. Register each wave file here. */
const files: IdeaInput[][] = [ideasAccess, ideasPeopleMoonshots];
export const ideaWaves: IdeaInput[] = files.flat();

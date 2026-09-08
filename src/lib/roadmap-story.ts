import type { Roadmap } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import type { StoryStep } from "@/components/RoadmapStory";

/** Resolve a roadmap's steps and their refs into the plain data the story component needs. */
export function roadmapStorySteps(r: Roadmap): StoryStep[] {
  const g = graph();
  return r.steps.map((s) => ({
    era: s.era, title: s.title, description: s.description, status: s.status,
    refs: s.refs.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e).map((e) => ({ id: e.id, kind: e.kind, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status })),
  }));
}

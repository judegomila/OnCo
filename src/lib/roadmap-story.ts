import type { Roadmap } from "@/lib/schema";
import type { StoryStep } from "@/components/RoadmapStory";

/**
 * A roadmap's steps as the skeleton the story component needs: era, title and status. Each step's summary and cards
 * (the records it links to) come from the roadmap's file, /api/v1/roadmaps/<id>.json (src/lib/roadmap-eras.ts),
 * fetched when the story scrolls into view, so the page carries nothing twice; the Steps tab has the full text.
 */
export function roadmapStorySteps(r: Roadmap): StoryStep[] {
  return r.steps.map((s) => ({ era: s.era, title: s.title, status: s.status }));
}

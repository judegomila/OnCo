import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CV_DIVE } from "@/data/country-cv";

export const metadata: Metadata = pageMeta({ title: CV_DIVE.title, description: CV_DIVE.description, path: "/countries/cv/" });

export default function CaboVerdePage() {
  return <CountryDeepDive dive={CV_DIVE} />;
}

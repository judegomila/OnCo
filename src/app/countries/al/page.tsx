import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AL_DIVE } from "@/data/country-al";

export const metadata: Metadata = pageMeta({ title: AL_DIVE.title, description: AL_DIVE.description, path: "/countries/al/" });

export default function AlbaniaPage() {
  return <CountryDeepDive dive={AL_DIVE} />;
}

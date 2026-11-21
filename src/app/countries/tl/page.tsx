import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TL_DIVE } from "@/data/country-tl";

export const metadata: Metadata = pageMeta({ title: TL_DIVE.title, description: TL_DIVE.description, path: "/countries/tl/" });

export default function TimorLestePage() {
  return <CountryDeepDive dive={TL_DIVE} />;
}
